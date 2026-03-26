<template>
  <Transition name="toc-toggle">
    <div v-if="isVisible" class="toc-wrapper" :class="{ collapsed: isCollapsed }">
      <!-- 折叠按钮 -->
      <button class="toc-toggle-btn" @click="toggleCollapse" :title="isCollapsed ? '展开目录' : '收起目录'">
        <n-icon size="14">
          <ChevronBack v-if="!isCollapsed" />
          <ChevronForward v-else />
        </n-icon>
      </button>

      <!-- 目录内容 -->
      <div class="toc-content" v-show="!isCollapsed">
        <div class="toc-header">目录</div>
        <nav class="toc-nav">
          <div
            v-for="heading in headings"
            :key="heading.id"
            class="toc-item"
            :class="[
              `level-${heading.level}`,
              { active: activeId === heading.id }
            ]"
            :style="{ paddingLeft: (heading.level - 1) * 12 + 'px' }"
            @click="scrollToHeading(heading.id)"
            :title="heading.text"
          >
            <span class="toc-indicator"></span>
            <span class="toc-text">{{ heading.text }}</span>
          </div>
        </nav>
      </div>
    </div>
  </Transition>

  <!-- 悬浮触发按钮（收起时显示） -->
  <Transition name="toc-fab">
    <button
      v-if="!isVisible && headings.length > 0"
      class="toc-fab"
      @click="showToc"
      title="显示目录"
    >
      <n-icon size="18">
        <ListOutline />
      </n-icon>
    </button>
  </Transition>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue';
import { NIcon } from 'naive-ui';
import { ChevronBack, ChevronForward, ListOutline } from '@vicons/ionicons5';

const props = defineProps({
  headings: {
    type: Array,
    default: () => []
  }
});

const isVisible = ref(true);
const isCollapsed = ref(false);
const activeId = ref('');

let observer = null;

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};

const showToc = () => {
  isVisible.value = true;
  isCollapsed.value = false;
};

const hideToc = () => {
  isVisible.value = false;
};

const scrollToHeading = (id) => {
  const el = document.getElementById(id);
  if (el) {
    const offset = 80; // 导航栏高度
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

const setupObserver = () => {
  if (observer) {
    observer.disconnect();
  }

  const headingElements = props.headings
    .map(h => document.getElementById(h.id))
    .filter(Boolean);

  if (headingElements.length === 0) return;

  // 使用 IntersectionObserver 监听每个 heading
  const visibleHeadings = new Set();

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visibleHeadings.add(entry.target.id);
        } else {
          visibleHeadings.delete(entry.target.id);
        }
      });

      // 取屏幕上最靠上的那个作为 active
      if (visibleHeadings.size > 0) {
        const sorted = props.headings.filter(h => visibleHeadings.has(h.id));
        if (sorted.length > 0) {
          activeId.value = sorted[0].id;
        }
      }
    },
    {
      rootMargin: '-80px 0px -60% 0px',
      threshold: [0, 1]
    }
  );

  headingElements.forEach(el => observer.observe(el));

  // 设置初始 active
  if (headingElements.length > 0 && !activeId.value) {
    activeId.value = props.headings[0].id;
  }
};

// 监听 headings 变化，重新设置 observer
watch(() => props.headings, async (newHeadings) => {
  if (newHeadings.length > 0) {
    await nextTick();
    setupObserver();
  }
}, { immediate: false });

onMounted(() => {
  if (props.headings.length > 0) {
    nextTick(setupObserver);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});

// 暴露隐藏方法给父组件
defineExpose({ hideToc });
</script>

<style scoped>
.toc-wrapper {
  position: fixed;
  right: 20px;
  top: 100px;
  width: 220px;
  max-height: calc(100vh - 140px);
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.06);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  overflow: visible;
}

.toc-wrapper.collapsed {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  top: auto;
  bottom: 140px;
  right: 20px;
}

.toc-toggle-btn {
  position: absolute;
  top: -1px;
  right: -1px;
  width: 24px;
  height: 24px;
  border: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 0 10px 0 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
  z-index: 1;
}

.toc-toggle-btn:hover {
  opacity: 0.85;
}

.toc-content {
  padding: 14px 12px 12px;
  overflow-y: auto;
  flex: 1;
}

.toc-content::-webkit-scrollbar {
  width: 4px;
}

.toc-content::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 4px;
}

.toc-header {
  font-size: 12px;
  font-weight: 600;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
}

.toc-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.toc-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 6px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  color: #555;
  transition: all 0.2s ease;
  line-height: 1.4;
  position: relative;
}

.toc-item:hover {
  background: #f5f5f5;
  color: #333;
}

.toc-item.active {
  color: #667eea;
  font-weight: 500;
  background: rgba(102, 126, 234, 0.08);
}

.toc-item.active .toc-indicator {
  background: #667eea;
}

.toc-indicator {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #ccc;
  flex-shrink: 0;
  transition: background 0.2s;
}

.toc-item.level-2 {
  font-size: 13px;
}

.toc-item.level-3 {
  font-size: 12px;
  color: #777;
}

.toc-item.level-4,
.toc-item.level-5,
.toc-item.level-6 {
  font-size: 12px;
  color: #999;
}

.toc-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 悬浮目录按钮 */
.toc-fab {
  position: fixed;
  right: 20px;
  bottom: 140px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  z-index: 1000;
  transition: all 0.3s ease;
}

.toc-fab:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
}

/* 暗色模式 */
[data-theme="dark"] .toc-wrapper {
  background: #1f1f1f;
  border-color: rgba(255, 255, 255, 0.08);
}

[data-theme="dark"] .toc-header {
  color: #888;
  border-color: #333;
}

[data-theme="dark"] .toc-item {
  color: #aaa;
}

[data-theme="dark"] .toc-item:hover {
  background: #2a2a2a;
  color: #ddd;
}

[data-theme="dark"] .toc-item.active {
  color: #a78bfa;
  background: rgba(102, 126, 234, 0.12);
}

[data-theme="dark"] .toc-item.active .toc-indicator {
  background: #a78bfa;
}

/* 过渡动画 */
.toc-toggle-enter-active,
.toc-toggle-leave-active {
  transition: all 0.3s ease;
}

.toc-toggle-enter-from,
.toc-toggle-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.toc-fab-enter-active,
.toc-fab-leave-active {
  transition: all 0.3s ease;
}

.toc-fab-enter-from,
.toc-fab-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

/* 响应式：手机端 TOC 样式 */
@media (max-width: 768px) {
  .toc-wrapper {
    right: 10px;
    width: 180px;
    max-height: calc(100vh - 120px);
    top: 80px;
  }
  
  .toc-wrapper.collapsed {
    right: 10px;
    bottom: 140px;
  }
  
  .toc-fab {
    right: 10px;
    bottom: 140px;
  }
}
</style>
