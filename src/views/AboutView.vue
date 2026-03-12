<template>
  <main>
    <PageHead></PageHead>
    <div class="container">
      <!-- 关于我 -->
      <section class="about-section">
        <h1 class="section-title">关于我 🧍</h1>
        <p class="intro-text">虽然我们都不喜欢被打标签，但是通过标签可以快速了解一个人。</p>
        <InfoCards></InfoCards>
      </section>

      <!-- 关于本站 -->
      <section class="about-section">
        <h1 class="section-title">关于本站 🌐</h1>
        <div class="site-intro">
          <p>本站是使用 <strong>Vue3 + Naive UI</strong> 开发的纯静态博客。使用 <strong>markdown-it</strong> 插件来对 markdown 文件进行渲染。</p>
          
          <p>该博客借鉴了 <a target="_blank" href="https://github.com/dillonzq/LoveIt">LoveIt</a> 和 <a target="_blank" href="https://skywt.cn/">SkyWT</a>，感谢你们给我提供了许多灵感！❤</p>
          
          <div class="tech-stack">
            <span class="tech-tag">Vue3</span>
            <span class="tech-tag">TypeScript</span>
            <span class="tech-tag">Naive UI</span>
            <span class="tech-tag">Vite</span>
            <span class="tech-tag">Markdown</span>
            <span class="tech-tag">GitHub Pages</span>
          </div>
          
          <div class="blog-history">
            <div class="history-item">
              <span class="year">WordPress</span>
              <span class="desc">最初的博客</span>
            </div>
            <div class="history-item">
              <span class="year">Hexo</span>
              <span class="desc">静态博客</span>
            </div>
            <div class="history-item">
              <span class="year">Hugo</span>
              <span class="desc">Go 语言</span>
            </div>
            <div class="history-item">
              <span class="year">VuePress</span>
              <span class="desc">Vue 驱动</span>
            </div>
            <div class="history-item active">
              <span class="year">自制主题</span>
              <span class="desc">全新开始</span>
            </div>
          </div>
          
          <div class="cta-buttons">
            <a href="https://github.com/leyouBaloy/leyouBaloy.github.io" target="_blank" class="btn btn-primary">
              ⭐ Star 项目
            </a>
            <a href="https://github.com/leyouBaloy" target="_blank" class="btn btn-secondary">
              👨‍💻 关注我
            </a>
          </div>
        </div>
      </section>

      <!-- 技术栈 -->
      <section class="about-section">
        <h1 class="section-title">技术栈 🛠️</h1>
        <div class="skills-grid">
          <div class="skill-card">
            <div class="skill-icon">⚡</div>
            <h3>前端</h3>
            <p>Vue3, TypeScript, Naive UI, Vite</p>
          </div>
          <div class="skill-card">
            <div class="skill-icon">☁️</div>
            <h3>部署</h3>
            <p>GitHub Pages, CI/CD</p>
          </div>
          <div class="skill-card">
            <div class="skill-icon">📝</div>
            <h3>内容</h3>
            <p>Markdown, markdown-it</p>
          </div>
          <div class="skill-card">
            <div class="skill-icon">🔧</div>
            <h3>工具</h3>
            <p>Git, VS Code, Node.js</p>
          </div>
        </div>
      </section>

      <!-- 留言板 -->
      <section class="about-section">
        <h1 class="section-title">留言板 📋</h1>
        <p class="guestbook-tip">有问题或者建议？欢迎留言~</p>
        <div class="comment" ref="scriptContainer"></div>
      </section>

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
  
  await nextTick();
  
  if (scriptContainer.value) {
    scriptContainer.value.appendChild(script);
  }
});
</script>

<style scoped>
main {
  min-height: 100vh;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.about-section {
  margin-bottom: 50px;
  animation: fadeIn 0.6s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 3px solid transparent;
  background: linear-gradient(90deg, #667eea, #764ba2) border-box;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
}

.intro-text {
  font-size: 16px;
  color: #666;
  line-height: 1.8;
  margin-bottom: 30px;
}

.site-intro {
  background: #f8f9fa;
  border-radius: 16px;
  padding: 30px;
  border-left: 4px solid #667eea;
}

.site-intro p {
  margin-bottom: 15px;
  line-height: 1.8;
  color: #444;
}

.site-intro a {
  color: #667eea;
  text-decoration: none;
  transition: color 0.3s;
}

.site-intro a:hover {
  color: #764ba2;
}

.site-intro strong {
  color: #667eea;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 20px 0;
}

.tech-tag {
  padding: 6px 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
}

.blog-history {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 20px 0;
}

.history-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.history-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.2);
}

.history-item.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.history-item .year {
  font-weight: 600;
  font-size: 14px;
}

.history-item .desc {
  font-size: 12px;
  opacity: 0.7;
  margin-top: 4px;
}

.cta-buttons {
  display: flex;
  gap: 15px;
  margin-top: 25px;
}

.btn {
  padding: 12px 28px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
}

.btn-secondary:hover {
  background: #667eea;
  color: white;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
}

.skill-card {
  background: white;
  padding: 25px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.skill-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.2);
}

.skill-icon {
  font-size: 36px;
  margin-bottom: 15px;
}

.skill-card h3 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 16px;
}

.skill-card p {
  margin: 0;
  color: #666;
  font-size: 13px;
}

.guestbook-tip {
  color: #666;
  margin-bottom: 20px;
}

.comment {
  min-height: 200px;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .section-title {
    font-size: 24px;
  }
  
  .site-intro {
    padding: 20px;
  }
  
  .blog-history {
    justify-content: center;
  }
  
  .cta-buttons {
    flex-direction: column;
  }
  
  .btn {
    text-align: center;
  }
}
</style>
