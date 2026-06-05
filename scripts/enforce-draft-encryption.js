#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { randomBytes } from 'crypto';
import { fileURLToPath } from 'url';
import frontMatter from 'front-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const markdownDir = path.join(rootDir, 'public/markdown');
const keyPath = path.join(rootDir, 'draft_encryption_key.txt');
const encryptedMarker = '<!-- encrypted:draft-body:xor-base64 -->';

function ensureKey() {
  if (fs.existsSync(keyPath)) {
    const key = fs.readFileSync(keyPath, 'utf8').trim();
    if (key) return key;
  }

  const key = randomBytes(32).toString('base64url');
  fs.writeFileSync(keyPath, `${key}\n`, 'utf8');
  return key;
}

function xorEncryptToBase64(text, key) {
  const input = Buffer.from(text, 'utf8');
  const keyBytes = Buffer.from(key, 'utf8');
  const output = Buffer.alloc(input.length);

  for (let i = 0; i < input.length; i += 1) {
    output[i] = input[i] ^ keyBytes[i % keyBytes.length];
  }

  return output.toString('base64');
}

function upsertFrontmatterField(frontmatter, field, value) {
  const line = `${field}: ${value}`;
  if (new RegExp(`^${field}:\\s*`, 'm').test(frontmatter)) {
    return frontmatter.replace(new RegExp(`^${field}:\\s*.*$`, 'm'), line);
  }
  return `${frontmatter.trimEnd()}\n${line}`;
}

function writePost(fullPath, newline, frontmatterText, body) {
  fs.writeFileSync(fullPath, `---${newline}${frontmatterText}${newline}---${newline}${body}`, 'utf8');
}

function updateFrontmatter(content, updater) {
  const match = content.match(/^---(\r?\n)([\s\S]*?)(\r?\n)---(\r?\n)?/);
  if (!match) return null;

  return {
    newline: match[1],
    frontmatterText: updater(match[2])
  };
}

function enforcePost(file, key) {
  const fullPath = path.join(markdownDir, file);
  const content = fs.readFileSync(fullPath, 'utf8');
  const parsed = frontMatter(content);
  const isDraft = parsed.attributes.draft === true;
  const isEncrypted = parsed.attributes.encrypted === true || parsed.body.trimStart().startsWith(encryptedMarker);

  if (!isDraft && !isEncrypted) {
    return null;
  }

  const updated = updateFrontmatter(content, (frontmatterText) => {
    let next = frontmatterText;
    next = upsertFrontmatterField(next, 'draft', 'true');
    next = upsertFrontmatterField(next, 'encrypted', 'true');
    next = upsertFrontmatterField(next, 'encryptionAlgorithm', 'xor-base64');
    if (!isEncrypted) {
      next = upsertFrontmatterField(next, 'encryptedAt', new Date().toISOString());
    }
    return next;
  });

  if (!updated) {
    throw new Error(`Missing frontmatter in ${file}`);
  }

  if (isEncrypted) {
    writePost(fullPath, updated.newline, updated.frontmatterText, parsed.body);
    return isDraft ? 'normalized' : 'forced-draft';
  }

  const encrypted = xorEncryptToBase64(parsed.body, key);
  const encryptedBody = [
    encryptedMarker,
    encrypted,
    ''
  ].join(updated.newline);

  writePost(fullPath, updated.newline, updated.frontmatterText, encryptedBody);
  return 'encrypted';
}

function main() {
  const key = ensureKey();
  const results = {
    encrypted: [],
    forcedDraft: [],
    normalized: []
  };

  fs.readdirSync(markdownDir)
    .filter((file) => path.extname(file) === '.md')
    .sort()
    .forEach((file) => {
      const action = enforcePost(file, key);
      if (action === 'encrypted') results.encrypted.push(file);
      if (action === 'forced-draft') results.forcedDraft.push(file);
      if (action === 'normalized') results.normalized.push(file);
    });

  console.log(JSON.stringify({
    encrypted: results.encrypted.length,
    forcedDraft: results.forcedDraft.length,
    normalized: results.normalized.length
  }, null, 2));

  if (results.encrypted.length > 0) {
    console.log(`Encrypted draft markdown files:\n${results.encrypted.map((file) => `- ${file}`).join('\n')}`);
  }
  if (results.forcedDraft.length > 0) {
    console.log(`Forced encrypted markdown files back to draft:\n${results.forcedDraft.map((file) => `- ${file}`).join('\n')}`);
  }
}

main();
