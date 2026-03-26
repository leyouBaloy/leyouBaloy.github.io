<template>
  <main>
    <PageHead></PageHead>
    <div class="container">
      <div class="header">
        <h1>文章归档 📚</h1>
        <span class="xz">共发布 {{ totalPosts }} 篇文章 🎉</span>
      </div>

      <!-- 搜索框 -->
      <div class="search-box">
        <n-input
          v-model:value="searchQuery"
          placeholder="🔍 搜索文章标题或标签..."
          clearable
          size="large"
          @update:value="handleSearch"
        >
          <template #prefix>
            <n-icon><SearchOutline /></n-icon>
          </template>
        </n-input>
      </div>
      
      <n-tabs type="segment" animated class="archive-tabs">
        <n-tab-pane name="by-year" tab="📅 按时间">
          <div v-if="filteredPostsByYear.length === 0" class="empty-state">
            <n-empty :description="searchQuery ? '没有找到匹配的文章' : '暂无文章'">
              <template #extra>
                <n-button type="primary" @click="router.push('/')">去首页看看</n-button>
              </template>
            </n-empty>
          </div>
          <div v-else v-for="yearData in filteredPostsByYear" :key="yearData.year" class="year-section">
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
                :tags="getTags(post)"
                @click="router.push(`/post/${post.slug}`)" 
              />
            </timeline>
          </div>
          <div class="anchor" v-if="filteredPostsByYear.length > 0">
            <n-anchor affix :trigger-top="24" :top="88" style="z-index: 1" ignore-gap>
              <n-anchor-link 
                v-for="yearData in filteredPostsByYear" 
                :key="yearData.year" 
                :title="`${yearData.year} (${yearData.posts.length})`"
                :href="`#${yearData.year}`" 
              />
            </n-anchor>
          </div>
        </n-tab-pane>
        
        <n-tab-pane name="by-tag" tab="🏷️ 按标签">
          <!-- 标签云 -->
          <div class="tag-cloud" v-if="allTags.length > 0">
            <n-tag
              v-for="tag in allTags"
              :key="tag.name"
              :type="tag.type"
              size="medium"
              :bordered="false"
              :closable="false"
              class="tag-item"
              :class="{ 'tag-active': selectedTag === tag.name }"
              @click="toggleTag(tag.name)"
            >
              {{ tag.name }} ({{ tag.count }})
            </n-tag>
          </div>

          <!-- 清除标签选择 -->
          <div class="clear-tag" v-if="selectedTag" @click="toggleTag(null)">
            <n-button size="small" quaternary>
              ✨ 清除筛选: {{ selectedTag }}
            </n-button>
          </div>
          
          <div v-if="Object.keys(postsByTag).length === 0" class="empty-state">
            <n-empty description="暂无标签">
              <template #extra>
                <n-button type="primary" @click="router.push('/')">去首页看看</n-button>
              </template>
            </n-empty>
          </div>
          <div v-else-if="selectedTag && !postsByTag[selectedTag]" class="empty-state">
            <n-empty description="没有找到这个标签的文章">
              <template #extra>
                <n-button @click="toggleTag(null)">查看全部</n-button>
              </template>
            </n-empty>
          </div>
          <div v-else v-for="(posts, tag) in displayPostsByTag" :key="tag" class="tag-section">
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
                :tags="getTags(post)"
                @click="router.push(`/post/${post.slug}`)" 
              />
            </timeline>
          </div>
          <div class="anchor" v-if="!selectedTag && Object.keys(postsByTag).length > 0">
            <n-anchor affix :trigger-top="24" :top="88" style="z-index: 1" ignore-gap>
              <n-anchor-link 
                v-for="(posts, tag) in postsByTag" 
                :key="tag" 
                :title="`🏷️ ${tag} (${posts.length})`" 
                :href="`#${tag}`" 
              />
            </n-anchor>
          </div>
        </n-tab-pane>

        <n-tab-pane name="search" tab="🔎 搜索结果">
          <div v-if="!searchQuery" class="empty-state">
            <n-empty description="请在上方输入关键词搜索">
              <template #extra>
                <span class="hint">支持搜索文章标题和标签</span>
              </template>
            </n-empty>
          </div>
          <div v-else-if="searchResults.length === 0" class="empty-state">
            <n-empty :description="`没有找到包含「${searchQuery}」的文章`">
              <template #extra>
                <n-button @click="searchQuery = ''">清除搜索</n-button>
              </template>
            </n-empty>
          </div>
          <div v-else>
            <div class="search-results-header">
              找到 <strong>{{ searchResults.length }}</strong> 篇相关文章
            </div>
            <timeline>
              <timeline-item 
                v-for="post in searchResults" 
                :key="post.file" 
                :content="post.title" 
                :time="post.date"
                :category="getCategory(post)"
                :tags="getTags(post)"
                highlight
                :search-keyword="searchQuery"
                @click="router.push(`/post/${post.slug}`)" 
              />
            </timeline>
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
import Timeline from "@/components/Timeline.vue";
import TimelineItem from "@/components/TimelineItem.vue";
import { NTabs, NTabPane, NEmpty, NButton, NInput, NIcon, NTag } from "naive-ui";
import { SearchOutline } from '@vicons/ionicons5';
import type { PostMetadata } from "@/types/PostMetadata.ts";
import PageHead from '@/components/PageHead.vue';
import Foot from '@/components/Foot.vue';

const totalPosts = ref(0);
const postsByYear = ref<Record<string, PostMetadata[]>>({});
const postsByTag = ref<Record<string, PostMetadata[]>>({});
const allPosts = ref<PostMetadata[]>([]);
const router = useRouter();
const searchQuery = ref('');
const selectedTag = ref<string | null>(null);

// 标签类型映射
const tagTypes: Array<'success' | 'info' | 'warning' | 'error' | 'default'> = ['success', 'info', 'warning', 'error', 'default'];

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

const getTags = (post: PostMetadata) => {
  // 尝试从 metadata 中获取 tags
  if (post.tags && post.tags.length > 0) {
    return post.tags;
  }
  // 如果没有 tags，使用 categories 作为 tags
  if (post.categories && post.categories.length > 0) {
    return post.categories;
  }
  return [];
};

const toggleTag = (tag: string | null) => {
  selectedTag.value = tag;
};

// 生成所有标签列表（带样式）
const allTags = computed(() => {
  const tags: Array<{name: string, count: number, type: 'success' | 'info' | 'warning' | 'error' | 'default'}> = [];
  const tagNames = Object.keys(postsByTag.value);
  
  // 找出最大和最小数量用于计算权重
  const counts = tagNames.map(t => postsByTag.value[t].length);
  const maxCount = Math.max(...counts);
  const minCount = Math.min(...counts);
  
  tagNames.forEach((tag, index) => {
    const count = postsByTag.value[tag].length;
    // 根据文章数量计算权重
    let weight = 1;
    if (maxCount > minCount) {
      weight = Math.round(((count - minCount) / (maxCount - minCount)) * 4) + 1;
    }
    tags.push({
      name: tag,
      count: count,
      type: tagTypes[weight % tagTypes.length]
    });
  });
  
  // 按数量排序
  return tags.sort((a, b) => b.count - a.count);
});

// 根据选中的标签显示文章
const displayPostsByTag = computed(() => {
  if (selectedTag.value && postsByTag.value[selectedTag.value]) {
    return { [selectedTag.value]: postsByTag.value[selectedTag.value] };
  }
  return postsByTag.value;
});

// 搜索功能
const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return [];
  
  const query = searchQuery.value.toLowerCase();
  return allPosts.value.filter(post => {
    // 搜索标题
    if (post.title && post.title.toLowerCase().includes(query)) return true;
    // 搜索标签
    const tags = getTags(post);
    if (tags && tags.some((tag: string) => tag.toLowerCase().includes(query))) return true;
    return false;
  });
});

// 按年份筛选
const filteredPostsByYear = computed(() => {
  let posts = Object.keys(postsByYear.value)
    .sort((a, b) => Number(b) - Number(a))
    .map(year => ({
      year: year,
      posts: postsByYear.value[year]
    }));
  
  // 如果有搜索词，进一步筛选
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    posts = posts.map(yearData => ({
      ...yearData,
      posts: yearData.posts.filter(post => {
        if (post.title && post.title.toLowerCase().includes(query)) return true;
        const tags = getTags(post);
        if (tags && tags.some((tag: string) => tag.toLowerCase().includes(query))) return true;
        return false;
      })
    })).filter(yearData => yearData.posts.length > 0);
  }
  
  return posts;
});

const handleSearch = (value: string) => {
  // 可以在这里添加额外的搜索逻辑
};

const loadArchivesData = async () => {
  try {
    const postsByYearResponse = await axios.get<Record<string, PostMetadata[]>>('/markdown/metadata/posts_by_year.json');
    postsByYear.value = postsByYearResponse.data;

    const postsByTagResponse = await axios.get<Record<string, PostMetadata[]>>('/markdown/metadata/posts_by_tag.json');
    postsByTag.value = postsByTagResponse.data;

    // 获取所有文章用于搜索
    const allMetadata: PostMetadata[] = [];
    const keys = Object.keys(postsByYear.value);
    for (const key of keys) {
      allMetadata.push(...postsByYear.value[key]);
    }
    allPosts.value = allMetadata;

    // 计算总文章数
    totalPosts.value = allMetadata.length;
  } catch (error) {
    console.error('Error loading archives data:', error);
  }
};

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
  margin-bottom: 20px;
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

.search-box {
  width: 100%;
  max-width: 500px;
  margin-bottom: 20px;
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

/* 标签云样式 */
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px;
  margin-bottom: 20px;
  justify-content: center;
}

.tag-item {
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
}

.tag-item:hover {
  transform: scale(1.1);
}

.tag-active {
  box-shadow: 0 0 0 2px #667eea;
}

.clear-tag {
  text-align: center;
  margin-bottom: 20px;
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

.search-results-header {
  padding: 15px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 16px;
}

.hint {
  color: #666;
  font-size: 14px;
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
  
  .tag-cloud {
    padding: 10px;
  }
  
  .tag-item {
    font-size: 12px;
  }
}
</style>
