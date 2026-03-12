<template>
  <main>
    <PageHead></PageHead>
    <div class="content">
      
      <!-- Tab 切换 -->
      <div class="media-tabs">
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'all' }"
          @click="activeTab = 'all'"
        >
          全部
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'book' }"
          @click="activeTab = 'book'"
        >
          📚 书籍
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'movie' }"
          @click="activeTab = 'movie'"
        >
          🎬 电影
        </button>
      </div>

      <!-- 书籍卡片 -->
      <div class="media-grid">
        <div 
          v-for="item in filteredMedia" 
          :key="item.file" 
          class="media-card"
          @click="goToPost(item.file)"
        >
          <div class="media-cover">
            <img :src="item.img || defaultCover" :alt="item.title" />
            <div class="media-type-badge">{{ item.type === 'book' ? '📚' : '🎬' }}</div>
          </div>
          <div class="media-info">
            <h3 class="media-title">{{ item.title }}</h3>
            <p class="media-excerpt">{{ item.excerpt }}</p>
            <span class="media-date">{{ formatDate(item.date) }}</span>
          </div>
        </div>
      </div>

      <div v-if="filteredMedia.length === 0" class="empty-state">
        <p>暂无记录</p>
      </div>

      <Foot />
      <n-back-top :right="10" :bottom="100" />
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

const router = useRouter();
const activeTab = ref('all');
const mediaItems = ref<any[]>([]);

// 默认封面
const defaultCover = 'https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/img/default-book.jpg';

// 筛选后的媒体
const filteredMedia = computed(() => {
  if (activeTab.value === 'all') return mediaItems.value;
  return mediaItems.value.filter(item => item.type === activeTab.value);
});

// 跳转文章
const goToPost = (filename: string) => {
  router.push(`/post/${encodeURIComponent(filename)}`);
};

// 格式化日期
const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// 加载书影评数据
const loadMediaData = async () => {
  try {
    // 加载所有 metadata
    const response = await axios.get('/markdown/metadata/posts_by_tag.json');
    const allTags = response.data;
    
    // 收集书影评文章
    const media: any[] = [];
    
    // 检查所有标签下的文章
    for (const tag in allTags) {
      const posts = allTags[tag];
      for (const post of posts) {
        // 通过标题关键词判断是否是书影评
        const title = post.title || '';
        const isBook = title.includes('读后有感') || title.includes('读后感') || title.includes('读书笔记');
        const isMovie = title.includes('观之有感') || title.includes('观后感') || title.includes('影评') || title.includes('剧评');
        
        if (isBook || isMovie) {
          // 查找完整信息
          const detailRes = await axios.get(`/markdown/metadata/metadata_1.json`);
          const allPosts = detailRes.data;
          
          // 尝试从其他页获取完整信息
          for (let i = 1; i <= 28; i++) {
            try {
              const res = await axios.get(`/markdown/metadata/metadata_${i}.json`);
              const found = res.data.find((p: any) => p.file === post.file);
              if (found) {
                media.push({
                  ...found,
                  type: isBook ? 'book' : 'movie'
                });
                break;
              }
            } catch (e) {
              continue;
            }
          }
        }
      }
    }
    
    // 去重并按日期排序
    const uniqueMedia = media.filter((item, index, self) => 
      index === self.findIndex((t) => t.file === item.file)
    );
    
    uniqueMedia.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    mediaItems.value = uniqueMedia;
    
  } catch (error) {
    console.error('加载书影评数据失败:', error);
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

/* Tab 切换 */
.media-tabs {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
}

.tab-btn {
  padding: 10px 24px;
  border: none;
  background: #f5f5f5;
  border-radius: 25px;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #666;
}

.tab-btn:hover {
  background: #e8e8e8;
}

.tab-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

/* 媒体卡片网格 */
.media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.media-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.media-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(102, 126, 234, 0.15);
}

.media-cover {
  position: relative;
  height: 180px;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.media-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.media-type-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.95);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.media-info {
  padding: 20px;
}

.media-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 10px 0;
  color: #333;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.media-excerpt {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin: 0 0 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.media-date {
  font-size: 13px;
  color: #999;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 16px;
}

/* 移动端适配 */
@media (max-width: 600px) {
  .media-tabs {
    gap: 10px;
  }
  
  .tab-btn {
    padding: 8px 16px;
    font-size: 14px;
  }
  
  .media-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
