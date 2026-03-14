<template>
  <Nav :expandNav="true"></Nav>
  <!-- 阅读进度条 -->
  <div class="reading-progress-container">
    <div class="reading-progress-bar" :style="{ width: readingProgress + '%' }"></div>
  </div>
  <main>
    <div class="container">
      <MarkdownRenderer :filename=$route.params.filename />
      
    </div>
    <div class="comment" ref="scriptContainer"></div>
  <Foot></Foot>
  </main>
  
</template>

<script setup>
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import MarkdownRenderer from '../components/MarkdownRenderer.vue';
import Nav from "@/components/Nav.vue";
import { useRoute } from 'vue-router';
import Foot from "@/components/Foot.vue";
const $route = useRoute();

const scriptContainer = ref(null);
const readingProgress = ref(0);

const updateReadingProgress = () => {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight - windowHeight;
  const scrollTop = window.scrollY;
  
  if (documentHeight > 0) {
    readingProgress.value = Math.min(100, Math.max(0, (scrollTop / documentHeight) * 100));
  }
};

onMounted(async () => {
  // 延迟添加滚动监听，确保页面完全加载
  await nextTick();
  window.addEventListener('scroll', updateReadingProgress);
  updateReadingProgress();
  

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

  scriptContainer.value.appendChild(script);
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateReadingProgress);
});
</script>

<style scoped>
main {
  max-width: 900px;
  margin: auto;
}

.container {
  display: flex;
  /* margin-top: 60px; */
  max-width: 768px;
  padding: 0 20px;
  padding-bottom: 20px;
  margin: auto;
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