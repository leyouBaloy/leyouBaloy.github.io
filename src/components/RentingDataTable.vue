<template>
  <section class="renting-table" aria-live="polite">
    <div class="table-head">
      <div>
        <p class="eyebrow">Interactive Dataset</p>
        <h2>{{ tableTitle }}</h2>
      </div>
      <a v-if="workbookUrl" class="download-link" :href="workbookUrl" download>下载原始 Excel</a>
    </div>

    <div v-if="summary" class="metric-grid">
      <div class="metric">
        <strong>{{ summary.rowCount }}</strong>
        <span>候选地点</span>
      </div>
      <div class="metric">
        <strong>{{ formatNumber(metrics.avgGeminiScore) }}</strong>
        <span>平均 AI 评分</span>
      </div>
      <div class="metric">
        <strong>{{ formatNumber(metrics.avgEvidenceStrength) }}</strong>
        <span>平均证据强度</span>
      </div>
      <div class="metric">
        <strong>{{ metrics.totalEffectiveSources }}</strong>
        <span>有效来源</span>
      </div>
    </div>

    <div class="controls">
      <label class="search-box">
        <span>搜索</span>
        <input v-model="query" type="search" placeholder="小区、公寓、区域、总结..." />
      </label>
      <label>
        <span>类型</span>
        <select v-model="typeFilter">
          <option value="">全部</option>
          <option v-for="type in typeOptions" :key="type" :value="type">{{ type }}</option>
        </select>
      </label>
      <label>
        <span>区域</span>
        <select v-model="areaFilter">
          <option value="">全部</option>
          <option v-for="area in areaOptions" :key="area" :value="area">{{ area }}</option>
        </select>
      </label>
    </div>

    <p v-if="loading" class="state-copy">数据加载中...</p>
    <p v-else-if="error" class="state-copy error">{{ error }}</p>
    <div v-else>
      <div class="result-line">
        展示 {{ visibleRows.length }} / {{ rows.length }} 条。点击表头可排序，点击行可展开来源与长线索。
      </div>
      <div class="table-shell">
        <table>
          <thead>
            <tr>
              <th v-for="column in visibleColumns" :key="column.key">
                <button type="button" @click="setSort(column.key)">
                  <span>{{ column.label }}</span>
                  <span class="sort-mark">{{ sortMark(column.key) }}</span>
                </button>
              </th>
            </tr>
          </thead>
          <tbody v-for="row in visibleRows" :key="row.id">
              <tr :class="{ selected: expandedId === row.id }" @click="toggleRow(row.id)">
                <td class="name-cell">
                  <strong>{{ row['名字'] }}</strong>
                  <span>{{ row['类型'] }} · {{ row['区域'] }}</span>
                </td>
                <td>{{ row['证据强度(0-10)'] }}</td>
                <td>{{ row['有效来源数'] }}</td>
                <td>
                  <span class="score-pill">{{ row['gemini评分'] }}</span>
                </td>
                <td class="summary-cell">{{ row['gemini总结'] }}</td>
                <td class="clue-cell">{{ compact(row['租房价格线索'], 82) }}</td>
                <td class="clue-cell">{{ compact(row['风险/差评线索'], 82) }}</td>
              </tr>
              <tr v-if="expandedId === row.id" class="detail-row">
                <td :colspan="visibleColumns.length">
                  <div class="detail-grid">
                    <section>
                      <h3>地址</h3>
                      <p>{{ row['地址'] }}</p>
                    </section>
                    <section>
                      <h3>房子质量线索</h3>
                      <p>{{ compact(row['房子质量线索'], 420) }}</p>
                    </section>
                    <section>
                      <h3>生活便利线索</h3>
                      <p>{{ compact(row['生活便利线索'], 420) }}</p>
                    </section>
                    <section>
                      <h3>综合摘要</h3>
                      <p>{{ compact(row['综合摘要'], 520) }}</p>
                    </section>
                    <section class="sources">
                      <h3>来源</h3>
                      <ol>
                        <li v-for="source in parseSources(row['来源'])" :key="source.url || source.text">
                          <a v-if="source.url" :href="source.url" target="_blank" rel="noopener noreferrer">
                            {{ source.title || source.url }}
                          </a>
                          <span v-else>{{ source.text }}</span>
                        </li>
                      </ol>
                    </section>
                  </div>
                </td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  }
});

const rows = ref([]);
const summary = ref(null);
const loading = ref(true);
const error = ref('');
const query = ref('');
const typeFilter = ref('');
const areaFilter = ref('');
const expandedId = ref(null);
const sortKey = ref('gemini评分');
const sortDirection = ref('desc');

const visibleColumns = [
  { key: '名字', label: '地点' },
  { key: '证据强度(0-10)', label: '证据' },
  { key: '有效来源数', label: '来源数' },
  { key: 'gemini评分', label: '评分' },
  { key: 'gemini总结', label: 'AI 总结' },
  { key: '租房价格线索', label: '价格线索' },
  { key: '风险/差评线索', label: '风险线索' }
];

const tableTitle = computed(() => props.title || summary.value?.title || '住宅公寓口碑汇总');
const metrics = computed(() => summary.value?.metrics || {});
const workbookUrl = computed(() => summary.value?.sourceWorkbook || '');

const typeOptions = computed(() => uniqueOptions('类型'));
const areaOptions = computed(() => uniqueOptions('区域'));

const uniqueOptions = (key) => {
  return [...new Set(rows.value.map((row) => row[key]).filter(Boolean))]
    .sort((a, b) => String(a).localeCompare(String(b), 'zh-CN'));
};

const searchableText = (row) => {
  return [
    row['名字'],
    row['类型'],
    row['区域'],
    row['地址'],
    row['gemini总结'],
    row['租房价格线索'],
    row['风险/差评线索']
  ].join(' ').toLowerCase();
};

const normalizeSortable = (value) => {
  if (value === null || value === undefined || value === '') return '';
  const number = Number(value);
  return Number.isFinite(number) ? number : String(value);
};

const filteredRows = computed(() => {
  const keyword = query.value.trim().toLowerCase();
  return rows.value.filter((row) => {
    if (typeFilter.value && row['类型'] !== typeFilter.value) return false;
    if (areaFilter.value && row['区域'] !== areaFilter.value) return false;
    if (keyword && !searchableText(row).includes(keyword)) return false;
    return true;
  });
});

const visibleRows = computed(() => {
  const direction = sortDirection.value === 'asc' ? 1 : -1;
  return [...filteredRows.value].sort((a, b) => {
    const left = normalizeSortable(a[sortKey.value]);
    const right = normalizeSortable(b[sortKey.value]);
    if (typeof left === 'number' && typeof right === 'number') {
      return (left - right) * direction;
    }
    return String(left).localeCompare(String(right), 'zh-CN') * direction;
  });
});

const setSort = (key) => {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortDirection.value = ['证据强度(0-10)', '有效来源数', 'gemini评分'].includes(key) ? 'desc' : 'asc';
  }
};

const sortMark = (key) => {
  if (sortKey.value !== key) return '↕';
  return sortDirection.value === 'asc' ? '↑' : '↓';
};

const toggleRow = (id) => {
  expandedId.value = expandedId.value === id ? null : id;
};

const compact = (value, limit = 120) => {
  const text = String(value || '').replace(/\s+/g, ' ').trim();
  if (text.length <= limit) return text || '暂无';
  return `${text.slice(0, limit)}...`;
};

const parseSources = (value) => {
  const lines = String(value || '')
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.slice(0, 8).map((line) => {
    const cleaned = line.replace(/^\d+\.\s*/, '');
    const url = cleaned.match(/https?:\/\/\S+/)?.[0] || '';
    return {
      url,
      title: url ? cleaned.replace(url, '').trim() : '',
      text: cleaned
    };
  });
};

const formatNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number.toFixed(2).replace(/\.00$/, '') : '-';
};

onMounted(async () => {
  loading.value = true;
  try {
    const response = await fetch(props.src);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const payload = await response.json();
    summary.value = payload.summary || null;
    rows.value = Array.isArray(payload.rows) ? payload.rows : [];
  } catch (err) {
    error.value = `数据加载失败：${err.message || err}`;
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.renting-table {
  width: 100%;
  margin: 28px 0;
  padding: 18px;
  border: 1px solid #dbe7ee;
  border-radius: 8px;
  background: #fbfdff;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.08);
}

.table-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.eyebrow {
  margin: 0 0 4px;
  color: #64748b;
  font-size: 12px;
  letter-spacing: 0;
  text-indent: 0;
  text-transform: uppercase;
}

h2,
h3,
p {
  text-indent: 0;
}

h2 {
  margin: 0;
  color: #0f172a;
  font-size: 20px;
  line-height: 1.35;
}

.download-link {
  flex: 0 0 auto;
  color: #0369a1;
  font-size: 14px;
  text-decoration: none;
}

.download-link:hover {
  text-decoration: underline;
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 16px;
}

.metric {
  min-width: 0;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #ffffff;
}

.metric strong {
  display: block;
  color: #0f766e;
  font-size: 22px;
  line-height: 1.2;
}

.metric span {
  color: #64748b;
  font-size: 13px;
}

.controls {
  display: grid;
  grid-template-columns: minmax(220px, 1fr) minmax(130px, 170px) minmax(130px, 170px);
  gap: 10px;
  align-items: end;
  margin-bottom: 10px;
}

label {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 5px;
  color: #475569;
  font-size: 13px;
}

input,
select {
  width: 100%;
  min-height: 36px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  background: #ffffff;
  color: #0f172a;
  font: inherit;
  padding: 6px 9px;
}

.result-line,
.state-copy {
  margin: 8px 0 12px;
  color: #64748b;
  font-size: 13px;
  text-indent: 0;
}

.state-copy.error {
  color: #b91c1c;
}

.table-shell {
  width: 100%;
  max-height: 660px;
  overflow: auto;
  border: 1px solid #dbe7ee;
  border-radius: 8px;
  background: #ffffff;
}

table {
  width: 100%;
  min-width: 1120px;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
}

th {
  position: sticky;
  top: 0;
  z-index: 1;
  background: #eef6f8;
  border-bottom: 1px solid #cbd5e1;
}

th button {
  width: 100%;
  min-height: 42px;
  border: 0;
  background: transparent;
  color: #0f172a;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 10px;
  font-weight: 700;
  text-align: left;
}

td {
  border-bottom: 1px solid #e2e8f0;
  color: #1f2937;
  padding: 11px 10px;
  vertical-align: top;
}

tbody tr:not(.detail-row) {
  cursor: pointer;
}

tbody tr:not(.detail-row):hover,
tbody tr.selected {
  background: #f8fafc;
}

.sort-mark {
  color: #64748b;
  font-size: 12px;
}

.name-cell strong {
  display: block;
  color: #0f172a;
  font-size: 14px;
}

.name-cell span {
  display: block;
  color: #64748b;
  font-size: 12px;
  margin-top: 3px;
}

.summary-cell {
  width: 280px;
}

.clue-cell {
  color: #475569;
  font-size: 13px;
  line-height: 1.5;
}

.score-pill {
  display: inline-flex;
  min-width: 36px;
  justify-content: center;
  border-radius: 999px;
  background: #ecfdf5;
  color: #047857;
  font-weight: 700;
  padding: 2px 8px;
}

.detail-row td {
  background: #f8fafc;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.detail-grid section {
  min-width: 0;
}

.detail-grid h3 {
  margin: 0 0 6px;
  color: #0f172a;
  font-size: 14px;
}

.detail-grid p,
.sources ol {
  margin: 0;
  color: #475569;
  font-size: 13px;
  line-height: 1.65;
}

.sources {
  grid-column: 1 / -1;
}

.sources ol {
  padding-left: 18px;
}

.sources li {
  margin: 4px 0;
  font-size: 13px;
}

.sources a {
  color: #0369a1;
}

@media (max-width: 760px) {
  .renting-table {
    padding: 14px;
  }

  .table-head,
  .controls {
    grid-template-columns: 1fr;
  }

  .table-head {
    display: grid;
  }

  .metric-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }
}

:global([data-theme="dark"]) .renting-table {
  background: #111827;
  border-color: #334155;
  box-shadow: 0 16px 38px rgba(2, 6, 23, 0.28);
}

:global([data-theme="dark"]) h2,
:global([data-theme="dark"]) .detail-grid h3,
:global([data-theme="dark"]) .name-cell strong,
:global([data-theme="dark"]) th button {
  color: #e5edf7;
}

:global([data-theme="dark"]) .metric,
:global([data-theme="dark"]) input,
:global([data-theme="dark"]) select,
:global([data-theme="dark"]) .table-shell {
  background: #0f172a;
  border-color: #334155;
  color: #e5edf7;
}

:global([data-theme="dark"]) th {
  background: #1e293b;
  border-bottom-color: #334155;
}

:global([data-theme="dark"]) td {
  border-bottom-color: #334155;
  color: #dbeafe;
}

:global([data-theme="dark"]) tbody tr:not(.detail-row):hover,
:global([data-theme="dark"]) tbody tr.selected,
:global([data-theme="dark"]) .detail-row td {
  background: #182235;
}

:global([data-theme="dark"]) .clue-cell,
:global([data-theme="dark"]) .detail-grid p,
:global([data-theme="dark"]) .sources ol,
:global([data-theme="dark"]) label,
:global([data-theme="dark"]) .result-line,
:global([data-theme="dark"]) .state-copy,
:global([data-theme="dark"]) .name-cell span,
:global([data-theme="dark"]) .eyebrow {
  color: #b6c3d1;
}
</style>
