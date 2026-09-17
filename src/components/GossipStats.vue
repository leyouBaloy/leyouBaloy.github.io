<template>
  <section class="gossip-stats" aria-label="打卡统计">
    <div class="stat-cards">
      <div class="stat-card">
        <span class="stat-value">{{ stats.streak }}<small>天</small></span>
        <span class="stat-label">连续打卡</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">{{ stats.monthDays }}<small>天</small></span>
        <span class="stat-label">本月打卡</span>
      </div>
      <div class="stat-card english">
        <span class="stat-value">{{ stats.monthEnglish }}<small>次</small></span>
        <span class="stat-label">本月英语</span>
      </div>
      <div class="stat-card sport">
        <span class="stat-value">{{ stats.monthSport }}<small>次</small></span>
        <span class="stat-label">本月运动</span>
      </div>
      <div class="stat-card english">
        <span class="stat-value">{{ stats.totalMinutes }}<small>分</small></span>
        <span class="stat-label">累计听力</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">{{ stats.videos }}<small>个</small></span>
        <span class="stat-label">听过视频</span>
      </div>
    </div>

    <div class="heatmap-box">
      <div class="heatmap-head">
        <span class="heatmap-title">最近 26 周</span>
        <div class="heatmap-legend">
          <span class="legend-item"><i class="dot empty"></i>未打卡</span>
          <span class="legend-item"><i class="dot english"></i>英语</span>
          <span class="legend-item"><i class="dot sport"></i>运动</span>
          <span class="legend-item"><i class="dot both"></i>都有</span>
        </div>
      </div>

      <div class="heatmap-body">
        <div class="heatmap-weekdays">
          <span>一</span><span></span><span>三</span><span></span><span>五</span><span></span><span>日</span>
        </div>
        <div class="heatmap-scroll">
          <div class="heatmap" :style="{ '--weeks': stats.weeks }">
            <div class="heatmap-months">
              <span
                v-for="m in stats.monthLabels"
                :key="m.key"
                :style="{ gridColumn: `${m.start + 1} / span ${m.span}` }"
              >{{ m.label }}</span>
            </div>
            <div class="heatmap-grid">
              <span
                v-for="cell in stats.cells"
                :key="cell.date"
                class="cell"
                :class="cell.kind"
                :title="cell.title"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { GossipItem } from '@/types/Gossip';

const props = defineProps<{
  items: GossipItem[];
}>();

const DAY_MS = 86400000;
const WEEKS = 26;

const dateKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

const parseTime = (value?: string): number | null => {
  if (!value) return null;
  const match = value.match(/(\d{1,2}):(\d{2})/);
  if (!match) return null;
  return Number(match[1]) * 60 + Number(match[2]);
};

const isEnglish = (item: GossipItem) => item.kind === 'english-checkin';

const isSport = (item: GossipItem) => {
  if (isEnglish(item)) return false;
  const tags = item.tags ?? [];
  return tags.some((tag) => /运动|椭圆机|健身|跑步|减脂|锻炼/.test(tag));
};

/** 每条记录的有效听力时长：优先 progress.heard，其次正文「听到 x:xx」，再次「听完/完结」取总时长 */
const heardSeconds = (item: GossipItem, all: GossipItem[]): number | null => {
  const direct = parseTime(item.progress?.heard);
  if (direct != null) return direct;

  const content = item.content ?? '';
  const heard = content.match(/听到\s*(\d{1,2}:\d{2})/);
  if (heard) return parseTime(heard[1]);

  if (/听完|完结/.test(content)) {
    const total = parseTime(item.progress?.total) ?? parseTime(content.match(/总时长\s*(\d{1,2}:\d{2})/)?.[1]);
    if (total != null) return total;

    // 同一视频的其他记录里找总时长
    const url = item.video?.url;
    if (url) {
      for (const other of all) {
        if (other.video?.url !== url) continue;
        const value = parseTime(other.progress?.total) ?? parseTime(other.content?.match(/总时长\s*(\d{1,2}:\d{2})/)?.[1]);
        if (value != null) return value;
      }
    }
  }
  return null;
};

const dayMap = computed(() => {
  const map = new Map<string, { english: boolean; sport: boolean; note: boolean; items: GossipItem[] }>();
  for (const item of props.items) {
    if (!item.date) continue;
    const record = map.get(item.date) ?? { english: false, sport: false, note: false, items: [] };
    record.items.push(item);
    if (isEnglish(item)) record.english = true;
    else if (isSport(item)) record.sport = true;
    else record.note = true;
    map.set(item.date, record);
  }
  return map;
});

const stats = computed(() => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const monthPrefix = dateKey(today).slice(0, 7);

  // 连续打卡：从今天（若今天没记则从昨天）往前数
  let streak = 0;
  const cursor = new Date(today.getTime());
  if (!dayMap.value.has(dateKey(cursor))) cursor.setTime(cursor.getTime() - DAY_MS);
  while (dayMap.value.has(dateKey(cursor))) {
    streak += 1;
    cursor.setTime(cursor.getTime() - DAY_MS);
  }

  let monthDays = 0;
  let monthEnglish = 0;
  let monthSport = 0;
  for (const [date, record] of dayMap.value) {
    if (!date.startsWith(monthPrefix)) continue;
    monthDays += 1;
    if (record.english) monthEnglish += 1;
    if (record.sport) monthSport += 1;
  }

  // 累计听力：按视频去重，取每个视频的最大进度，避免跨天重复计数
  const perVideo = new Map<string, number>();
  for (const item of props.items) {
    if (!isEnglish(item)) continue;
    const key = item.video?.url ?? item.id;
    const seconds = heardSeconds(item, props.items);
    if (seconds == null) continue;
    if (seconds > (perVideo.get(key) ?? 0)) perVideo.set(key, seconds);
  }
  let totalSeconds = 0;
  for (const seconds of perVideo.values()) totalSeconds += seconds;

  const videos = new Set(props.items.filter(isEnglish).map((item) => item.video?.url ?? item.id)).size;

  // 热力图：按周对齐（周一起），共 26 列
  const weekday = (today.getDay() + 6) % 7; // 周一=0
  const start = new Date(today.getTime() - (weekday + (WEEKS - 1) * 7) * DAY_MS);

  const cells: { date: string; kind: string; title: string }[] = [];
  for (let i = 0; i < WEEKS * 7; i++) {
    const date = new Date(start.getTime() + i * DAY_MS);
    const key = dateKey(date);
    const record = dayMap.value.get(key);
    let kind = 'empty';
    if (record) {
      if (record.english && record.sport) kind = 'both';
      else if (record.english) kind = 'english';
      else if (record.sport) kind = 'sport';
      else kind = 'note';
    }
    if (date.getTime() > today.getTime()) kind = 'future';

    const detail = record?.items.map((item) => item.content ?? item.title ?? '').filter(Boolean).join(' / ') ?? '';
    cells.push({
      date: key,
      kind,
      title: record ? `${key} ${detail.slice(0, 40)}` : `${key} 未打卡`,
    });
  }

  // 月份标签：按列扫描，月份变化时打一个标签
  const monthLabels: { key: string; month: string; label: string; start: number; span: number }[] = [];
  for (let week = 0; week < WEEKS; week++) {
    const date = new Date(start.getTime() + week * 7 * DAY_MS);
    const month = dateKey(date).slice(0, 7);
    const last = monthLabels[monthLabels.length - 1];
    if (!last || last.month !== month) {
      monthLabels.push({ key: month, month, label: `${date.getMonth() + 1}月`, start: week, span: 1 });
    } else {
      last.span += 1;
    }
  }

  return {
    streak,
    monthDays,
    monthEnglish,
    monthSport,
    totalMinutes: Math.round(totalSeconds / 60),
    videos,
    cells,
    monthLabels,
    weeks: WEEKS,
  };
});
</script>

<style scoped>
.gossip-stats {
  --stat-english: #2d96bd;
  --stat-sport: #16a34a;
  --stat-note: #b6c2cc;
  --cell-empty: rgba(15, 23, 42, 0.07);

  display: grid;
  gap: 10px;
  margin-bottom: 16px;
}

.stat-cards {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 8px;
  padding: 12px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.055), 0 1px 2px rgba(15, 23, 42, 0.05);
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 2px 0;
  border-radius: 8px;
}

.stat-value {
  color: #111827;
  font-size: 19px;
  font-weight: 800;
  line-height: 1.2;
  font-variant-numeric: tabular-nums;
}

.stat-value small {
  margin-left: 1px;
  color: #8a96a0;
  font-size: 11px;
  font-weight: 600;
}

.stat-label {
  color: #8a96a0;
  font-size: 11.5px;
  line-height: 1.3;
  white-space: nowrap;
}

.stat-card.english .stat-value {
  color: var(--stat-english);
}

.stat-card.sport .stat-value {
  color: var(--stat-sport);
}

.heatmap-box {
  padding: 12px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.055), 0 1px 2px rgba(15, 23, 42, 0.05);
}

.heatmap-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 8px;
}

.heatmap-title {
  color: #64727d;
  font-size: 12.5px;
  font-weight: 700;
}

.heatmap-legend {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.legend-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #8a96a0;
  font-size: 11.5px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 3px;
}

.dot.empty {
  background: var(--cell-empty);
}

.dot.english {
  background: var(--stat-english);
}

.dot.sport {
  background: var(--stat-sport);
}

.dot.both {
  background: linear-gradient(135deg, var(--stat-english) 50%, var(--stat-sport) 50%);
}

.heatmap-body {
  display: flex;
  gap: 6px;
  align-items: flex-start;
}

.heatmap-weekdays {
  display: grid;
  grid-template-rows: repeat(7, 1fr);
  gap: 3px;
  padding-top: 16px;
  color: #a3aeb8;
  font-size: 10px;
  line-height: 1;
}

.heatmap-weekdays span {
  height: 12px;
  display: flex;
  align-items: center;
}

.heatmap-scroll {
  flex: 1 1 auto;
  min-width: 0;
  overflow-x: auto;
  padding-bottom: 2px;
}

.heatmap {
  min-width: max-content;
}

.heatmap-months {
  display: grid;
  grid-template-columns: repeat(var(--weeks), 12px);
  gap: 3px;
  margin-bottom: 3px;
}

.heatmap-months span {
  color: #a3aeb8;
  font-size: 10px;
  line-height: 1.2;
  white-space: nowrap;
}

.heatmap-grid {
  display: grid;
  grid-template-rows: repeat(7, 12px);
  grid-auto-flow: column;
  grid-auto-columns: 12px;
  gap: 3px;
}

.cell {
  width: 12px;
  height: 12px;
  border-radius: 3px;
  background: var(--cell-empty);
}

.cell.english {
  background: var(--stat-english);
}

.cell.sport {
  background: var(--stat-sport);
}

.cell.both {
  background: linear-gradient(135deg, var(--stat-english) 50%, var(--stat-sport) 50%);
}

.cell.note {
  background: var(--stat-note);
}

.cell.future {
  background: transparent;
}

:global([data-theme="dark"] .gossip-stats) {
  --cell-empty: rgba(148, 163, 184, 0.16);
  --stat-english: #38bdf8;
  --stat-sport: #4ade80;
  --stat-note: #64748b;
}

:global([data-theme="dark"] .stat-cards),
:global([data-theme="dark"] .heatmap-box) {
  background: #111827;
  box-shadow: 0 0 0 1px rgba(148, 163, 184, 0.14), 0 1px 2px rgba(2, 6, 23, 0.4);
}

:global([data-theme="dark"] .stat-value) {
  color: #f8fafc;
}

:global([data-theme="dark"] .stat-value small),
:global([data-theme="dark"] .stat-label),
:global([data-theme="dark"] .heatmap-title),
:global([data-theme="dark"] .legend-item),
:global([data-theme="dark"] .heatmap-months span),
:global([data-theme="dark"] .heatmap-weekdays span) {
  color: #94a3b8;
}

:global([data-theme="dark"] .stat-card.english .stat-value) {
  color: var(--stat-english);
}

:global([data-theme="dark"] .stat-card.sport .stat-value) {
  color: var(--stat-sport);
}

@media screen and (max-width: 500px) {
  .stat-cards {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px 8px;
    padding: 10px;
  }

  .stat-value {
    font-size: 17px;
  }

  .heatmap {
    --cell-size: 11px;
  }

  .heatmap-months {
    grid-template-columns: repeat(var(--weeks), 11px);
    gap: 2px;
  }

  .heatmap-grid {
    grid-template-rows: repeat(7, 11px);
    grid-auto-columns: 11px;
    gap: 2px;
  }

  .cell {
    width: 11px;
    height: 11px;
  }

  .heatmap-weekdays {
    gap: 2px;
  }

  .heatmap-weekdays span {
    height: 11px;
  }
}
</style>
