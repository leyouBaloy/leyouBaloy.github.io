<script setup lang="ts">
import { useRoute, RouterView } from 'vue-router'
import { SpeedInsights } from "@vercel/speed-insights/vue"
const route = useRoute()
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" v-if="$route.meta.keepAlive" />
    </keep-alive>
    <component :is="Component" v-if="!$route.meta.keepAlive" />
</router-view>
<SpeedInsights/>
</template>

<style scoped>
* {
  font-family: "lucida grande", "lucida sans unicode", lucida, helvetica, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
}

.footer {
  display: block;
  margin: auto;
}
</style>

<style>
body {
  background-color: #DDD;
}

main {
  background-color: #FFFFFF;
}
</style>

<!-- 评论的样式 -->
<style>
.giscus {
  max-width: 900px;
  margin: auto;
  background-color: #fff;
  /* position: relative; */
  padding: 0 20px;
  box-sizing: border-box;
}

.giscus-frame {
  /* max-width: 860px; */
  margin: auto;
}
</style>