<script setup lang="ts">
import { useRoute, RouterView } from 'vue-router'
import { SpeedInsights } from "@vercel/speed-insights/vue"
import { inject } from '@vercel/analytics';
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { NIcon } from 'naive-ui';
import { MoonOutline, SunnyOutline } from '@vicons/ionicons5';

const route = useRoute()
inject();

// 暗色模式
const isDark = ref(false);
const themeIcon = computed(() => isDark.value ? SunnyOutline : MoonOutline);

// 图片灯箱
const lightboxImage = ref<string | null>(null);

onMounted(() => {
  // 检查本地存储和系统主题
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    isDark.value = savedTheme === 'dark';
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  applyTheme();
  
  // 添加图片点击事件监听
  document.addEventListener('click', handleImageClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleImageClick);
});

const handleImageClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target.tagName === 'IMG' && target.closest('.md')) {
    const img = target as HTMLImageElement;
    lightboxImage.value = img.src;
  }
};

const closeLightbox = () => {
  lightboxImage.value = null;
};

const toggleDark = () => {
  isDark.value = !isDark.value;
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
  applyTheme();
};

const applyTheme = () => {
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light');
};
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" v-if="$route.meta.keepAlive" />
    </keep-alive>
    <component :is="Component" v-if="!$route.meta.keepAlive" />
  </router-view>
  <SpeedInsights/>
  
  <!-- 暗色模式切换按钮 -->
  <button
    class="dark-toggle"
    @click="toggleDark"
    :title="isDark ? '切换亮色' : '切换暗色'"
    :aria-label="isDark ? '切换亮色' : '切换暗色'"
  >
    <n-icon :size="22" :component="themeIcon" />
  </button>
  
  <!-- 图片灯箱 -->
  <div v-if="lightboxImage" class="lightbox" @click="closeLightbox">
    <img :src="lightboxImage" class="lightbox-img" @click.stop />
    <button class="lightbox-close">✕</button>
  </div>
</template>

<style scoped>
* {
  font-family: "lucida grande", "lucida sans unicode", lucida, helvetica, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
}

.footer {
  display: block;
  margin: auto;
}
</style>

<style>
/* 暗色模式切换按钮 */
.dark-toggle {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.88);
  color: #3730a3;
  cursor: pointer;
  box-shadow: 0 10px 28px rgba(79, 70, 229, 0.22);
  z-index: 9999;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(12px);
  transition: transform 0.25s ease, background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
}

.dark-toggle:hover {
  transform: translateY(-2px) scale(1.04);
  background: #fff;
  box-shadow: 0 14px 34px rgba(79, 70, 229, 0.30);
}

/* 图片灯箱 */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-out;
  animation: fadeIn 0.3s ease;
}

.lightbox-img {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 20px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.lightbox-close:hover {
  background: rgba(255, 255, 255, 0.3);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

body {
  background-color: #DDD;
}

main {
  background-color: #FFFFFF;
}

/* 暗色模式 */
[data-theme="dark"] body {
  background-color: #101325;
}

[data-theme="dark"] main {
  background-color: #111827;
  color: #e5edf7;
}

[data-theme="dark"] .post-card,
[data-theme="dark"] .media-card,
[data-theme="dark"] .about-section,
[data-theme="dark"] .site-intro {
  background-color: #1f2937;
}

[data-theme="dark"] .post-card:hover {
  background-color: #374151;
}

[data-theme="dark"] .waterfall-card {
  background-color: #1f2937;
}

[data-theme="dark"] .post-title,
[data-theme="dark"] .media-title,
[data-theme="dark"] .section-title {
  color: #e0e0e0;
}

[data-theme="dark"] .post-excerpt,
[data-theme="dark"] .media-excerpt,
[data-theme="dark"] .post-info,
[data-theme="dark"] .zym {
  color: #9ca3af;
}

[data-theme="dark"] .post-tag {
  background-color: #374151;
  color: #e0e0e0;
}

[data-theme="dark"] .load-more-btn {
  background-color: #374151;
  color: #e0e0e0;
}

[data-theme="dark"] .nav,
[data-theme="dark"] .nav-fix-top {
  background-color: rgba(31, 41, 55, 0.9) !important;
}

[data-theme="dark"] .nav-item {
  color: #e0e0e0;
}

[data-theme="dark"] .footer {
  color: #9ca3af;
}

[data-theme="dark"] .dark-toggle {
  background: rgba(15, 23, 42, 0.88);
  color: #fde68a;
  box-shadow: 0 10px 28px rgba(2, 6, 23, 0.45);
}

[data-theme="dark"] .dark-toggle:hover {
  background: #1e293b;
  box-shadow: 0 14px 34px rgba(2, 6, 23, 0.55);
}

/* 评论区暗色 */
[data-theme="dark"] .giscus {
  background-color: #1f2937;
}
</style>

<!-- 评论的样式 -->
<style>
.giscus {
  max-width: 900px;
  margin: auto;
  background-color: #fff;
  padding: 0 20px;
  box-sizing: border-box;
}

.giscus-frame {
  margin: auto;
}
</style>
