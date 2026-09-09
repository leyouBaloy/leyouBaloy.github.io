<template>
    <div class="stats-panel">
          <div class="stat-cards">
                  <div class="stat-card">
                            <div class="stat-label">章总数</div>
                                    <div class="stat-value">{{ totalPosts }}</div>
                                          </div>
                                                <div class="stat-card">
                                                          <div class="stat-label">总字</div>
                                                                  <div class="stat-value">{{ formatNumber(totalWords) }}</div>
                                                                        </div>
                                                                              <div class="stat-card">
                                                                                        <div class="stat-label">预计读</div>
                                                                                                <div class="stat-value">{{ totalReadingTime }} <small>分钟</small></div>
                                                                                                      </div>
                                                                                                            <div class="stat-card">
                                                                                                                      <div class="stat-label">标签数</div>
                                                                                                                              <div class="stat-value">{{ tagStats.length }}</div>
                                                                                                                                    </div>
                                                                                                                                        </div>
                                                                                                                                        
          <section class="stat-section">
                  <h3> 份分</h3>
                        <div v-if="yearStats.length === 0" class="empty">暂无数据</div>
                              <div v-else class="bar-list">
                                        <div v-for="item in yearStats" :key="item.year" class="bar-row">
                                                    <div class="bar-label">{{ item.year }}</div>
                                                              <div class="bar-track">
                                                                            <div class="bar-fill year" :style="{ width: item.percent + '%' }"></div>
                                                                                      </div>
                                                                                                <div class="bar-count">{{ item.count }} 篇</div>
                                                                                                        </div>
                                                                                                              </div>
                                                                                                                  </section>
                                                                                                                  
          <section class="stat-section">
                  <h3>🏷️ 热门</h3>
                        <div v-if="tagStats.length === 0" class="empty">暂无数据</div>
                              <div v-else class="bar-list">
                                        <div v-for="item in tagStats.slice(0, 12)" :key="item.name" class="bar-row">
                                                    <div class="bar-label tag">{{ item.name }}</div>
                                                              <div class="bar-track">
                                                                            <div class="bar-fill tag" :style="{ width: item.percent + '%' }"></div>
                                                                                      </div>
                                                                                                <div class="bar-count">{{ item.count }} 篇</div>
                                                                                                        </div>
                                                                                                              </div>
                                                                                                                  </section>
                                                                                                                    </div>
                                                                                                                    </template>
                                                                                                                    
                                                                                                                    <script setup lang="ts">
                                                                                                                      import { computed } from 'vue';
                                                                                                                      import type { PostMetadata } from '@/types/PostMetadata';
                                                                                                                      
                                                                                                                      const props = defineProps<{
                                                                                                                          postsByYear: Record<string, PostMetadata[]>;
                                                                                                                          postsByTag: Record<string, PostMetadata[]>;
                                                                                                                        }>();
                                                                                                                      
                                                                                                                      const allPosts = computed(() => {
                                                                                                                          const posts: PostMetadata[] = [];
                                                                                                                          for (const year of Object.keys(props.postsByYear)) {
                                                                                                                                posts.push(...props.postsByYear[year]);
                                                                                                                            }
                                                                                                                          return posts;
                                                                                                                        });
                                                                                                                      
                                                                                                                      const totalPosts = computed(() => allPosts.value.length);
                                                                                                                      
                                                                                                                      const totalWords = computed(() =>
                                                                                                                          allPosts.value.reduce((sum, post) => sum + (post.wordCount || 0), 0)
                                                                                                                                                  );
                                                                                                                      
                                                                                                                      const totalReadingTime = computed(() =>
                                                                                                                          allPosts.value.reduce((sum, post) => sum + (post.readingTime || 0), 0)
                                                                                                                                                        );
                                                                                                                      
                                                                                                                      const yearStats = computed(() => {
                                                                                                                          const rows = Object.keys(props.postsByYear)
                                                                                                                            .sort((a, b) => Number(b) - Number(a))
                                                                                                                            .map((year) => ({ year, count: props.postsByYear[year].length }));
                                                                                                                          const max = Math.max(...rows.map((r) => r.count), 1);
                                                                                                                          return rows.map((r) => ({ ...r, percent: Math.round((r.count / max) * 100) }));
                                                                                                                        });
                                                                                                                      
                                                                                                                      const tagStats = computed(() => {
                                                                                                                          const rows = Object.keys(props.postsByTag)
                                                                                                                            .map((name) => ({ name, count: props.postsByTag[name].length }))
                                                                                                                            .sort((a, b) => b.count - a.count);
                                                                                                                          const max = Math.max(...rows.map((r) => r.count), 1);
                                                                                                                          return rows.map((r) => ({ ...r, percent: Math.round((r.count / max) * 100) }));
                                                                                                                        });
                                                                                                                      
                                                                                                                      const formatNumber = (n: number) => {
                                                                                                                          if (n >= 10000) return `${(n / 10000).toFixed(1)} 万`;
                                                                                                                          return n.toLocaleString('zh-CN');
                                                                                                                        };
                                                                                                                      </script>
                                                                                                                      
                                                                                                                      <style scoped>
                                                                                                                        .stats-panel {
                                                                                                                            width: 100%;
                                                                                                                            display: flex;
                                                                                                                            flex-direction: column;
                                                                                                                            gap: 28px;
                                                                                                                            padding: 8px 0 20px;
                                                                                                                          }
                                                                                                                        
                                                                                                                        .stat-cards {
                                                                                                                            display: grid;
                                                                                                                            grid-template-columns: repeat(4, minmax(0, 1fr));
                                                                                                                            gap: 12px;
                                                                                                                          }
                                                                                                                        
                                                                                                                        .stat-card {
                                                                                                                            padding: 16px 14px;
                                                                                                                            border-radius: 14px;
                                                                                                                            background: rgba(255, 255, 255, 0.55);
                                                                                                                            border: 1px solid rgba(255, 255, 255, 0.65);
                                                                                                                            box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
                                                                                                                            backdrop-filter: saturate(160%) blur(12px);
                                                                                                                            -webkit-backdrop-filter: saturate(160%) blur(12px);
                                                                                                                            text-align: center;
                                                                                                                          }
                                                                                                                        
                                                                                                                        .stat-label {
                                                                                                                            font-size: 13px;
                                                                                                                            color: #6b7280;
                                                                                                                            margin-bottom: 8px;
                                                                                                                          }
                                                                                                                        
                                                                                                                        .stat-value {
                                                                                                                            font-size: 1.6rem;
                                                                                                                            font-weight: 800;
                                                                                                                            color: #1f2937;
                                                                                                                            line-height: 1.1;
                                                                                                                          }
                                                                                                                        
                                                                                                                        .stat-value small {
                                                                                                                            font-size: 0.85rem;
                                                                                                                            font-weight: 600;
                                                                                                                            color: #6b7280;
                                                                                                                          }
                                                                                                                        
                                                                                                                        .stat-section h3 {
                                                                                                                            margin: 0 0 14px;
                                                                                                                            font-size: 1.15rem;
                                                                                                                            color: #1f2937;
                                                                                                                          }
                                                                                                                        
                                                                                                                        .bar-list {
                                                                                                                            display: flex;
                                                                                                                            flex-direction: column;
                                                                                                                            gap: 10px;
                                                                                                                          }
                                                                                                                        
                                                                                                                        .bar-row {
                                                                                                                            display: grid;
                                                                                                                            grid-template-columns: 72px 1fr 64px;
                                                                                                                            gap: 10px;
                                                                                                                            align-items: center;
                                                                                                                          }
                                                                                                                        
                                                                                                                        .bar-label {
                                                                                                                            font-size: 14px;
                                                                                                                            font-weight: 700;
                                                                                                                            color: #374151;
                                                                                                                          }
                                                                                                                        
                                                                                                                        .bar-label.tag {
                                                                                                                            overflow: hidden;
                                                                                                                            text-overflow: ellipsis;
                                                                                                                            white-space: nowrap;
                                                                                                                          }
                                                                                                                        
                                                                                                                        .bar-track {
                                                                                                                            height: 10px;
                                                                                                                            border-radius: 999px;
                                                                                                                            background: #e5e7eb;
                                                                                                                            overflow: hidden;
                                                                                                                          }
                                                                                                                        
                                                                                                                        .bar-fill {
                                                                                                                            height: 100%;
                                                                                                                            border-radius: 999px;
                                                                                                                            transition: width 0.3s ease;
                                                                                                                          }
                                                                                                                        
                                                                                                                        .bar-fill.year {
                                                                                                                            background: linear-gradient(90deg, #667eea, #764ba2);
                                                                                                                          }
                                                                                                                        
                                                                                                                        .bar-fill.tag {
                                                                                                                            background: linear-gradient(90deg, #2d96bd, #7dd3fc);
                                                                                                                          }
                                                                                                                        
                                                                                                                        .bar-count {
                                                                                                                            font-size: 13px;
                                                                                                                            color: #6b7280;
                                                                                                                            text-align: right;
                                                                                                                          }
                                                                                                                        
                                                                                                                        .empty {
                                                                                                                            color: #9ca3af;
                                                                                                                            padding: 20px 0;
                                                                                                                            text-align: center;
                                                                                                                          }
                                                                                                                        
                                                                                                                        :global([data-theme="dark"] .stat-card) {
                                                                                                                            background: rgba(24, 34, 53, 0.55);
                                                                                                                            border-color: rgba(255, 255, 255, 0.1);
                                                                                                                            box-shadow: 0 10px 28px rgba(0, 0, 0, 0.25);
                                                                                                                          }
                                                                                                                        
                                                                                                                        :global([data-theme="dark"] .stat-label),
                                                                                                                        :global([data-theme="dark"] .bar-count),
                                                                                                                        :global([data-theme="dark"] .stat-value small) {
                                                                                                                            color: #94a3b8;
                                                                                                                          }
                                                                                                                        
                                                                                                                        :global([data-theme="dark"] .stat-value),
                                                                                                                        :global([data-theme="dark"] .stat-section h3),
                                                                                                                        :global([data-theme="dark"] .bar-label) {
                                                                                                                            color: #e2e8f0;
                                                                                                                          }
                                                                                                                        
                                                                                                                        :global([data-theme="dark"] .bar-track) {
                                                                                                                            background: rgba(148, 163, 184, 0.2);
                                                                                                                          }
                                                                                                                        
                                                                                                                        @media (max-width: 700px) {
                                                                                                                            .stat-cards {
                                                                                                                                  grid-template-columns: repeat(2, minmax(0, 1fr));
                                                                                                                              }
                                                                                                                          
                                                                                                                          .bar-row {
                                                                                                                                grid-template-columns: 64px 1fr 56px;
                                                                                                                                gap: 8px;
                                                                                                                            }
                                                                                                                          }
                                                                                                                        </style>
