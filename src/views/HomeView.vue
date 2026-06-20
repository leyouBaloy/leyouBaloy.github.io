<template>
  <main>
    <div class="content">
      <PageLoading v-if="initialLoading" label="文章加载中..." />

      <section v-show="!initialLoading" class="section-tabs" aria-label="内容板块切换">
        <div class="tab-control">
          <button
            class="tab-btn"
            :class="{ active: activeSection === 'posts' }"
            :aria-pressed="activeSection === 'posts'"
            @click="switchSection('posts')"
          >
            <span>📝 文章</span>
          </button>
          <button
            class="tab-btn"
            :class="{ active: activeSection === 'gossip' }"
            :aria-pressed="activeSection === 'gossip'"
            @click="switchSection('gossip')"
          >
            <span>💬 闲言碎语</span>
          </button>
        </div>
      </section>

      <!-- 移动端：保留单列 or 直接渲染所有帖子 -->
      <div v-show="!initialLoading && activeSection === 'posts' && isMobile">
        <div v-for="post in posts" :key="post.title" class="post-wrapper">
          <PostCard
            :title="post.title"
            :content="post.excerpt"
            :time="new Date(post.date).toLocaleDateString()"
            :tag="post.tags ? post.tags.join(', ') : '未分类'"
            :img="post.img"
            :path="`/post/${post.slug}`"
            :id="post.title"
          />
        </div>
      </div>

      <!-- 桌面端：绝对定位瀑布流 -->
      <div v-show="!initialLoading && activeSection === 'posts' && !isMobile" class="waterfall-container" ref="waterfallWrapper" :style="{ height: wrapperHeight + 'px' }">
    <div
      v-for="(post, index) in posts"
      :key="post.title"
      class="waterfall-item"
    >
      <div class="waterfall-card">
        <PostCard
          :title="post.title"
          :content="post.excerpt"
          :time="new Date(post.date).toLocaleDateString()"
          :tag="post.tags ? post.tags.join(', ') : '未分类'"
          :img="post.img"
          :path="`/post/${post.slug}`"
          :id="post.title"
          @imageLoaded="onImageLoaded"
        />
      </div>
    </div>
  </div>

      <section v-show="!initialLoading && activeSection === 'gossip'" class="gossip-list">
        <PageLoading v-if="gossipLoading" label="碎语加载中..." />
        <template v-else>
          <GossipCard
            v-for="item in gossips"
            :key="item.id"
            :item="item"
          />
        </template>
      </section>

      <n-divider v-if="activeSection === 'posts'" style="margin-bottom: 10px;"/>
      <!-- 加载更多-按钮 + 无限滚动触发器 -->
      <div v-show="!initialLoading && activeSection === 'posts'" class="pagination-container" ref="loadMoreTrigger">
        <button
          class="load-more-btn"
          @click="loadNextPage"
          :disabled="loading || numPage >= pageCount"
          :class="{ 'loading-btn': loading }"
        >
        <span v-if="loading">加载中...<img src="../assets/loading.gif" style="height: 30px;" /></span>
        <span v-else-if="numPage < pageCount">加载更多</span>
        <span v-else>没有更多内容</span>
        </button>
      </div>

      <Foot />
      <n-back-top :right="20" :bottom="140" />
    </div>
  </main>
</template>


<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import axios from 'axios';
import { NDivider, NBackTop} from 'naive-ui';
import Foot from "@/components/Foot.vue";
import PostCard from "@/components/PostCard.vue";
import GossipCard from "@/components/GossipCard.vue";
import PageLoading from "@/components/PageLoading.vue";
import type { PostMetadata } from "@/types/PostMetadata";
import type { GossipItem } from "@/types/Gossip";

/** 响应式判断：移动端 */
const isMobile = ref(false);
const checkIsMobile = () => {
  isMobile.value = window.innerWidth <= 500;
};

// 分页/数据
const numPage = ref(1);
const pageCount = ref(1);
const loading = ref(false);
const posts = ref<PostMetadata[]>([]);
const initialLoading = ref(true);
const activeSection = ref<'posts' | 'gossip'>('posts');
const gossips = ref<GossipItem[]>([]);
const gossipLoading = ref(false);

// 底部加载元素引用（用于无限滚动）
const loadMoreTrigger = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

// 瀑布流容器引用
const waterfallWrapper = ref<HTMLElement | null>(null);
// 瀑布流容器高度
const wrapperHeight = ref(0);

// 一些瀑布流配置属性
const gutter = 20;       // 卡片之间的间距
const cols = ref(2);     // 列数（可根据响应式需求调整）
const colWidth = ref(0); // 每列宽度，或你可以动态计算
// const offsetX = ref(0);  // x 偏移（如果需要居中或其他对齐）
const hasAroundGutter = ref(true);
const animationCancel = ref(false);   // 是否取消动画
const posDuration = ref(300);         // 位置动画时长 (ms)

// 记录每列当前 Y 高度
const posY = ref<number[]>([]);

/** 加载文章数据 */
const loadMarkdownMetadata = async () => {
  try {
    loading.value = true;
    const response = await axios.get<PostMetadata[]>(`/markdown/metadata/metadata_${numPage.value}.json`);
    if (response.data.length) {
      posts.value.push(...response.data);
      if ((response.data[0] as any).totalPages) {
        pageCount.value = (response.data[0] as any).totalPages;
      }
      if (numPage.value === 1) {
        initialLoading.value = false;
      }
      await nextTick();
      updateColWidth();
      layoutHandle(); // 布局
    }
  } catch (error) {
    console.error('Error loading metadata:', error);
  } finally {
    loading.value = false;
    if (numPage.value === 1 && posts.value.length === 0) {
      initialLoading.value = false;
    }
  }
};

const loadGossip = async () => {
  if (gossips.value.length || gossipLoading.value) return;

  try {
    gossipLoading.value = true;
    const response = await axios.get<GossipItem[]>('/data/gossip.json');
    gossips.value = response.data.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch (error) {
    console.error('Error loading gossip:', error);
  } finally {
    gossipLoading.value = false;
  }
};

const switchSection = async (section: 'posts' | 'gossip') => {
  activeSection.value = section;

  if (section === 'gossip') {
    await loadGossip();
    return;
  }

  await nextTick();
  updateColWidth();
  layoutHandle();
};

/** 布局函数：参考 useLayout.ts 的思路 */
const layoutHandle = async (): Promise<boolean> => {
  return new Promise((resolve) => {
    // 初始化 posY
    initY();

    // 获取 .waterfall-item DOM 列表
    const items: HTMLElement[] = [];
    if (waterfallWrapper.value) {
      waterfallWrapper.value.childNodes.forEach((el: any) => {
        if (el.className === 'waterfall-item') items.push(el);
      });
    }
    if (!items.length) return false;

    // 遍历每个卡片
    for (let i = 0; i < items.length; i++) {
      const curItem = items[i] as HTMLElement;
      const style = curItem.style;

      // 最小列
      const minY = Math.min(...posY.value);
      const minYIndex = posY.value.indexOf(minY);

      // 计算 X
      const curX = getX(minYIndex);

      // 设置 transform
      style.transform = `translate3d(${Math.floor(curX)}px, ${Math.floor(minY)}px, 0)`;
      style.width = `${colWidth.value}px`;
      style.visibility = 'visible';

      // 测量高度
      const { height } = curItem.getBoundingClientRect();
      // 输出卡片标题和高度
      // console.log(`Card "${i}" height: ${height}`);
      // 更新列高
      posY.value[minYIndex] += height;

      // 入场动画（可选）
      if (!animationCancel.value) {
        addAnimation(curItem, () => {
          const time = posDuration.value / 1000;
          style.transition = `transform ${time}s`;
        });
      }
    }

    // 容器高度 = 最长列
    wrapperHeight.value = Math.max(...posY.value);

    // 等待动画结束
    setTimeout(() => {
      resolve(true);
    }, posDuration.value);
  });
};

// 图片加载完成后再次布局（可加防抖）
let timer: number | null = null;
function onImageLoaded() {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    layoutHandle();
  }, 100); // 防抖 100ms
}

/** 初始化 posY */
const initY = () => {
  posY.value = new Array(cols.value).fill(hasAroundGutter.value ? gutter : 0);
};

/** 计算给定列的 X 坐标 */
const getX = (index: number): number => {
  const count = hasAroundGutter.value ? index + 1 : index;
  return gutter * count + colWidth.value * index;
};

/** 简单的动画函数，给卡片添加class或行内属性 */
function addAnimation(item: HTMLElement, callback?: () => void) {
  // 也可以从 item.firstChild 取到实际卡片 DOM
  // 并添加动画class
  // 这里为简单演示
  const content = item.firstChild as HTMLElement;
  if (content) {
    // 添加一系列动画class/属性
    content.classList.add('animate__animated', 'animate__fadeIn'); 
    // etc.

    // 回调
    if (callback) {
      setTimeout(() => {
        callback();
      }, 300); // 300ms or 你自己的计算
    }
  }
}

/** 加载下一页 */
const loadNextPage = async () => {
  if (numPage.value < pageCount.value && !loading.value) {
    numPage.value++;
    await loadMarkdownMetadata();
  }
};

/** 无限滚动触发 */
const handleIntersect = async (entries: IntersectionObserverEntry[]) => {
  const entry = entries[0];
  if (entry.isIntersecting && activeSection.value === 'posts' && !loading.value && numPage.value < pageCount.value) {
    await loadNextPage();
  }
};

// 定义函数: colWidth = containerWidth - 3 * gutter
function updateColWidth() {
  const container = waterfallWrapper.value;
  if (!container) return;

  // 父容器的实际宽度
  const containerWidth = container.clientWidth;
  // 计算后赋值
  colWidth.value = (containerWidth - 3 * gutter)/2;
}

onMounted(() => {
  checkIsMobile();
  updateColWidth();
  window.addEventListener('resize', checkIsMobile);
  // 监听 window 尺寸变化，或父容器变化
  window.addEventListener('resize', updateColWidth);
  window.addEventListener('resize', layoutHandle);

  // 设置无限滚动 observer
  if (loadMoreTrigger.value) {
    observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '100px', // 提前100px触发
      threshold: 0
    });
    observer.observe(loadMoreTrigger.value);
  }

  loadMarkdownMetadata();
  loadGossip();
});

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
  }
  window.removeEventListener('resize', checkIsMobile);
  window.removeEventListener('resize', updateColWidth);
  window.removeEventListener('resize', layoutHandle);
  if (timer) clearTimeout(timer);
});
</script>


<style scoped>
main {
  max-width: 900px;
  margin: auto;
}

.content {
  /* padding: 0 10px; */
  padding-top: 10px;
}

.section-tabs {
  width: calc(100% - 40px);
  margin: 0 auto 22px;
}

.tab-control {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0;
  padding: 4px;
  border-radius: 4px;
  background: #f5f6fa;
}

.tab-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 38px;
  padding: 0 12px;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: #252a31;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
  transition: background 0.18s ease, box-shadow 0.18s ease, color 0.18s ease;
}

.tab-btn small {
  color: inherit;
  font-size: 12px;
  font-weight: 600;
  opacity: 0.72;
}

.tab-btn:hover {
  background: rgba(255, 255, 255, 0.62);
}

.tab-btn.active {
  background: #fff;
  color: #2d96bd;
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.08);
}

.gossip-list {
  display: grid;
  gap: 12px;
  max-width: 860px;
  margin: 0 auto 20px;
  padding: 0 20px;
}

/* 瀑布流容器: 相对定位, 手动设置 height */
.waterfall-container {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  overflow: hidden; /* optional: hide overflow if needed */
}

/* 每个item: 初始离屏(0,3000px), hidden */
.waterfall-item {
  position: absolute;
  left: 0;
  top: 0;
  transform: translate3d(0, 3000px, 0);
  visibility: hidden;
  /* 让容器不被空白占位的 trick */
}

/* 你的 PostCard 外层 */
.waterfall-card {
  background: #fff;
  /* box-shadow: 0 2px 8px rgba(0,0,0,0.1); */
  /* etc. */
}

:global([data-theme="dark"] .waterfall-card) {
  background: #182235;
}

/* 移动端：不再用瀑布流 */
@media screen and (max-width: 500px) {
  .waterfall-container {
    display: none;
  }
}

.pagination-container {
  /* margin-top: 20px; */
  text-align: center;

  span{
    /* 文字居中 */
    display: inline-block;
    vertical-align: middle;
  }
}

.load-more-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  background-color: #2d96bd;
  color: #fff;
  border: 1px solid transparent;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 10px;
  transition: transform 0.3s ease-in-out, background-color 0.3s ease;
}

.load-more-btn:hover {
  transform: scale(1.05);
}

.load-more-btn img {
  /* 图片与文字的间距 */
  margin-left: 10px;
  height: 20px; /* 调整图片高度适配按钮 */
}

.load-more-btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.loading-btn {
  background-color: #fff;
  color: #2d96bd;
  border-color: #2d96bd;
}

:global([data-theme="dark"] .section-tabs .tab-control) {
  background: #182235;
}

:global([data-theme="dark"] .section-tabs .tab-btn) {
  color: #d8e2ec;
}

:global([data-theme="dark"] .section-tabs .tab-btn:hover) {
  background: rgba(255, 255, 255, 0.06);
}

:global([data-theme="dark"] .section-tabs .tab-btn.active) {
  background: #233149;
  color: #7dd3fc;
  box-shadow: none;
}

@media screen and (max-width: 500px) {
  .section-tabs {
    width: calc(100% - 24px);
    margin-bottom: 18px;
  }

  .tab-btn {
    min-height: 36px;
    padding: 0 8px;
    gap: 6px;
    font-size: 13px;
  }

  .tab-btn small {
    font-size: 11px;
  }

  .gossip-list {
    gap: 10px;
    padding: 0 12px;
  }
}

</style>
