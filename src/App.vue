<script setup lang="ts">
import { useRoute, RouterView } from 'vue-router'
const route = useRoute()
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" v-if="$route.meta.keepAlive" />
    </keep-alive>
    <component :is="Component" v-if="!$route.meta.keepAlive" />
</router-view>
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