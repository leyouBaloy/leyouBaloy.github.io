<template>
  <main>

    <PageHead></PageHead>
    <div class="content">
      <div class="posts">
        <!-- <n-divider></n-divider> -->
        <div v-for="post in posts" :key="post.title">
          <PostCard :title="post.title" :content="post.excerpt" :time="new Date(post.date).toLocaleDateString()"
            :tag="post.tags ? post.tags.join(', ') : '未分类'" :img="post.img" :path="`/post/${post.file}`" :id="post.title" />
          <!-- <n-divider></n-divider> -->

        </div>

      </div>
      <n-divider></n-divider>
      <n-pagination class="pagination" size="large" v-model:page="numPage" :page-count="pageCount"
        @update:page="loadMarkdownMetadata" :page-slot="7" />
      <Foot></Foot>
      <n-back-top :right="10" :bottom="100" />
    </div>

  </main>

</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import axios from 'axios';
import { NAvatar, NDivider, NPagination, NBackTop, NAlert } from 'naive-ui';
import Foot from "@/components/Foot.vue";
import PageHead from "@/components/PageHead.vue";
import PostCard from "@/components/PostCard.vue";
import type { PostMetadata } from "@/types/PostMetadata.ts";

// const isNavFixed = ref(false);
// const isNavBlur = ref(false);




// 加载元数据
const posts = ref<PostMetadata[]>([]);
const numPage = ref(1);
const pageCount = ref(10);

const loadMarkdownMetadata = async () => {
  try {
    const response = await axios.get<PostMetadata[]>(`/markdown/metadata/metadata_${numPage.value}.json`);
    posts.value = [...response.data];
    if (response.data.length > 0 && response.data[0].totalPages) {
      pageCount.value = response.data[0].totalPages;
    }

    console.log("posts", posts);
  } catch (error) {
    console.error('Error loading metadata:', error);
  }
};

// const loadMore = () => {
//   currentPage.value += 1;
//   loadMarkdownMetadata();
// };

onMounted(() => {
  loadMarkdownMetadata();
});


// // 实现路由跳转
// import { onBeforeRouteLeave } from "vue-router"
// import { onActivated } from "vue"

// onBeforeRouteLeave((to, from, next) => {
//     //判断跳转的页面是否为post，是的话则储存当前页面的高度
//     if (to.path.startsWith('/post')) {
//         //这里用的session来存的，当然也可以用vuex 或 pinia 或其它方法
//         sessionStorage.setItem('scrollTop', String(window.scrollY) )  
//     } else {
//         // sessionStorage.setItem('scrollTop', String(0)) 
//     }
//     next();
// })
// onActivated(() => {  
//     setTimeout(() => {
//         let savedScrollPosition:number = Number(sessionStorage.getItem('scrollTop'))
//         // console.log('我执行了', scrollPosition);
//         window.scrollTo(0, savedScrollPosition)
//     }, 300)
// })


</script>

<style scoped>
/* flex 布局，垂直分布，水平居中 */
main {
  /* display: flex;
  flex-direction: column; */
  max-width: 900px;
  margin: auto;
  /* align-items: center; */
  /* margin: auto; */
  /* padding: 20px; */
}

.content {
  /* margin: auto; */
  column-count: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 60px;
  padding-top: 40px;
}

.posts {
  column-count: 2;
  column-gap: 20px;
  width: 100%;
}

@media screen and (min-width:500px){
  .content {
  padding-left: 20px;
  padding-right: 20px;
}
}

@media screen and (max-width:500px){
  .posts {
    column-count: 1;
    column-gap: 20px;
  width: 100%;
  }
}

.pagination {
  /* width: 100%; */
  margin: auto;
  margin-bottom: 20px;
}
</style>

<style>
.n-pagination .n-pagination-item {
  --n-item-border-active: 1px solid #2d96bd;
  --n-item-text-color-active: #2d96bd;
  --n-item-text-color-hover: #2d96bd;
}
</style>