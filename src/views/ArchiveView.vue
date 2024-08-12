<template>
  <main>
    <PageHead></PageHead>
    <div class="container">
      <h1>文章归档📚</h1>
      <span class="xz">共发布 {{ totalPosts }} 篇文章 📕</span>
      <n-tabs type="segment" animated>
        <n-tab-pane name="by-year" tab="按照时间">
          <div v-for="yearData in sortedPostsByYear" :key="yearData.year">
            <h2 :id="yearData.year">{{ yearData.year }}</h2>
            <timeline>
              <timeline-item v-for="post in yearData.posts" :key="post.file" :content="post.title" :time="post.date"
                @click="router.push(`/post/${post.file}`)" />
            </timeline>
          </div>
          <div class="anchor">
            <n-anchor affix :trigger-top="24" :top="88" style="z-index: 1" ignore-gap>
              <n-anchor-link v-for="yearData in sortedPostsByYear" :key="yearData.year" :title="yearData.year"
                :href="`#${yearData.year}`" />
            </n-anchor>
          </div>
        </n-tab-pane>
        <n-tab-pane name="by-tag" tab="按照类别">
          <div v-for="(posts, tag) in postsByTag" :key="tag">
            <h2 :id="tag">{{ tag }}</h2>
            <timeline>
              <timeline-item v-for="post in posts" :key="post.file" :content="post.title" :time="post.date"
              @click="router.push(`/post/${post.file}`)" />
            </timeline>
          </div>
          <div class="anchor">
            <n-anchor affix :trigger-top="24" :top="88" style="z-index: 1" ignore-gap>
              <n-anchor-link v-for="(posts, tag) in postsByTag" :key="tag" :title="tag" :href="`#${tag}`" />
            </n-anchor>
          </div>
        </n-tab-pane>
      </n-tabs>
    </div>
    <Foot></Foot>
  </main>
  <!-- <n-back-top :right="100" /> -->
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Nav from "@/components/Nav.vue";
import Timeline from "@/components/Timeline.vue";
import TimelineItem from "@/components/TimelineItem.vue";
import { NTabs, NTabPane, NBackTop, NAnchor, NAnchorLink } from "naive-ui";
import type { PostMetadata } from "@/types/PostMetadata.ts";
import PageHead from '@/components/PageHead.vue';
import Foot from '@/components/Foot.vue';

const totalPosts = ref(0);
const postsByYear = ref<Record<string, PostMetadata[]>>({});
const postsByTag = ref<Record<string, PostMetadata[]>>({});
const router = useRouter()

const loadArchivesData = async () => {
  try {
    const postsByYearResponse = await axios.get<Record<string, PostMetadata[]>>('/markdown/metadata/posts_by_year.json');
    postsByYear.value = postsByYearResponse.data;

    const postsByTagResponse = await axios.get<Record<string, PostMetadata[]>>('/markdown/metadata/posts_by_tag.json');
    postsByTag.value = postsByTagResponse.data;

    // 计算总文章数
    totalPosts.value = Object.values(postsByYear.value).flat().length;
  } catch (error) {
    console.error('Error loading archives data:', error);
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
  /* margin-top: 60px; */
  /* width: 100%; */
  align-items: center;
  padding: 0 20px;
  padding-bottom: 50px;
  /* margin: auto; */
}

.anchor {
  position: fixed;
  top: 40%;
  /* 可以根据需要调整 */
  right: 10px;
  /* 可以根据需要调整 */
  width: 150px;
}

h1 {
  font-size: 50px;
  font-weight: 900;
  margin-bottom: 10px;
}

.xz {
  font-size: 15px;
  color: rgb(107 114 128);
  margin-bottom: 10px;
}

h2 {
  margin-top: 20px;
}
</style>
