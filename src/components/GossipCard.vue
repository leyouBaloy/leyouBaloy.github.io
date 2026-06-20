<template>
  <article class="gossip-card">
    <time class="gossip-date" :datetime="item.date">{{ dateText }}</time>
    <div class="gossip-body">
      <div class="gossip-head">
        <h3 v-if="item.title">{{ item.title }}</h3>
        <span v-if="item.mood" class="mood">{{ item.mood }}</span>
      </div>

      <p v-if="item.content">{{ item.content }}</p>

      <dl v-if="item.video" class="video-details">
        <div>
          <dt>视频标题</dt>
          <dd>{{ item.video.title }}</dd>
        </div>
        <div>
          <dt>时长</dt>
          <dd>{{ item.video.duration }}</dd>
        </div>
        <div>
          <dt>链接</dt>
          <dd>
            <a :href="item.video.url" target="_blank" rel="noopener noreferrer">
              {{ item.video.platform }} ↗
            </a>
          </dd>
        </div>
      </dl>

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

const parsedDate = computed(() => new Date(props.item.date));
const dateText = computed(() => {
  const year = parsedDate.value.getFullYear();
  const month = String(parsedDate.value.getMonth() + 1).padStart(2, '0');
  const day = String(parsedDate.value.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
});
</script>

<style scoped>
.gossip-card {
  display: grid;
  grid-template-columns: 108px minmax(0, 1fr);
  gap: 18px;
  padding: 16px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  background: #fff;
}

.gossip-date {
  padding-top: 3px;
  color: #8a96a0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  font-size: 13px;
  line-height: 1.5;
  white-space: nowrap;
}

.gossip-body {
  min-width: 0;
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
  font-size: 17px;
  line-height: 1.35;
  font-weight: 800;
}

.mood {
  color: #8a96a0;
  font-size: 12px;
  line-height: 1.4;
}

p {
  margin: 0;
  color: #64727d;
  font-size: 15px;
  line-height: 1.65;
  white-space: pre-wrap;
  word-break: break-word;
}

.video-details {
  display: grid;
  gap: 7px;
  margin: 10px 0 0;
}

.video-details div {
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  gap: 10px;
}

.video-details dt {
  color: #8a96a0;
  font-size: 13px;
}

.video-details dd {
  min-width: 0;
  margin: 0;
  color: #64727d;
  font-size: 14px;
  line-height: 1.5;
  word-break: break-word;
}

.video-details a {
  color: #2d96bd;
  text-decoration: none;
}

.video-details a:hover {
  text-decoration: underline;
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
  border-color: rgba(148, 163, 184, 0.18);
}

:global([data-theme="dark"] .gossip-card h3) {
  color: #f8fafc;
}

:global([data-theme="dark"] .gossip-card p) {
  color: #cbd5e1;
}

:global([data-theme="dark"] .gossip-card .video-details dd) {
  color: #cbd5e1;
}

:global([data-theme="dark"] .gossip-date),
:global([data-theme="dark"] .gossip-card .mood),
:global([data-theme="dark"] .gossip-card .video-details dt) {
  color: #94a3b8;
}

:global([data-theme="dark"] .gossip-card .tag-row span) {
  color: #38bdf8;
}

@media screen and (max-width: 500px) {
  .gossip-card {
    grid-template-columns: 1fr;
    gap: 6px;
    padding: 14px 0;
  }

  .gossip-head {
    align-items: flex-start;
    flex-direction: column;
  }

  .video-details div {
    grid-template-columns: 64px minmax(0, 1fr);
  }
}
</style>
