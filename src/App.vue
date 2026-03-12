<script setup lang="ts">
import { useRoute, RouterView } from 'vue-router'
import { SpeedInsights } from "@vercel/speed-insights/vue"
import { inject } from '@vercel/analytics';
import { ref, onMounted } from 'vue';

const route = useRoute()
inject();

// 暗色模式
const isDark = ref(false);

onMounted(() => {
  // 检查本地存储和系统主题
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    isDark.value = savedTheme === 'dark';
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  applyTheme();
});

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
  <button class="dark-toggle" @click="toggleDark" :title="isDark ? '切换亮色' : '切换暗色'">
    {{ isDark ? '☀️' : '🌙' }}
  </button>
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
  bottom: 80px;
  right: 20px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  transition: transform 0.3s ease;
}

.dark-toggle:hover {
  transform: scale(1.1);
}

body {
  background-color: #DDD;
}

main {
  background-color: #FFFFFF;
}

/* 暗色模式 */
[data-theme="dark"] body {
  background-color: #1a1a2e;
}

[data-theme="dark"] main {
  background-color: #16213e;
  color: #e0e0e0;
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

[data-theme="dark"] .tag,
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
