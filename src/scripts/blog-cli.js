#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');
const markdownDir = path.join(rootDir, 'public/markdown');
const metadataScript = path.join(__dirname, 'generate-metadata.js');

const command = process.argv[2];
const args = process.argv.slice(3);

const aliases = {
  n: 'new',
  g: 'generate',
  s: 'server'
};

const normalizedCommand = aliases[command] || command;

const helpText = `
Bailey Blog CLI

Usage:
  yarn blog <command> [options]

Commands:
  new <title>             Create a new markdown post
  generate | g            Generate metadata and static files into dist
  server | s              Generate metadata and start the dev server
  help                    Show this help message

New post options:
  --slug <name>           Use a custom markdown filename
  --category <name>       Set category, defaults to 随笔杂记
  --tag <name>            Add a tag, can be used multiple times
  --date <value>          Set date, defaults to current local time
  --draft                 Mark the post as draft
  --force                 Overwrite an existing file

Server options:
  --host <host>           Forward host to Vite
  --port <port>           Forward port to Vite

Examples:
  yarn blog new "我的新文章"
  yarn blog new "Vue 学习笔记" --slug vue-notes --tag Vue --tag 前端
  yarn blog generate
  yarn blog server --port 5173
`;

function printHelp() {
  console.log(helpText.trim());
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

    if (['draft', 'force'].includes(key)) {
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

function renderList(values) {
  return values.map((value) => `- ${value}`).join('\n');
}

function createPost() {
  const { positionals, options } = parseOptions(args);
  const title = positionals.join(' ').trim();

  if (!title) {
    throw new Error('Please provide a post title. Example: yarn blog new "我的新文章"');
  }

  const filename = `${slugify(options.slug || title)}.md`;
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
categories:
${renderList(categories)}
${tagBlock}img:
${draftLine}---

# ${title}

`;

  fs.writeFileSync(filepath, content, 'utf8');
  console.log(`Created ${path.relative(rootDir, filepath)}`);
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
        createPost();
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
