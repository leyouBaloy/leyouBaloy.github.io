<template>
    <n-divider class="divider"></n-divider>
    <div class="footer-container">
        <div class="jump">
            <a href="https://www.travellings.cn/go.html" target="_blank" rel="noopener"> <img src="https://www.travellings.cn/assets/logo.gif" alt="" style="width:auto;height:32px;" title="开往-友链接力"></a>
            <a class="rss-link" href="/rss.xml" title="订阅 RSS">订阅 RSS</a>
        </div>
        <div class="webring">
            <a href="https://www.boyouquan.com/certificates/www.imbailey.cn" title="正在博友圈履约中" target="_blank" rel="noopener">
                <img src="https://www.boyouquan.com/images/logo/performance.svg?domainName=www.imbailey.cn" alt="正在博友圈履约中" style="height:26px;max-width:none;">
            </a>
            <a href="https://blogscn.fun/" title="BLOGS·CN" target="_blank" rel="noopener">
                <img src="https://photo.xiangming.site/img/blogscn.png" alt="本站已加入BLOGS·CN">
            </a>
            <a href="https://www.foreverblog.cn/" title="十年之约" target="_blank" rel="noopener">
                <img class="light-only" src="https://www.foreverblog.cn/assets/images/site-v10/logo-light.png" alt="十年之约">
                <img class="dark-only" src="https://www.foreverblog.cn/assets/images/site-v10/logo-dark.png" alt="十年之约">
            </a>
            <a href="https://boke.lu/" title="博客录" target="_blank" rel="noopener">
                <img class="light-only" src="https://boke.lu/%E5%8D%9A%E5%AE%A2%E5%BD%95logo%E5%9B%9B%E7%89%88%E5%8A%A0%E5%AE%BD%E7%89%881-70k.png" alt="博客录">
                <img class="dark-only" src="https://boke.lu/%E5%8D%9A%E5%AE%A2%E5%BD%95logo%E5%9B%9B%E7%89%88%E5%8A%A0%E5%AE%BD%E7%89%88%E7%99%BD1-70k.png" alt="博客录">
            </a>
        </div>
        <div class="icp"><a href="https://icp.gov.moe/?keyword=20260283" target="_blank" rel="noopener">萌ICP备20260283号</a></div>
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

.rss-link {
    text-decoration: none;
    color: #4f46e5;
    font-size: 14px;
    font-weight: 500;
}

.rss-link:hover {
    text-decoration: underline;
}

.footer-container img {
    max-width: 150px;
}

:global([data-theme="dark"]) .icp a {
    color: #e5e7eb;
}

:global([data-theme="dark"]) .rss-link {
    color: #a5b4fc;
}

.webring {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-top: 12px;
}

.webring a {
    display: inline-flex;
    align-items: center;
    padding: 3px 8px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.35);
    border: 1px solid rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
    transition: transform 0.2s ease, background 0.2s ease;
}

.webring a:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.55);
}

.footer-container .webring img {
    height: 16px;
    width: auto;
    max-width: 100px;
    display: block;
}

.webring .dark-only {
    display: none;
}

:global([data-theme="dark"]) .webring a {
    background: rgba(30, 41, 59, 0.45);
    border-color: rgba(255, 255, 255, 0.12);
}

:global([data-theme="dark"]) .webring .light-only {
    display: none;
}

:global([data-theme="dark"]) .webring .dark-only {
    display: block;
}
</style>
