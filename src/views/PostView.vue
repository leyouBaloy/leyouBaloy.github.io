<template>
  <Nav :expandNav="true"></Nav>
  <main>
    <div class="container">
      <MarkdownRenderer :filename=$route.params.filename />
      
    </div>
  </main>
  <div id="comment-section"></div>
</template>

<script setup>
import { nextTick, onMounted } from 'vue';
import MarkdownRenderer from '../components/MarkdownRenderer.vue';
import Nav from "@/components/Nav.vue";
import { useRoute } from 'vue-router';
const $route = useRoute();

onMounted(async () => {
  await nextTick();
  const script = document.createElement('script');
  script.src = "https://beaudar.lipk.org/client.js";
  script.setAttribute('repo', 'leyouBaloy/leyouBaloy.github.io');
  script.setAttribute('issue-term', 'pathname');
  script.setAttribute('theme', 'github-light');
  script.setAttribute('crossorigin', 'anonymous');
  script.async = true;

  const commentSection = document.getElementById('comment-section');
  if (commentSection) {
    commentSection.appendChild(script);
  } else {
    console.error('Cannot find comment-section element.');
  }
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