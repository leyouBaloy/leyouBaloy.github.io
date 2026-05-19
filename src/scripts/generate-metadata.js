import fs from 'fs';
import path from 'path';
import frontMatter from 'front-matter';
import { createHash } from 'crypto';
import { fileURLToPath } from 'url';
import MarkdownIt from 'markdown-it';
import texmath from 'markdown-it-texmath';
import katex from 'katex';

// 获取当前文件的目录名
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const markdownDir = path.join(__dirname, '../../public/markdown');
const outputDir = path.join(__dirname, '../../public/markdown/metadata');
const postsOutputDir = path.join(__dirname, '../../public/markdown/posts');

// 确保路径格式正确
const normalizedMarkdownDir = path.normalize(markdownDir);
const normalizedOutputDir = path.normalize(outputDir);
const normalizedPostsOutputDir = path.normalize(postsOutputDir);

// 创建输出目录（如果不存在）
if (!fs.existsSync(normalizedOutputDir)) {
  fs.mkdirSync(normalizedOutputDir, { recursive: true });
}

if (!fs.existsSync(normalizedPostsOutputDir)) {
  fs.mkdirSync(normalizedPostsOutputDir, { recursive: true });
}

// 对文件名做 md5 hash，取前 8 位
const hashFilename = (filename) => {
  return createHash('md5').update(filename).digest('hex').slice(0, 8);
};

// 从标题生成 slug（用于手动指定 slug 时校验格式）
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s\u4e00-\u9fa5-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const metadataList = [];
const postPayloads = [];
const slugMapping = {}; // slug -> filename
const siteUrl = 'https://leyoubaloy.github.io';
const staticPageLastmod = '2026-05-08T00:00:00.000Z';

const normalizeList = (value) => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

const stripMarkdown = (content) => {
  return content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_\-|~]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const escapeXml = (value = '') => {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

const countWords = (content) => {
  const chineseChars = content.match(/[\u4e00-\u9fa5]/g) || [];
  const latinWords = content
    .replace(/[\u4e00-\u9fa5]/g, ' ')
    .match(/[A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*/g) || [];
  return chineseChars.length + latinWords.length;
};

const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s\u4e00-\u9fa5-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const extractHeadings = (markdown) => {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings = [];
  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    headings.push({ level, text, id: slugify(text) });
  }
  return headings;
};

const hasMathContent = (content) => {
  return /(^|[^\\])\$\$[\s\S]+?\$\$/.test(content)
    || /(^|[^\\])\$[^\s$][\s\S]*?[^\s\\]\$/.test(content)
    || /\\\([\s\S]+?\\\)/.test(content)
    || /\\\[[\s\S]+?\\\]/.test(content);
};

const createMarkdownRenderer = (content) => {
  const md = new MarkdownIt({
    html: true,
    xhtmlOut: false,
    breaks: false,
    linkify: true,
    typographer: true,
    highlight: (str, lang) => {
      const escaped = md.utils.escapeHtml(str);
      const language = lang || 'text';
      return `<pre><code class="language-${language}">${escaped}</code></pre>`;
    }
  });

  const defaultHeadingOpen = md.renderer.rules.heading_open || ((tokens, idx, options, env, self) => {
    return self.renderToken(tokens, idx, options);
  });
  md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
    const nextToken = tokens[idx + 1];
    const text = nextToken?.type === 'inline' ? nextToken.content : '';
    if (text) {
      tokens[idx].attrSet('id', slugify(text));
    }
    return defaultHeadingOpen(tokens, idx, options, env, self);
  };

  const defaultImage = md.renderer.rules.image || ((tokens, idx, options, env, self) => {
    return self.renderToken(tokens, idx, options);
  });
  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    tokens[idx].attrSet('loading', 'lazy');
    tokens[idx].attrSet('decoding', 'async');
    return defaultImage(tokens, idx, options, env, self);
  };

  if (hasMathContent(content)) {
    md.use(texmath, {
      engine: katex,
      delimiters: ['dollars', 'brackets'],
      katexOptions: {
        throwOnError: false,
        errorColor: '#cc0000'
      }
    });
  }

  return md;
};

fs.readdirSync(normalizedMarkdownDir).forEach(file => {
  if (path.extname(file) === '.md') {
    const content = fs.readFileSync(path.join(normalizedMarkdownDir, file), 'utf8');
    const metadata = frontMatter(content);

    // 检查 draft 属性是否为 true
    if (metadata.attributes.draft === true) {
      console.log(`Skipping draft file: ${file}`);
      return; // 跳过此文件
    }

    // 跳过没有日期的文件
    if (!metadata.attributes.date) {
      console.log(`Skipping file without date: ${file}`);
      return;
    }

    const bodyContent = metadata.body;
    const plainText = stripMarkdown(bodyContent);
    const wordCount = countWords(plainText);
    const readingTime = Math.max(1, Math.ceil(wordCount / 400));
    const headings = extractHeadings(bodyContent);
    const hasMath = hasMathContent(bodyContent);
    const html = createMarkdownRenderer(bodyContent).render(bodyContent);

    // 获取 tags 和 img 字段，优先级依次为 categories/tags 和 featuredImagePreview/img
    const tags = normalizeList(metadata.attributes.categories || metadata.attributes.tags);
    const img = metadata.attributes.featuredImagePreview || metadata.attributes.img || '';

    // 获取 slug：优先使用 frontmatter 中的 slug，否则用文件名 hash
    const slug = metadata.attributes.slug || hashFilename(file);

    metadataList.push({
      title: metadata.attributes.title,
      date: metadata.attributes.date,
      updatedAt: metadata.attributes.updatedAt || metadata.attributes.updated || metadata.attributes.date,
      file: file,
      slug: slug,
      excerpt: plainText.slice(0, 150),
      tags: tags, // 优先 categories，其次 tags，否则为空数组
      img: img, // 优先 featuredImagePreview，其次 img，否则为空字符串
      wordCount,
      readingTime,
      searchContent: plainText
    });

    postPayloads.push({
      title: metadata.attributes.title,
      date: metadata.attributes.date,
      updatedAt: metadata.attributes.updatedAt || metadata.attributes.updated || metadata.attributes.date,
      file,
      slug,
      categories: normalizeList(metadata.attributes.categories),
      tags,
      img,
      wordCount,
      readingTime,
      body: bodyContent,
      html,
      headings,
      hasMath
    });

    // 建立 slug -> filename 映射
    if (slugMapping[slug]) {
      console.warn(`Duplicate slug "${slug}" for file ${file} (already used by ${slugMapping[slug]})`);
    }
    slugMapping[slug] = file;
  }
});

// 按照时间倒序排列
metadataList.sort((a, b) => new Date(b.date) - new Date(a.date));
postPayloads.forEach(post => {
  const outputFile = path.join(normalizedPostsOutputDir, `${post.slug}.json`);
  fs.writeFileSync(outputFile, JSON.stringify(post, null, 2));
});
console.log('Post payload JSON files generated successfully!');

const latestPostDate = metadataList.reduce((latest, post) => {
  const updatedAt = new Date(post.updatedAt || post.date).getTime();
  return updatedAt > latest ? updatedAt : latest;
}, 0);
const feedLastBuildDate = new Date(latestPostDate || staticPageLastmod);

// 每10个元数据一个文件
const chunkSize = 10;
const totalPages = Math.ceil(metadataList.length / chunkSize);

for (let i = 0; i < metadataList.length; i += chunkSize) {
  const chunk = metadataList.slice(i, i + chunkSize);
  if (chunk.length > 0) {
    chunk[0].totalPages = totalPages; // 在第一个对象中添加总页数字段，用于显示主页下方的页码
  }
  const outputFile = path.join(normalizedOutputDir, `metadata_${Math.floor(i / chunkSize) + 1}.json`);
  fs.writeFileSync(outputFile, JSON.stringify(chunk, null, 2));
  console.log(`Metadata chunk ${Math.floor(i / chunkSize) + 1} generated successfully!`);
}

// 仅保留列表和归档需要的字段
const simplifiedMetadataList = metadataList.map(post => ({
  title: post.title,
  date: post.date,
  updatedAt: post.updatedAt,
  file: post.file,
  slug: post.slug,
  excerpt: post.excerpt,
  tags: post.tags,
  img: post.img,
  wordCount: post.wordCount,
  readingTime: post.readingTime
}));

const getRelatedPosts = (currentPost) => {
  const currentTags = new Set(currentPost.tags || []);
  if (currentTags.size === 0) return [];

  return simplifiedMetadataList
    .filter(post => post.slug !== currentPost.slug)
    .map(post => {
      const sameTagCount = (post.tags || []).filter(tag => currentTags.has(tag)).length;
      return { ...post, sameTagCount };
    })
    .filter(post => post.sameTagCount > 0)
    .sort((a, b) => {
      if (b.sameTagCount !== a.sameTagCount) return b.sameTagCount - a.sameTagCount;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, 3)
    .map(({ sameTagCount, file, excerpt, img, wordCount, tags, ...post }) => ({
      ...post,
      tags,
      readingTime: post.readingTime
    }));
};

const relatedBySlug = simplifiedMetadataList.reduce((acc, post) => {
  const related = getRelatedPosts(post);
  if (related.length > 0) {
    acc[post.slug] = related;
  }
  return acc;
}, {});

// 按年份分类
const postsByYear = simplifiedMetadataList.reduce((acc, post) => {
  const year = new Date(post.date).getFullYear();
  if (!acc[year]) {
    acc[year] = [];
  }
  acc[year].push(post);
  return acc;
}, {});

// 按标签分类
const postsByTag = metadataList.reduce((acc, post) => {
  post.tags.forEach(tag => {
    if (!acc[tag]) {
      acc[tag] = [];
    }
    acc[tag].push({
      title: post.title,
      date: post.date,
      updatedAt: post.updatedAt,
      file: post.file,
      slug: post.slug,
      excerpt: post.excerpt,
      tags: post.tags,
      img: post.img,
      wordCount: post.wordCount,
      readingTime: post.readingTime
    });
  });
  return acc;
}, {});

const searchIndex = metadataList.map(post => ({
  title: post.title,
  date: post.date,
  updatedAt: post.updatedAt,
  file: post.file,
  slug: post.slug,
  excerpt: post.excerpt,
  tags: post.tags,
  img: post.img,
  wordCount: post.wordCount,
  readingTime: post.readingTime,
  searchContent: post.searchContent
}));

const rssItems = metadataList.slice(0, 50).map(post => {
  const postUrl = `${siteUrl}/post/${post.slug}`;
  return `  <item>
    <title>${escapeXml(post.title)}</title>
    <link>${escapeXml(postUrl)}</link>
    <guid>${escapeXml(postUrl)}</guid>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <description>${escapeXml(post.excerpt)}</description>
  </item>`;
}).join('\n');

const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>Bailey's Blog</title>
  <link>${siteUrl}</link>
  <description>读万卷书，行万里路</description>
  <language>zh-CN</language>
  <lastBuildDate>${feedLastBuildDate.toUTCString()}</lastBuildDate>
${rssItems}
</channel>
</rss>
`;

const staticPages = ['', '/archive', '/media', '/about', '/resume'];
const sitemapUrls = [
  ...staticPages.map(page => ({
    loc: `${siteUrl}${page}`,
    lastmod: staticPageLastmod
  })),
  ...metadataList.map(post => ({
    loc: `${siteUrl}/post/${post.slug}`,
    lastmod: new Date(post.updatedAt || post.date).toISOString()
  }))
].map(item => `  <url>
    <loc>${escapeXml(item.loc)}</loc>
    <lastmod>${item.lastmod}</lastmod>
  </url>`).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls}
</urlset>
`;

// 输出按年份分类的 JSON 文件
fs.writeFileSync(path.join(normalizedOutputDir, 'posts_by_year.json'), JSON.stringify(postsByYear, null, 2));
console.log('Posts by year JSON file generated successfully!');

// 输出按标签分类的 JSON 文件
fs.writeFileSync(path.join(normalizedOutputDir, 'posts_by_tag.json'), JSON.stringify(postsByTag, null, 2));
console.log('Posts by tag JSON file generated successfully!');

// 输出 slug -> filename 映射文件
fs.writeFileSync(path.join(normalizedOutputDir, 'slug_mapping.json'), JSON.stringify(slugMapping, null, 2));
console.log('Slug mapping JSON file generated successfully!');

fs.writeFileSync(path.join(normalizedOutputDir, 'related_by_slug.json'), JSON.stringify(relatedBySlug, null, 2));
console.log('Related posts JSON file generated successfully!');

fs.writeFileSync(path.join(normalizedOutputDir, 'search_index.json'), JSON.stringify(searchIndex, null, 2));
console.log('Search index JSON file generated successfully!');

fs.writeFileSync(path.join(__dirname, '../../public/rss.xml'), rssFeed);
console.log('RSS feed generated successfully!');

fs.writeFileSync(path.join(__dirname, '../../public/sitemap.xml'), sitemap);
console.log('Sitemap generated successfully!');
