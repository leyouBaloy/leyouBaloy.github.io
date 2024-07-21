<template>
  <main>
    <div class="content">
      <n-avatar :round="true" :size="100" src="https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/avatar.jpg" :bordered="true" />
      <span class="name">Bailey</span>
      <span class="zym">读万卷书，行万里路</span>
      <div ref="navPlaceholder" class="nav-placeholder"></div>
      <Nav :expandNav="expandNav"></Nav>



      <div class="posts">
        <n-divider></n-divider>
        <div v-for="post in posts" :key="post.title">
          <PostCard :title="post.title" :content="post.excerpt" :time="new Date(post.date).toLocaleDateString()"
            :tag="post.tag ? post.tag[0] : undefined" :img="post.img" :path="`/post/${post.file}`" :id="post.title" />
          <n-divider></n-divider>

        </div>

      </div>
      <n-pagination class="pagination" size="large" v-model:page="numPage" :page-count="pageCount" @update:page="loadMarkdownMetadata" :page-slot="7" />
      <Foot></Foot>
      <n-back-top :right="10" :bottom="100"/>
    </div>
    
  </main>
 
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import axios from 'axios';
import { NAvatar, NDivider, NPagination,NBackTop,NAlert } from 'naive-ui';
import Nav from "@/components/Nav.vue";
import Foot from "@/components/Foot.vue";
import PostCard from "@/components/PostCard.vue";
import type { PostMetadata } from "@/types/PostMetadata.ts";

// const isNavFixed = ref(false);
// const isNavBlur = ref(false);
const expandNav = ref(false);
const nav = ref<HTMLElement | null>(null);
const navPlaceholder = ref<HTMLElement | null>(null);

const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.intersectionRatio === 0) {
      // isNavFixed.value = true;
      // isNavBlur.value = true;
      expandNav.value = true;
    } else {
      // isNavFixed.value = false;
      // isNavBlur.value = false;
      expandNav.value = false;
    }
  },
  {
    threshold: [0, 1]
  }
);

onMounted(() => {
  if (navPlaceholder.value) {
    observer.observe(navPlaceholder.value);
  }
});

onBeforeUnmount(() => {
  if (navPlaceholder.value) {
    observer.unobserve(navPlaceholder.value);
  }
});

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
  max-width: 768px;
  margin: auto;
  /* align-items: center; */
  /* margin: auto; */
  /* padding: 20px; */
}

.content {
  /* margin: auto; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
}

.posts {
  width: 100%;
}

/* 添加阴影 */
.n-avatar {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin-top: 20px;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
}

.name {
  font-size: 27px;
}

.zym {
  color: #73828c;
  font-size: 17px;
  font-weight: 500;
  margin-bottom: 20px;
}

.scroll-content {
  width: 100%;
}

.nav-placeholder {
  height: 10px;
  /* 占个位置 */
  width: 100%;
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