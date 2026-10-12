<template>
  <main>
    <div class="content">
      <section class="links-intro">
        <p class="eyebrow">Friends &amp; Webrings</p>
        <h1>友链</h1>
        <p class="intro-text">海内存知己，天涯若比邻。欢迎交换友链。</p>
      </section>

      <PageLoading v-if="loading" label="友链加载中..." compact />
      <div v-else class="links-grid">
        <a
          v-for="item in links"
          :key="item.url"
          class="glass-card link-card"
          :href="item.url"
          target="_blank"
          rel="noopener"
        >
          <img class="link-avatar" :src="item.avatar" :alt="item.name" loading="lazy" />
          <div class="link-info">
            <h2 class="link-name">{{ item.name }}</h2>
            <p class="link-desc">{{ item.desc }}</p>
          </div>
        </a>
      </div>
      <div v-if="!loading && links.length === 0" class="empty-state">暂无友链</div>

      <section class="glass-card site-info">
        <h2>本站信息</h2>
        <p class="site-tip">点击任意一项即可复制</p>
        <ul>
          <li v-for="row in siteInfo" :key="row.label">
            <span class="label">{{ row.label }}</span>
            <button type="button" class="value" :title="'复制' + row.label" @click="copy(row)">
              {{ row.value }}
            </button>
            <span class="copied" :class="{ show: copied === row.label }">已复制</span>
          </li>
        </ul>
      </section>

      <Foot />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onServerPrefetch } from 'vue';
import { fetchPublicJson } from '@/utils/postData';
import Foot from '@/components/Foot.vue';
import PageLoading from '@/components/PageLoading.vue';

interface FriendLink {
  name: string;
  url: string;
  avatar: string;
  desc: string;
}

const links = ref<FriendLink[]>([]);
const loading = ref(true);
const copied = ref('');

const siteInfo = [
  { label: '名称', value: "Bailey's Blog" },
  { label: '链接', value: 'https://www.imbailey.cn' },
  { label: '描述', value: '记录 AI Agent、前端开发与生活随笔' },
  { label: '头像', value: 'https://www.imbailey.cn/images/avatar.jpg' },
  { label: 'RSS', value: 'https://www.imbailey.cn/rss.xml' },
];

const loadLinks = async () => {
  try {
    loading.value = true;
    links.value = await fetchPublicJson<FriendLink[]>('/data/links.json');
  } catch (error) {
    console.error('加载友链失败:', error);
  } finally {
    loading.value = false;
  }
};

const copy = async (row: { label: string; value: string }) => {
  try {
    await navigator.clipboard.writeText(row.value);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = row.value;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  }
  copied.value = row.label;
  setTimeout(() => { if (copied.value === row.label) copied.value = ''; }, 1500);
};

onServerPrefetch(() => loadLinks());
onMounted(() => {
  if (!links.value.length) loadLinks();
});
</script>

<style scoped>
main { max-width: 900px; margin: auto; min-height: 100vh; }
.content { padding: 20px; padding-top: 10px; }
.links-intro { text-align: center; padding: 24px 0 8px; margin-bottom: 24px; }
.eyebrow { margin: 0 0 8px; color: var(--glass-text-muted); font-size: 12px; font-weight: 700; text-transform: uppercase; }
.links-intro h1 { margin: 0; color: var(--glass-text); font-size: 34px; }
.intro-text { color: var(--glass-text-muted); font-size: 15px; margin: 12px 0 0; }

.glass-card {
  background: var(--glass-bg);
  -webkit-backdrop-filter: var(--glass-blur);
  backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--glass-shadow), var(--glass-highlight);
}

.links-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 18px; }
.link-card {
  display: flex; align-items: center; gap: 14px; padding: 16px;
  text-decoration: none; color: var(--glass-text);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.link-card:hover { transform: translateY(-4px); box-shadow: var(--glass-shadow-hover), var(--glass-highlight); }
.link-avatar { width: 56px; height: 56px; border-radius: 50%; object-fit: cover; flex-shrink: 0; background: rgba(255,255,255,0.6); }
.link-info { min-width: 0; }
.link-name { margin: 0 0 4px; font-size: 16px; font-weight: 700; color: var(--glass-text); }
.link-desc { margin: 0; font-size: 13px; line-height: 1.6; color: var(--glass-text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.empty-state { text-align: center; padding: 40px; color: var(--glass-text-muted); }

.site-info { margin-top: 32px; padding: 20px 24px; color: var(--glass-text); }
.site-info h2 { margin: 0 0 4px; font-size: 18px; }
.site-tip { margin: 0 0 12px; font-size: 12px; color: var(--glass-text-muted); }
.site-info ul { list-style: none; margin: 0; padding: 0; }
.site-info li { display: flex; align-items: center; gap: 10px; padding: 6px 0; flex-wrap: wrap; }
.label { width: 40px; flex-shrink: 0; font-weight: 700; font-size: 14px; }
.value {
  font: inherit; font-size: 14px; color: var(--glass-text); cursor: pointer; text-align: left;
  padding: 4px 10px; border-radius: 8px; border: 1px solid var(--glass-border);
  background: var(--glass-bg-strong); word-break: break-all;
}
.value:hover { box-shadow: var(--glass-shadow); }
.copied { font-size: 12px; color: #2f9e6e; opacity: 0; transition: opacity 0.2s; }
.copied.show { opacity: 1; }

@media (max-width: 680px) {
  .content { padding: 16px; padding-top: 8px; }
  .links-grid { grid-template-columns: 1fr; }
}
</style>
