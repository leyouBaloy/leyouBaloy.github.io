<template>
    <div class="social-media">
        <div class="social-media-item">
            <a href="https://github.com/Yang-Yang-Yang-Yang" target="_blank"><img src="../assets//QQ.svg"></a>
        </div>
        <div class="social-media-item">
            <a href="https://github.com/Yang-Yang-Yang-Yang" target="_blank"><img src="../assets//QQ.svg"></a>
        </div>
        <div class="social-media-item">
            <a href="https://github.com/Yang-Yang-Yang-Yang" target="_blank"><img src="../assets//QQ.svg"></a>
        </div>
        <div class="social-media-item">
            <a href="https://github.com/Yang-Yang-Yang-Yang" target="_blank"><img src="../assets//QQ.svg"></a>
        </div>
        <div class="social-media-item">
            <a href="https://github.com/Yang-Yang-Yang-Yang" target="_blank"><img src="../assets//QQ.svg"></a>
        </div>
    </div>
</template>

<style scoped>
.social-media {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    max-width: 845px;
    /* height: 50px; */
    border-radius: 10px;
    background-color: #f5f5f5;
    /* 阴影 */
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgb(229, 231, 235) 0px 4px 6px -1px, rgb(229, 231, 235) 0px 2px 4px -2px;
    padding: 10px 10px;
}

.social-media-item {
    transition: transform 0.3s ease;

}

.social-media-item :hover {
    transform: scale(1.1);
}
</style>