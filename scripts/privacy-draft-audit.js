#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { createHash, randomBytes } from 'crypto';
import { fileURLToPath } from 'url';
import { generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import frontMatter from 'front-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const markdownDir = path.join(rootDir, 'public/markdown');
const keyPath = path.join(rootDir, 'draft_encryption_key.txt');
const reportPath = path.join(rootDir, 'privacy-draft-audit-report.json');

const explicitlyDeleteSlugs = new Set(['tester']);
const explicitlyDraftSlugs = new Set([
  'mom-birthday-gift-happy-story',
  '2023-winter-vacation-summary',
  'goodbye-ranked-matches-lol',
  'acute-gastroenteritis-overeating-hospital-visit'
]);

function loadLocalEnv() {
  ['.env.local', '.env'].forEach((envFile) => {
    const envPath = path.join(rootDir, envFile);
    if (!fs.existsSync(envPath)) return;

    fs.readFileSync(envPath, 'utf8').split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;

      const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
      if (!match) return;
      const [, key, rawValue] = match;
      if (process.env[key] !== undefined) return;
      process.env[key] = rawValue.trim().replace(/^['"]|['"]$/g, '');
    });
  });
}

loadLocalEnv();

const aiApiBaseUrl = process.env.PRIVACY_AUDIT_API_BASE_URL || process.env.BLOG_AI_SLUG_API_BASE_URL || 'https://gcli.ggchan.dev/';
const aiModel = process.env.PRIVACY_AUDIT_MODEL || process.env.BLOG_AI_SLUG_MODEL || 'Gemini 3.1 Flash';
const aiApiKey = process.env.PRIVACY_AUDIT_API_KEY || process.env.BLOG_AI_SLUG_API_KEY || process.env.GEMINI_API_KEY || process.env.GCLI_API_KEY;
const aiProvider = (process.env.PRIVACY_AUDIT_PROVIDER || process.env.BLOG_AI_SLUG_PROVIDER || 'google').trim().toLowerCase();

function hashFilename(filename) {
  return createHash('md5').update(filename).digest('hex').slice(0, 8);
}

function getGeminiModelId(model) {
  const value = String(model || '').trim();
  if (!value) return 'gemini-3.1-flash';
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
  if (modelPathIndex >= 0) return normalizedBase.slice(0, modelPathIndex);
  if (normalizedBase.endsWith('/v1') || normalizedBase.endsWith('/v1beta')) return normalizedBase;
  return `${normalizedBase}/v1beta`;
}

function normalizeOpenAiCompatibleBaseUrl(baseUrl) {
  const normalizedBase = String(baseUrl || '').trim().replace(/\/+$/, '');
  if (/\/chat\/completions$/.test(normalizedBase)) {
    return normalizedBase.replace(/\/chat\/completions$/, '');
  }
  if (normalizedBase.endsWith('/v1') || normalizedBase.endsWith('/v1beta/openai')) return normalizedBase;
  return `${normalizedBase}/v1`;
}

function getLanguageModel() {
  if (!aiApiKey) {
    throw new Error('PRIVACY_AUDIT_API_KEY/BLOG_AI_SLUG_API_KEY/GEMINI_API_KEY/GCLI_API_KEY is not configured');
  }

  if (['google', 'gemini', 'google-gemini'].includes(aiProvider)) {
    const baseURL = normalizeGeminiBaseUrl(aiApiBaseUrl);
    const isOfficialGoogle = /(^|\.)googleapis\.com/i.test(new URL(baseURL).hostname);
    const google = createGoogleGenerativeAI({
      apiKey: aiApiKey,
      baseURL,
      headers: isOfficialGoogle ? undefined : { Authorization: `Bearer ${aiApiKey}` },
      name: isOfficialGoogle ? 'google.generative-ai' : 'google.generative-ai-compatible'
    });
    return google(getGeminiModelId(aiModel));
  }

  if (['openai-compatible', 'openai', 'custom'].includes(aiProvider)) {
    const provider = createOpenAICompatible({
      name: process.env.BLOG_AI_SLUG_PROVIDER_NAME || 'privacy-audit',
      apiKey: aiApiKey,
      baseURL: normalizeOpenAiCompatibleBaseUrl(aiApiBaseUrl)
    });
    return provider(aiModel);
  }

  throw new Error(`Unsupported BLOG_AI_SLUG_PROVIDER "${aiProvider}"`);
}

function listMarkdownPosts() {
  return fs.readdirSync(markdownDir)
    .filter((file) => path.extname(file) === '.md')
    .sort()
    .map((file) => {
      const fullPath = path.join(markdownDir, file);
      const content = fs.readFileSync(fullPath, 'utf8');
      const parsed = frontMatter(content);
      const slug = parsed.attributes.slug || hashFilename(file);
      return {
        file,
        fullPath,
        content,
        body: parsed.body,
        attributes: parsed.attributes,
        slug
      };
    });
}

function stripMarkdown(content) {
  return String(content || '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_\-|~]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function heuristicPrivacyReason(post) {
  const text = `${post.attributes.title || ''}\n${post.attributes.categories || ''}\n${stripMarkdown(post.body).slice(0, 4000)}`;
  const strongPatterns = [
    /妈妈|家人|父母|老同学|基友|生日|住院|医院|急性|肠胃炎|逃课|点名|胡吃海喝/,
    /总结|规划|熬过|难得一见|时间管理|身体|健康|寒假|开学|复习周/,
    /学校|学院|班级|宿舍|老师|同学|校园|成绩|答辩|实习|网易|租房/,
    /身份证|手机号|电话|邮箱|住址|地址|微信|QQ|车牌|银行卡|密码|token|secret|api[_-]?key/i
  ];

  if (strongPatterns.some((pattern) => pattern.test(text))) {
    return 'heuristic: personal diary, family/school/work/health, or direct identifier keywords';
  }
  return '';
}

function buildAuditItems(posts) {
  return posts
    .filter((post) => post.attributes.draft !== true && post.attributes.encrypted !== true)
    .filter((post) => !explicitlyDeleteSlugs.has(post.slug))
    .map((post) => ({
      slug: post.slug,
      file: post.file,
      title: post.attributes.title || path.basename(post.file, '.md'),
      date: post.attributes.date || '',
      categories: post.attributes.categories || post.attributes.tags || [],
      excerpt: stripMarkdown(post.body).slice(0, Number(process.env.PRIVACY_AUDIT_EXCERPT_CHARS || 800))
    }));
}

function extractJsonArray(text) {
  const trimmed = text.trim();
  if (trimmed.startsWith('[')) return JSON.parse(trimmed);
  const match = trimmed.match(/\[[\s\S]*\]/);
  if (!match) throw new Error(`Model did not return a JSON array: ${trimmed.slice(0, 500)}`);
  return JSON.parse(match[0]);
}

async function auditWithAi(items) {
  if (items.length === 0) return [];
  if (process.env.PRIVACY_AUDIT_DISABLE_AI === '1') {
    throw new Error('PRIVACY_AUDIT_DISABLE_AI=1');
  }

  const results = [];
  const batchSize = Number(process.env.PRIVACY_AUDIT_BATCH_SIZE || 4);
  const model = ['google', 'gemini', 'google-gemini'].includes(aiProvider)
    ? null
    : getLanguageModel();

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    console.log(`AI auditing ${i + 1}-${Math.min(i + batch.length, items.length)}/${items.length}`);
    const system = [
      'You are auditing a personal blog before it is pushed to a public GitHub repository.',
      'Mark draft=true when a post may expose private life details, family or friend details, health events, school/work details, locations, schedules, emotions tied to identifiable events, or direct identifiers.',
      'Be conservative: if it feels like a personal diary or could embarrass/expose the author or people around them, mark it draft.',
      'Return only JSON. No markdown.'
    ].join('\n');
    const prompt = [
      'For each item, return an object with slug, draft, riskLevel ("low"|"medium"|"high"), and reason in Chinese.',
      'Output a JSON array with exactly one object per input item.',
      '',
      JSON.stringify(batch, null, 2)
    ].join('\n');
    const text = ['google', 'gemini', 'google-gemini'].includes(aiProvider)
      ? await generateGeminiText({ system, prompt, temperature: 0, maxOutputTokens: 8192 })
      : (await generateText({
        model,
        temperature: 0,
        maxOutputTokens: 8192,
        system,
        prompt
      })).text;

    const parsed = extractJsonArray(text);
    results.push(...parsed);
    console.log(`AI audited ${Math.min(i + batch.length, items.length)}/${items.length}`);
  }

  return results;
}

async function generateGeminiText({ system, prompt, temperature = 0, maxOutputTokens = 4096 }) {
  const modelId = getGeminiModelId(aiModel);
  const normalizedBase = String(aiApiBaseUrl || '')
    .trim()
    .replace(/\/+$/, '')
    .replace(/:generateContent$/, '');
  const urlBase = normalizedBase.includes('[model]')
    ? normalizedBase.replace('[model]', encodeURIComponent(modelId))
    : `${normalizeGeminiBaseUrl(normalizedBase)}/models/${encodeURIComponent(modelId)}`;
  const url = `${urlBase}:generateContent`;
  let lastError;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${aiApiKey}`
        },
        body: JSON.stringify({
          systemInstruction: {
            role: 'system',
            parts: [{ text: system }]
          },
          contents: [{
            role: 'user',
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature,
            maxOutputTokens,
            responseMimeType: 'application/json',
            thinkingConfig: {
              thinkingBudget: 0
            }
          }
        })
      });
      const responseText = await response.text();
      if (!response.ok) {
        throw new Error(`Gemini API ${response.status}: ${responseText.slice(0, 500)}`);
      }
      const data = JSON.parse(responseText);
      const parts = data?.candidates?.[0]?.content?.parts || [];
      const text = parts.map((part) => part.text || '').join('').trim();
      if (!text) {
        throw new Error(`Gemini API returned no text: ${responseText.slice(0, 500)}`);
      }
      return text;
    } catch (error) {
      lastError = error;
      if (attempt < 2) {
        await new Promise((resolve) => setTimeout(resolve, 2000 * (attempt + 1)));
      }
    }
  }

  throw lastError;
}

function ensureKey() {
  if (fs.existsSync(keyPath)) return fs.readFileSync(keyPath, 'utf8').trim();
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

function encryptDraftPost(post, key) {
  if (post.attributes.encrypted === true) return false;

  const match = post.content.match(/^---(\r?\n)([\s\S]*?)(\r?\n)---(\r?\n)?/);
  if (!match) {
    throw new Error(`Missing frontmatter in ${post.file}`);
  }

  const newline = match[1];
  let frontmatterText = match[2];
  frontmatterText = upsertFrontmatterField(frontmatterText, 'draft', 'true');
  frontmatterText = upsertFrontmatterField(frontmatterText, 'encrypted', 'true');
  frontmatterText = upsertFrontmatterField(frontmatterText, 'encryptionAlgorithm', 'xor-base64');
  frontmatterText = upsertFrontmatterField(frontmatterText, 'encryptedAt', new Date().toISOString());

  const encrypted = xorEncryptToBase64(post.body, key);
  const encryptedBody = [
    '<!-- encrypted:draft-body:xor-base64 -->',
    encrypted,
    ''
  ].join(newline);

  fs.writeFileSync(
    post.fullPath,
    `---${newline}${frontmatterText}${newline}---${newline}${encryptedBody}`,
    'utf8'
  );
  return true;
}

function deletePost(post) {
  if (fs.existsSync(post.fullPath)) {
    fs.unlinkSync(post.fullPath);
    return true;
  }
  return false;
}

function main() {
  const apply = process.argv.includes('--apply');
  const allowHeuristicFallback = process.argv.includes('--allow-heuristic');
  const posts = listMarkdownPosts();
  const bySlug = new Map(posts.map((post) => [post.slug, post]));
  const deleted = [];

  if (apply) {
    explicitlyDeleteSlugs.forEach((slug) => {
      const post = bySlug.get(slug);
      if (post && deletePost(post)) deleted.push({ slug, file: post.file });
    });
  }

  const remainingPosts = posts.filter((post) => !explicitlyDeleteSlugs.has(post.slug));
  const auditItems = buildAuditItems(remainingPosts);

  return auditWithAi(auditItems).then((aiResults) => ({ aiResults, aiError: '' })).catch((error) => {
    const aiError = String(error?.message || error);
    if (!allowHeuristicFallback) {
      throw new Error(`AI audit failed and --allow-heuristic was not set: ${aiError}`);
    }
    console.warn(`AI audit failed, falling back to conservative heuristic rules because --allow-heuristic was set: ${aiError}`);
    return { aiResults: [], aiError };
  }).then(({ aiResults, aiError }) => {
    const aiBySlug = new Map(aiResults.map((item) => [item.slug, item]));
    const decisions = remainingPosts
      .filter((post) => post.attributes.draft !== true && post.attributes.encrypted !== true)
      .map((post) => {
        const ai = aiBySlug.get(post.slug);
        const heuristicReason = heuristicPrivacyReason(post);
        const explicit = explicitlyDraftSlugs.has(post.slug);
        const shouldUseHeuristic = Boolean(aiError);
        const shouldDraft = explicit || ai?.draft === true || (shouldUseHeuristic && Boolean(heuristicReason));
        return {
          slug: post.slug,
          file: post.file,
          title: post.attributes.title || path.basename(post.file, '.md'),
          draft: shouldDraft,
          source: explicit ? 'explicit' : (ai?.draft === true ? 'ai' : (shouldUseHeuristic && heuristicReason ? 'heuristic' : 'none')),
          riskLevel: explicit ? 'high' : (ai?.riskLevel || (shouldUseHeuristic && heuristicReason ? 'medium' : 'low')),
          reason: explicit ? 'user requested draft/encryption' : (ai?.reason || (shouldUseHeuristic ? heuristicReason : '') || '')
        };
      });

    const toEncrypt = decisions.filter((decision) => decision.draft);
    const encrypted = [];
    if (apply && toEncrypt.length > 0) {
      const key = ensureKey();
      toEncrypt.forEach((decision) => {
        const post = bySlug.get(decision.slug);
        if (post && encryptDraftPost(post, key)) {
          encrypted.push(decision);
        }
      });
    }

    const report = {
      generatedAt: new Date().toISOString(),
      model: aiModel,
      provider: aiProvider,
      aiError,
      applied: apply,
      deleted,
      encrypted,
      decisions
    };
    fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');

    console.log(JSON.stringify({
      applied: apply,
      deleted: deleted.length,
      encrypted: encrypted.length,
      draftDecisions: toEncrypt.length,
      report: path.relative(rootDir, reportPath)
    }, null, 2));
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
