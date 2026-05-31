const htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

const htmlEntities = {
  '&nbsp;': ' ',
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&apos;': "'"
};

const escapeHtml = (value = '') => {
  return String(value).replace(/[&<>"']/g, char => htmlEscapes[char]);
};

const decodeHtmlEntities = (value = '') => {
  return String(value).replace(/&(nbsp|amp|lt|gt|quot|#39|apos);/g, entity => htmlEntities[entity] || entity);
};

const stripAnchorWrapper = (value = '') => {
  return String(value).replace(/<a\b[^>]*href=["']([^"']+)["'][^>]*>[\s\S]*?<\/a>/i, '$1');
};

const extractAttrs = (rawAttrs = '') => {
  const attrs = {};
  const attrRegex = /([A-Za-z][\w-]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|“([^”]*)”|‘([^’]*)’|([^\s]+))/g;
  let match;

  while ((match = attrRegex.exec(rawAttrs)) !== null) {
    const [, name, doubleQuoted, singleQuoted, smartDouble, smartSingle, bare] = match;
    attrs[name] = doubleQuoted ?? singleQuoted ?? smartDouble ?? smartSingle ?? bare ?? '';
  }

  return attrs;
};

const getRenderedAttr = (rawAttrs = '', name) => {
  const attrRegex = new RegExp(`${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|“([\\s\\S]*?)”|‘([\\s\\S]*?)’|([^\\s>]+))`, 'i');
  const match = rawAttrs.match(attrRegex);
  if (!match) return '';
  return match[1] ?? match[2] ?? match[3] ?? match[4] ?? match[5] ?? '';
};

const figureHtml = ({ src, title = '', alt = '' }) => {
  const cleanSrc = stripAnchorWrapper(decodeHtmlEntities(src)).trim();
  if (!cleanSrc) return '';

  const caption = decodeHtmlEntities(title).trim();
  const altText = decodeHtmlEntities(alt || caption).trim();
  const titleAttr = caption ? ` title="${escapeHtml(caption)}"` : '';

  return `<img class="legacy-figure" src="${escapeHtml(cleanSrc)}" alt="${escapeHtml(altText)}"${titleAttr} loading="lazy" decoding="async">`;
};

export const normalizeLegacyFigureShortcodes = (content = '') => {
  return String(content).replace(/\{\{<\s*figure\b([\s\S]*?)>\s*\}\}/g, (match, rawAttrs) => {
    const attrs = extractAttrs(rawAttrs);
    const html = figureHtml(attrs);
    return html || match;
  });
};

export const normalizeRenderedLegacyFigureShortcodes = (html = '') => {
  return String(html).replace(/<p>\s*\{\{&lt;\s*figure\b([\s\S]*?)&gt;\}\}\s*<\/p>/g, (match, rawAttrs) => {
    const renderedAttrs = {
      src: getRenderedAttr(rawAttrs, 'src'),
      title: getRenderedAttr(rawAttrs, 'title'),
      alt: getRenderedAttr(rawAttrs, 'alt')
    };
    const normalized = figureHtml(renderedAttrs);
    return normalized || match;
  });
};
