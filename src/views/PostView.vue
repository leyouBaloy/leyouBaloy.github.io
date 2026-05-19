<template>
  <Nav :expandNav="true"></Nav>
  <!-- 阅读进度条 -->
  <div class="reading-progress-container">
    <div class="reading-progress-bar" :style="{ width: readingProgress + '%' }"></div>
  </div>
  <main ref="mainRef">
    <div class="container">
      <MarkdownRenderer
        v-if="postSlug"
        :key="postSlug"
        :slug="postSlug"
        @headings-ready="onHeadingsReady"
        @metadata-ready="onMetadataReady"
      />

      <!-- 悬浮目录 -->
      <TableOfContents
        v-if="headings.length > 0"
        :headings="headings"
        ref="tocRef"
      />
    </div>
    <section v-if="relatedLoading || relatedPosts.length > 0" class="related-posts" aria-live="polite">
      <h2>相关推荐</h2>
      <div v-if="relatedLoading && relatedPosts.length === 0" class="related-list">
        <div v-for="index in 3" :key="index" class="related-card related-card-skeleton">
          <span class="related-skeleton-title"></span>
          <span class="related-skeleton-meta"></span>
        </div>
      </div>
      <div v-else class="related-list">
        <router-link
          v-for="post in relatedPosts"
          :key="post.slug"
          :to="`/post/${post.slug}`"
          class="related-card"
        >
          <span class="related-title">{{ post.title }}</span>
          <span class="related-meta">{{ formatDate(post.date) }} · {{ post.readingTime || 1 }} 分钟阅读</span>
        </router-link>
      </div>
    </section>
    <section class="comment-section" aria-live="polite">
      <div v-if="commentState !== 'ready'" class="comment-placeholder">
        <strong>{{ commentTitle }}</strong>
        <span>{{ commentDescription }}</span>
        <button
          v-if="commentState === 'waiting' || commentState === 'error'"
          type="button"
          class="comment-load-btn"
          @click="loadGiscusNow"
        >
          {{ commentState === 'error' ? '重试加载评论' : '立即加载评论' }}
        </button>
      </div>
      <div class="comment" ref="scriptContainer"></div>
    </section>
  <Foot></Foot>
  </main>

</template>

<script setup>
import { computed, nextTick, onMounted, onServerPrefetch, onUnmounted, ref, watch } from 'vue';
import MarkdownRenderer from '../components/MarkdownRenderer.vue';
import TableOfContents from '../components/TableOfContents.vue';
import Nav from "@/components/Nav.vue";
import { useRoute } from 'vue-router';
import Foot from "@/components/Foot.vue";
import { getRelatedBySlug } from '@/utils/postData';

const props = defineProps({
  slug: {
    type: String
  }
});

const $route = useRoute();
const postSlug = computed(() => String(props.slug || $route.params.slug || ''));

const scriptContainer = ref(null);
const readingProgress = ref(0);
const headings = ref([]);
const tocRef = ref(null);
const mainRef = ref(null);
const currentMeta = ref(null);
const relatedPosts = ref([]);
const relatedLoading = ref(false);
const commentState = ref('waiting');
let giscusObserver = null;
let giscusIdleCallback = null;
let giscusTimeout = null;
let isMounted = false;

const commentTitle = computed(() => {
  if (commentState.value === 'loading') return '评论加载中...';
  if (commentState.value === 'error') return '评论加载失败';
  return '评论区已延迟加载';
});

const commentDescription = computed(() => {
  if (commentState.value === 'loading') return '正在连接 Giscus，页面主体内容不会被阻塞。';
  if (commentState.value === 'error') return '可能是 GitHub 或网络暂时不可达，可以稍后重试。';
  return '滑到评论区附近时会自动加载，也可以现在手动打开。';
});

const onHeadingsReady = (h) => {
  headings.value = h;
};

const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('zh-CN');
};

const onMetadataReady = (meta) => {
  currentMeta.value = meta;
};

const updateReadingProgress = () => {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight - windowHeight;
  const scrollTop = window.scrollY;

  if (documentHeight > 0) {
    readingProgress.value = Math.min(100, Math.max(0, (scrollTop / documentHeight) * 100));
  }
};

const loadRelatedPosts = async (slug) => {
  if (!slug) return;
  relatedLoading.value = true;
  try {
    const relatedBySlug = await getRelatedBySlug();
    relatedPosts.value = relatedBySlug[slug] || [];
  } catch (err) {
    console.error('Failed to load related posts:', err);
  } finally {
    relatedLoading.value = false;
  }
};

const loadGiscus = () => {
  const container = scriptContainer.value;
  if (!container || container.dataset.loaded === 'true') return;
  container.dataset.loaded = 'true';
  commentState.value = 'loading';
  const script = document.createElement('script');
  script.src = "https://giscus.app/client.js";
  script.dataset.repo = "leyoubaloy/leyoubaloy.github.io";
  script.dataset.repoId = "R_kgDOGv-zPA";
  script.dataset.category = "Announcements";
  script.dataset.categoryId = "DIC_kwDOGv-zPM4ChJ8X";
  script.dataset.mapping = "pathname";
  script.dataset.strict = "0";
  script.dataset.reactionsEnabled = "1";
  script.dataset.emitMetadata = "0";
  script.dataset.inputPosition = "bottom";
  script.dataset.theme = "preferred_color_scheme";
  script.dataset.lang = "zh-CN";
  script.crossOrigin = "anonymous";
  script.async = true;
  script.onload = () => {
    commentState.value = 'ready';
  };
  script.onerror = () => {
    commentState.value = 'error';
    delete container.dataset.loaded;
  };

  container.appendChild(script);
};

const loadGiscusNow = () => {
  cleanupGiscusLazyLoad();
  loadGiscus();
};

const cleanupGiscusLazyLoad = () => {
  if (giscusObserver) {
    giscusObserver.disconnect();
    giscusObserver = null;
  }
  if (giscusIdleCallback && 'cancelIdleCallback' in window) {
    window.cancelIdleCallback(giscusIdleCallback);
    giscusIdleCallback = null;
  }
  if (giscusTimeout) {
    window.clearTimeout(giscusTimeout);
    giscusTimeout = null;
  }
};

const resetGiscus = () => {
  cleanupGiscusLazyLoad();
  if (scriptContainer.value) {
    scriptContainer.value.innerHTML = '';
    delete scriptContainer.value.dataset.loaded;
  }
  commentState.value = 'waiting';
};

const setupGiscusLazyLoad = () => {
  const container = scriptContainer.value;
  if (!container) return;

  cleanupGiscusLazyLoad();
  if ('IntersectionObserver' in window) {
    giscusObserver = new IntersectionObserver((entries) => {
      if (entries.some(entry => entry.isIntersecting)) {
        cleanupGiscusLazyLoad();
        loadGiscus();
      }
    }, {
      rootMargin: '120px 0px'
    });
    giscusObserver.observe(container);
    return;
  }

  if ('requestIdleCallback' in window) {
    giscusIdleCallback = window.requestIdleCallback(loadGiscus, { timeout: 3000 });
    return;
  }

  giscusTimeout = window.setTimeout(loadGiscus, 2500);
};

watch(postSlug, async (slug) => {
  if (typeof window === 'undefined') return;
  headings.value = [];
  currentMeta.value = null;
  relatedPosts.value = [];
  relatedLoading.value = false;
  await loadRelatedPosts(slug);

  if (isMounted) {
    resetGiscus();
    await nextTick();
    setupGiscusLazyLoad();
  }
}, { immediate: true });

onServerPrefetch(async () => {
  await loadRelatedPosts(postSlug.value);
});

onMounted(async () => {
  isMounted = true;
  await nextTick();
  window.addEventListener('scroll', updateReadingProgress);
  updateReadingProgress();
  setupGiscusLazyLoad();
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateReadingProgress);
  cleanupGiscusLazyLoad();
});
</script>

<style scoped>
main {
  max-width: 900px;
  margin: auto;
  position: relative;
}

.container {
  display: flex;
  max-width: 768px;
  padding: 0 20px;
  padding-bottom: 20px;
  margin: auto;
}

.related-posts {
  max-width: 728px;
  margin: 0 auto 24px;
  padding: 0 20px;
}

.related-posts h2 {
  margin: 8px 0 14px;
  font-size: 20px;
  color: #1f2937;
}

.related-list {
  display: grid;
  gap: 10px;
}

.related-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  background: #fff;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.related-card:hover {
  border-color: #2d96bd;
  transform: translateY(-1px);
}

.related-card-skeleton {
  pointer-events: none;
}

.related-card-skeleton:hover {
  border-color: #e5e7eb;
  transform: none;
}

.related-skeleton-title,
.related-skeleton-meta {
  display: block;
  border-radius: 6px;
  background: linear-gradient(90deg, #edf2f7 25%, #f8fafc 37%, #edf2f7 63%);
  background-size: 400% 100%;
  animation: related-skeleton-loading 1.4s ease infinite;
}

.related-skeleton-title {
  width: 78%;
  height: 18px;
}

.related-skeleton-meta {
  width: 42%;
  height: 14px;
}

.related-title {
  font-weight: 700;
  color: #111827;
}

.related-meta {
  font-size: 13px;
  color: #6b7280;
}

.comment-section {
  max-width: 728px;
  margin: 16px auto 0;
  padding: 0 20px;
}

.comment-placeholder {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
  min-height: 132px;
  padding: 18px;
  border: 1px dashed #cbd5e1;
  border-radius: 8px;
  background: #f8fafc;
  color: #334155;
  text-align: center;
}

.comment-placeholder strong {
  font-size: 18px;
  color: #111827;
}

.comment-placeholder span {
  color: #64748b;
  font-size: 14px;
}

.comment-load-btn {
  margin-top: 4px;
  border: 1px solid #bae6fd;
  background: #f0f9ff;
  color: #0369a1;
  border-radius: 6px;
  padding: 7px 14px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.comment-load-btn:hover {
  border-color: #0ea5e9;
  color: #0c4a6e;
  transform: translateY(-1px);
}

.comment {
  margin-top: 16px;
}

:global([data-theme="dark"] .related-posts h2),
:global([data-theme="dark"] .related-title) {
  color: #e5e7eb;
}

:global([data-theme="dark"] .related-card) {
  background: #1f2937;
  border-color: #374151;
}

:global([data-theme="dark"] .related-card:hover) {
  border-color: #38bdf8;
}

:global([data-theme="dark"] .related-meta) {
  color: #9ca3af;
}

:global([data-theme="dark"] .related-card-skeleton:hover) {
  border-color: #374151;
}

:global([data-theme="dark"] .related-skeleton-title),
:global([data-theme="dark"] .related-skeleton-meta) {
  background: linear-gradient(90deg, #1f2937 25%, #374151 37%, #1f2937 63%);
  background-size: 400% 100%;
}

:global([data-theme="dark"] .comment-placeholder) {
  background: #111827;
  border-color: #374151;
  color: #cbd5e1;
}

:global([data-theme="dark"] .comment-placeholder strong) {
  color: #e5e7eb;
}

:global([data-theme="dark"] .comment-placeholder span) {
  color: #9ca3af;
}

:global([data-theme="dark"] .comment-load-btn) {
  background: #1f2937;
  border-color: #374151;
  color: #bae6fd;
}

:global([data-theme="dark"] .comment-load-btn:hover) {
  border-color: #38bdf8;
  color: #e0f2fe;
}

@keyframes related-skeleton-loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}

/* 阅读进度条 */
.reading-progress-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: transparent;
  z-index: 10000;
}

.reading-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transition: width 0.1s ease-out;
  border-radius: 0 2px 2px 0;
}

/* 暗色模式进度条 */
[data-theme="dark"] .reading-progress-bar {
  background: linear-gradient(90deg, #f093fb 0%, #f5576c 100%);
}
</style>
