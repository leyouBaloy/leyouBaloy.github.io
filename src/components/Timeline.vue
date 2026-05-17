<template>
    <div class="timeline">
      <slot></slot>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Timeline'
  }
  </script>
  
  <style scoped>
  .timeline {
    position: relative;
    padding: 10px 0;
    --timeline-axis-x: 24px;
  }
  
  .timeline::before {
    content: '';
    position: absolute;
    left: calc(var(--timeline-axis-x) - 1px);
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: #d3d3d3;
  }
  </style>
  
