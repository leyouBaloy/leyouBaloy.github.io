<template>
    <div class="wrapper post-card">
      <div class="container">
  
        <router-link :to="path" class="title">
          <span>{{ title }}</span>
        </router-link>
  
        <div v-if="img" class="img-container">
          <n-image
            lazy
            object-fit="cover"
            width="100%"
            :src="img"
            @load="handleLoad"
          />
        </div>
        <router-link
          v-else
          :to="path"
          class="img-container cover-placeholder"
          :style="placeholderStyle"
          aria-hidden="true"
          tabindex="-1"
        >
          <span class="cover-glow"></span>
          <span class="cover-glyph">{{ coverGlyph }}</span>
          <span class="cover-category">{{ tag || '随笔' }}</span>
        </router-link>
  
        <div class="content">
          {{ content }} ...
          <router-link :to="path" class="more"><span>更多</span></router-link>
        </div>
  
        <div class="footer">
          <span class="time">发布时间：{{ time }}</span>
          <span class="tag">分类：{{ tag }}</span>
        </div>
  
      </div>
    </div>
  </template>
  

  <script setup lang="ts">
  import { computed, onMounted } from 'vue';
  import { NImage } from 'naive-ui';
  
  const props = defineProps({
    title: { type: String, default: '标题' },
    img: { type: String, default: '' },
    content: { type: String, default: '内容' },
    time: { type: String, default: '2023-01-01' },
    tag: { type: String, default: '书影记录' },
    path: { type: String, default: '/' }
  });
  
  const emit = defineEmits(['imageLoaded']);
  
  function handleLoad() {
    emit('imageLoaded');
  }

  const PLACEHOLDER_PALETTES = [
    ['#667eea', '#764ba2'],
    ['#11998e', '#38ef7d'],
    ['#ee0979', '#ff6a00'],
    ['#2193b0', '#6dd5ed'],
    ['#cc2b5e', '#753a88'],
    ['#42275a', '#734b6d'],
    ['#141e30', '#243b55'],
    ['#f7971e', '#ffd200'],
    ['#00b09b', '#96c93d'],
    ['#4e54c8', '#8f94fb'],
  ] as const;

  function hashSeed(input: string): number {
    let h = 0;
    for (let i = 0; i < input.length; i += 1) {
      h = (h * 31 + input.charCodeAt(i)) >>> 0;
    }
    return h;
  }

  const coverGlyph = computed(() => {
    const raw = (props.title || '').trim();
    if (!raw) return '文';
    const first = Array.from(raw).find((ch) => /\S/.test(ch)) || '文';
    return first.toUpperCase();
  });

  const placeholderStyle = computed(() => {
    const seed = hashSeed(`${props.tag || ''}|${props.title || ''}|${props.path || ''}`);
    const [from, to] = PLACEHOLDER_PALETTES[seed % PLACEHOLDER_PALETTES.length];
    const angle = 120 + (seed % 60);
    return {
      background: `linear-gradient(${angle}deg, ${from} 0%, ${to} 100%)`,
    };
  });

  onMounted(() => {
    // 无封面时也通知瀑布流重排，避免等高估算偏空
    if (!props.img) {
      emit('imageLoaded');
    }
  });
  </script>
  

<style scoped>
.wrapper {
    display: block;
    height: auto;
    -webkit-column-break-inside: avoid;
    break-inside: avoid;
    background: #fff;
    border: 0.1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin-bottom: 20px;
    padding: 20px;
}

.wrapper:hover {
    transform: scale(1.01);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
}

.container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 20px;
    text-decoration: none;
    font-weight: 800;
    color: black;
  text-decoration: underline;
  text-decoration-color: #2d96bd;
  text-decoration-thickness: 3px;

    &:hover {
        text-decoration: underline;
        color: #2d96bd;
        cursor: pointer;
        transition: all 0.3s ease;
        transform: scale(1.01);
    }
}

.more {
    font-weight: 500;
    text-decoration: none;
    color: #2d96bd;

    &:hover {
        text-decoration: underline;
        cursor: pointer;
        transition: all 0.3s ease;
    }

}

.content {
    font-size: 15px;
    font-weight: 400;
    color: #73828c;
    margin-top: 10px;
    margin-bottom: 10px;
    line-height: 1.5;
    text-align: justify;
    text-indent: 2em;
    white-space: pre-wrap;
    word-break: break-all;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
}

.footer {
    display: flex;
    flex-direction: row;

}

.time {
    font-size: 15px;
    color: #73828c;
    margin-right: 10px;
    margin-top: 10px;
    line-height: 1.5;
    text-align: left;
}

.tag {
    font-size: 15px;
    color: #73828c;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    line-height: 1.5;
    text-align: left;
}

.img-container {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 20px;
    max-height: 400px;
}

.cover-placeholder {
    position: relative;
    align-items: center;
    justify-content: center;
    min-height: 148px;
    max-height: 180px;
    height: 160px;
    border-radius: 10px;
    overflow: hidden;
    text-decoration: none;
    color: #fff;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12);
}

.cover-glow {
    position: absolute;
    inset: -20% 30% auto -10%;
    height: 70%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.28), transparent 68%);
    pointer-events: none;
}

.cover-glyph {
    position: relative;
    z-index: 1;
    font-size: 52px;
    font-weight: 700;
    letter-spacing: 0.04em;
    line-height: 1;
    text-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);
    user-select: none;
}

.cover-category {
    position: absolute;
    left: 14px;
    bottom: 12px;
    z-index: 1;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: rgba(255, 255, 255, 0.95);
    background: rgba(0, 0, 0, 0.28);
    backdrop-filter: blur(6px);
    max-width: calc(100% - 28px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.n-image {
    max-width: 100%;
    border-radius: 10px;
    transition: all 0.3s ease;

    &:hover {
        transform: scale(1.01);
    }
}

:global([data-theme="dark"] .post-card) {
    background: #182235;
    border-color: rgba(148, 163, 184, 0.24);
    box-shadow: 0 10px 28px rgba(2, 6, 23, 0.18);
}

:global([data-theme="dark"] .post-card:hover) {
    box-shadow: 0 16px 34px rgba(2, 6, 23, 0.35);
    border-color: rgba(56, 189, 248, 0.38);
}

:global([data-theme="dark"] .post-card .title) {
    color: #f8fafc;
    text-decoration-color: #38bdf8;
}

:global([data-theme="dark"] .post-card .title:hover) {
    color: #7dd3fc;
}

:global([data-theme="dark"] .post-card .content) {
    color: #cbd5e1;
}

:global([data-theme="dark"] .post-card .time),
:global([data-theme="dark"] .post-card .tag) {
    color: #b6c3d1;
    background: transparent;
}

:global([data-theme="dark"] .post-card .more) {
    color: #38bdf8;
}

:global([data-theme="dark"] .post-card .cover-placeholder) {
    box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.22);
}
</style>
