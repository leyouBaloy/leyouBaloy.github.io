<template>
    <Nav :expandNav="true" ></Nav>
    <main>
        <div class="container">
      <MarkdownRenderer :filename=$route.params.filename />
    </div>
    </main>
    
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import MarkdownRenderer from '../components/MarkdownRenderer.vue';
  import Nav from "@/components/Nav.vue";  
  </script>
  
  <style scoped>
main {
  max-width: 768px;
  margin: auto;
}
.container {
    display: flex;
    /* margin-top: 60px; */
    max-width: 768px;
    padding: 0 20px;
    padding-bottom: 50px;
    margin: auto;
}
  </style>
  