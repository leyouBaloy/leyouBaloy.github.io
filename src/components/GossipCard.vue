<template>
  <article class="gossip-card" :class="kindInfo.key">
    <div class="gossip-axis" aria-hidden="true">
      <span class="gossip-dot"></span>
    </div>

    <div class="gossip-body">
      <div class="gossip-metabar">
        <span class="gossip-kind">
          {{ kindInfo.icon }}<span v-if="showKindLabel" class="gossip-kind-label">{{ kindInfo.label }}</span>
        </span>
        <time class="gossip-date" :datetime="item.date" :title="fullDateText">{{ dateText }}</time>
        <span v-if="item.mood" class="mood">{{ item.mood }}</span>
      </div>

      <div class="gossip-head">
        <h3 v-if="item.title">{{ item.title }}</h3>
      </div>

      <p v-if="item.content">{{ item.content }}</p>

      <div v-if="item.video" class="video-line">
        <span v-if="showVideoName" class="video-name">{{ item.video.title }}</span>
        <a class="video-link" :href="item.video.url" target="_blank" rel="noopener noreferrer">
          <span class="video-play">▶</span>
          <span>{{ item.video.platform || 'YouTube' }}</span>
          <span v-if="item.video.duration" class="video-duration">{{ item.video.duration }}</span>
          <span class="video-arrow">↗</span>
        </a>
      </div>

      <div v-if="item.tags?.length" class="tag-row">
        <span v-for="tag in item.tags" :key="tag">#{{ tag }}</span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { GossipItem } from '@/types/Gossip';

const props = defineProps<{
  item: GossipItem;
}>();

interface KindInfo {
  key: 'english' | 'sport' | 'note';
  icon: string;
  label: string;
}

const KINDS: Record<KindInfo['key'], KindInfo> = {
  english: { key: 'english', icon: '📝', label: '英语打卡' },
  sport: { key: 'sport', icon: '💪', label: '运动' },
  note: { key: 'note', icon: '📌', label: '随笔' },
};

/** 类型判定：优先取 kind 字段，其次按标签猜，兜底为随笔 */
const kindInfo = computed<KindInfo>(() => {
  if (props.item.kind === 'english-checkin') return KINDS.english;
  const tags = props.item.tags ?? [];
  if (tags.some((tag) => /运动|椭圆机|健身|跑步|减脂|锻炼/.test(tag))) return KINDS.sport;
  return KINDS.note;
});

/** 标题里已经写明类型时不再重复展示类型名 */
const showKindLabel = computed(() => {
  const title = props.item.title ?? '';
  const keyword = kindInfo.value.label.replace('打卡', '');
  return !title.includes(keyword);
});

/** 视频标题和条目标题重复时只保留标题，避免冗余 */
const showVideoName = computed(() => {
  const name = props.item.video?.title?.trim();
  if (!name) return false;
  const title = props.item.title?.trim() ?? '';
  if (!title) return true;
  return !(name === title || name.startsWith(title) || title.startsWith(name));
});

const parsedDate = computed(() => {
  const raw = props.item.date ?? '';
  const value = raw.includes('T') ? raw : `${raw}T00:00:00`;
  return new Date(value);
});

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

/** 今天 / 昨天 / 前天 / 9月12日 */
const dateText = computed(() => {
  const date = parsedDate.value;
  if (Number.isNaN(date.getTime())) return props.item.date;

  const now = new Date();
  const diffDays = Math.round((startOfDay(now).getTime() - startOfDay(date).getTime()) / 86400000);

  if (diffDays === 0) return '今天';
  if (diffDays === 1) return '昨天';
  if (diffDays === 2) return '前天';

  const monthDay = `${date.getMonth() + 1}月${date.getDate()}日`;
  return date.getFullYear() === now.getFullYear() ? monthDay : `${date.getFullYear()}年${monthDay}`;
});

const fullDateText = computed(() => {
  const date = parsedDate.value;
  if (Number.isNaN(date.getTime())) return props.item.date;
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}/${month}/${day}`;
});
</script>

<style scoped>
.gossip-card {
  --axis-x: 12px;
  --dot-size: 11px;
  --gossip-accent: #2d96bd;
  --gossip-accent-soft: rgba(45, 150, 189, 0.28);
  --gossip-accent-glow: rgba(45, 150, 189, 0.13);

  display: grid;
  grid-template-columns: 26px minmax(0, 1fr);
  padding: 14px 18px 14px 12px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.055), 0 1px 2px rgba(15, 23, 42, 0.05);
}

.gossip-card.sport {
  --gossip-accent: #16a34a;
  --gossip-accent-soft: rgba(22, 163, 74, 0.26);
  --gossip-accent-glow: rgba(22, 163, 74, 0.13);
}

.gossip-card.note {
  --gossip-accent: #8a96a0;
  --gossip-accent-soft: rgba(138, 150, 160, 0.28);
  --gossip-accent-glow: rgba(138, 150, 160, 0.13);
}

.gossip-axis {
  position: relative;
  min-height: 100%;
}

.gossip-axis::before {
  content: '';
  position: absolute;
  left: var(--axis-x);
  top: -14px;
  bottom: -14px;
  width: 2px;
  border-radius: 2px;
  background: var(--gossip-accent-soft);
}

.gossip-dot {
  position: absolute;
  left: calc(var(--axis-x) + 1px - var(--dot-size) / 2);
  top: 7px;
  width: var(--dot-size);
  height: var(--dot-size);
  box-sizing: border-box;
  border: 3px solid var(--gossip-accent);
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 0 3px var(--gossip-accent-glow);
}

.gossip-body {
  min-width: 0;
}

.gossip-metabar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 5px;
}

.gossip-kind {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--gossip-accent);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.01em;
  line-height: 1.4;
}

.gossip-kind-label {
  opacity: 0.9;
}

.gossip-date {
  color: #8a96a0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  font-size: 12.5px;
  font-weight: 600;
  line-height: 1.5;
  white-space: nowrap;
}

.mood {
  color: #8a96a0;
  font-size: 12px;
  line-height: 1.4;
}

.gossip-head {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 6px;
}

h3 {
  margin: 0;
  color: #111827;
  font-size: 16.5px;
  line-height: 1.35;
  font-weight: 800;
}

p {
  margin: 0;
  color: #64727d;
  font-size: 15px;
  line-height: 1.65;
  white-space: pre-wrap;
  word-break: break-word;
}

.video-line {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px 10px;
  margin-top: 10px;
}

.video-name {
  flex: 1 1 100%;
  color: #8a96a0;
  font-size: 13px;
  line-height: 1.5;
  word-break: break-word;
}

.video-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  max-width: 100%;
  padding: 3px 10px;
  border: 1px solid var(--gossip-accent-soft);
  border-radius: 999px;
  background: var(--gossip-accent-glow);
  color: var(--gossip-accent);
  font-size: 12.5px;
  font-weight: 600;
  line-height: 1.5;
  text-decoration: none;
  transition: background 0.2s ease, transform 0.2s ease;
}

.video-link:hover {
  background: var(--gossip-accent-soft);
  transform: translateY(-1px);
}

.video-play {
  font-size: 10px;
}

.video-duration {
  color: var(--gossip-accent);
  font-weight: 500;
  opacity: 0.85;
}

.video-duration::before {
  content: '·';
  margin: 0 5px;
  opacity: 0.7;
}

.video-arrow {
  font-size: 11px;
  opacity: 0.7;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.tag-row span {
  color: #2d96bd;
  font-size: 13px;
  line-height: 1.4;
}

:global([data-theme="dark"] .gossip-card) {
  background: #111827;
  box-shadow: 0 0 0 1px rgba(148, 163, 184, 0.14), 0 1px 2px rgba(2, 6, 23, 0.4);
}

:global([data-theme="dark"] .gossip-card.english) {
  --gossip-accent: #38bdf8;
  --gossip-accent-soft: rgba(56, 189, 248, 0.24);
  --gossip-accent-glow: rgba(56, 189, 248, 0.14);
}

:global([data-theme="dark"] .gossip-card.sport) {
  --gossip-accent: #4ade80;
  --gossip-accent-soft: rgba(74, 222, 128, 0.22);
  --gossip-accent-glow: rgba(74, 222, 128, 0.14);
}

:global([data-theme="dark"] .gossip-card.note) {
  --gossip-accent: #94a3b8;
  --gossip-accent-soft: rgba(148, 163, 184, 0.24);
  --gossip-accent-glow: rgba(148, 163, 184, 0.14);
}

:global([data-theme="dark"] .gossip-card .gossip-dot) {
  background: #111827;
}

:global([data-theme="dark"] .gossip-card h3) {
  color: #f8fafc;
}

:global([data-theme="dark"] .gossip-card p) {
  color: #cbd5e1;
}

:global([data-theme="dark"] .gossip-card .video-name),
:global([data-theme="dark"] .gossip-card .gossip-date),
:global([data-theme="dark"] .gossip-card .mood) {
  color: #94a3b8;
}

:global([data-theme="dark"] .gossip-card .tag-row span) {
  color: #38bdf8;
}

@media screen and (max-width: 500px) {
  .gossip-card {
    --axis-x: 9px;
    --dot-size: 10px;
    grid-template-columns: 22px minmax(0, 1fr);
    padding: 12px 12px 12px 8px;
  }

  .gossip-dot {
    top: 5px;
  }

  h3 {
    font-size: 15.5px;
  }

  .gossip-head {
    align-items: flex-start;
    flex-direction: column;
    gap: 4px;
  }

  .video-line {
    margin-top: 8px;
  }
}
</style>
