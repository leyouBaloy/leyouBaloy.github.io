<template>
    <n-divider class="divider"></n-divider>
    <div class="footer-container">
        <a href="https://www.travellings.cn/go.html" target="_blank"> <img src="https://www.travellings.cn/assets/logo.gif" alt="" style="width:auto;height:32px;" title="开往-友链接力"></a><a href="https://www.foreverblog.cn/go.html" target="_blank"> <img src="https://img.foreverblog.cn/wormhole_2.gif" alt="" style="width:auto;height:32px;" title="穿梭虫洞-随机访问十年之约友链博客"></a>
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
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    gap: 20px;
}

.footer-container img {
    max-width: 150px;
}
</style>