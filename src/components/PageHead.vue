<template>
    <div class="bg">
      <div class="header-content">
        <div class="avatar-wrapper">
          <n-avatar 
            :round="true" 
            :size="120" 
            src="https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/avatar.jpg"
            :bordered="true"
            class="avatar"
          />
          <div class="avatar-ring"></div>
        </div>
        
        <h1 class="name">Bailey</h1>
        <p class="zym">读万卷书，行万里路</p>
        
        <div class="social-links">
          <a href="https://github.com/leyouBaloy" target="_blank" class="social-icon" title="GitHub">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="mailto:sunbaile@foxmail.com" class="social-icon" title="Email">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
            </svg>
          </a>
        </div>
      </div>
      
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
      expandNav.value = true;
    } else {
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
  background-image: url('../assets/bg3.jpeg');
  background-position: center;
  background-size: cover;
  padding-bottom: 40px;
  padding-top: 60px;
  position: relative;
}

.bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
  pointer-events: none;
}

.header-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeInUp 0.8s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.avatar-wrapper {
  position: relative;
  margin-bottom: 20px;
}

.avatar {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  z-index: 2;
  animation: avatarFadeIn 0.8s ease forwards;
  opacity: 0;
  transform: scale(0.8);
}

@keyframes avatarFadeIn {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.avatar:hover {
  transform: scale(1.08);
  box-shadow: 0 12px 40px rgba(102, 126, 234, 0.4);
}

.avatar-ring {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%);
  background-size: 200% 200%;
  animation: gradientMove 3s ease-in-out infinite, breathe 2s ease-in-out infinite;
  opacity: 0.4;
}

@keyframes gradientMove {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes breathe {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.02);
  }
}

.name {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 8px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 2px;
  animation: nameFadeIn 0.6s ease forwards;
  opacity: 0;
  transform: translateY(10px);
}

@keyframes nameFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.zym {
  font-size: 16px;
  color: #666;
  margin: 0 0 20px 0;
  font-style: italic;
  position: relative;
  padding: 0 20px;
  animation: nameFadeIn 0.6s ease forwards;
  animation-delay: 0.2s;
  opacity: 0;
  transform: translateY(10px);
}

.zym::before,
.zym::after {
  content: '"';
  font-size: 20px;
  color: #667eea;
  opacity: 0.5;
}

.social-links {
  display: flex;
  gap: 16px;
  margin-top: 10px;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(20px);
  animation: slideUpFade 0.6s ease forwards;
}

.social-icon:nth-child(1) {
  animation-delay: 0.3s;
}

.social-icon:nth-child(2) {
  animation-delay: 0.4s;
}

@keyframes slideUpFade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.social-icon:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  color: #667eea;
  background: white;
}

.social-icon svg {
  width: 22px;
  height: 22px;
}

.nav-placeholder {
  height: 10px;
  width: 100%;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .name {
    font-size: 26px;
  }
  
  .zym {
    font-size: 14px;
    padding: 0 15px;
  }
  
  .avatar-wrapper :deep(.n-avatar) {
    --n-size: 100px !important;
  }
  
  .social-icon {
    width: 40px;
    height: 40px;
  }
  
  .social-icon svg {
    width: 20px;
    height: 20px;
  }
}
</style>
