const normalizeList = (value) => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

const normalizeText = (value = '') =>
  String(value)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

const stripDuplicateTitleHeading = (body = '', title = '') => {
  const lines = String(body).replace(/^\uFEFF/, '').split(/\r?\n/);
  const firstContentIndex = lines.findIndex((line) => line.trim());
  if (firstContentIndex < 0) return '';

  const firstLine = lines[firstContentIndex].trim();
  const match = firstLine.match(/^#\s+(.+)$/);
  if (!match) return lines.join('\n');

  return normalizeText(match[1]) === normalizeText(title)
    ? lines.slice(firstContentIndex + 1).join('\n').replace(/^\s+/, '')
    : lines.join('\n');
};

const formatDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toISOString().slice(0, 10);
};

export const getMarkdownPagePath = (postOrSlug) => {
  const slug = typeof postOrSlug === 'string'
    ? postOrSlug
    : (postOrSlug?.routeSlug || postOrSlug?.slug);
  return slug ? `/markdown/pages/${encodeURIComponent(slug)}.md` : '';
};

export const buildPostMarkdown = (post = {}, options = {}) => {
  const title = post.title || 'Untitled';
  const categories = normalizeList(post.categories);
  const tags = normalizeList(post.tags);
  const labels = categories.length ? categories : tags;
  const publishedAt = formatDate(post.date);
  const updatedAt = formatDate(post.updatedAt || post.updated);
  const body = stripDuplicateTitleHeading(post.body || '', title).trim();
  const metaParts = [];

  if (publishedAt) metaParts.push(`发布于：${publishedAt}`);
  if (updatedAt && updatedAt !== publishedAt) metaParts.push(`更新于：${updatedAt}`);
  if (labels.length) metaParts.push(`分类：${labels.join(', ')}`);
  if (options.sourceUrl) metaParts.push(`原文：${options.sourceUrl}`);

  const lines = [`# ${title}`, ''];
  if (metaParts.length) {
    lines.push(`> ${metaParts.join(' | ')}`, '');
  }
  if (body) {
    lines.push(body);
  }

  return `${lines.join('\n').trimEnd()}\n`;
};
