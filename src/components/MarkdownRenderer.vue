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
import { ref, onMounted, defineProps, h } from 'vue';
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

const md = new MarkdownIt();

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

const renderVNode = (nodes) => {
  return h('div',{style:{maxWidth:'100%'}}, Array.from(nodes).map((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const tagName = node.tagName.toLowerCase();
      const children = renderVNode(node.childNodes);

      if (tagName === 'img') {
        return h(NImage, {
          style: {
            maxWidth: '768px',
            borderRadius: '10px',
            // 阴影
            boxShadow: '0 1px 3px rgba(0,0,0,.2), 0 1px 2px rgba(0,0,0,.14), 0 2px 5px rgba(0,0,0,.12)',
          },
          width: node.getAttribute('width') || '100%',
          src: node.getAttribute('src'),
          alt: node.getAttribute('alt')
        });
      }

      return h(tagName, {}, children);
    }
  }));
};

onMounted(loadMarkdown);
</script>

<style .article>

.article {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.metadata {
  font-size: .875rem;
  color: #73828c;
  font-weight: 400;
}

.md {
  box-sizing: border-box;
  width: 100%;
}

/* 添加一些基本的样式 */
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
  /* font-size: 16px; */
}

li {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  font-size: 17px;
}

pre {
  max-width: 768px;
  background: #f6f8fa;
  /* padding: 1em; */
  overflow: auto;
}

code {
  background: #f5f5f5;
  padding: 0em 0.2em;
  border-radius: 4px;
  display:inline-block;
  text-indent: 0;
}

img {
  max-width: 100%;
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
}

code {
  max-width: 100%;
}


</style>

<style>
.n-iamge {
  max-width: 100%;
  border-radius: 20px !important;
}



</style>