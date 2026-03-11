<template>
  <main>
    <PageHead></PageHead>
    <div class="container">
      <div class="header">
        <h1>文章归档 📚</h1>
        <span class="xz">共发布 {{ totalPosts }} 篇文章 🎉</span>
      </div>
      
      <n-tabs type="segment" animated class="archive-tabs">
        <n-tab-pane name="by-year" tab="📅 按时间">
          <div v-if="sortedPostsByYear.length === 0" class="empty-state">
            <n-empty description="暂无文章">
              <template #extra>
                <n-button type="primary" @click="router.push('/')">去首页看看</n-button>
              </template>
            </n-empty>
          </div>
          <div v-else v-for="yearData in sortedPostsByYear" :key="yearData.year" class="year-section">
            <h2 :id="yearData.year" class="year-title">
              <span class="year-icon">{{ getYearIcon(yearData.year) }}</span>
              {{ yearData.year }}
              <span class="year-count">{{ yearData.posts.length }} 篇</span>
            </h2>
            <timeline>
              <timeline-item 
                v-for="post in yearData.posts" 
                :key="post.file" 
                :content="post.title" 
                :time="post.date"
                :category="getCategory(post)"
                @click="router.push(`/post/${post.file}`)" 
              />
            </timeline>
          </div>
          <div class="anchor" v-if="sortedPostsByYear.length > 0">
            <n-anchor affix :trigger-top="24" :top="88" style="z-index: 1" ignore-gap>
              <n-anchor-link 
                v-for="yearData in sortedPostsByYear" 
                :key="yearData.year" 
                :title="`${yearData.year} (${yearData.posts.length})`"
                :href="`#${yearData.year}`" 
              />
            </n-anchor>
          </div>
        </n-tab-pane>
        
        <n-tab-pane name="by-tag" tab="🏷️ 按类别">
          <div v-if="Object.keys(postsByTag).length === 0" class="empty-state">
            <n-empty description="暂无分类">
              <template #extra>
                <n-button type="primary" @click="router.push('/')">去首页看看</n-button>
              </template>
            </n-empty>
          </div>
          <div v-else v-for="(posts, tag) in postsByTag" :key="tag" class="tag-section">
            <h2 :id="tag" class="tag-title">
              <span class="tag-icon">🏷️</span>
              {{ tag }}
              <span class="tag-count">{{ posts.length }} 篇</span>
            </h2>
            <timeline>
              <timeline-item 
                v-for="post in posts" 
                :key="post.file" 
                :content="post.title" 
                :time="post.date"
                :category="getCategory(post)"
                @click="router.push(`/post/${post.file}`)" 
              />
            </timeline>
          </div>
          <div class="anchor" v-if="Object.keys(postsByTag).length > 0">
            <n-anchor affix :trigger-top="24" :top="88" style="z-index: 1" ignore-gap>
              <n-anchor-link 
                v-for="(posts, tag) in postsByTag" 
                :key="tag" 
                :title="`${tag} (${posts.length})`" 
                :href="`#${tag}`" 
              />
            </n-anchor>
          </div>
        </n-tab-pane>
      </n-tabs>
    </div>
    <Foot></Foot>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Nav from "@/components/Nav.vue";
import Timeline from "@/components/Timeline.vue";
import TimelineItem from "@/components/TimelineItem.vue";
import { NTabs, NTabPane, NBackTop, NAnchor, NAnchorLink, NEmpty, NButton } from "naive-ui";
import type { PostMetadata } from "@/types/PostMetadata.ts";
import PageHead from '@/components/PageHead.vue';
import Foot from '@/components/Foot.vue';

const totalPosts = ref(0);
const postsByYear = ref<Record<string, PostMetadata[]>>({});
const postsByTag = ref<Record<string, PostMetadata[]>>({});
const router = useRouter()

const getYearIcon = (year: string) => {
  const currentYear = new Date().getFullYear();
  const yearNum = parseInt(year);
  if (yearNum === currentYear) return '🌟';
  if (yearNum === currentYear - 1) return '🔥';
  if (yearNum >= currentYear - 3) return '✨';
  return '📅';
};

const getCategory = (post: PostMetadata) => {
  if (post.categories && post.categories.length > 0) {
    return post.categories[0];
  }
  return '';
};

const loadArchivesData = async () => {
  try {
    const postsByYearResponse = await axios.get<Record<string, PostMetadata[]>>('/markdown/metadata/posts_by_year.json');
    postsByYear.value = postsByYearResponse.data;

    const postsByTagResponse = await axios.get<Record<string, PostMetadata[]>>('/markdown/metadata/posts_by_tag.json');
    postsByTag.value = postsByTagResponse.data;

    // 计算总文章数
    totalPosts.value = Object.values(postsByYear.value).flat().length;
  } catch (error) {
    console.error('Error loading archives data:', error.values(postsBy);
  }
};

const sortedPostsByYear = computed(() => {
  return Object.keys(postsByYear.value)
    .sort((a, b) => Number(b) - Number(a))
    .map(year => ({
      year: year,
      posts: postsByYear.value[year]
    }));
});

onMounted(() => {
  loadArchivesData();
});
</script>

<style scoped>
main {
  max-width: 900px;
  margin: auto;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  padding-bottom: 50px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

h1 {
  font-size: 50px;
  font-weight: 900;
  margin-bottom: 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.xz {
  font-size: 15px;
  color: rgb(107 114 128);
  display: block;
}

.archive-tabs {
  width: 100%;
}

.year-section,
.tag-section {
  margin-bottom: 30px;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.year-title,
.tag-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 30px 0 20px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
  border-radius: 12px;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  border-left: 4px solid #667eea;
}

.year-icon,
.tag-icon {
  font-size: 1.3rem;
}

.year-count,
.tag-count {
  margin-left: auto;
  font-size: 0.9rem;
  font-weight: normal;
  color: #6b7280;
  background: #e5e7eb;
  padding: 2px 10px;
  border-radius: 20px;
}

.anchor {
  position: fixed;
  top: 40%;
  right: 10px;
  width: 150px;
}

.empty-state {
  padding: 60px 0;
  text-align: center;
}

/* 移动端适配 */
@media (max-width: 768px) {
  h1 {
    font-size: 36px;
  }
  
  .year-title,
  .tag-title {
    font-size: 1.2rem;
    padding: 8px 15px;
  }
  
  .anchor {
    display: none;
  }
  
  .year-count,
  .tag-count {
    font-size: 0.8rem;
    padding: 2px 8px;
  }
}
</style>
