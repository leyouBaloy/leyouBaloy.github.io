<template>
  <Nav :expandNav="true"></Nav>
  <main>
    <div class="container">
      <MarkdownRenderer :filename=$route.params.filename />
      
    </div>
    <div class="comment" ref="scriptContainer"></div>
  <Foot></Foot>
  </main>
  
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue';
import MarkdownRenderer from '../components/MarkdownRenderer.vue';
import Nav from "@/components/Nav.vue";
import { useRoute } from 'vue-router';
import Foot from "@/components/Foot.vue";
const $route = useRoute();

const scriptContainer = ref(null);

onMounted(async () => {
  

  const script = document.createElement('script');
  script.src = "https://giscus.app/client.js";
  script.dataset.repo = "leyoubaloy/leyoubaloy.github.io";
  script.dataset.repoId = "R_kgDOGv-zPA";
  script.dataset.category = "Announcements";
  script.dataset.categoryId = "DIC_kwDOGv-zPM4ChJ8X";
  script.dataset.mapping = "pathname";
  script.dataset.strict = "0";
  script.dataset.reactionsEnabled = "1";
  script.dataset.emitMetadata = "0";
  script.dataset.inputPosition = "bottom";
  script.dataset.theme = "preferred_color_scheme";
  script.dataset.lang = "zh-CN";
  script.crossOrigin = "anonymous";
  script.async = true;

  scriptContainer.value.appendChild(script);
});
</script>

<style scoped>
main {
  max-width: 900px;
  margin: auto;
}

.container {
  display: flex;
  /* margin-top: 60px; */
  max-width: 768px;
  padding: 0 20px;
  padding-bottom: 20px;
  margin: auto;
}
</style>