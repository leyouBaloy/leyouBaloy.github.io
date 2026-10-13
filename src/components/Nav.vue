<template>
<transition name="nav-transition">
    <nav :class="['nav', { 'hidden': expandNav }]">
      <router-link
        v-for="(item, index) in navItems"
        :key="index"
        :to="item.path"
        class="nav-item"
        :class="{ active: isActive(item.path) }"
      >
        <n-icon size="17" :component="item.icon"></n-icon>
        <span>{{ item.name }}</span>
      </router-link>
    </nav>
  </transition>

    <transition name="nav-transition">
    <nav v-if="expandNav" :class="['nav', 'nav-fix-top', 'nav-blur']">
      <router-link
        v-for="(item, index) in navItems"
        :key="index"
        :to="item.path"
        class="nav-item"
        :class="{ active: isActive(item.path) }"
      >
        <n-icon size="17" :component="item.icon"></n-icon>
        <span>{{ item.name }}</span>
      </router-link>
    </nav>
  </transition>
</template>

<script setup>
import { shallowRef, defineProps } from 'vue';
import { NIcon } from 'naive-ui';
import { useRoute } from 'vue-router';
import { Home, Archive, Person, Book, Link } from '@vicons/ionicons5';

const props = defineProps({
  // fixed: Boolean,
  // blur: Boolean
  expandNav: Boolean
});

// 定义导航项
const navItems = shallowRef([
  { name: '主页', path: '/', icon: Home },
  { name: '归档', path: '/archive', icon: Archive },
  { name: '见闻录', path: '/media', icon: Book },
  { name: '友链', path: '/links', icon: Link },
  { name: '关于', path: '/about', icon: Person },
]);

const route = useRoute();


// 检查当前路由是否匹配
const isActive = (path) => {
  const current = route.path.replace(/\/+$/, '') || '/';
  if (path === '/') return current === '/';
  return current === path || current.startsWith(path + '/');
};

</script>

<style scoped>
.nav {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: fit-content;
  max-width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 6px 8px;
  font-size: 16px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease; /* 添加过渡效果 */
  background-color: rgba(255, 255, 255, 0.62);
  backdrop-filter: blur(14px) saturate(160%);
  -webkit-backdrop-filter: blur(14px) saturate(160%);
  overflow: visible;
}

.hidden {
  visibility: hidden; /* 隐藏元素但保留占位 */
}

.nav-fix-top {
  position: fixed;
  top: 0;
  left: 50%;
  top: 8px;
  transform: translateX(-50%);
  z-index: 1000;
}

.nav-blur {
  background-color: rgba(255, 255, 255, 0.72);
}

.nav-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  min-width: 0;
  min-height: 34px;
  padding: 0 14px;
  border-radius: 999px;
  cursor: pointer;
  text-decoration: none;
  color: #333;
  transition: color 0.3s ease, background-color 0.3s ease;
  white-space: nowrap;
  flex: 0 0 auto;
}

.nav-item :deep(.n-icon) {
  flex: 0 0 auto;
}

@media (hover: hover) {
  .nav-item:not(.active):hover {
    color: #2d96bd;
  }
}

.nav-item.active {
  color: #2d96bd;
  background-color: rgba(45, 150, 189, 0.12);
}

/* 过渡动画 */
.nav-transition-enter-active, .nav-transition-leave-active {
  transition: all 0.3s ease;
}
.nav-transition-enter-from, .nav-transition-leave-to {
  transform: translateY(-100%);
}

.nav-transition-enter-from.nav-fix-top,
.nav-transition-leave-to.nav-fix-top {
  transform: translate(-50%, -120%);
}

a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
  transition: color 0.3s ease;
}

:global([data-theme="dark"] .nav) {
  background-color: rgba(24, 34, 53, 0.86);
  border: 1px solid rgba(148, 163, 184, 0.20);
  box-shadow: 0 10px 30px rgba(2, 6, 23, 0.35);
}

:global([data-theme="dark"] .nav-blur) {
  background-color: rgba(15, 23, 42, 0.92);
}

:global([data-theme="dark"] .nav-item) {
  color: #dbeafe;
}

:global([data-theme="dark"] .nav-item:not(.active):hover) {
  color: #7dd3fc;
}

:global([data-theme="dark"] .nav-item.active) {
  color: #38bdf8;
  background-color: rgba(56, 189, 248, 0.14);
}

@media (max-width: 520px) {
  .nav {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 4px;
    width: 100%;
    padding: 6px;
    font-size: 14px;
    border-radius: 18px;
  }

  .nav-item {
    width: 100%;
    gap: 4px;
    padding: 0 6px;
    min-height: 32px;
  }

  .nav-item :deep(.n-icon) {
    font-size: 15px !important;
  }

  .nav-fix-top {
    top: 4px;
    width: calc(100% - 8px);
  }
}

</style>
