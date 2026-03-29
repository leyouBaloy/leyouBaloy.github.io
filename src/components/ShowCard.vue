<template>
  <div class="show-card" :class="{ 'card-bw': bwIndex > -1 }">
    <!-- 外层卡片 -->
    <div class="card-wrapper">
      <!-- 恒星背景 -->
      <div class="star-bg">
        <svg class="star-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <polygon class="star" points="50,5 61,40 98,40 68,62 79,97 50,75 21,97 32,62 2,40 39,40" />
        </svg>
        <!-- 中心圆形头像 -->
        <div class="avatar-disc">
          <img 
            v-if="avatar" 
            :src="avatar" 
            class="avatar-img" 
            alt="avatar" 
          />
          <div v-else class="avatar-placeholder">
            <span class="avatar-text">{{ title?.charAt(0) || '?' }}</span>
          </div>
        </div>
      </div>

      <!-- 底部信息 -->
      <div class="card-body">
        <h3 class="card-title">{{ title }}</h3>
        <p v-if="description" class="card-desc">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  avatar: { type: String, default: '' },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  bwIndex: { type: Number, default: -1 },
})
</script>

<style scoped>
.show-card {
  display: flex;
  justify-content: center;
  padding: 0.5rem;
}

.card-wrapper {
  width: 100%;
  max-width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

/* ========== 恒星背景 ========== */
.star-bg {
  position: relative;
  width: 120px;
  height: 120px;
}

.star-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
}

.star {
  fill: #f5c842;
  stroke: #e0a800;
  stroke-width: 1.5;
  stroke-linejoin: round;
}

/* ========== 中心圆形头像 ========== */
.avatar-disc {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: #fff;
  padding: 3px;
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.15),
    inset 0 1px 2px rgba(255, 255, 255, 0.5);
  overflow: hidden;
}

.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  display: block;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
}

/* ========== 卡片信息 ========== */
.card-body {
  text-align: center;
  width: 100%;
}

.card-title {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: #2d3748;
  line-height: 1.4;
}

.card-desc {
  margin: 0.25rem 0 0;
  font-size: 0.8rem;
  color: #718096;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ========== 黑白模式 ========== */
.card-bw .star {
  fill: #eee;
  stroke: #ccc;
}

.card-bw .avatar-disc {
  background: #f0f0f0;
}

.card-bw .avatar-placeholder {
  background: linear-gradient(135deg, #bbb 0%, #999 100%);
}

.card-bw .card-title,
.card-bw .card-desc {
  color: #888;
}
</style>
