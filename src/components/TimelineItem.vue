<template>
    <div class="timeline-item" @click="handleClick">
      <div class="timeline-item-content">
        <time>{{ time }}</time>
        <div class="title">{{ content }}</div>
        <div class="tags" v-if="tags && tags.length > 0">
          <span 
            v-for="tag in tags" 
            :key="tag" 
            class="tag"
            :class="{ 'highlight': highlight && searchKeyword && tag.toLowerCase().includes(searchKeyword.toLowerCase()) }"
          >
            {{ tag }}
          </span>
        </div>
      </div>
      <span class="circle"></span>
    </div>
  </template>
  
  <script>
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
      }
    },
    methods: {
      handleClick() {
        this.$emit('click');
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
  
  .timeline-item:hover {
    background: rgba(102, 126, 234, 0.05);
    border-radius: 8px;
    padding-left: 10px;
    padding-right: 10px;
    margin-left: -10px;
    margin-right: -10px;
  }
  
  .timeline-item-content {
    padding-left: 40px;
    flex: 1;
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
    animation: pulse 1s ease infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
  
  .circle {
    position: absolute;
    left: 16px;
    width: 12px;
    height: 12px;
    background-color: #fff;
    border: 2px solid #d3d3d3;
    border-radius: 50%;
    top: 16px;
    transition: all 0.2s ease;
  }
  
  .timeline-item:hover .circle {
    background-color: #667eea;
    border-color: #667eea;
    transform: scale(1.2);
  }
  </style>
  