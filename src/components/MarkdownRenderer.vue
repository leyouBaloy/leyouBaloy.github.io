<!-- MarkdownRenderer.vue -->
<template>
  <div class="article">
    <h1 class="title">{{ metaData.title }}</h1>
    <div class="metadata">
      <n-icon size="13">
        <CalendarOutline />
      </n-icon>
      发布于：{{ metaData.date }}
      <n-icon size="13" style="margin-left: 10px;">
        <ArchiveOutline />
      </n-icon>
      分类：{{ metaData.categories }}
    </div>
    <div class="md">
      <component :is="renderedContent" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, h, Fragment } from 'vue';
import axios from 'axios';
import frontMatter from 'front-matter';
import { NIcon, NImage } from 'naive-ui';
import { CalendarOutline, ArchiveOutline } from '@vicons/ionicons5';
import MarkdownIt from 'markdown-it';
import { markRaw } from 'vue';

const props = defineProps({
  filename: {
    type: String
  }
});

const metaData = ref({});
const renderedContent = ref();

const md = new MarkdownIt({
  html: true,
  xhtmlOut: false,
  breaks: false,
  linkify: true,
  typographer: true,
});

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

      if (tagName === 'img') {
        const isInTable = isInsideTable(node);
        
        return h(NImage, {
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
          previewSrc: node.getAttribute('src'),
          showToolbar: true,
          showToolbarTooltip: true
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

const loadMarkdown = async () => {
  try {
    const response = await axios.get(`/markdown/${props.filename}`);
    const { attributes, body } = frontMatter(response.data);
    attributes.date = new Date(attributes.date).toLocaleDateString();
    attributes.categories = attributes.categories.join(', ');
    metaData.value = attributes;
    const html = md.render(body);
    const div = document.createElement('div');
    div.innerHTML = html;
    renderedContent.value = markRaw(renderVNode(div.childNodes));
  } catch (error) {
    console.error('Error loading markdown file:', error);
  }
};

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
}

.md {
  width: 100%;
  box-sizing: border-box;
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

/* 处理超长代码块 */
.md :deep(pre) {
  border-left: 0.5rem solid #cbccce;
  margin: 1rem 0;
  padding: 16px;
  background-color: #f6f8fa;
  overflow-x: auto;
  max-width: 100%;
}

.md :deep(code) {
  padding: 0em 0.2em;
  border-radius: 4px;
  display: inline-block;
  text-indent: 0;
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

.md :deep(table .n-image) {
  max-width: 150px !important;
  max-height: 100px !important;
  width: auto !important;
}

/* 约束表格中的图片容器 */
.md :deep(table .n-image img) {
  max-width: 150px !important;
  max-height: 100px !important;
  width: auto !important;
  height: auto !important;
  object-fit: cover;
}

/* 包含图片的表格单元格 */
.md :deep(td:has(.n-image)) {
  white-space: normal;
  text-align: center;
  padding: 8px;
  vertical-align: middle;
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

/* 表格中的图片特殊处理 */
.md :deep(td .n-image) {
  max-width: 120px !important;
  max-height: 80px !important;
  width: auto !important;
  margin: 4px auto !important;
}

.md :deep(td .n-image img) {
  max-width: 120px !important;
  max-height: 80px !important;
  width: auto !important;
  height: auto !important;
  object-fit: cover !important;
}

/* 包含图片的单元格居中 */
.md :deep(td:has(.n-image)) {
  text-align: center !important;
  vertical-align: middle !important;
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
  
  .md :deep(td .n-image) {
    max-width: 80px !important;
    max-height: 60px !important;
  }
}
</style>