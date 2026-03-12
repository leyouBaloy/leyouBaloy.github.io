<template>
  <main>
    <PageHead></PageHead>
    <div class="content">
      
      <!-- Tab 切换 -->
      <div class="media-tabs">
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'reading' }"
          @click="activeTab = 'reading'"
        >
          📖 在读
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'wantToRead' }"
          @click="activeTab = 'wantToRead'"
        >
          📚 想读
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'finished' }"
          @click="activeTab = 'finished'"
        >
          ✅ 读过
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'movie' }"
          @click="activeTab = 'movie'"
        >
          🎬 电影
        </button>
      </div>

      <!-- 媒体卡片 -->
      <div class="media-grid">
        <div 
          v-for="item in currentMedia" 
          :key="item.postFile" 
          class="media-card"
          @click="goToPost(item.postFile)"
        >
          <div class="media-cover">
            <img :src="item.cover || defaultCover" :alt="item.title" />
          </div>
          <div class="media-info">
            <h3 class="media-title">{{ item.title }}</h3>
            <p class="media-excerpt">{{ item.excerpt }}</p>
          </div>
        </div>
      </div>

      <div v-if="currentMedia.length === 0" class="empty-state">
        <p>{{ emptyText }}</p>
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
const activeTab = ref('reading');
const mediaData = ref<any>({});

// 默认封面
const defaultCover = 'https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/img/default-book.jpg';

// 当前显示的媒体
const currentMedia = computed(() => {
  if (activeTab.value === 'movie') {
    return mediaData.value.movies || [];
  }
  return mediaData.value[activeTab.value] || [];
});

// 空状态提示
const emptyText = computed(() => {
  const texts: Record<string, string> = {
    reading: '暂无在读书籍',
    wantToRead: '暂无想读书籍',
    finished: '暂无读过书籍',
    movie: '暂无电影记录'
  };
  return texts[activeTab.value] || '暂无记录';
});

// 跳转文章
const goToPost = (filename: string) => {
  if (filename) {
    router.push(`/post/${encodeURIComponent(filename)}`);
  }
};

// 加载书影评数据 - 从 media.json 读取
const loadMediaData = async () => {
  try {
    const response = await axios.get('/data/media.json');
    mediaData.value = response.data;
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
  gap: 12px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 10px 20px;
  border: none;
  background: #f5f5f5;
  border-radius: 25px;
  font-size: 14px;
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

/* 媒体卡片网格 - 竖向海报式 */
.media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 20px;
  justify-items: center;
}

.media-card {
  width: 160px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.media-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 30px rgba(102, 126, 234, 0.2);
}

.media-cover {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.media-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.media-info {
  padding: 12px;
}

.media-title {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 6px 0;
  color: #333;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: center;
}

.media-excerpt {
  font-size: 12px;
  color: #888;
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: center;
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
    gap: 8px;
  }
  
  .tab-btn {
    padding: 8px 14px;
    font-size: 13px;
  }
  
  .media-grid {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 15px;
  }
  
  .media-card {
    width: 130px;
  }
  
  .media-cover {
    height: 180px;
  }
}
</style>
