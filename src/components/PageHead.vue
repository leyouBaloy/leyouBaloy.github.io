<template>
    <div class="bg">
      <n-avatar :round="true" :size="100" src="https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/avatar.jpg"
        :bordered="true" />
      <span class="name">Bailey</span>
      <span class="zym">读万卷书，行万里路</span>
      <div ref="navPlaceholder" class="nav-placeholder"></div>
      <Nav :expandNav="expandNav"></Nav>
    </div>
</template>

<script setup lang="ts">

import { NAvatar} from 'naive-ui';
import Nav from "@/components/Nav.vue";
import { ref, onMounted, onBeforeUnmount } from 'vue';

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

</script>

<style scoped>
.bg {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-image: url('../assets/bg2.avif'); */
  background-image: url('../assets/bg3.jpeg');
  background-position: center;
  background-size: cover;
  padding-bottom: 60px;
  padding-top: 60px;
}

.name {
  font-size: 27px;
  /* background-color: #ffffff3c; */
  /* background-color: rgba(255, 255, 255, 0.5); */
  /* color:#fff; */
}

.zym {
  /* color: #73828c; */
  /* color: #fff; */
  /* background-color: #2a29293c; */
  font-size: 17px;
  font-weight: 500;
  margin-bottom: 20px;
}

.nav-placeholder {
  height: 10px;
  /* 占个位置 */
  width: 100%;
}

.n-avatar {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin-top: 20px;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
}

</style>