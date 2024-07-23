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
import { ref, shallowRef, defineProps, watch, nextTick } from 'vue';
import { NIcon,NAlert } from 'naive-ui';
import { useRoute } from 'vue-router';
import { Home, Archive, Person, Train, RadioButtonOn } from '@vicons/ionicons5';

const props = defineProps({
  // fixed: Boolean,
  // blur: Boolean
  expandNav: Boolean
});

// 定义导航项
const navItems = shallowRef([
  { name: '主页', path: '/', icon: Home },
  { name: '归档', path: '/archive', icon: Archive },
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
  display: flex;
  justify-content: center;
  background-color: #f8f9fa;
  padding: 15px 0;
  font-size: 17px;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease; /* 添加过渡效果 */
}

.hidden {
  visibility: hidden; /* 隐藏元素但保留占位 */
}

.nav-fix-top {
  position: fixed;
  top: 0;
  width: 100%;
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
  padding: 0px 10px;
  text-decoration: none;
  color: #333;
  transition: color 0.3s ease;
}

.nav-item .icon {
  margin-right: 8px;
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

a {
  display: flex;
    align-items: center;
    padding: 0px 15px;
    text-decoration: none;
    color: #333;
    transition: color 0.3s ease;
}

.dropdown {
  position: relative;
}

.dropdown-menu {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #f8f9fa;
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

</style>
