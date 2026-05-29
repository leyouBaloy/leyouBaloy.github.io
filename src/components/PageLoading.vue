<template>
  <div class="page-loading" :class="{ compact }" role="status" aria-live="polite">
    <div class="loader" aria-hidden="true">
      <span class="loader-ring"></span>
      <span class="loader-dot dot-a"></span>
      <span class="loader-dot dot-b"></span>
    </div>
    <p>{{ label }}</p>
    <div class="loading-lines" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  label?: string;
  compact?: boolean;
}>(), {
  label: '内容加载中...',
  compact: false,
});
</script>

<style scoped>
.page-loading {
  display: grid;
  place-items: center;
  gap: 12px;
  min-height: 260px;
  padding: 42px 20px;
  color: #5f6678;
  text-align: center;
}

.page-loading.compact {
  min-height: 170px;
  padding: 28px 16px;
}

.loader {
  position: relative;
  width: 54px;
  height: 54px;
}

.loader-ring {
  position: absolute;
  inset: 0;
  border: 3px solid rgba(86, 110, 212, 0.16);
  border-top-color: #566ed4;
  border-right-color: #39a58a;
  border-radius: 50%;
  animation: loading-spin 0.85s linear infinite;
}

.loader-dot {
  position: absolute;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #f2b84b;
  box-shadow: 0 0 16px rgba(242, 184, 75, 0.35);
}

.dot-a {
  top: 5px;
  right: 5px;
}

.dot-b {
  left: 6px;
  bottom: 8px;
  background: #39a58a;
  box-shadow: 0 0 16px rgba(57, 165, 138, 0.35);
}

.page-loading p {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
}

.loading-lines {
  display: grid;
  gap: 7px;
  width: min(280px, 72vw);
}

.loading-lines span {
  display: block;
  height: 8px;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(86, 110, 212, 0.08), rgba(57, 165, 138, 0.20), rgba(86, 110, 212, 0.08));
  background-size: 220% 100%;
  animation: loading-shimmer 1.2s ease-in-out infinite;
}

.loading-lines span:nth-child(2) {
  width: 78%;
  margin: 0 auto;
  animation-delay: 0.12s;
}

.loading-lines span:nth-child(3) {
  width: 56%;
  margin: 0 auto;
  animation-delay: 0.24s;
}

@keyframes loading-spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes loading-shimmer {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}

:global([data-theme="dark"] .page-loading) {
  color: #b8c2dc;
}

:global([data-theme="dark"] .loader-ring) {
  border-color: rgba(164, 178, 255, 0.16);
  border-top-color: #8ea0ff;
  border-right-color: #54c3a5;
}

:global([data-theme="dark"] .loading-lines span) {
  background: linear-gradient(90deg, rgba(142, 160, 255, 0.10), rgba(84, 195, 165, 0.22), rgba(142, 160, 255, 0.10));
  background-size: 220% 100%;
}
</style>
