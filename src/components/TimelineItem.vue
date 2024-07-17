<template>
    <div class="timeline-item" @click="handleClick">
      <div class="timeline-item-content">
        <time>{{ time }}</time>
        <div>{{ content }}</div>
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
    padding: 8px 0;
    display: flex;
    align-items: flex-start;
    cursor: pointer;
  }
  
  .timeline-item-content {
    padding-left: 40px; /* 需要与Timeline.vue中线的位置协调 */
  }
  
  .timeline-item-content time {
    font-size: 12px;
    color: #888;
  }
  
  .timeline-item-content p {
    margin: 0;
  }
  
  .circle {
    position: absolute;
    left: 16px; /* 与Timeline.vue中线的位置协调 */
    width: 12px;
    height: 12px;
    background-color: #fff;
    border: 2px solid #d3d3d3;
    border-radius: 50%;
  }
  </style>
  