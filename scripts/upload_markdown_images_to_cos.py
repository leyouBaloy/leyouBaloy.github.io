#!/usr/bin/env python3
"""Upload Markdown images to Tencent Cloud COS and rewrite image URLs."""

from __future__ import annotations

import argparse
import hashlib
import mimetypes
import os
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable
from urllib.parse import unquote, urlparse

import requests
from qcloud_cos import CosConfig, CosS3Client


IMAGE_PATTERN = re.compile(r"!\[([^\]]*)\]\(([^)]+)\)")
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".svg", ".avif"}


@dataclass(frozen=True)
class CosSettings:
    secret_id: str
    secret_key: str
    bucket: str
    region: str
    prefix: str
    custom_url: str


@dataclass(frozen=True)
class ImageRef:
    full_match: str
    alt: str
    target: str
    local_path: Path | None
    remote_url: str | None
    frontmatter_key: str | None = None


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def load_env_file(path: Path) -> None:
    if not path.exists():
        return

    for line in path.read_text(encoding="utf-8").splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("#") or "=" not in stripped:
            continue

        key, value = stripped.split("=", 1)
        key = key.strip()
        value = value.strip().strip("'\"")
        os.environ.setdefault(key, value)


def load_local_env(root: Path) -> None:
    load_env_file(root / ".env.local")
    load_env_file(root / ".env")


def first_env(*names: str, default: str = "") -> str:
    for name in names:
        value = os.environ.get(name)
        if value:
            return value
    return default


def settings_from_env() -> CosSettings:
    settings = CosSettings(
        secret_id=first_env("TENCENT_COS_SECRET_ID", "TENCENT_CLOUD_SECRETID"),
        secret_key=first_env("TENCENT_COS_SECRET_KEY", "TENCENT_CLOUD_SECRETKEY"),
        bucket=first_env("TENCENT_COS_BUCKET", "TENCENT_CLOUD_BUCKET"),
        region=first_env("TENCENT_COS_REGION", "TENCENT_CLOUD_REGION", default="ap-shanghai"),
        prefix=first_env("TENCENT_COS_PATH", default="/img"),
        custom_url=first_env("TENCENT_COS_CUSTOM_URL"),
    )

    missing = [
        name
        for name, value in {
            "TENCENT_COS_SECRET_ID": settings.secret_id,
            "TENCENT_COS_SECRET_KEY": settings.secret_key,
            "TENCENT_COS_BUCKET": settings.bucket,
            "TENCENT_COS_REGION": settings.region,
        }.items()
        if not value
    ]
    if missing:
        raise RuntimeError(f"Missing required environment variables: {', '.join(missing)}")

    return settings


def clean_prefix(prefix: str) -> str:
    return prefix.strip().strip("/")


def public_url(settings: CosSettings, key: str) -> str:
    if settings.custom_url:
        return f"{settings.custom_url.rstrip('/')}/{key}"
    return f"https://{settings.bucket}.cos.{settings.region}.myqcloud.com/{key}"


def is_http_url(value: str) -> bool:
    return value.startswith(("http://", "https://"))


def is_image_path(value: str) -> bool:
    parsed = urlparse(value)
    suffix = Path(unquote(parsed.path)).suffix.lower()
    return suffix in IMAGE_EXTENSIONS


def strip_markdown_title(target: str) -> str:
    target = target.strip()
    if target.startswith("<") and ">" in target:
        return target[1 : target.index(">")]
    if " " not in target:
        return target

    # Markdown allows optional image titles after the URL. Keep the URL only.
    head, tail = target.split(" ", 1)
    if tail.lstrip().startswith(("\"", "'")):
        return head
    return target


def resolve_local_path(target: str, markdown_file: Path, root: Path) -> Path | None:
    parsed = urlparse(target)
    path_text = unquote(parsed.path)

    if Path(path_text).is_absolute() and Path(path_text).exists():
        return Path(path_text)

    if target.startswith("/"):
        candidate = root / "public" / path_text.lstrip("/")
        return candidate if candidate.exists() else None

    candidate = markdown_file.parent / path_text
    return candidate.resolve() if candidate.exists() else None


def extract_images(markdown: str, markdown_file: Path, root: Path, include_remote: bool) -> list[ImageRef]:
    refs: list[ImageRef] = []

    if markdown.startswith("---"):
        end = markdown.find("\n---", 3)
        if end != -1:
            frontmatter = markdown[:end]
            for line in frontmatter.splitlines():
                match = re.match(r"^(img|featuredImagePreview):\s*(\S+)\s*$", line)
                if not match:
                    continue

                key, target = match.groups()
                target = strip_markdown_title(target)
                if not is_image_path(target):
                    continue

                if is_http_url(target):
                    if include_remote:
                        refs.append(ImageRef(line, "", target, None, target, frontmatter_key=key))
                    continue

                local_path = resolve_local_path(target, markdown_file, root)
                refs.append(ImageRef(line, "", target, local_path, None, frontmatter_key=key))

    for match in IMAGE_PATTERN.finditer(markdown):
        alt, raw_target = match.groups()
        target = strip_markdown_title(raw_target)
        if not is_image_path(target):
            continue

        if is_http_url(target):
            if include_remote:
                refs.append(ImageRef(match.group(0), alt, target, None, target))
            continue

        local_path = resolve_local_path(target, markdown_file, root)
        refs.append(ImageRef(match.group(0), alt, target, local_path, None))

    return refs


def safe_filename(filename: str) -> str:
    stem = Path(filename).stem.lower()
    suffix = Path(filename).suffix.lower()
    stem = re.sub(r"[^a-z0-9._-]+", "-", stem).strip("-") or "image"
    return f"{stem}{suffix}"


def cos_key(settings: CosSettings, filename: str, content: bytes) -> str:
    digest = hashlib.md5(content).hexdigest()[:12]
    prefix = clean_prefix(settings.prefix)
    name = safe_filename(filename)
    key = f"{digest}-{name}"
    return f"{prefix}/{key}" if prefix else key


def content_type(filename: str) -> str:
    guessed, _ = mimetypes.guess_type(filename)
    return guessed or "application/octet-stream"


def remote_filename(url: str, response: requests.Response) -> str:
    parsed_name = Path(unquote(urlparse(url).path)).name
    if parsed_name and Path(parsed_name).suffix:
        return parsed_name

    content_type_header = response.headers.get("content-type", "")
    extension = mimetypes.guess_extension(content_type_header.split(";")[0].strip()) or ".jpg"
    return f"image{extension}"


def read_image(ref: ImageRef) -> tuple[str, bytes]:
    if ref.local_path:
        return ref.local_path.name, ref.local_path.read_bytes()

    if ref.remote_url:
        response = requests.get(ref.remote_url, timeout=30)
        response.raise_for_status()
        return remote_filename(ref.remote_url, response), response.content

    raise RuntimeError(f"Image not found: {ref.target}")


def upload(client: CosS3Client, settings: CosSettings, filename: str, content: bytes, dry_run: bool) -> str:
    key = cos_key(settings, filename, content)
    url = public_url(settings, key)

    if dry_run:
        print(f"DRY RUN upload {filename} -> {url}")
        return url

    try:
        client.head_object(Bucket=settings.bucket, Key=key)
        print(f"Exists: {url}")
    except Exception:
        client.put_object(
            Bucket=settings.bucket,
            Key=key,
            Body=content,
            ContentType=content_type(filename),
        )
        print(f"Uploaded: {url}")

    return url


def process_file(
    markdown_file: Path,
    root: Path,
    client: CosS3Client,
    settings: CosSettings,
    include_remote: bool,
    dry_run: bool,
) -> tuple[int, int]:
    markdown = markdown_file.read_text(encoding="utf-8")
    refs = extract_images(markdown, markdown_file, root, include_remote)
    replacements: dict[str, str] = {}
    errors = 0

    for ref in refs:
        try:
            if ref.local_path is None and ref.remote_url is None:
                raise RuntimeError(f"Cannot resolve image path: {ref.target}")
            filename, content = read_image(ref)
            url = upload(client, settings, filename, content, dry_run)
            if ref.frontmatter_key:
                replacements[ref.full_match] = f"{ref.frontmatter_key}: {url}"
            else:
                replacements[ref.full_match] = f"![{ref.alt}]({url})"
        except Exception as exc:
            errors += 1
            print(f"Error: {markdown_file}: {ref.target}: {exc}", file=sys.stderr)

    if replacements:
        updated = markdown
        for old, new in replacements.items():
            updated = updated.replace(old, new)
        if not dry_run:
            markdown_file.write_text(updated, encoding="utf-8")

    print(f"{markdown_file}: {len(replacements)} image(s) processed, {errors} error(s)")
    return len(replacements), errors


def parse_args(argv: Iterable[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Upload local Markdown images to Tencent Cloud COS and replace their links.",
    )
    parser.add_argument("markdown_files", nargs="+", type=Path, help="Markdown file(s) to process")
    parser.add_argument("--root", type=Path, default=repo_root(), help="Repository root")
    parser.add_argument("--include-remote", action="store_true", help="Also download and re-upload remote images")
    parser.add_argument("--dry-run", action="store_true", help="Preview uploads and replacements without writing files")
    return parser.parse_args(list(argv))


def main(argv: Iterable[str] = sys.argv[1:]) -> int:
    args = parse_args(argv)
    root = args.root.resolve()
    load_local_env(root)
    settings = settings_from_env()
    client = CosS3Client(CosConfig(Region=settings.region, SecretId=settings.secret_id, SecretKey=settings.secret_key))

    total = 0
    errors = 0
    for markdown_file in args.markdown_files:
        processed, failed = process_file(
            markdown_file.resolve(),
            root,
            client,
            settings,
            include_remote=args.include_remote,
            dry_run=args.dry_run,
        )
        total += processed
        errors += failed

    print(f"Done: {total} image(s) processed across {len(args.markdown_files)} file(s)")
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
