<!-- MarkdownRenderer.vue -->
<template>
  <div class="article" ref="articleRef">
    <template v-if="isLoading && !hasArticleContent">
      <div class="article-skeleton" aria-live="polite" aria-label="文章正在加载">
        <div class="skeleton-line skeleton-title"></div>
        <div class="skeleton-line skeleton-meta"></div>
        <div class="skeleton-actions">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="skeleton-line skeleton-body wide"></div>
        <div class="skeleton-line skeleton-body"></div>
        <div class="skeleton-line skeleton-body medium"></div>
        <p class="loading-copy">文章内容加载中...</p>
      </div>
    </template>

    <template v-else>
    <h1 class="title">{{ metaData.title }}</h1>
    <div v-if="metaData.title" class="metadata">
      <n-icon size="13">
        <CalendarOutline />
      </n-icon>
      发布于：{{ metaData.date }}
      <n-icon size="13" style="margin-left: 10px;">
        <ArchiveOutline />
      </n-icon>
      分类：{{ metaData.categories }}
      <span v-if="metaData.wordCount" class="meta-split">约 {{ metaData.wordCount }} 字</span>
      <span v-if="metaData.readingTime" class="meta-split">{{ metaData.readingTime }} 分钟阅读</span>
      <span v-if="metaData.updatedAt" class="meta-split">更新于：{{ metaData.updatedAt }}</span>
    </div>
    <div v-if="isOutdated" class="article-notice">
      这篇文章发布已经超过两年，部分工具、版本或观点可能已经变化，请结合最新信息判断。
    </div>
    <div class="share-bar">
      <button class="share-btn" @click="copyArticleLink">{{ copyText }}</button>
      <button class="share-btn" @click="shareTo('weibo')">微博</button>
      <button class="share-btn" @click="shareTo('x')">X</button>
      <button class="share-btn" @click="nativeShare">系统分享</button>
    </div>
    <div class="md" ref="mdRef">
      <component v-if="renderedContent" :is="renderedContent" />
      <div v-else-if="renderedHtml" v-html="renderedHtml"></div>
      <div v-else-if="loadError" class="article-error" role="alert">
        <strong>文章加载失败</strong>
        <span>请稍后刷新页面，或检查当前网络连接。</span>
        <button type="button" class="retry-btn" @click="loadMarkdown">重新加载</button>
      </div>
    </div>
    </template>
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent, ref, onMounted, onServerPrefetch, h, Fragment, nextTick } from 'vue';
import { NIcon } from 'naive-ui';
import { CalendarOutline, ArchiveOutline } from '@vicons/ionicons5';
import { markRaw } from 'vue';
import { getPostPayload } from '@/utils/postData';

const CodeBlock = defineAsyncComponent(() => import('./CodeBlock.vue'));

const props = defineProps({
  slug: {
    type: String
  }
});

const emit = defineEmits(['headings-ready', 'metadata-ready']);

const metaData = ref({});
const renderedContent = ref();
const renderedHtml = ref('');
const articleRef = ref(null);
const mdRef = ref(null);
const copyText = ref('复制链接');
const isLoading = ref(false);
const loadError = ref(null);

const hasArticleContent = computed(() => Boolean(renderedContent.value || renderedHtml.value));

const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('zh-CN');
};

const isOutdated = computed(() => {
  if (!metaData.value.date) return false;
  const published = new Date(metaData.value.date).getTime();
  if (Number.isNaN(published)) return false;
  const twoYears = 1000 * 60 * 60 * 24 * 365 * 2;
  return Date.now() - published > twoYears;
});

// 生成 heading slug ID
const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s\u4e00-\u9fa5-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// 从 markdown body 中提取 headings（用于生成目录）
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

const createMarkdownRenderer = async (content) => {
  const { default: MarkdownIt } = await import('markdown-it');
  const md = new MarkdownIt({
    html: true,
    xhtmlOut: false,
    breaks: false,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
      // 只需要设置语言类名，实际高亮由 CodeBlock 组件处理
      const escaped = md.utils.escapeHtml(str);
      if (lang) {
        return '<pre><code class="language-' + lang + '">' + escaped + '</code></pre>';
      }
      return '<pre><code class="language-text">' + escaped + '</code></pre>';
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

  if (hasMathContent(content)) {
    const [{ default: texmath }, katex] = await Promise.all([
      import('markdown-it-texmath'),
      import('katex'),
      import('katex/dist/katex.min.css')
    ]);

    md.use(texmath, {
      engine: katex.default || katex,
      delimiters: ['dollars', 'brackets'], // 支持 $ 和 \( \) 语法
      katexOptions: {
        throwOnError: false,
        errorColor: '#cc0000'
      }
    });
  }

  return md;
};

const renderPostHtml = async (post, body) => {
  if (post.html) {
    if (post.hasMath) {
      await import('katex/dist/katex.min.css');
    }
    return post.html;
  }

  const md = await createMarkdownRenderer(body);
  return md.render(body);
};

const getArticleUrl = () => {
  if (typeof window === 'undefined') return '';
  return window.location.href;
};

const copyArticleLink = async () => {
  const url = getArticleUrl();
  if (!url) return;
  try {
    await navigator.clipboard.writeText(url);
  } catch (error) {
    const textArea = document.createElement('textarea');
    textArea.value = url;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
  copyText.value = '已复制';
  window.setTimeout(() => {
    copyText.value = '复制链接';
  }, 1800);
};

const nativeShare = async () => {
  const url = getArticleUrl();
  if (!url) return;
  if (navigator.share) {
    await navigator.share({
      title: metaData.value.title || document.title,
      text: metaData.value.title || 'Bailey Blog',
      url
    });
    return;
  }
  await copyArticleLink();
};

const shareTo = (platform) => {
  const url = encodeURIComponent(getArticleUrl());
  const title = encodeURIComponent(metaData.value.title || 'Bailey Blog');
  const shareUrls = {
    weibo: `https://service.weibo.com/share/share.php?url=${url}&title=${title}`,
    x: `https://twitter.com/intent/tweet?url=${url}&text=${title}`
  };
  window.open(shareUrls[platform], '_blank', 'noopener,noreferrer,width=720,height=520');
};

// 检查节点是否在表格内
const isInsideTable = (node) => {
  let parent = node.parentElement;
  while (parent) {
    if (parent.tagName && parent.tagName.toLowerCase() === 'table') {
      return true;
    }
    parent = parent.parentElement;
  }
  return false;
};

const renderVNode = (nodes) => {
  const nodeArray = Array.from(nodes).map((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const tagName = node.tagName.toLowerCase();
      const children = renderVNode(node.childNodes);

      // 处理代码块
      if (tagName === 'pre') {
        const codeElement = node.querySelector('code');
        if (codeElement) {
          const codeText = codeElement.textContent || codeElement.innerText;
          const classList = codeElement.className || '';
          const languageMatch = classList.match(/language-(\w+)/);
          const language = languageMatch ? languageMatch[1] : 'text';

          return h(CodeBlock, {
            code: codeText.trim(),
            language: language
          });
        }
      }

      // 处理行内代码
      if (tagName === 'code' && (!node.parentElement || node.parentElement.tagName.toLowerCase() !== 'pre')) {
        const codeText = node.textContent || node.innerText;
        return h('code', codeText);
      }

      if (tagName === 'img') {
        const isInTable = isInsideTable(node);

        return h('img', {
          style: {
            maxWidth: isInTable ? '120px' : '100%',
            maxHeight: isInTable ? '80px' : 'auto',
            width: isInTable ? 'auto' : (node.getAttribute('width') || '100%'),
            height: 'auto',
            borderRadius: '8px',
            display: 'block',
            margin: isInTable ? '4px auto' : '1rem auto',
            boxShadow: '0 1px 3px rgba(0,0,0,.2), 0 1px 2px rgba(0,0,0,.14), 0 2px 5px rgba(0,0,0,.12)',
            objectFit: 'cover',
            cursor: 'pointer'
          },
          src: node.getAttribute('src'),
          alt: node.getAttribute('alt'),
          loading: 'lazy',
          decoding: 'async'
        });
      }

      if (tagName === 'table') {
        const attrs = {
          style: {
            width: '100%',
            borderCollapse: 'collapse',
            tableLayout: 'fixed', // 固定表格布局，便于控制列宽
            margin: '1rem 0',
            fontSize: '14px'
          }
        };
        
        // 保留原有属性
        for (let i = 0; i < node.attributes.length; i++) {
          const attr = node.attributes[i];
          if (attr.name === 'style') {
            // 合并样式
            attrs.style = { ...attrs.style, ...parseStyleString(attr.value) };
          } else {
            attrs[attr.name] = attr.value;
          }
        }
        
        return h('div', {
          class: 'table-wrapper',
          style: {
            width: '100%',
            overflowX: 'auto',
            margin: '1rem 0',
            border: '1px solid #e0e0e0',
            borderRadius: '8px'
          }
        }, [
          h(tagName, attrs, children)
        ]);
      }

      // 处理表格单元格
      if (tagName === 'td' || tagName === 'th') {
        const attrs = {
          style: {
            padding: '12px 8px',
            border: '1px solid #e0e0e0',
            wordWrap: 'break-word',
            wordBreak: 'break-all',
            whiteSpace: 'normal',
            maxWidth: '200px', // 限制最大宽度
            verticalAlign: 'top',
            lineHeight: '1.4'
          }
        };

        // 如果是表头，添加特殊样式
        if (tagName === 'th') {
          attrs.style.backgroundColor = '#f5f5f5';
          attrs.style.fontWeight = 'bold';
          attrs.style.textAlign = 'center';
        }

        // 保留原有属性
        for (let i = 0; i < node.attributes.length; i++) {
          const attr = node.attributes[i];
          if (attr.name === 'style') {
            attrs.style = { ...attrs.style, ...parseStyleString(attr.value) };
          } else {
            attrs[attr.name] = attr.value;
          }
        }

        return h(tagName, attrs, children);
      }

      // 处理其他元素
      const attrs = {};
      for (let i = 0; i < node.attributes.length; i++) {
        const attr = node.attributes[i];
        if (attr.name === 'style') {
          attrs.style = attr.value;
        } else if (attr.name === 'class') {
          attrs.class = attr.value;
        } else {
          attrs[attr.name] = attr.value;
        }
      }

      return h(tagName, attrs, children);
    }
  }).filter(Boolean);

  return h(Fragment, {}, nodeArray);
};

// 解析样式字符串为对象
const parseStyleString = (styleString) => {
  const styles = {};
  if (styleString) {
    styleString.split(';').forEach(rule => {
      const [property, value] = rule.split(':').map(s => s.trim());
      if (property && value) {
        // 转换 CSS 属性名为 camelCase
        const camelProperty = property.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
        styles[camelProperty] = value;
      }
    });
  }
  return styles;
};

const loadMarkdown = async (options = {}) => {
  const { showPending = true } = options;
  if (!props.slug) return;
  if (showPending && !hasArticleContent.value) {
    isLoading.value = true;
  }
  loadError.value = null;
  try {
    const post = await getPostPayload(props.slug);
    const body = post.body || '';
    const categories = Array.isArray(post.categories)
      ? post.categories
      : (post.categories ? [post.categories] : []);
    const tags = Array.isArray(post.tags)
      ? post.tags
      : (post.tags ? [post.tags] : []);
    const displayTags = categories.length ? categories : tags;
    const attributes = {
      ...post,
      date: formatDate(post.date),
      updatedAt: formatDate(post.updatedAt || post.updated || post.date),
      categories: displayTags.length ? displayTags.join(', ') : '未分类',
      tags: displayTags
    };
    metaData.value = attributes;

    const headings = Array.isArray(post.headings) ? post.headings : extractHeadings(body);
    const html = await renderPostHtml(post, body);
    renderedHtml.value = html;

    emit('headings-ready', headings.map(h => ({
      ...h,
      id: slugify(h.text)
    })));
    emit('metadata-ready', metaData.value);

    if (typeof document === 'undefined') {
      return;
    }

    const div = document.createElement('div');
    div.innerHTML = html;
    renderedContent.value = markRaw(renderVNode(div.childNodes));

    // 等渲染完成后，注入 heading IDs
    await nextTick();
    const mdEl = mdRef.value;
    if (mdEl) {
      const headingEls = mdEl.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headingEls.forEach((el) => {
        const text = el.textContent.trim();
        const id = slugify(text);
        el.id = id;
      });

    }
  } catch (error) {
    loadError.value = error;
    metaData.value = {};
    renderedContent.value = null;
    renderedHtml.value = '';
    console.error('Error loading markdown file:', error);
  } finally {
    isLoading.value = false;
  }
};

onServerPrefetch(() => loadMarkdown({ showPending: false }));
onMounted(loadMarkdown);
</script>

<style scoped>
.article {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.metadata {
  font-size: .875rem;
  color: #73828c;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6px;
  text-align: center;
  margin-bottom: 12px;
}

.meta-split::before {
  content: '·';
  margin-right: 6px;
  color: #b6c2cc;
}

.article-notice {
  width: 100%;
  margin: 0 0 14px;
  padding: 10px 14px;
  border-left: 4px solid #f59e0b;
  border-radius: 8px;
  background: #fffbeb;
  color: #92400e;
  font-size: 14px;
  line-height: 1.6;
  box-sizing: border-box;
}

.share-bar {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 18px;
}

.share-btn {
  border: 1px solid #bae6fd;
  background: #f0f9ff;
  color: #0369a1;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.share-btn:hover {
  border-color: #0ea5e9;
  color: #0c4a6e;
  transform: translateY(-1px);
}

:global([data-theme="dark"] .article-notice) {
  background: #422006;
  color: #fde68a;
  border-left-color: #f59e0b;
}

:global([data-theme="dark"] .share-btn) {
  background: #1f2937;
  border-color: #374151;
  color: #bae6fd;
}

:global([data-theme="dark"] .share-btn:hover) {
  border-color: #38bdf8;
  color: #e0f2fe;
}

.md {
  width: 100%;
  box-sizing: border-box;
}

.article-skeleton {
  width: 100%;
  padding-top: 76px;
  text-align: center;
}

.skeleton-line,
.skeleton-actions span {
  display: block;
  border-radius: 8px;
  background: linear-gradient(90deg, #edf2f7 25%, #f8fafc 37%, #edf2f7 63%);
  background-size: 400% 100%;
  animation: skeleton-loading 1.4s ease infinite;
}

.skeleton-title {
  width: min(56%, 340px);
  height: 36px;
  margin: 0 auto 18px;
}

.skeleton-meta {
  width: min(72%, 460px);
  height: 18px;
  margin: 0 auto 24px;
}

.skeleton-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 48px;
}

.skeleton-actions span {
  width: 76px;
  height: 34px;
}

.skeleton-body {
  width: 92%;
  height: 18px;
  margin: 0 auto 14px;
}

.skeleton-body.wide {
  width: 100%;
}

.skeleton-body.medium {
  width: 64%;
}

.loading-copy {
  margin-top: 18px;
  color: #73828c;
  font-size: 14px;
}

.article-error {
  width: 100%;
  margin: 80px auto 40px;
  padding: 18px;
  border: 1px solid #fecaca;
  border-radius: 8px;
  background: #fff7f7;
  color: #991b1b;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.article-error span {
  color: #7f1d1d;
  font-size: 14px;
}

.retry-btn {
  margin-top: 4px;
  border: 1px solid #fca5a5;
  background: #fff;
  color: #991b1b;
  border-radius: 6px;
  padding: 6px 12px;
  cursor: pointer;
}

.retry-btn:hover {
  border-color: #ef4444;
}

@keyframes skeleton-loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}

:global([data-theme="dark"] .skeleton-line),
:global([data-theme="dark"] .skeleton-actions span) {
  background: linear-gradient(90deg, #1f2937 25%, #374151 37%, #1f2937 63%);
  background-size: 400% 100%;
}

:global([data-theme="dark"] .loading-copy) {
  color: #9ca3af;
}

:global([data-theme="dark"] .article-error) {
  background: #3f1d1d;
  border-color: #7f1d1d;
  color: #fecaca;
}

:global([data-theme="dark"] .article-error span) {
  color: #fecaca;
}

:global([data-theme="dark"] .retry-btn) {
  background: #1f2937;
  border-color: #7f1d1d;
  color: #fecaca;
}

/* 确保所有内容不超出容器 */
.md :deep(*) {
  max-width: 100%;
  box-sizing: border-box;
}

/* 表格容器样式 */
.md :deep(.table-wrapper) {
  width: 100%;
  overflow-x: auto;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

/* 表格样式 */
.md :deep(table) {
  width: 100%;
  min-width: 600px;
  border-collapse: collapse;
  margin: 0;
  background: white;
}

.md :deep(th), 
.md :deep(td) {
  border: 1px solid #ddd;
  padding: 12px 8px;
  text-align: left;
  white-space: nowrap;
  vertical-align: top; /* 添加垂直对齐 */
}

.md :deep(th) {
  background-color: #f5f5f5;
  font-weight: bold;
  position: sticky;
  top: 0;
}

/* 约束表格中的图片大小 */
.md :deep(table img) {
  max-width: 150px !important;  /* 设置表格内图片最大宽度 */
  max-height: 100px !important; /* 设置表格内图片最大高度 */
  width: auto !important;
  height: auto !important;
  object-fit: cover; /* 保持图片比例，超出部分裁剪 */
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

/* 表格中图片悬停效果 */
.md :deep(table img:hover) {
  transform: scale(1.05);
}

/* 包含图片的单元格样式调整 */
.md :deep(td:has(img)) {
  white-space: normal; /* 包含图片的单元格允许换行 */
  text-align: center;  /* 图片居中 */
  padding: 8px;
}

/* 行内代码样式（清新主题） */
.md :deep(code:not(pre code)) {
  background-color: #f0f9ff;
  padding: 0.2em 0.4em;
  border-radius: 6px;
  font-size: 0.85em;
  font-family: 'Consolas', 'Monaco', 'Courier New', 'SF Mono', monospace;
  color: #0369a1;
  border: 1px solid #bae6fd;
  word-break: break-word;
}

/* 普通图片样式（非表格内） */
.md :deep(img:not(table img)) {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,.2), 0 1px 2px rgba(0,0,0,.14), 0 2px 5px rgba(0,0,0,.12);
  display: block;
  margin: 1rem auto;
}

/* 其余样式保持不变 */
h1, h2, h3, h4, h5, h6 {
  font-weight: bold;
}

.title {
  text-align: center;
  position: relative;
  display: inline-block;
  padding: 1rem 2rem;
  margin: 1rem auto 2rem;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #fef3c7 100%);
  border-radius: 16px;
  box-shadow:
    0 4px 20px rgba(227, 242, 253, 0.4),
    0 1px 3px rgba(0, 0, 0, 0.1);
  border: 2px solid #ffffff;
  font-size: 1.8rem;
  font-weight: 700;
  color: #1e40af;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  max-width: 90%;
}

/* 标题的装饰元素 */
.title::before {
  content: '✨';
  position: absolute;
  top: -8px;
  left: 20px;
  font-size: 1.2rem;
  animation: twinkle 2s ease-in-out infinite;
}

.title::after {
  content: '🌸';
  position: absolute;
  top: -8px;
  right: 20px;
  font-size: 1.2rem;
  animation: twinkle 2s ease-in-out infinite 1s;
}

/* 标题悬停效果 */
.title:hover {
  transform: translateY(-2px);
  box-shadow:
    0 6px 25px rgba(227, 242, 253, 0.6),
    0 2px 4px rgba(0, 0, 0, 0.15);
}

/* 闪烁动画 */
@keyframes twinkle {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(0.9);
  }
}

/* 标题响应式设计 */
@media (max-width: 768px) {
  .title {
    font-size: 1.4rem;
    padding: 0.8rem 1.5rem;
    margin: 0.5rem auto 1.5rem;
    max-width: 95%;
  }

  .title::before,
  .title::after {
    font-size: 1rem;
    top: -6px;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1.2rem;
    padding: 0.6rem 1rem;
    margin: 0.5rem auto 1rem;
    border-radius: 12px;
  }

  .title::before,
  .title::after {
    font-size: 0.9rem;
    top: -5px;
    left: 15px;
    right: 15px;
  }
}

p {
  text-indent: 2em;
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  font-size: 17px;
}

li {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  font-size: 17px;
}

blockquote {
  display: block;
  border-left: 0.5rem solid #6bd6fd;
  background-color: rgba(107, 214, 253, 0.2);
  padding: .25rem .75rem;
  margin: 1rem 0;
}

blockquote p {
  text-indent: 0;
}

li p {
  text-indent: 0;
}

strong {
  display: inline-block;
  text-indent: 0;
}

img {
  display: block;
}

</style>

<style scoped>
.markdown-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.meta-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #007bff;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #666;
}

.md {
  line-height: 1.8;
  color: #333;
}

/* 表格样式优化 */
.table-wrapper {
  margin: 1.5rem 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.md :deep(table) {
  width: 100% !important;
  border-collapse: collapse !important;
  table-layout: fixed !important;
  font-size: 14px !important;
  background-color: white;
}

.md :deep(th) {
  padding: 12px 8px !important;
  background-color: #f5f5f5 !important;
  border: 1px solid #e0e0e0 !important;
  font-weight: bold !important;
  text-align: center !important;
  white-space: normal !important;
  word-wrap: break-word !important;
  word-break: break-all !important;
  max-width: 200px !important;
  vertical-align: top !important;
  line-height: 1.4 !important;
}

.md :deep(td) {
  padding: 12px 8px !important;
  border: 1px solid #e0e0e0 !important;
  white-space: normal !important;
  word-wrap: break-word !important;
  word-break: break-all !important;
  max-width: 200px !important;
  vertical-align: top !important;
  line-height: 1.4 !important;
}

/* 长文本处理 */
.md :deep(td p) {
  margin: 0 !important;
  word-wrap: break-word !important;
  word-break: break-all !important;
  white-space: normal !important;
}

/* 响应式表格 */
@media (max-width: 768px) {
  .md :deep(th),
  .md :deep(td) {
    padding: 8px 4px !important;
    font-size: 12px !important;
    max-width: 150px !important;
  }
  
}

:global([data-theme="dark"] .metadata),
:global([data-theme="dark"] .meta-item) {
  color: #b6c3d1;
}

:global([data-theme="dark"] .meta-split::before) {
  color: #64748b;
}

:global([data-theme="dark"] .markdown-container) {
  background-color: #182235;
  box-shadow: 0 16px 40px rgba(2, 6, 23, 0.28);
}

:global([data-theme="dark"] .meta-info) {
  background-color: #111827;
  border-left-color: #38bdf8;
}

:global([data-theme="dark"] .article .md) {
  color: #e5edf7;
}

:global([data-theme="dark"] .article .title) {
  background: linear-gradient(135deg, #1e293b 0%, #172554 55%, #312e81 100%);
  border-color: rgba(147, 197, 253, 0.22);
  color: #e0f2fe;
  text-shadow: none;
  box-shadow:
    0 12px 30px rgba(2, 6, 23, 0.26),
    0 1px 0 rgba(255, 255, 255, 0.06) inset;
}

:global([data-theme="dark"] .article .md a) {
  color: #67e8f9;
}

:global([data-theme="dark"] .article .md blockquote) {
  background-color: rgba(14, 165, 233, 0.14);
  border-left-color: #38bdf8;
  color: #dbeafe;
}

:global([data-theme="dark"] .article .md code:not(pre code)) {
  background-color: #082f49;
  border-color: #075985;
  color: #bae6fd;
}

:global([data-theme="dark"] .article .md table) {
  background-color: #111827 !important;
  color: #e5edf7;
}

:global([data-theme="dark"] .article .md th) {
  background-color: #1e293b !important;
  border-color: #334155 !important;
  color: #f8fafc;
}

:global([data-theme="dark"] .article .md td) {
  border-color: #334155 !important;
  color: #dbeafe;
}
</style>
