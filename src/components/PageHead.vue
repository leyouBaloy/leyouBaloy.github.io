<template>
  <div ref="headerRef" class="bg">
    <!-- 纯 CSS 3D 卫星轨道动画背景 -->
    <div id="space">
      <div class="space_field_wrapper">
        <div class="space_field mother">
          <div class="planet">
            <div v-if="showBailey" class="avatar-wrapper">
              <img :src="avatarUrl" class="avatar-img" alt="Bailey avatar">
            </div>
          </div>
        </div>
      </div>
      <div
        v-for="i in orbitCount"
        :key="'w' + i"
        class="space_field_wrapper satellite-wrapper"
        :style="getOrbitStyle(i)"
      >
        <div class="space_field satellite">
          <div class="planet"></div>
        </div>
      </div>
    </div>

    <!-- 控制面板按钮 -->
    <button class="control-toggle" @click="showControls = !showControls">
      ⚙️
    </button>

    <!-- 控制面板 -->
    <div v-show="showControls" class="control-panel">
      <div class="control-header">
        <span>宇宙设置</span>
        <button class="control-close" @click="showControls = false">✕</button>
      </div>

      <div class="control-section">
        <div class="control-group">
          <label>轨道数量 <span class="value">{{ orbitCount }}</span></label>
          <input type="range" v-model.number="orbitCount" min="1" max="8" step="1">
        </div>
        <div class="control-group checkbox-group">
          <input type="checkbox" v-model="showBailey" id="showBailey">
          <label for="showBailey">显示头像</label>
        </div>
      </div>

      <button class="btn-reset" @click="resetSettings">恢复默认</button>
    </div>

    <!-- 名字+座右铭 -->
    <div class="header-content">
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

    <div ref="navShell" class="nav-shell">
      <Nav :expandNav="expandNav"></Nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import Nav from "@/components/Nav.vue";
import avatarUrl from "@/assets/avatar.jpg";
import { ref, onMounted, onBeforeUnmount } from 'vue';

const expandNav = ref(false);
const headerRef = ref<HTMLElement | null>(null);
const navShell = ref<HTMLElement | null>(null);

// 控制面板
const showControls = ref(false);
const orbitCount = ref(3);
const showBailey = ref(true);

const resetSettings = () => {
  orbitCount.value = 3;
  showBailey.value = true;
};

const satelliteColors = [
  'rgba(255, 100, 150, 1)',
  'rgba(100, 255, 150, 1)',
  'rgba(150, 100, 255, 1)',
  'rgba(255, 200, 100, 1)',
  'rgba(100, 200, 255, 1)',
  'rgba(200, 100, 200, 1)',
  'rgba(255, 150, 200, 1)',
  'rgba(150, 255, 200, 1)',
];

const getOrbitStyle = (index: number): Record<string, string> => ({
  '--orbit-angle': `${(index - 1) * -22}deg`,
  '--orbit-duration': `${2200 + (index - 1) * 420}ms`,
  '--planet-color': satelliteColors[(index - 1) % satelliteColors.length],
});

const updateNavMode = () => {
  if (!headerRef.value || !navShell.value) return;
  const navOffset = window.innerWidth <= 520 ? 8 : 12;
  const navHeight = navShell.value.offsetHeight || 52;
  const headerBottom = headerRef.value.getBoundingClientRect().bottom;
  expandNav.value = headerBottom <= navHeight + navOffset + 24;
};

onMounted(() => {
  updateNavMode();
  window.addEventListener('scroll', updateNavMode, { passive: true });
  window.addEventListener('resize', updateNavMode);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateNavMode);
  window.removeEventListener('resize', updateNavMode);
});
</script>

<style scoped>
.bg {
  width: 100%;
  height: 500px;
  --header-height: 500px;
  --orbit-center-y: 155px;
  --planet-size: 180px;
  --orbit-size: 360px;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 14%, rgba(150, 167, 255, 0.22), transparent 34%),
    radial-gradient(circle at 76% 24%, rgba(115, 216, 255, 0.10), transparent 30%),
    linear-gradient(180deg, #070b20 0%, #111735 48%, #dde2ff 100%);
}

.bg::before,
.bg::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.bg::before {
  z-index: 0;
  opacity: 0.58;
  background-image:
    radial-gradient(circle, rgba(255, 255, 255, 0.95) 0 1px, transparent 1.4px),
    radial-gradient(circle, rgba(180, 205, 255, 0.75) 0 1px, transparent 1.5px),
    radial-gradient(circle, rgba(255, 255, 255, 0.55) 0 0.8px, transparent 1.2px);
  background-size: 92px 92px, 148px 148px, 226px 226px;
  background-position: 12px 18px, 48px 36px, 78px 8px;
  animation: starTwinkle 7s ease-in-out infinite;
}

.bg::after {
  z-index: 1;
  opacity: 0.26;
  background:
    radial-gradient(circle at 18% 18%, rgba(255, 255, 255, 0.8) 0 1px, transparent 2px),
    radial-gradient(circle at 64% 11%, rgba(194, 216, 255, 0.9) 0 1px, transparent 2px),
    radial-gradient(circle at 86% 32%, rgba(255, 255, 255, 0.75) 0 1px, transparent 2px),
    radial-gradient(circle at 31% 43%, rgba(172, 190, 255, 0.65) 0 1px, transparent 2px);
  animation: starDrift 18s ease-in-out infinite alternate;
}

@keyframes starTwinkle {
  0%, 100% { opacity: 0.46; }
  50% { opacity: 0.68; }
}

@keyframes starDrift {
  from { transform: translateY(0); }
  to { transform: translateY(8px); }
}

/* =============================================
   纯 CSS 3D 卫星轨道动画
   ============================================= */
#space {
  position: absolute;
  inset: 0;
  width: 100%;
  height: var(--header-height);
  z-index: 2;
  transform-style: preserve-3d;
  perspective: 700px;
  pointer-events: none;
}

.space_field_wrapper {
  position: absolute;
  width: 100%;
  height: var(--header-height);
  transform-style: preserve-3d;
}

/* 母星 - 中心 */
.space_field.mother {
  position: absolute;
  top: var(--orbit-center-y);
  left: 50%;
  width: var(--planet-size);
  height: var(--planet-size);
  transform: translate(-50%, -50%);
  transform-style: preserve-3d;
}

.space_field.mother .planet {
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--planet-size);
  height: var(--planet-size);
  overflow: hidden;
  border-radius: 100%;
  box-sizing: border-box;
  border: 11px solid #000;
  background: rgba(255, 80, 50, 1);
  transform: translate(-50%, -50%);
}

.space_field.mother .planet::before {
  content: none;
}

/* 卫星轨道 */
.satellite-wrapper {
  transform: none;
}

.space_field.satellite {
  position: absolute;
  top: var(--orbit-center-y);
  left: 50%;
  width: var(--orbit-size);
  height: var(--orbit-size);
  transform: translate(-50%, -50%);
  transform-style: preserve-3d;
  animation: orbit var(--orbit-duration) linear infinite;
}

.space_field.satellite .planet {
  position: absolute;
  top: 50%;
  left: 100%;
  width: 50px;
  height: 50px;
  overflow: hidden;
  border-radius: 100%;
  box-sizing: border-box;
  border: 8px solid #000;
  background: var(--planet-color, rgba(50, 80, 255, 1));
  transform: translate(-50%, -50%);
  animation: planet var(--orbit-duration) linear infinite;
}

.space_field.satellite .planet::before {
  content: '';
  position: absolute;
  top: -15%;
  left: -15%;
  width: 100%;
  height: var(--header-height);
  background: rgba(255, 255, 255, 0.4);
  border-radius: 100%;
  pointer-events: none;
  z-index: 2;
}

@keyframes orbit {
  0%   { transform: translate(-50%, -50%) rotateZ(var(--orbit-angle)) rotateY(0deg); }
  100% { transform: translate(-50%, -50%) rotateZ(var(--orbit-angle)) rotateY(360deg); }
}

@keyframes planet {
  0%   { transform: translate(-50%, -50%) rotateY(0deg); }
  100% { transform: translate(-50%, -50%) rotateY(-360deg); }
}

/* =============================================
   控制面板 & 内容
   ============================================= */
.control-toggle {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: none;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  z-index: 100;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.control-toggle:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: rotate(45deg);
}

.control-panel {
  position: absolute;
  top: 70px;
  right: 20px;
  width: 240px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 15px;
  color: #333;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  z-index: 99;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}

.control-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 13px;
  color: #667eea;
}

.control-close {
  background: none;
  border: none;
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  font-size: 14px;
  padding: 0;
  line-height: 1;
}

.control-section { margin-bottom: 12px; }
.control-group { margin-bottom: 8px; }

.control-group label {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  color: rgba(0, 0, 0, 0.6);
  font-size: 11px;
}

.control-group .value { color: #667eea; font-size: 11px; }

.control-group input[type="range"] {
  width: 100%;
  height: 4px;
  -webkit-appearance: none;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 2px;
  outline: none;
}

.control-group input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  background: #667eea;
  border-radius: 50%;
  cursor: pointer;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.checkbox-group input[type="checkbox"] {
  width: 14px;
  height: 14px;
  accent-color: #667eea;
}

.checkbox-group label {
  margin-bottom: 0;
  color: rgba(0, 0, 0, 0.7);
}

.btn-reset {
  width: 100%;
  padding: 8px;
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.2);
  color: #333;
  font-family: inherit;
  font-size: 11px;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 10px;
  transition: all 0.2s;
}

.btn-reset:hover {
  background: rgba(102, 126, 234, 0.1);
  border-color: #667eea;
}

.header-content {
  position: absolute;
  top: 260px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min(92%, 520px);
  text-align: center;
  pointer-events: auto;
}

.avatar-wrapper {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  overflow: hidden;
  z-index: 1;
}

.avatar-img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
}

.name {
  font-size: 30px;
  font-weight: 700;
  margin: 0 0 6px 0;
  background: linear-gradient(135deg, #d9ddff 0%, #9f8cff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 2px;
  animation: nameFadeIn 0.6s ease forwards;
  opacity: 0;
  transform: translateY(10px);
}

@keyframes nameFadeIn {
  to { opacity: 1; transform: translateY(0); }
}

.zym {
  font-size: 15px;
  color: rgba(245, 247, 255, 0.86);
  margin: 0 0 10px 0;
  font-style: italic;
  position: relative;
  padding: 0 20px;
  animation: nameFadeIn 0.6s ease forwards;
  animation-delay: 0.2s;
  opacity: 0;
  transform: translateY(10px);
}

.zym::before, .zym::after {
  content: '"';
  font-size: 20px;
  color: #667eea;
  opacity: 0.8;
}

.social-links {
  display: flex;
  gap: 14px;
  margin-top: 2px;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(20px);
  animation: slideUpFade 0.6s ease forwards;
}

.social-icon:nth-child(1) { animation-delay: 0.3s; }
.social-icon:nth-child(2) { animation-delay: 0.4s; }

@keyframes slideUpFade {
  to { opacity: 1; transform: translateY(0); }
}

.social-icon:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  color: #667eea;
  background: white;
}

.social-icon svg { width: 20px; height: 20px; }

.nav-shell {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 22px;
  z-index: 30;
  width: min(92%, 720px);
  margin: 0 auto;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .bg {
    height: 500px;
    --header-height: 500px;
    --orbit-center-y: 145px;
    --planet-size: 153px;
    --orbit-size: 330px;
  }

  .name { font-size: 26px; }
  .zym { font-size: 14px; padding: 0 15px; }
  .social-icon { width: 36px; height: 36px; }
  .social-icon svg { width: 19px; height: 19px; }
  .control-panel { width: 200px; right: 10px; }
  .control-toggle { width: 36px; height: 36px; font-size: 16px; right: 10px; }
  .header-content { top: 238px; }
  .nav-shell { bottom: 18px; width: calc(100% - 20px); }
}
</style>
