<template>
    <n-divider class="divider"></n-divider>
    <div class="footer-container">
        <div class="jump">
            <a href="https://www.travellings.cn/go.html" target="_blank"> <img src="https://www.travellings.cn/assets/logo.gif" alt="" style="width:auto;height:32px;" title="开往-友链接力"></a>
        </div>
        <div class="icp"><a href="https://beian.miit.gov.cn" target="_blank">鲁ICP备2024110354号</a></div>
        
    </div>
    
</template>

<script setup lang="ts">
import { NDivider } from 'naive-ui'

</script>

<style scoped>
.divider {
    margin-top: 0;
    margin-bottom: 20px;
}

.footer-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    align-items: center;
}

.icp {
    margin-top: 10px;
}

.icp a {
    /* 取消a标签样式 */
    text-decoration: none;
    color: black;
}

.jump {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
}

.footer-container img {
    max-width: 150px;
}
</style>
