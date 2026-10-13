import crypto from 'node:crypto';

export const REPO_OWNER = 'leyouBaloy';
export const REPO_NAME = 'leyouBaloy.github.io';
export const REPO_ID = 'R_kgDOGv-zPA';
export const CATEGORY_ID = 'DIC_kwDOGv-zPM4ChJ8X';
export const GROK_MARKER = '<!-- grok-bot -->';
export const TOKEN_COOKIE = 'cc_gh_token';

export async function gql(query, variables, token = process.env.GITHUB_TOKEN) {
  if (!token) throw Object.assign(new Error('Missing GitHub token'), { status: 500 });
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `bearer ${token}`, 'Content-Type': 'application/json', 'User-Agent': 'blog-comments' },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.errors) {
    const err = new Error(json.errors?.[0]?.message || `GitHub API ${res.status}`);
    err.status = res.status === 401 ? 401 : 502;
    throw err;
  }
  return json.data;
}

export const sha1 = (s) => crypto.createHash('sha1').update(s).digest('hex');

export function parseCookies(req) {
  const out = {};
  for (const part of (req.headers.cookie || '').split(';')) {
    const i = part.indexOf('=');
    if (i > 0) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}

export function cookie(name, value, maxAge) {
  return `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
}

export function normalizeTerm(term) {
  const t = String(term || '').trim().replace(/^\/+|\/+$/g, '');
  if (!t || t.length > 300 || !/^[\w\-./%]+$/.test(t)) return null;
  return t;
}

const AUTHOR = 'author { login avatarUrl url }';
const COMMENT_FIELDS = `id body createdAt url isMinimized ${AUTHOR} authorAssociation
  reactions { totalCount } upvoteCount`;

export const FIND_DISCUSSION = `query($q: String!) {
  search(type: DISCUSSION, query: $q, first: 5) {
    nodes { ... on Discussion {
      id number title url
      comments(first: 100) { totalCount nodes { ${COMMENT_FIELDS}
        replies(first: 100) { totalCount nodes { ${COMMENT_FIELDS} } } } }
    } }
  }
}`;

export function shapeComment(c) {
  const isGrok = (c.body || '').trimStart().startsWith(GROK_MARKER);
  const body = isGrok ? c.body.trimStart().slice(GROK_MARKER.length).replace(/^\s*\n/, '') : c.body;
  return {
    id: c.id,
    body,
    createdAt: c.createdAt,
    url: c.url,
    isMinimized: c.isMinimized,
    isGrokBot: isGrok,
    author: isGrok
      ? { login: 'grok-bot', name: 'Grok Bot', avatarUrl: '/images/grok-bot.svg', url: null, isBot: true }
      : { login: c.author?.login || 'ghost', name: c.author?.login || 'ghost', avatarUrl: c.author?.avatarUrl, url: c.author?.url, isBot: false },
    reactions: c.reactions?.totalCount || 0,
    replies: (c.replies?.nodes || []).map(shapeComment),
  };
}

export async function findDiscussion(term, token) {
  const q = `repo:${REPO_OWNER}/${REPO_NAME} in:title "${term.replace(/"/g, '')}"`;
  const data = await gql(FIND_DISCUSSION, { q }, token);
  return (data.search.nodes || []).find((d) => d && d.title === term) || null;
}

export async function viewerFromToken(token) {
  const data = await gql('query { viewer { login avatarUrl url } }', {}, token);
  return data.viewer;
}
