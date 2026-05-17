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
      
      <div class="nav-item dropdown" @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">
        <n-icon size="17" :component="Train"></n-icon>
        <span>开往</span>
        <div v-show="showDropdown" class="dropdown-menu">
          <a href="https://www.travellings.cn/go.html" target="_blank" class="dropdown-item">
            <n-icon size="17" :component="Train"></n-icon>
            <span>开往</span>
          </a>
          <a href="https://foreverblog.cn/go.html" target="_blank" class="dropdown-item">
            <n-icon size="17" :component="RadioButtonOn"></n-icon>
            <span>虫洞</span>
          </a>
        </div>
      </div>
      
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
      <div class="nav-item dropdown" @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">
        <n-icon size="17" :component="Train"></n-icon>
        <span>开往</span>
        <div v-show="showDropdown" class="dropdown-menu">
          <a href="https://www.travellings.cn/go.html" target="_blank" class="dropdown-item">
            <n-icon size="17" :component="Train"></n-icon>
            <span>开往</span>
          </a>
          <a href="https://foreverblog.cn/go.html" target="_blank" class="dropdown-item">
            <n-icon size="17" :component="RadioButtonOn"></n-icon>
            <span>虫洞</span>
          </a>
        </div>
      </div>
    </nav>
  </transition>
</template>

<script setup>
import { ref, shallowRef, defineProps } from 'vue';
import { NIcon } from 'naive-ui';
import { useRoute } from 'vue-router';
import { Home, Archive, Person, Train, RadioButtonOn, Book } from '@vicons/ionicons5';

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
  { name: '关于', path: '/about', icon: Person },
]);

const route = useRoute();
const showDropdown = ref(false);


// 检查当前路由是否匹配
const isActive = (path) => {
  return route.path === path;
};

</script>

<style scoped>
.nav {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100%;
  box-sizing: border-box;
  padding: 12px 16px;
  font-size: 17px;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease; /* 添加过渡效果 */
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  overflow: visible;
}

.hidden {
  visibility: hidden; /* 隐藏元素但保留占位 */
}

.nav-fix-top {
  position: fixed;
  top: 0;
  left: 50%;
  width: min(900px, calc(100% - 24px));
  transform: translateX(-50%);
  z-index: 1000;
}

.nav-blur {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  border-radius: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  min-width: 0;
  min-height: 24px;
  padding: 0 10px;
  text-decoration: none;
  color: #333;
  transition: color 0.3s ease;
  white-space: nowrap;
}

.nav-item :deep(.n-icon) {
  flex: 0 0 auto;
}

.nav-item:hover {
  color: #2d96bd;
}

.nav-item.active {
  color: #2d96bd;
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

.dropdown {
  position: relative;
}

.dropdown::after {
  content: '';
  position: absolute;
  top: 100%;
  right: 0;
  width: max(100%, 100px);
  height: 12px;
}

.dropdown-menu {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  background-color: rgba(248, 249, 250, 0.96);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 10px 0;
  z-index: 1000;
  min-width: 100px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  text-decoration: none;
  color: #333;
}

.dropdown-item:hover {
  background-color: #e9ecef;
}

:global([data-theme="dark"] .nav) {
  background-color: rgba(24, 34, 53, 0.86);
  border: 1px solid rgba(148, 163, 184, 0.20);
  box-shadow: 0 10px 30px rgba(2, 6, 23, 0.35);
}

:global([data-theme="dark"] .nav-blur) {
  background-color: rgba(15, 23, 42, 0.92);
}

:global([data-theme="dark"] .nav-item),
:global([data-theme="dark"] .dropdown-item) {
  color: #dbeafe;
}

:global([data-theme="dark"] .nav-item:hover),
:global([data-theme="dark"] .dropdown-item:hover) {
  color: #7dd3fc;
}

:global([data-theme="dark"] .nav-item.active) {
  color: #38bdf8;
}

:global([data-theme="dark"] .dropdown-menu) {
  background-color: rgba(15, 23, 42, 0.96);
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow: 0 12px 28px rgba(2, 6, 23, 0.35);
}

:global([data-theme="dark"] .dropdown-item:hover) {
  background-color: rgba(56, 189, 248, 0.12);
}

@media (max-width: 520px) {
  .nav {
    gap: 0;
    padding: 9px 6px;
    font-size: 13px;
  }

  .nav-item {
    min-width: 0;
    width: 100%;
    gap: 3px;
    padding: 0 3px;
  }

  .nav-item :deep(.n-icon) {
    font-size: 15px !important;
  }

  .nav-fix-top {
    top: 0;
    width: calc(100% - 16px);
  }

  .dropdown-menu {
    min-width: 88px;
  }
}

</style>
