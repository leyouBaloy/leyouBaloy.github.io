<template>
    <div class="timeline-item" @click="handleClick">
      <div class="timeline-item-content">
        <time>{{ time }}</time>
        <div class="title" v-html="highlightedTitle"></div>
        <p v-if="excerpt" class="excerpt" v-html="highlightedExcerpt"></p>
        <div class="tags" v-if="tags && tags.length > 0">
          <span 
            v-for="tag in tags" 
            :key="tag" 
            class="tag"
            :class="{ 'highlight': shouldHighlightTag(tag) }"
          >
            {{ tag }}
          </span>
        </div>
      </div>
      <span class="circle"></span>
    </div>
  </template>
  
  <script>
  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function highlightText(text, keyword, enabled) {
    const source = text == null ? '' : String(text);
    if (!enabled || !keyword || !String(keyword).trim()) {
      return escapeHtml(source);
    }

    const query = String(keyword).trim();
    const lowerSource = source.toLowerCase();
    const lowerQuery = query.toLowerCase();
    let html = '';
    let cursor = 0;

    while (cursor < source.length) {
      const index = lowerSource.indexOf(lowerQuery, cursor);
      if (index === -1) {
        html += escapeHtml(source.slice(cursor));
        break;
      }
      html += escapeHtml(source.slice(cursor, index));
      html += `<mark class="search-hit">${escapeHtml(source.slice(index, index + query.length))}</mark>`;
      cursor = index + query.length;
    }

    return html;
  }

  export default {
    name: 'TimelineItem',
    props: {
      content: {
        type: String,
        required: true
      },
      time: {
        type: String,
        required: true
      },
      category: {
        type: String,
        default: ''
      },
      tags: {
        type: Array,
        default: () => []
      },
      highlight: {
        type: Boolean,
        default: false
      },
      searchKeyword: {
        type: String,
        default: ''
      },
      excerpt: {
        type: String,
        default: ''
      }
    },
    computed: {
      highlightedTitle() {
        return highlightText(this.content, this.searchKeyword, this.highlight);
      },
      highlightedExcerpt() {
        return highlightText(this.excerpt, this.searchKeyword, this.highlight);
      }
    },
    methods: {
      handleClick() {
        this.$emit('click');
      },
      shouldHighlightTag(tag) {
        if (!this.highlight || !this.searchKeyword) return false;
        return String(tag).toLowerCase().includes(String(this.searchKeyword).trim().toLowerCase());
      }
    }
  }
  </script>
  
  <style scoped>
  .timeline-item {
    position: relative;
    padding: 12px 0;
    display: flex;
    align-items: flex-start;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .timeline-item::before {
    content: '';
    position: absolute;
    inset: 0 -10px;
    z-index: 0;
    border-radius: 8px;
    background: transparent;
    transition: background 0.2s ease;
  }
  
  .timeline-item:hover {
    background: transparent;
  }

  .timeline-item:hover::before {
    background: rgba(102, 126, 234, 0.05);
  }
  
  .timeline-item-content {
    padding-left: calc(var(--timeline-axis-x, 24px) + 16px);
    flex: 1;
    position: relative;
    z-index: 1;
  }
  
  .timeline-item-content time {
    font-size: 12px;
    color: #888;
    display: block;
    margin-bottom: 4px;
  }
  
  .title {
    font-size: 16px;
    color: #333;
    margin-bottom: 6px;
    line-height: 1.4;
  }

  .excerpt {
    margin: 0 0 8px;
    color: #6b7280;
    font-size: 13px;
    line-height: 1.6;
  }

  .title :deep(mark.search-hit),
  .excerpt :deep(mark.search-hit) {
    padding: 0 2px;
    border-radius: 3px;
    color: inherit;
    background: rgba(250, 204, 21, 0.55);
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }

  :global([data-theme="dark"] .timeline-item-content .excerpt) {
    color: #9ca3af;
  }

  :global([data-theme="dark"] .timeline-item-content .title mark.search-hit),
  :global([data-theme="dark"] .timeline-item-content .excerpt mark.search-hit) {
    background: rgba(250, 204, 21, 0.38);
    color: #fef9c3;
  }
  
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  
  .tag {
    font-size: 12px;
    padding: 2px 8px;
    background: #f0f2f5;
    color: #666;
    border-radius: 12px;
    transition: all 0.2s ease;
  }
  
  .tag:hover {
    background: #667eea;
    color: white;
  }
  
  .tag.highlight {
    background: #667eea;
    color: white;
  }
  
  .circle {
    position: absolute;
    z-index: 1;
    box-sizing: border-box;
    left: calc(var(--timeline-axis-x, 24px) - 6px);
    width: 12px;
    height: 12px;
    background-color: #fff;
    border: 2px solid #d3d3d3;
    border-radius: 50%;
    top: 39px;
    transition: all 0.2s ease;
  }
  
  .timeline-item:hover .circle {
    background-color: #667eea;
    border-color: #667eea;
    transform: scale(1.2);
  }
  </style>
