## Upload Markdown Images To Tencent Cloud COS

Configure secrets in the repository root `.env.local`:

```env
TENCENT_COS_SECRET_ID=...
TENCENT_COS_SECRET_KEY=...
TENCENT_COS_BUCKET=myblog-1257298572
TENCENT_COS_REGION=ap-shanghai
TENCENT_COS_PATH=/img
TENCENT_COS_CUSTOM_URL=
```

Upload local images referenced by a Markdown post and replace links in place:

```bash
npm run upload-images -- public/markdown/vane-agent-search-flow-speed-balanced.md
```

Preview without writing files:

```bash
npm run upload-images -- --dry-run public/markdown/vane-agent-search-flow-speed-balanced.md
```

By default the script uploads local images only, including site-root paths such as `/images/example.png`. Add `--include-remote` if you also want to download and re-upload remote image URLs.
