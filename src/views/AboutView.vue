<template>
  <main>
    <PageHead></PageHead>
    <div class="container">
      <h1>关于我🧍</h1>
      <p>虽然我们都不喜欢被打标签...但是通过标签可以快速了解一个人。</p>
      <InfoCards></InfoCards>
      <!-- <SocialMedia class="SocialMedia"></SocialMedia> -->
      <h1>关于本站🌐</h1>
      <p>本站是使用 Vue3 + Naive UI 开发的纯静态博客。使用markdown-it插件来对markdown文件进行渲染。</p>
      <p>该博客借鉴了<a target="_blank"href="https://github.com/dillonzq/LoveIt">LoveIt</a>和<a target="_blank" href="https://skywt.cn/">SkyWT</a>，感谢你们给我提供了许多灵感！❤</p>
      <!-- <p>六年前，我上高二的时候就开始做博客了，之后几乎每年我都会我认为最新的技术和最好看的样式折腾一段时间，最开始是WordPress，接着是Hexo，Hugo，VuePress...也用过像Butterfly，LoveIt等优秀的主题。别人做的东西好是好，但总是觉得有很多地方不满意，所以干脆自己从头做一个！</p> -->
      <p>如果你觉得我做的还不错，可以点个star哦！在未来我会把它封装成主题，让更多的人可以使用~🤝</p>
      <p>更多技术细节可以查看：<a target="_blank" href="https://github.com/leyouBaloy/leyouBaloy.github.io">项目地址</a></p>
      <h1>留言板📋</h1>
      <div class="comment" ref="scriptContainer"></div>
      <Foot></Foot>
    </div>

  </main>
  
</template>

<script setup>
import Nav from "@/components/Nav.vue";
import InfoCards from "@/components/InfoCards.vue";
import SocialMedia from "@/components/SocialMedia.vue";
import { onMounted, nextTick, ref } from "vue";
import PageHead from "@/components/PageHead.vue";
import Foot from "@/components/Foot.vue";

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
  flex-direction: column;
  /* width: 100%; */
  /* max-width: ; */
  padding: 0 20px;
  align-items: center;
  /* padding-bottom: 50px; */
}

h1 {
  font-size: 50px;
  font-weight: 900;
  margin-bottom: 10px;
}

p{
  color: #73828c;
  font-size: 17px;
  font-weight: 500;
  text-indent: 0;
  margin-bottom: 20px;
  margin-top: 0;
  /* text-indent: 2em; */
  text-align: center;
}

a {
  /* 去除下划线 */
  text-decoration: none;
  color: #2d96bd;
}

.SocialMedia {
  margin-top: 20px;
}

.comment{
  width: 100%;
  padding: 0 20px;
}

</style>

