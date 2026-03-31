<template>
  <div class="bg">
    <!-- 纯 CSS 3D 卫星轨道动画背景 -->
    <div id="space">
      <div class="space_field_wrapper">
        <div class="space_field mother">
          <div class="planet">
            <div class="avatar-wrapper" v-show="showBailey">
              <div class="avatar-ring" :class="avatarStyle"></div>
            </div>
          </div>
        </div>
        <div v-for="i in orbitCount" :key="'w'+i" class="space_field_wrapper">
          <div class="space_field satellite">
            <div class="planet"></div>
          </div>
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

    <div ref="navPlaceholder" class="nav-placeholder"></div>
    <Nav :expandNav="expandNav"></Nav>
  </div>
</template>

<script setup lang="ts">
import Nav from "@/components/Nav.vue";
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

const expandNav = ref(false);
const navPlaceholder = ref<HTMLElement | null>(null);

// 控制面板
const showControls = ref(false);
const orbitCount = ref(3);
const showBailey = ref(true);

// 头像框样式随机
const avatarStyle = ref('ring-gradient');
const ringStyles = [
  'ring-gradient',
  'ring-neon',
  'ring-aurora',
  'ring-stars',
  'ring-dream',
];

const resetSettings = () => {
  orbitCount.value = 3;
  showBailey.value = true;
};

const observer = new IntersectionObserver(
  ([entry]) => {
    expandNav.value = entry.intersectionRatio === 0;
  },
  { threshold: [0, 1] }
);

onMounted(() => {
  if (navPlaceholder.value) {
    observer.observe(navPlaceholder.value);
  }
  avatarStyle.value = ringStyles[Math.floor(Math.random() * ringStyles.length)];
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
  height: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: #eef;
}

/* =============================================
   纯 CSS 3D 卫星轨道动画
   ============================================= */
#space {
  position: absolute;
  width: 100%;
  height: 480px;
  transform-style: preserve-3d;
  perspective: 700px;
}

.space_field_wrapper {
  position: absolute;
  width: 100%;
  height: 480px;
  transform-style: preserve-3d;
}

/* 母星 - 中心 */
.space_field.mother {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 300px;
  transform: translate(-50%, -50%);
  transform-style: preserve-3d;
}

.space_field.mother .planet {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 100%;
  box-sizing: border-box;
  border: 12px solid #000;
  background: rgba(255, 80, 50, 1);
  transform: translate(-50%, -50%);
}

.space_field.mother .planet::before {
  content: '';
  position: absolute;
  top: -12%;
  left: -12%;
  width: 100%;
  height: 480px;
  background: rgba(100, 40, 0, 1);
  border-radius: 100%;
  mix-blend-mode: screen;
}

/* 卫星轨道 */
.space_field.satellite {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 300px;
  transform: translate(-50%, -50%);
  transform-style: preserve-3d;
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
  background: rgba(50, 80, 255, 1);
  transform: translate(-50%, -50%);
}

.space_field.satellite .planet::before {
  content: '';
  position: absolute;
  top: -15%;
  left: -15%;
  width: 100%;
  height: 480px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 100%;
}

/* 轨道旋转动画 */
.space_field_wrapper:nth-child(1) { transform: rotateZ(0deg); }
.space_field_wrapper:nth-child(2) { transform: rotateZ(-20deg); }
.space_field_wrapper:nth-child(3) { transform: rotateZ(-40deg); }
.space_field_wrapper:nth-child(4) { transform: rotateZ(-60deg); }
.space_field_wrapper:nth-child(5) { transform: rotateZ(-80deg); }
.space_field_wrapper:nth-child(6) { transform: rotateZ(-100deg); }
.space_field_wrapper:nth-child(7) { transform: rotateZ(-120deg); }
.space_field_wrapper:nth-child(8) { transform: rotateZ(-140deg); }
.space_field_wrapper:nth-child(9) { transform: rotateZ(-160deg); }

.space_field_wrapper:nth-child(1) .space_field.satellite { animation: orbit 2000ms linear infinite; }
.space_field_wrapper:nth-child(2) .space_field.satellite { animation: orbit 2400ms linear infinite; }
.space_field_wrapper:nth-child(3) .space_field.satellite { animation: orbit 2800ms linear infinite; }
.space_field_wrapper:nth-child(4) .space_field.satellite { animation: orbit 3200ms linear infinite; }
.space_field_wrapper:nth-child(5) .space_field.satellite { animation: orbit 3600ms linear infinite; }
.space_field_wrapper:nth-child(6) .space_field.satellite { animation: orbit 4000ms linear infinite; }
.space_field_wrapper:nth-child(7) .space_field.satellite { animation: orbit 4400ms linear infinite; }
.space_field_wrapper:nth-child(8) .space_field.satellite { animation: orbit 4800ms linear infinite; }
.space_field_wrapper:nth-child(9) .space_field.satellite { animation: orbit 5200ms linear infinite; }

.space_field_wrapper:nth-child(1) .space_field.satellite .planet { animation: planet 2000ms linear infinite; background: rgba(255, 100, 150, 1); }
.space_field_wrapper:nth-child(2) .space_field.satellite .planet { animation: planet 2400ms linear infinite; background: rgba(100, 255, 150, 1); }
.space_field_wrapper:nth-child(3) .space_field.satellite .planet { animation: planet 2800ms linear infinite; background: rgba(150, 100, 255, 1); }
.space_field_wrapper:nth-child(4) .space_field.satellite .planet { animation: planet 3200ms linear infinite; background: rgba(255, 200, 100, 1); }
.space_field_wrapper:nth-child(5) .space_field.satellite .planet { animation: planet 3600ms linear infinite; background: rgba(100, 200, 255, 1); }
.space_field_wrapper:nth-child(6) .space_field.satellite .planet { animation: planet 4000ms linear infinite; background: rgba(200, 100, 200, 1); }
.space_field_wrapper:nth-child(7) .space_field.satellite .planet { animation: planet 4400ms linear infinite; background: rgba(255, 150, 200, 1); }
.space_field_wrapper:nth-child(8) .space_field.satellite .planet { animation: planet 4800ms linear infinite; background: rgba(150, 255, 200, 1); }
.space_field_wrapper:nth-child(9) .space_field.satellite .planet { animation: planet 5200ms linear infinite; background: rgba(200, 150, 255, 1); }

@keyframes orbit {
  0%   { transform: translate(-50%, -50%) rotateY(0deg); }
  100% { transform: translate(-50%, -50%) rotateY(360deg); }
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
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
}

.avatar-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.avatar-ring {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border-radius: 50%;
  opacity: 0.5;
}

.ring-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%);
  background-size: 200% 200%;
  animation: gradientMove 3s ease-in-out infinite, breathe 2s ease-in-out infinite;
}

@keyframes gradientMove {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes breathe {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.02); }
}

.ring-neon {
  box-shadow: 0 0 20px rgba(102, 126, 234, 0.6),
              0 0 40px rgba(118, 75, 162, 0.4),
              0 0 60px rgba(102, 126, 234, 0.2);
  animation: neonPulse 2s ease-in-out infinite;
}

@keyframes neonPulse {
  0%, 100% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.6), 0 0 40px rgba(118, 75, 162, 0.4); }
  50% { box-shadow: 0 0 30px rgba(102, 126, 234, 0.8), 0 0 60px rgba(118, 75, 162, 0.6); }
}

.ring-aurora {
  background: linear-gradient(45deg,
    rgba(0, 255, 127, 0.4) 0%,
    rgba(102, 126, 234, 0.4) 25%,
    rgba(118, 75, 162, 0.4) 50%,
    rgba(0, 255, 127, 0.4) 75%,
    rgba(102, 126, 234, 0.4) 100%);
  filter: blur(3px);
  animation: auroraMove 4s ease-in-out infinite;
}

@keyframes auroraMove {
  0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.4; }
  50% { transform: scale(1.05) rotate(5deg); opacity: 0.7; }
}

.ring-stars {
  background: radial-gradient(circle at 30% 30%,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(102, 126, 234, 0.3) 30%,
    transparent 70%);
  animation: twinkle 1.5s ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.1); }
}

.ring-dream {
  background: linear-gradient(180deg,
    rgba(255, 182, 193, 0.5) 0%,
    rgba(102, 126, 234, 0.4) 50%,
    rgba(147, 112, 219, 0.5) 100%);
  animation: dreamy 3s ease-in-out infinite;
}

@keyframes dreamy {
  0%, 100% { opacity: 0.3; transform: scale(1); filter: hue-rotate(0deg); }
  50% { opacity: 0.6; transform: scale(1.03); filter: hue-rotate(20deg); }
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
  to { opacity: 1; transform: translateY(0); }
}

.zym {
  font-size: 16px;
  color: #555;
  margin: 0 0 20px 0;
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

.social-icon svg { width: 22px; height: 22px; }

.nav-placeholder {
  height: 10px;
  width: 100%;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .name { font-size: 26px; }
  .zym { font-size: 14px; padding: 0 15px; }
  .social-icon { width: 40px; height: 40px; }
  .social-icon svg { width: 20px; height: 20px; }
  .control-panel { width: 200px; right: 10px; }
  .control-toggle { width: 36px; height: 36px; font-size: 16px; right: 10px; }
  .header-content { padding-top: 12vh; }
}
</style>
