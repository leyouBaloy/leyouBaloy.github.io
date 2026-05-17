<template>
  <main>
    <PageHead></PageHead>
    <div class="content">
      <section class="media-intro">
        <p class="eyebrow">Reading, travelling, watching, playing</p>
        <h1>见闻录</h1>
        <p class="intro-text">
          把博客里关于书、电影、旅行和游戏的文章收拢在一起。这里不是单纯的清单，更像一条由体验留下的索引。
        </p>
        <div class="stats">
          <div class="stat-item">
            <strong>{{ totalCount }}</strong>
            <span>篇记录</span>
          </div>
          <div class="stat-item">
            <strong>{{ availableTabs.length }}</strong>
            <span>个主题</span>
          </div>
          <div class="stat-item">
            <strong>{{ latestYear }}</strong>
            <span>最近更新</span>
          </div>
        </div>
      </section>

      <div class="media-tabs" role="tablist" aria-label="见闻录分类">
        <button
          v-for="tab in availableTabs"
          :key="tab.key"
          class="tab-btn"
          :class="{ active: activeTab === tab.key }"
          type="button"
          role="tab"
          :aria-selected="activeTab === tab.key"
          @click="activeTab = tab.key"
        >
          <span class="tab-icon">{{ tab.icon }}</span>
          <span>{{ tab.label }}</span>
          <span class="tab-count">{{ getTabCount(tab.key) }}</span>
        </button>
      </div>

      <div class="media-grid">
        <article
          v-for="item in currentMedia"
          :key="item.slug || item.postFile"
          class="media-card"
          tabindex="0"
          @click="goToPost(item)"
          @keydown.enter="goToPost(item)"
        >
          <div class="media-cover" :class="{ fallback: !item.cover }">
            <img v-if="item.cover" :src="item.cover" :alt="item.title" />
            <div v-else class="fallback-cover">
              <span>{{ getCoverMark(item.title) }}</span>
            </div>
            <span class="media-type">{{ item.type || activeTabLabel }}</span>
          </div>
          <div class="media-info">
            <div class="media-meta">
              <time :datetime="item.date">{{ formatDate(item.date) }}</time>
              <span v-if="item.location">{{ item.location }}</span>
            </div>
            <h2 class="media-title">{{ item.title }}</h2>
            <p class="media-excerpt">{{ item.excerpt }}</p>
          </div>
        </article>
      </div>

      <div v-if="currentMedia.length === 0" class="empty-state">
        <p>{{ emptyText }}</p>
      </div>

      <Foot />
      <n-back-top :right="20" :bottom="140" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { NBackTop } from 'naive-ui';
import PageHead from "@/components/PageHead.vue";
import Foot from "@/components/Foot.vue";

type MediaTabKey = 'reading' | 'movies' | 'travels' | 'games';

interface MediaItem {
  title: string;
  excerpt: string;
  cover?: string;
  date: string;
  postFile: string;
  slug?: string;
  type?: string;
  location?: string;
}

type MediaData = Partial<Record<MediaTabKey, MediaItem[]>>;

const router = useRouter();
const activeTab = ref<MediaTabKey>('reading');
const mediaData = ref<MediaData>({});

const tabConfig: Array<{ key: MediaTabKey; label: string; icon: string; emptyText: string }> = [
  { key: 'reading', label: '阅读', icon: '📖', emptyText: '暂无阅读记录' },
  { key: 'movies', label: '观影', icon: '🎬', emptyText: '暂无观影记录' },
  { key: 'travels', label: '行旅', icon: '🧭', emptyText: '暂无行旅记录' },
  { key: 'games', label: '游戏', icon: '🎮', emptyText: '暂无游戏记录' },
];

const getTabCount = (key: MediaTabKey) => mediaData.value[key]?.length || 0;

const availableTabs = computed(() => tabConfig.filter(tab => getTabCount(tab.key) > 0));

const activeTabLabel = computed(() => tabConfig.find(tab => tab.key === activeTab.value)?.label || '记录');

const allMedia = computed(() => availableTabs.value.flatMap(tab => mediaData.value[tab.key] || []));

const totalCount = computed(() => allMedia.value.length);

const latestYear = computed(() => {
  const latest = allMedia.value
    .map(item => new Date(item.date).getFullYear())
    .filter(year => !Number.isNaN(year))
    .sort((a, b) => b - a)[0];
  return latest || '暂无';
});

const currentMedia = computed(() => {
  return [...(mediaData.value[activeTab.value] || [])].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
});

const emptyText = computed(() => {
  return tabConfig.find(tab => tab.key === activeTab.value)?.emptyText || '暂无记录';
});

const formatDate = (date: string) => {
  if (!date) return '';
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return date;
  return parsedDate.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

const getCoverMark = (title: string) => {
  return title.replace(/[《》“”"']/g, '').slice(0, 2);
};

const goToPost = (item: MediaItem) => {
  const target = item.slug || item.postFile;
  if (target) {
    router.push(`/post/${encodeURIComponent(target)}`);
  }
};

const loadMediaData = async () => {
  try {
    const response = await axios.get<MediaData>('/data/media.json');
    mediaData.value = response.data;
    if (!getTabCount(activeTab.value)) {
      activeTab.value = availableTabs.value[0]?.key || 'reading';
    }
  } catch (error) {
    console.error('加载见闻录数据失败:', error);
  }
};

onMounted(() => {
  loadMediaData();
});
</script>

<style scoped>
main {
  max-width: 900px;
  margin: auto;
  min-height: 100vh;
}

.content {
  padding: 20px;
  padding-top: 10px;
}

.media-intro {
  margin: 0 auto 28px;
  padding: 24px 0 8px;
  text-align: center;
}

.eyebrow {
  margin: 0 0 8px;
  color: #7a83a6;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
}

.media-intro h1 {
  margin: 0;
  color: #1f2433;
  font-size: 34px;
  line-height: 1.2;
}

.intro-text {
  max-width: 640px;
  margin: 12px auto 18px;
  color: #5f6678;
  font-size: 15px;
  line-height: 1.8;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  max-width: 520px;
  margin: 0 auto;
}

.stat-item {
  padding: 12px 10px;
  border: 1px solid rgba(106, 119, 160, 0.16);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.78);
}

.stat-item strong,
.stat-item span {
  display: block;
}

.stat-item strong {
  color: #2f3f72;
  font-size: 22px;
  line-height: 1.2;
}

.stat-item span {
  margin-top: 3px;
  color: #7a8194;
  font-size: 12px;
}

.media-tabs {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 40px;
  padding: 8px 14px;
  border: 1px solid rgba(106, 119, 160, 0.16);
  background: #fff;
  border-radius: 8px;
  color: #596174;
  font-size: 14px;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;
}

.tab-btn:hover {
  transform: translateY(-1px);
  border-color: rgba(71, 91, 170, 0.34);
  box-shadow: 0 8px 22px rgba(47, 63, 114, 0.10);
}

.tab-btn.active {
  border-color: transparent;
  background: #2f3f72;
  color: #fff;
  box-shadow: 0 10px 24px rgba(47, 63, 114, 0.24);
}

.tab-icon {
  font-size: 15px;
}

.tab-count {
  min-width: 22px;
  padding: 2px 7px;
  border-radius: 999px;
  background: rgba(89, 97, 116, 0.10);
  font-size: 12px;
}

.tab-btn.active .tab-count {
  background: rgba(255, 255, 255, 0.18);
}

.media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 18px;
}

.media-card {
  min-width: 0;
  overflow: hidden;
  border: 1px solid rgba(106, 119, 160, 0.15);
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(41, 51, 89, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.media-card:hover,
.media-card:focus-visible {
  transform: translateY(-4px);
  border-color: rgba(71, 91, 170, 0.32);
  box-shadow: 0 16px 36px rgba(41, 51, 89, 0.14);
  outline: none;
}

.media-cover {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: #eef1f7;
}

.media-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.25s ease;
}

.media-card:hover .media-cover img {
  transform: scale(1.04);
}

.media-cover.fallback {
  background:
    radial-gradient(circle at 18% 20%, rgba(255, 218, 128, 0.95), transparent 24%),
    radial-gradient(circle at 82% 18%, rgba(94, 186, 172, 0.60), transparent 26%),
    linear-gradient(135deg, #37415f 0%, #72809d 100%);
}

.fallback-cover {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  color: #fff;
  font-size: 34px;
  font-weight: 700;
}

.media-type {
  position: absolute;
  left: 10px;
  bottom: 10px;
  max-width: calc(100% - 20px);
  padding: 4px 8px;
  border-radius: 6px;
  background: rgba(18, 24, 42, 0.72);
  color: #fff;
  font-size: 12px;
  backdrop-filter: blur(4px);
}

.media-info {
  padding: 14px;
}

.media-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  color: #838b9e;
  font-size: 12px;
}

.media-meta span {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.media-title {
  margin: 0 0 8px;
  color: #232838;
  font-size: 16px;
  line-height: 1.42;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.media-excerpt {
  margin: 0;
  color: #646c7f;
  font-size: 13px;
  line-height: 1.65;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 16px;
}

:global([data-theme="dark"] .media-intro h1),
:global([data-theme="dark"] .media-title) {
  color: #edf1ff;
}

:global([data-theme="dark"] .intro-text),
:global([data-theme="dark"] .media-excerpt),
:global([data-theme="dark"] .media-meta),
:global([data-theme="dark"] .eyebrow) {
  color: #adb6d0;
}

:global([data-theme="dark"] .stat-item),
:global([data-theme="dark"] .tab-btn),
:global([data-theme="dark"] .media-card) {
  border-color: rgba(180, 191, 230, 0.16);
  background: rgba(24, 29, 45, 0.92);
}

:global([data-theme="dark"] .stat-item strong) {
  color: #dbe3ff;
}

:global([data-theme="dark"] .stat-item span) {
  color: #aab3cc;
}

:global([data-theme="dark"] .tab-btn) {
  color: #c2c9dc;
}

:global([data-theme="dark"] .tab-btn.active) {
  background: #5a6fc8;
  color: #fff;
}

@media (max-width: 680px) {
  .content {
    padding: 16px;
    padding-top: 8px;
  }

  .media-intro {
    padding-top: 18px;
    text-align: left;
  }

  .media-intro h1 {
    font-size: 28px;
  }

  .intro-text {
    margin-left: 0;
    margin-right: 0;
  }

  .stats {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .stat-item {
    padding: 10px 6px;
    text-align: center;
  }

  .stat-item strong {
    font-size: 19px;
  }

  .media-tabs {
    justify-content: flex-start;
  }

  .media-grid {
    grid-template-columns: 1fr;
  }
}
</style>
