<template>
    <div class="bg">
      <canvas
        ref="canvas"
        class="cosmic-canvas"
      ></canvas>
      <div ref="lineCanvasContainer" class="line-canvas-container">
        <canvas ref="lineCanvas" class="line-canvas"></canvas>
      </div>
      
      <!-- 控制面板按钮 -->
      <button class="control-toggle" @click="toggleControlPanel" :title="showControls ? '关闭设置' : '打开设置'">
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
            <label>X轴倾斜 <span class="value">{{ Math.round(tiltX * 180 / Math.PI) }}°</span></label>
            <input type="range" v-model.number="tiltXDeg" min="0" max="90" @input="updateOrbitAngles">
          </div>
          <div class="control-group">
            <label>Y轴旋转 <span class="value">{{ Math.round(tiltY * 180 / Math.PI) }}°</span></label>
            <input type="range" v-model.number="tiltYDeg" min="0" max="90" @input="updateOrbitAngles">
          </div>
          <div class="control-group">
            <label>Z轴旋转 <span class="value">{{ Math.round(tiltZ * 180 / Math.PI) }}°</span></label>
            <input type="range" v-model.number="tiltZDeg" min="0" max="90" @input="updateOrbitAngles">
          </div>
        </div>
        
        <div class="control-section">
          <div class="control-group">
            <label>公转速度 <span class="value">{{ revolutionSpeed.toFixed(3) }}</span></label>
            <input type="range" v-model.number="revolutionSpeed" min="0.001" max="0.05" step="0.001">
          </div>
          <div class="control-group">
            <label>自转速度 <span class="value">{{ rotationSpeed.toFixed(3) }}</span></label>
            <input type="range" v-model.number="rotationSpeed" min="0.001" max="0.1" step="0.001">
          </div>
        </div>
        
        <div class="control-section">
          <div class="control-group">
            <label>太阳大小 <span class="value">{{ sunSize }}</span></label>
            <input type="range" v-model.number="sunSize" min="20" max="150">
          </div>
          <div class="control-group">
            <label>星星数量 <span class="value">{{ starCount }}</span></label>
            <input type="range" v-model.number="starCount" min="50" max="400">
          </div>
        </div>
        
        <div class="control-section">
          <div class="control-group checkbox-group">
            <input type="checkbox" v-model="showOrbits" id="showOrbits">
            <label for="showOrbits">显示轨道</label>
          </div>
          <div class="control-group checkbox-group">
            <input type="checkbox" v-model="showStars" id="showStars">
            <label for="showStars">显示星星</label>
          </div>
        </div>
        
        <button class="btn-reset" @click="resetSettings">恢复默认</button>
      </div>
      
      <!-- 头像+名字+座右铭，跟随太阳位置 -->
      <div class="header-content">
        <div class="avatar-wrapper">
          <div class="avatar-ring" :class="avatarStyle"></div>
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
import Nav from "@/components/Nav.vue";
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import * as THREE from 'three';

const expandNav = ref(false);
const navPlaceholder = ref<HTMLElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
const lineCanvas = ref<HTMLCanvasElement | null>(null);
// 头像纹理
let avatarTexture: THREE.Texture | null = null;
let avatarMesh: THREE.Mesh | null = null;

// 控制面板
const showControls = ref(false);
const toggleControlPanel = () => {
  showControls.value = !showControls.value;
};

// 参数
const tiltXDeg = ref(10);
const tiltYDeg = ref(0);
const tiltZDeg = ref(20);
let tiltX = 10 * Math.PI / 180;
let tiltY = 0 * Math.PI / 180;
let tiltZ = 20 * Math.PI / 180;
let revolutionSpeed = 0.01;
let rotationSpeed = 0.02;
let sunSize = 70;
let starCount = 180;
let showOrbits = ref(true);
let showStars = ref(true);

const updateOrbitAngles = () => {
  tiltX = tiltXDeg.value * Math.PI / 180;
  tiltY = tiltYDeg.value * Math.PI / 180;
  tiltZ = tiltZDeg.value * Math.PI / 180;
  if (universe) {
    universe.updateOrbitRotation();
  }
};

const resetSettings = () => {
  tiltXDeg.value = 10;
  tiltYDeg.value = 0;
  tiltZDeg.value = 20;
  revolutionSpeed = 0.01;
  rotationSpeed = 0.02;
  sunSize = 70;
  starCount = 180;
  showOrbits.value = true;
  showStars.value = true;
  tiltX = 10 * Math.PI / 180;
  tiltY = 0 * Math.PI / 180;
  tiltZ = 20 * Math.PI / 180;
  if (universe) {
    universe.reset();
  }
};

// 监听参数变化
watch([revolutionSpeed, rotationSpeed, sunSize, starCount, showOrbits, showStars], () => {
  if (universe) {
    universe.updateParams({
      revolutionSpeed,
      rotationSpeed,
      sunSize,
      starCount,
      showOrbits: showOrbits.value,
      showStars: showStars.value
    });
  }
});

let universe: CosmicUniverse | null = null;

class CosmicUniverse {
  private WIDTH = 900;
  private HEIGHT = 480;
  private HALF_W = this.WIDTH / 2;
  private HALF_H = this.HEIGHT / 2;
  
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private lineCtx: CanvasRenderingContext2D | null = null;
  
  private starsGroup: THREE.Group;
  private starData: any[] = [];
  private sunGroup: THREE.Group | null = null;
  private sun: THREE.Mesh | null = null;
  private sunRing: THREE.Mesh | null = null;
  private planets: THREE.Mesh[] = [];
  private orbitLines: THREE.Line[] = [];
  private planetConfigs: any[] = [];
  
  private orbitRotation: THREE.Matrix4;
  private frameCount = 0;
  private mouseX = -10000;
  private mouseY = -10000;
  private animFrame = 0;
  private onPositionUpdate?: (pos: { x: number; y: number } | null) => void;
  
  constructor(canvasEl: HTMLCanvasElement, lineCanvasEl: HTMLCanvasElement, onPositionUpdate?: (pos: { x: number; y: number } | null) => void) {
    this.onPositionUpdate = onPositionUpdate;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
    
    const aspect = this.WIDTH / this.HEIGHT;
    this.camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 2000);
    this.camera.position.set(0, 0, 600);
    this.camera.lookAt(0, 0, 0);
    
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: canvasEl });
    this.renderer.setSize(this.WIDTH, this.HEIGHT);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.sortObjects = true;
    
    if (lineCanvasEl.parentElement) {
      lineCanvasEl.width = this.WIDTH;
      lineCanvasEl.height = this.HEIGHT;
      this.lineCtx = lineCanvasEl.getContext('2d');
    }
    
    this.starsGroup = new THREE.Group();
    this.orbitRotation = new THREE.Matrix4();
    
    this.init();
  }
  
  private init() {
    this.createStars(starCount);
    this.createSun();
    this.createPlanetConfigs();
    this.createPlanets();
    this.updateOrbitRotation();
    this.animate();
    
    const canvas = this.renderer.domElement;
    canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    canvas.addEventListener('mouseleave', this.onMouseLeave.bind(this));
  }
  
  // 初始化并加载头像纹理
  public initWithAvatar(callback?: () => void) {
    this.loadAvatarTexture(() => {
      this.init();
      if (callback) callback();
    });
  }
  
  private createStars(count: number) {
    this.starsGroup.clear();
    this.starData = [];
    
    const starMaterial = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0.8
    });
    
    const starGeometry = new THREE.CircleGeometry(1.5, 8);
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * this.WIDTH * 0.9;
      const y = (Math.random() - 0.5) * this.HEIGHT * 0.9;
      const z = (Math.random() - 0.5) * 300;
      const twinkleSpeed = 0.02 + Math.random() * 0.04;
      const twinkleOffset = Math.random() * Math.PI * 2;
      
      const star = new THREE.Mesh(starGeometry, starMaterial.clone());
      star.position.set(x, y, z);
      star.userData = { twinkleSpeed, twinkleOffset, baseOpacity: 0.4 + Math.random() * 0.6 };
      this.starsGroup.add(star);
      this.starData.push({ mesh: star, x, y, z });
    }
    
    this.starsGroup.visible = showStars.value;
    this.scene.add(this.starsGroup);
  }
  
  private createSun() {
    if (this.sunGroup) {
      this.scene.remove(this.sunGroup);
    }
    
    this.sunGroup = new THREE.Group();
    this.sunGroup.position.set(0, 0, 0);
    
    const sunInnerGeometry = new THREE.IcosahedronGeometry(sunSize + 2, 1);
    const sunInnerMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      side: THREE.BackSide
    });
    const sunInner = new THREE.Mesh(sunInnerGeometry, sunInnerMaterial);
    this.sunGroup.add(sunInner);
    
    const sunGeometry = new THREE.IcosahedronGeometry(sunSize, 1);
    const sunMaterial = new THREE.MeshBasicMaterial({
      color: 0xFFD700,
      wireframe: true
    });
    this.sun = new THREE.Mesh(sunGeometry, sunMaterial);
    this.sunGroup.add(this.sun);
    
    const sunRingGeometry = new THREE.RingGeometry(sunSize + 5, sunSize + 15, 32);
    const sunRingMaterial = new THREE.MeshBasicMaterial({
      color: 0xFFD700,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide
    });
    this.sunRing = new THREE.Mesh(sunRingGeometry, sunRingMaterial);
    this.sunGroup.add(this.sunRing);
    
    // 创建头像平面，贴在太阳前面
    this.createAvatarPlane();
    
    this.scene.add(this.sunGroup);
  }
  
  private createAvatarPlane() {
    if (avatarMesh) {
      this.scene.remove(avatarMesh);
      avatarMesh = null;
    }
    if (avatarTexture) {
      const avatarSize = sunSize * 1.6;
      // 圆形几何体，64 段保证足够平滑
      const avatarGeometry = new THREE.CircleGeometry(avatarSize / 2, 64);
      const avatarMaterial = new THREE.MeshBasicMaterial({
        map: avatarTexture,
        transparent: true,
        opacity: 0.95,
        side: THREE.DoubleSide
      });
      avatarMesh = new THREE.Mesh(avatarGeometry, avatarMaterial);
      // 放在太阳前面一点的位置
      avatarMesh.position.set(0, 0, 30);
      this.scene.add(avatarMesh);
    }
  }
  
  // 将3D位置投影到2D屏幕坐标
  public getSunScreenPosition(): { x: number; y: number } | null {
    if (!this.sunGroup || !this.camera) return null;
    
    const sunPos = new THREE.Vector3(0, 0, 0);
    sunPos.project(this.camera);
    
    const canvas = this.renderer.domElement;
    const widthHalf = canvas.clientWidth / 2;
    const heightHalf = canvas.clientHeight / 2;
    
    return {
      x: sunPos.x * widthHalf + widthHalf,
      y: -sunPos.y * heightHalf + heightHalf
    };
  }
  
  // 加载头像纹理并裁剪为圆形
  private loadAvatarTexture(callback: () => void) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // 用 Canvas 裁剪出圆形头像
      const size = Math.max(img.width, img.height);
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d')!;
      const radius = size / 2;
      // 圆形裁剪
      ctx.beginPath();
      ctx.arc(radius, radius, radius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      // 绘制图片（居中）
      const sx = (size - img.width) / 2;
      const sy = (size - img.height) / 2;
      ctx.drawImage(img, sx, sy);
      // 创建 Three.js 纹理
      avatarTexture = new THREE.CanvasTexture(canvas);
      avatarTexture.needsUpdate = true;
      if (this.sunGroup) {
        this.createAvatarPlane();
      }
      if (callback) callback();
    };
    img.onerror = () => {
      console.error('Failed to load avatar image');
      if (callback) callback();
    };
    img.src = 'https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/avatar.jpg';
  }

  private createPlanetConfigs() {
    this.planetConfigs = [
      { type: 'box', size: [18, 18, 18], orbitRadiusX: 180, orbitRadiusZ: 135, speed: revolutionSpeed, color: 0x4A90D9, startAngle: 0 },
      { type: 'sphere', size: 14, orbitRadiusX: 240, orbitRadiusZ: 180, speed: revolutionSpeed, color: 0xD94A6B, startAngle: Math.PI / 3 },
      { type: 'octahedron', size: 16, orbitRadiusX: 315, orbitRadiusZ: 240, speed: revolutionSpeed, color: 0x6BD94A, startAngle: Math.PI * 2 / 3 },
      { type: 'tetrahedron', size: 18, orbitRadiusX: 390, orbitRadiusZ: 300, speed: revolutionSpeed, color: 0x9A6BD9, startAngle: Math.PI }
    ];
  }
  
  private createPlanets() {
    this.planets.forEach(p => this.scene.remove(p));
    this.planets = [];
    
    this.planetConfigs.forEach((config, index) => {
      let geometry;
      if (config.type === 'box') {
        geometry = new THREE.BoxGeometry(...config.size);
      } else if (config.type === 'sphere') {
        geometry = new THREE.SphereGeometry(config.size, 16, 12);
      } else if (config.type === 'octahedron') {
        geometry = new THREE.OctahedronGeometry(config.size);
      } else if (config.type === 'tetrahedron') {
        geometry = new THREE.TetrahedronGeometry(config.size);
      }
      
      const material = new THREE.MeshBasicMaterial({
        color: config.color,
        wireframe: true
      });
      const planet = new THREE.Mesh(geometry, material);
      
      planet.userData = {
        orbitRadiusX: config.orbitRadiusX,
        orbitRadiusZ: config.orbitRadiusZ,
        speed: revolutionSpeed,
        angle: config.startAngle,
        rotationAxis: new THREE.Vector3(0, 1, 0).applyMatrix4(this.orbitRotation)
      };
      
      this.planets.push(planet);
      this.scene.add(planet);
    });
  }
  
  updateOrbitRotation() {
    this.orbitRotation = new THREE.Matrix4();
    const rotZ = new THREE.Matrix4().makeRotationZ(tiltZ);
    const rotY = new THREE.Matrix4().makeRotationY(tiltY);
    const rotX = new THREE.Matrix4().makeRotationX(tiltX);
    this.orbitRotation.multiplyMatrices(rotZ, rotY);
    this.orbitRotation.multiply(rotX);
    
    this.updateOrbits();
    this.updatePlanetRotationAxes();
  }
  
  private createOrbitLine(radiusX: number, radiusZ: number) {
    const points = [];
    const segments = 128;
    
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const localX = Math.cos(angle) * radiusX;
      const localY = 0;
      const localZ = Math.sin(angle) * radiusZ;
      const localPoint = new THREE.Vector3(localX, localY, localZ);
      localPoint.applyMatrix4(this.orbitRotation);
      points.push(localPoint);
    }
    
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0.12
    });
    return new THREE.Line(geometry, material);
  }
  
  private updateOrbits() {
    this.orbitLines.forEach(line => this.scene.remove(line));
    this.orbitLines = [];
    
    if (showOrbits.value) {
      this.planetConfigs.forEach(config => {
        const orbit = this.createOrbitLine(config.orbitRadiusX, config.orbitRadiusZ);
        this.scene.add(orbit);
        this.orbitLines.push(orbit);
      });
    }
  }
  
  private updatePlanetRotationAxes() {
    this.planets.forEach(planet => {
      planet.userData.rotationAxis = new THREE.Vector3(0, 1, 0).applyMatrix4(this.orbitRotation);
    });
  }
  
  private onMouseMove(e: MouseEvent) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouseX = e.clientX - rect.left - this.HALF_W;
    this.mouseY = this.HALF_H - (e.clientY - rect.top);
  }
  
  private onMouseLeave() {
    this.mouseX = -10000;
    this.mouseY = -10000;
  }
  
  private animate = () => {
    this.animFrame = requestAnimationFrame(this.animate);
    this.frameCount++;
    
    if (this.sun) this.sun.rotation.y += 0.005;
    if (this.sunRing) this.sunRing.rotation.z += 0.002;
    
    this.planets.forEach(planet => {
      const data = planet.userData;
      data.angle += revolutionSpeed;
      
      const localX = Math.cos(data.angle) * data.orbitRadiusX;
      const localZ = Math.sin(data.angle) * data.orbitRadiusZ;
      
      const localPoint = new THREE.Vector3(localX, 0, localZ);
      localPoint.applyMatrix4(this.orbitRotation);
      planet.position.copy(localPoint);
      
      planet.rotateOnAxis(data.rotationAxis, rotationSpeed);
    });
    
    this.starData.forEach(star => {
      const mesh = star.mesh;
      const { twinkleSpeed, twinkleOffset, baseOpacity } = mesh.userData;
      const twinkle = Math.sin(this.frameCount * twinkleSpeed + twinkleOffset);
      mesh.material.opacity = baseOpacity * (0.7 + twinkle * 0.3);
      mesh.scale.setScalar(0.9 + twinkle * 0.1);
    });
    
    // 让头像平面始终面向相机
    if (avatarMesh) {
      avatarMesh.lookAt(this.camera.position);
    }
    
    if (this.lineCtx) {
      this.lineCtx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
      
      const nearbyStars = this.starData.filter(star => {
        const dx = star.x - this.mouseX;
        const dy = star.y - this.mouseY;
        return Math.sqrt(dx * dx + dy * dy) < 50;
      });
      
      if (nearbyStars.length > 1) {
        this.lineCtx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        this.lineCtx.lineWidth = 1;
        
        for (let i = 0; i < nearbyStars.length; i++) {
          for (let j = i + 1; j < nearbyStars.length; j++) {
            this.lineCtx.beginPath();
            const p1 = nearbyStars[i];
            const p2 = nearbyStars[j];
            this.lineCtx.moveTo(p1.x + this.HALF_W, this.HALF_H - p1.y);
            this.lineCtx.lineTo(p2.x + this.HALF_W, this.HALF_H - p2.y);
            this.lineCtx.stroke();
          }
        }
      }
    }
    
    this.renderer.render(this.scene, this.camera);
    
    // 更新header内容位置
    if (this.onPositionUpdate) {
      const pos = this.getSunScreenPosition();
      this.onPositionUpdate(pos);
    }
  }
  
  public updateParams(params: any) {
    if (params.revolutionSpeed !== undefined) revolutionSpeed = params.revolutionSpeed;
    if (params.rotationSpeed !== undefined) rotationSpeed = params.rotationSpeed;
    if (params.sunSize !== undefined) {
      sunSize = params.sunSize;
      this.createSun();
      // 更新头像平面大小
      if (avatarMesh && avatarTexture) {
        const avatarSize = sunSize * 1.6;
        avatarMesh.geometry.dispose();
        avatarMesh.geometry = new THREE.PlaneGeometry(avatarSize, avatarSize);
      }
    }
    if (params.starCount !== undefined) {
      starCount = params.starCount;
      this.createStars(starCount);
    }
    if (params.showOrbits !== undefined) {
      showOrbits.value = params.showOrbits;
      this.updateOrbits();
    }
    if (params.showStars !== undefined) {
      showStars.value = params.showStars;
      this.starsGroup.visible = showStars.value;
    }
  }
  
  public reset() {
    this.createSun();
    this.createPlanetConfigs();
    this.createPlanets();
    this.updateOrbitRotation();
    this.createStars(starCount);
    this.starsGroup.visible = true;
  }
  
  public destroy() {
    cancelAnimationFrame(this.animFrame);
  }
}

// 头像框样式随机
const avatarStyle = ref('ring-gradient');

const ringStyles = [
  'ring-gradient',
  'ring-neon',
  'ring-aurora',
  'ring-stars',
  'ring-dream',
];

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
  avatarStyle.value = ringStyles[Math.floor(Math.random() * ringStyles.length)];
  
  if (canvas.value && lineCanvas.value) {
    universe = new CosmicUniverse(canvas.value, lineCanvas.value);
    universe.initWithAvatar();
  }
});

onBeforeUnmount(() => {
  if (navPlaceholder.value) {
    observer.unobserve(navPlaceholder.value);
  }
  if (universe) {
    universe.destroy();
  }
});

</script>

<style scoped>
.bg {
  width: 100%;
  min-height: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.cosmic-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 480px;
  z-index: 0;
}

.line-canvas-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 480px;
  z-index: 1;
  pointer-events: none;
}

.line-canvas {
  width: 100%;
  height: 100%;
}

.control-toggle {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: none;
  background: rgba(0, 0, 0, 0.6);
  color: #FFD700;
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
  background: rgba(0, 0, 0, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 15px;
  color: #fff;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  z-index: 99;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.control-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  font-size: 13px;
  color: #FFD700;
}

.control-close {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  font-size: 14px;
  padding: 0;
  line-height: 1;
}

.control-close:hover {
  color: #fff;
}

.control-section {
  margin-bottom: 12px;
}

.control-section:last-child {
  margin-bottom: 0;
}

.control-group {
  margin-bottom: 8px;
}

.control-group:last-child {
  margin-bottom: 0;
}

.control-group label {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 11px;
}

.control-group .value {
  color: #4A90D9;
  font-size: 11px;
}

.control-group input[type="range"] {
  width: 100%;
  height: 4px;
  -webkit-appearance: none;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  outline: none;
}

.control-group input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  background: #FFD700;
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
  accent-color: #FFD700;
}

.checkbox-group label {
  margin-bottom: 0;
  color: rgba(255, 255, 255, 0.8);
}

.btn-reset {
  width: 100%;
  padding: 8px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  font-family: inherit;
  font-size: 11px;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 10px;
  transition: all 0.2s;
}

.btn-reset:hover {
  background: rgba(255, 215, 0, 0.2);
  border-color: #FFD700;
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
  z-index: 0;
}

.header-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 300px;
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
  margin-bottom: 0;
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
  
  .social-icon {
    width: 40px;
    height: 40px;
  }
  
  .social-icon svg {
    width: 20px;
    height: 20px;
  }
  
  .control-panel {
    width: 200px;
    right: 10px;
  }
  
  .control-toggle {
    width: 36px;
    height: 36px;
    font-size: 16px;
    right: 10px;
  }
}</style>
