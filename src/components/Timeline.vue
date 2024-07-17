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
  }
  
  .timeline::before {
    content: '';
    position: absolute;
    left: 23px; /* 可以根据需要调整 */
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: #d3d3d3;
  }
  </style>
  