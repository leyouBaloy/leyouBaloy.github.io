#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');
const markdownDir = path.join(rootDir, 'public/markdown');
const gossipDataPath = path.join(rootDir, 'public/data/gossip.json');
const metadataScript = path.join(__dirname, 'generate-metadata.js');

function loadLocalEnv() {
  ['.env.local', '.env'].forEach((envFile) => {
    const envPath = path.join(rootDir, envFile);
    if (!fs.existsSync(envPath)) return;

    const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;

      const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
      if (!match) return;

      const [, key, rawValue] = match;
      if (process.env[key] !== undefined) return;

      process.env[key] = rawValue
        .trim()
        .replace(/^['"]|['"]$/g, '');
    });
  });
}

loadLocalEnv();

const aiSlugApiBaseUrl = process.env.BLOG_AI_SLUG_API_BASE_URL || 'https://gcli.ggchan.dev/';
const aiSlugModel = process.env.BLOG_AI_SLUG_MODEL || 'Gemini 3.1 Pro Preview';
const aiSlugApiKey = process.env.BLOG_AI_SLUG_API_KEY || process.env.GEMINI_API_KEY || process.env.GCLI_API_KEY;
const aiSlugProvider = (process.env.BLOG_AI_SLUG_PROVIDER || 'google').trim().toLowerCase();

const command = process.argv[2];
const args = process.argv.slice(3);

const aliases = {
  n: 'new',
  g: 'generate',
  s: 'server',
  checkin: 'english'
};

const normalizedCommand = aliases[command] || command;

const helpText = `
Bailey Blog CLI

Usage:
  yarn blog <command> [options]

Commands:
  new <title>             Create a new markdown post
  slug <title>            Generate an SEO-friendly slug for a title
  slug:missing            Add AI slugs to markdown posts that do not have one
  english <youtube-url>   Add an English video check-in
  generate | g            Generate metadata and static files into dist
  server | s              Generate metadata and start the dev server
  help                    Show this help message

New post options:
  --slug <name>           Use a custom markdown filename
  --ai-slug               Force AI slug generation
  --no-ai-slug            Skip AI slug generation
  --category <name>       Set category, defaults to 随笔杂记
  --tag <name>            Add a tag, can be used multiple times
  --date <value>          Set date, defaults to current local time
  --draft                 Mark the post as draft
  --force                 Overwrite an existing file

Slug migration options:
  --dry-run               Preview generated slugs without writing files
  --limit <count>         Only process the first N missing slugs
  --batch-size <count>    Number of titles per AI request, defaults to 20
  --delay-ms <ms>         Delay between AI batches, defaults to 1500
  --allow-local           Fall back to local slugify if AI is unavailable

English check-in options:
  --duration <m:ss>       Video duration, required
  --date <YYYY-MM-DD>     Check-in date, defaults to today
  --title <text>          Override the title fetched from YouTube
  --note <text>           Check-in note, defaults to 完成听 + 跟读。
  --force                 Replace an existing English check-in for the date

AI slug env:
  BLOG_AI_SLUG_PROVIDER   google (default) or openai-compatible
  BLOG_AI_SLUG_API_BASE_URL
  BLOG_AI_SLUG_MODEL
  BLOG_AI_SLUG_API_KEY

Server options:
  --host <host>           Forward host to Vite
  --port <port>           Forward port to Vite

Examples:
  yarn blog new "我的新文章"
  yarn blog new "Vue 学习笔记" --slug vue-notes --tag Vue --tag 前端
  yarn blog slug "Vue3 实现小红书瀑布流布局"
  yarn blog slug:missing
  yarn blog english "https://www.youtube.com/watch?v=..." --duration 6:34
  yarn blog generate
  yarn blog server --port 5173
`;

function printHelp() {
  console.log(helpText.trim());
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseOptions(input) {
  const positionals = [];
  const options = {};

  for (let i = 0; i < input.length; i += 1) {
    const current = input[i];

    if (!current.startsWith('--')) {
      positionals.push(current);
      continue;
    }

    const [rawKey, inlineValue] = current.slice(2).split('=');
    const key = rawKey.trim();
    const nextValue = input[i + 1];

    if (['draft', 'force', 'ai-slug', 'no-ai-slug', 'dry-run', 'allow-local'].includes(key)) {
      options[key] = true;
      continue;
    }

    const value = inlineValue ?? (!nextValue?.startsWith('--') ? nextValue : undefined);
    if (value === undefined) {
      throw new Error(`Missing value for --${key}`);
    }

    if (inlineValue === undefined) {
      i += 1;
    }

    if (key === 'tag') {
      options.tags = [...(options.tags || []), value];
    } else {
      options[key] = value;
    }
  }

  return { positionals, options };
}

function formatDate(date = new Date()) {
  const pad = (value) => String(value).padStart(2, '0');
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate())
  ].join('-') + ' ' + [
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds())
  ].join(':');
}

function formatDay(date = new Date()) {
  const pad = (value) => String(value).padStart(2, '0');
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate())
  ].join('-');
}

function slugify(value) {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^\w\s\u4e00-\u9fa5-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug || 'untitled';
}

function sanitizeGeneratedSlug(value) {
  const text = String(value || '')
    .trim()
    .replace(/^```(?:json)?/i, '')
    .replace(/```$/i, '')
    .trim();

  let candidate = text;
  try {
    const parsed = JSON.parse(text);
    candidate = parsed.slug || parsed.content || text;
  } catch {
    candidate = text;
  }

  const matched = String(candidate)
    .toLowerCase()
    .replace(/["'`]/g, '')
    .match(/[a-z0-9]+(?:-[a-z0-9]+)*/);

  if (!matched) return '';

  return matched[0]
    .replace(/^-+|-+$/g, '')
    .slice(0, 72)
    .replace(/-+$/g, '');
}

function sanitizeSlug(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72)
    .replace(/-+$/g, '');
}

function normalizeList(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function stripMarkdown(content) {
  return content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_\-|~]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseFrontmatter(content) {
  const newline = content.includes('\r\n') ? '\r\n' : '\n';
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) {
    return {
      attributes: {},
      body: content,
      frontmatter: '',
      newline
    };
  }

  const attributes = {};
  const lines = match[1].split(/\r?\n/);
  let currentListKey = '';

  lines.forEach((line) => {
    const listItem = line.match(/^\s*-\s*(.*)$/);
    if (listItem && currentListKey) {
      attributes[currentListKey] = [
        ...(attributes[currentListKey] || []),
        listItem[1].trim().replace(/^['"]|['"]$/g, '')
      ];
      return;
    }

    const pair = line.match(/^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/);
    if (!pair) return;

    const [, key, rawValue] = pair;
    currentListKey = '';
    const value = rawValue.trim();
    if (!value) {
      if (['categories', 'tags'].includes(key)) {
        attributes[key] = [];
        currentListKey = key;
      } else {
        attributes[key] = '';
      }
      return;
    }

    if (value === 'true') {
      attributes[key] = true;
    } else if (value === 'false') {
      attributes[key] = false;
    } else {
      attributes[key] = value.replace(/^['"]|['"]$/g, '');
    }
  });

  return {
    attributes,
    body: content.slice(match[0].length),
    frontmatter: match[1],
    newline
  };
}

function insertSlugIntoFrontmatter(content, slug) {
  const parsed = parseFrontmatter(content);
  if (!parsed.frontmatter) {
    return `---${parsed.newline}slug: ${slug}${parsed.newline}---${parsed.newline}${content}`;
  }

  if (/^slug:\s*/m.test(parsed.frontmatter)) {
    return content.replace(/^slug:\s*.*$/m, `slug: ${slug}`);
  }

  const lines = parsed.frontmatter.split(/\r?\n/);
  const insertAfterIndex = lines.findIndex((line) => /^date:\s*/.test(line));
  const fallbackIndex = lines.findIndex((line) => /^title:\s*/.test(line));
  const index = insertAfterIndex >= 0 ? insertAfterIndex : fallbackIndex;

  if (index >= 0) {
    lines.splice(index + 1, 0, `slug: ${slug}`);
  } else {
    lines.unshift(`slug: ${slug}`);
  }

  const updatedFrontmatter = lines.join(parsed.newline);
  return content.replace(
    /^---\r?\n[\s\S]*?\r?\n---/,
    `---${parsed.newline}${updatedFrontmatter}${parsed.newline}---`
  );
}

function ensureUniqueSlug(slug, usedSlugs) {
  const base = sanitizeSlug(slug) || 'post';
  let candidate = base;
  let index = 2;

  while (usedSlugs.has(candidate)) {
    const suffix = `-${index}`;
    candidate = `${base.slice(0, Math.max(1, 72 - suffix.length)).replace(/-+$/g, '')}${suffix}`;
    index += 1;
  }

  usedSlugs.add(candidate);
  return candidate;
}

function getGeminiModelId(model) {
  const value = String(model || '').trim();
  if (!value) return 'gemini-3.1-pro-preview';
  if (value.startsWith('models/')) return value.slice('models/'.length);
  if (/^gemini[-\w.]+$/i.test(value)) return value;
  return value
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizeGeminiBaseUrl(baseUrl) {
  const normalizedBase = String(baseUrl || '')
    .trim()
    .replace(/\/+$/, '')
    .replace(/:generateContent$/, '');
  const modelPathIndex = normalizedBase.indexOf('/models/');

  if (modelPathIndex >= 0) {
    return normalizedBase.slice(0, modelPathIndex);
  }

  if (normalizedBase.endsWith('/v1') || normalizedBase.endsWith('/v1beta')) {
    return normalizedBase;
  }

  return `${normalizedBase}/v1beta`;
}

function normalizeOpenAiCompatibleBaseUrl(baseUrl) {
  const normalizedBase = String(baseUrl || '').trim().replace(/\/+$/, '');

  if (/\/chat\/completions$/.test(normalizedBase)) {
    return normalizedBase.replace(/\/chat\/completions$/, '');
  }

  if (normalizedBase.endsWith('/v1') || normalizedBase.endsWith('/v1beta/openai')) {
    return normalizedBase;
  }

  return `${normalizedBase}/v1`;
}

function getAiSlugLanguageModel() {
  if (!aiSlugApiKey) {
    throw new Error('BLOG_AI_SLUG_API_KEY is not configured');
  }

  if (['google', 'gemini', 'google-gemini'].includes(aiSlugProvider)) {
    const baseURL = normalizeGeminiBaseUrl(aiSlugApiBaseUrl);
    const isOfficialGoogle = /(^|\.)googleapis\.com/i.test(new URL(baseURL).hostname);
    const google = createGoogleGenerativeAI({
      apiKey: aiSlugApiKey,
      baseURL,
      headers: isOfficialGoogle ? undefined : {
        Authorization: `Bearer ${aiSlugApiKey}`
      },
      name: isOfficialGoogle ? 'google.generative-ai' : 'google.generative-ai-compatible'
    });

    return google(getGeminiModelId(aiSlugModel));
  }

  if (['openai-compatible', 'openai', 'custom'].includes(aiSlugProvider)) {
    const provider = createOpenAICompatible({
      name: process.env.BLOG_AI_SLUG_PROVIDER_NAME || 'blog-ai-slug',
      apiKey: aiSlugApiKey,
      baseURL: normalizeOpenAiCompatibleBaseUrl(aiSlugApiBaseUrl)
    });

    return provider(aiSlugModel);
  }

  throw new Error(`Unsupported BLOG_AI_SLUG_PROVIDER "${aiSlugProvider}". Use "google" or "openai-compatible".`);
}

function isRetryableAiError(error) {
  const statusCode = error?.statusCode || error?.status || error?.response?.status;
  const message = String(error?.message || '');
  return [429, 500, 502, 503, 504].includes(statusCode)
    || /\b(429|500|502|503|504)\b/.test(message)
    || /rate limit|temporarily unavailable|timeout/i.test(message);
}

async function generateAiText({ system, prompt, temperature = 0.2, maxOutputTokens = 1024 }) {
  let lastError;

  for (let attempt = 0; attempt < 4; attempt += 1) {
    try {
      const { text } = await generateText({
        model: getAiSlugLanguageModel(),
        system,
        prompt,
        temperature,
        maxOutputTokens
      });

      return text;
    } catch (error) {
      lastError = error;
      if (!isRetryableAiError(error) || attempt === 3) {
        break;
      }

      await sleep(15000 * (attempt + 1));
    }
  }

  throw lastError;
}

async function generateAiSlug(title, options = {}) {
  if (!aiSlugApiKey) {
    return '';
  }

  const category = options.category || '随笔杂记';
  const tags = options.tags?.length ? options.tags.join(', ') : '无';
  const prompt = [
    `标题：${title}`,
    `分类：${category}`,
    `标签：${tags}`,
    '',
    '请生成一个适合作为博客 URL 的英文 SEO slug。',
    '要求：只输出 slug 本身；使用小写英文字母、数字和连字符；不要中文；不要引号；不要解释；长度不超过 72 个字符；尽量保留核心搜索词。'
  ].join('\n');

  const text = await generateAiText({
    system: 'You generate concise, search-friendly URL slugs for Chinese and English blog posts.',
    prompt,
    temperature: 0.2,
    maxOutputTokens: 40
  });
  return sanitizeGeneratedSlug(text);
}

function parseJsonFromModelText(text) {
  const cleaned = String(text || '')
    .trim()
    .replace(/^```(?:json)?/i, '')
    .replace(/```$/i, '')
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    const objectStart = cleaned.indexOf('{');
    const objectEnd = cleaned.lastIndexOf('}');
    if (objectStart >= 0 && objectEnd > objectStart) {
      return JSON.parse(cleaned.slice(objectStart, objectEnd + 1));
    }

    const arrayStart = cleaned.indexOf('[');
    const arrayEnd = cleaned.lastIndexOf(']');
    if (arrayStart >= 0 && arrayEnd > arrayStart) {
      return JSON.parse(cleaned.slice(arrayStart, arrayEnd + 1));
    }

    throw new Error(`AI slug response was not valid JSON: ${cleaned.slice(0, 500)}`);
  }
}

async function generateAiSlugBatch(items) {
  if (!aiSlugApiKey) {
    throw new Error('BLOG_AI_SLUG_API_KEY is not configured');
  }

  const payload = items.map((item) => ({
    id: item.id,
    title: item.title,
    categories: item.categories,
    tags: item.tags,
    excerpt: item.excerpt
  }));

  const text = await generateAiText({
    system: 'You generate concise, search-friendly English URL slugs for Chinese and English blog posts. Return valid JSON only.',
    prompt: [
      '为下面的博客文章生成英文 SEO slug。',
      '要求：返回 JSON object，key 是 id，value 是 slug；slug 只能包含小写英文字母、数字和连字符；不要中文；不要解释；每个 slug 不超过 72 字符；尽量保留核心搜索词。',
      JSON.stringify(payload, null, 2)
    ].join('\n\n'),
    temperature: 0.2,
    maxOutputTokens: Math.max(2048, items.length * 80)
  });
  const parsed = parseJsonFromModelText(text);
  const result = {};

  if (Array.isArray(parsed)) {
    parsed.forEach((item) => {
      if (item?.id && item?.slug) {
        result[item.id] = sanitizeSlug(item.slug);
      }
    });
  } else {
    Object.entries(parsed).forEach(([id, slug]) => {
      result[id] = sanitizeSlug(slug);
    });
  }

  return result;
}

async function resolvePostSlug(title, options) {
  if (options.slug) {
    return slugify(options.slug);
  }

  const shouldUseAiSlug = options['ai-slug'] || (!options['no-ai-slug'] && Boolean(aiSlugApiKey));
  if (!shouldUseAiSlug) {
    return slugify(title);
  }

  try {
    const generatedSlug = await generateAiSlug(title, options);
    if (generatedSlug) {
      return generatedSlug;
    }
    console.warn('AI slug generation returned an empty result, falling back to local slugify.');
  } catch (error) {
    console.warn(`${error.message}. Falling back to local slugify.`);
  }

  return slugify(title);
}

function renderList(values) {
  return values.map((value) => `- ${value}`).join('\n');
}

async function createPost() {
  const { positionals, options } = parseOptions(args);
  const title = positionals.join(' ').trim();

  if (!title) {
    throw new Error('Please provide a post title. Example: yarn blog new "我的新文章"');
  }

  const postSlug = await resolvePostSlug(title, options);
  const filename = `${postSlug}.md`;
  const filepath = path.join(markdownDir, filename);
  const categories = [options.category || '随笔杂记'];
  const tags = options.tags || [];
  const date = options.date || formatDate();
  const draftLine = options.draft ? 'draft: true\n' : '';
  const tagBlock = tags.length > 0 ? `tags:\n${renderList(tags)}\n` : '';

  if (!fs.existsSync(markdownDir)) {
    fs.mkdirSync(markdownDir, { recursive: true });
  }

  if (fs.existsSync(filepath) && !options.force) {
    throw new Error(`Post already exists: ${path.relative(rootDir, filepath)}. Use --force to overwrite it.`);
  }

  const content = `---
title: ${title}
date: ${date}
slug: ${postSlug}
categories:
${renderList(categories)}
${tagBlock}img:
${draftLine}---

# ${title}

`;

  fs.writeFileSync(filepath, content, 'utf8');
  console.log(`Created ${path.relative(rootDir, filepath)}`);
}

function normalizeYouTubeUrl(value) {
  let url;

  try {
    url = new URL(value);
  } catch {
    throw new Error('Please provide a valid YouTube URL.');
  }

  const hostname = url.hostname.replace(/^www\./, '');
  let videoId = '';

  if (hostname === 'youtu.be') {
    videoId = url.pathname.split('/').filter(Boolean)[0] || '';
  } else if (['youtube.com', 'm.youtube.com'].includes(hostname)) {
    if (url.pathname === '/watch') {
      videoId = url.searchParams.get('v') || '';
    } else if (url.pathname.startsWith('/shorts/') || url.pathname.startsWith('/embed/')) {
      videoId = url.pathname.split('/').filter(Boolean)[1] || '';
    }
  }

  if (!/^[A-Za-z0-9_-]{11}$/.test(videoId)) {
    throw new Error('Could not find a valid YouTube video ID in the URL.');
  }

  return `https://www.youtube.com/watch?v=${videoId}`;
}

function validateCheckinDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error('--date must use YYYY-MM-DD format.');
  }

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime()) || formatDay(date) !== value) {
    throw new Error(`Invalid date: ${value}`);
  }
}

function validateDuration(value) {
  if (!/^\d+:[0-5]\d$/.test(value)) {
    throw new Error('--duration must use m:ss format, for example 6:34.');
  }
}

async function fetchYouTubeTitle(videoUrl) {
  const endpoint = new URL('https://www.youtube.com/oembed');
  endpoint.searchParams.set('url', videoUrl);
  endpoint.searchParams.set('format', 'json');

  const response = await fetch(endpoint, {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'Bailey-Blog-CLI'
    }
  });

  if (!response.ok) {
    throw new Error(`Could not fetch YouTube title (HTTP ${response.status}). Use --title to provide it manually.`);
  }

  const metadata = await response.json();
  if (!metadata.title) {
    throw new Error('YouTube did not return a video title. Use --title to provide it manually.');
  }

  return metadata.title;
}

async function addEnglishCheckin() {
  const { positionals, options } = parseOptions(args);
  const rawUrl = positionals[0];

  if (!rawUrl) {
    throw new Error('Please provide a YouTube URL.');
  }

  if (!options.duration) {
    throw new Error('--duration is required. Example: --duration 6:34');
  }

  const date = options.date || formatDay();
  validateCheckinDate(date);
  validateDuration(options.duration);

  const videoUrl = normalizeYouTubeUrl(rawUrl);
  const videoTitle = options.title || await fetchYouTubeTitle(videoUrl);
  const items = fs.existsSync(gossipDataPath)
    ? JSON.parse(fs.readFileSync(gossipDataPath, 'utf8'))
    : [];
  const id = `english-video-${date}`;
  const existingIndex = items.findIndex((item) => item.id === id);

  if (existingIndex >= 0 && !options.force) {
    throw new Error(`An English check-in already exists for ${date}. Use --force to replace it.`);
  }

  const item = {
    id,
    date,
    kind: 'english-checkin',
    title: '今日英语打卡',
    content: options.note || '完成听 + 跟读。',
    video: {
      title: videoTitle,
      duration: options.duration,
      url: videoUrl,
      platform: 'YouTube'
    },
    tags: ['英语', '听力', '跟读']
  };

  if (existingIndex >= 0) {
    items.splice(existingIndex, 1, item);
  } else {
    items.push(item);
  }

  items.sort((a, b) => b.date.localeCompare(a.date));
  fs.mkdirSync(path.dirname(gossipDataPath), { recursive: true });
  fs.writeFileSync(gossipDataPath, `${JSON.stringify(items, null, 2)}\n`, 'utf8');
  console.log(`Added English check-in for ${date}: ${videoTitle} (${options.duration})`);
}

async function printGeneratedSlug() {
  const { positionals, options } = parseOptions(args);
  const title = positionals.join(' ').trim();

  if (!title) {
    throw new Error('Please provide a title. Example: yarn blog slug "我的新文章"');
  }

  const generatedSlug = await resolvePostSlug(title, { ...options, 'ai-slug': true });
  console.log(generatedSlug);
}

function getMarkdownPostFiles() {
  if (!fs.existsSync(markdownDir)) return [];
  return fs
    .readdirSync(markdownDir)
    .filter((file) => file.endsWith('.md'))
    .sort();
}

function getPostSlugMigrationItems() {
  const usedSlugs = new Set();
  const missingSlugItems = [];

  getMarkdownPostFiles().forEach((file) => {
    const filepath = path.join(markdownDir, file);
    const content = fs.readFileSync(filepath, 'utf8');
    const parsed = parseFrontmatter(content);
    const attributes = parsed.attributes;

    if (attributes.draft === true || !attributes.date) {
      return;
    }

    if (attributes.slug) {
      usedSlugs.add(sanitizeSlug(attributes.slug));
      return;
    }

    const categories = normalizeList(attributes.categories);
    const tags = normalizeList(attributes.tags);
    missingSlugItems.push({
      id: String(missingSlugItems.length + 1),
      file,
      filepath,
      content,
      title: attributes.title || file.replace(/\.md$/, ''),
      categories,
      tags,
      excerpt: stripMarkdown(parsed.body).slice(0, 160)
    });
  });

  return { missingSlugItems, usedSlugs };
}

async function addMissingSlugs() {
  const { options } = parseOptions(args);
  const batchSize = Math.max(1, Number(options['batch-size'] || 20));
  const delayMs = Math.max(0, Number(options['delay-ms'] || 1500));
  const limit = options.limit ? Math.max(0, Number(options.limit)) : undefined;
  const { missingSlugItems, usedSlugs } = getPostSlugMigrationItems();
  const targetItems = limit === undefined ? missingSlugItems : missingSlugItems.slice(0, limit);

  if (!targetItems.length) {
    console.log('No markdown posts are missing slug.');
    return;
  }

  if (!aiSlugApiKey && !options['allow-local']) {
    throw new Error('BLOG_AI_SLUG_API_KEY is required for slug:missing. Use --allow-local to fall back to local slugify.');
  }

  console.log(`Found ${missingSlugItems.length} posts without slug. Processing ${targetItems.length}.`);

  for (let start = 0; start < targetItems.length; start += batchSize) {
    const batch = targetItems.slice(start, start + batchSize);
    let generatedSlugs = {};

    if (aiSlugApiKey) {
      generatedSlugs = await generateAiSlugBatch(batch);
    }

    batch.forEach((item) => {
      const rawSlug = generatedSlugs[item.id] || (options['allow-local'] ? slugify(item.title) : '');
      const slug = ensureUniqueSlug(rawSlug, usedSlugs);

      if (!slug) {
        throw new Error(`Failed to generate slug for ${item.file}`);
      }

      if (options['dry-run']) {
        console.log(`${item.file} -> ${slug}`);
        return;
      }

      fs.writeFileSync(item.filepath, insertSlugIntoFrontmatter(item.content, slug), 'utf8');
      console.log(`${item.file} -> ${slug}`);
    });

    if (start + batchSize < targetItems.length && delayMs > 0) {
      await sleep(delayMs);
    }
  }
}

function run(commandName, commandArgs, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(commandName, commandArgs, {
      cwd: rootDir,
      stdio: 'inherit',
      shell: process.platform === 'win32',
      ...options
    });

    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${commandName} ${commandArgs.join(' ')} exited with code ${code}`));
      }
    });
  });
}

async function generateMetadata() {
  await run(process.execPath, [metadataScript]);
}

async function generateStaticFiles() {
  await generateMetadata();
  await run('yarn', ['build-only']);
}

async function startServer() {
  const { options } = parseOptions(args);
  const viteArgs = [];

  if (options.host) {
    viteArgs.push('--host', options.host);
  }

  if (options.port) {
    viteArgs.push('--port', options.port);
  }

  await generateMetadata();
  await run('yarn', ['vite', ...viteArgs]);
}

async function main() {
  try {
    switch (normalizedCommand) {
      case 'new':
        await createPost();
        break;
      case 'slug':
        await printGeneratedSlug();
        break;
      case 'slug:missing':
        await addMissingSlugs();
        break;
      case 'english':
        await addEnglishCheckin();
        break;
      case 'generate':
        await generateStaticFiles();
        break;
      case 'server':
        await startServer();
        break;
      case 'help':
      case '--help':
      case '-h':
      case undefined:
        printHelp();
        break;
      default:
        throw new Error(`Unknown command: ${command}`);
    }
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

main();
