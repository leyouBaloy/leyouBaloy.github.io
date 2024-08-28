<template>
    <div class="wrapper">
        <div class="container">

            <router-link :to="path" class="title"><span>{{ title }}</span>

            </router-link>

            <div v-if="img != ''" class="img-container">
                <n-image lazy object-fit="cover" width="100%" :src="img" />
            </div>
            <div class="content">{{ content }} ...<router-link :to="path" class="more"><span>更多</span></router-link>
            </div>
            <div class="footer">
                <span class="time">发布时间：{{ time }}</span>
                <span class="tag">分类：{{ tag }}</span>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { NImage } from 'naive-ui';


const props = defineProps({
    title: {
        type: String,
        default: '标题'
    },
    img: {
        type: String || null
    },
    content: {
        type: String,
        default: '内容'
    },
    time: {
        type: String,
        default: '2023-01-01'
    },
    tag: {
        type: String,
        default: '书影记录'
    },
    path: {
        type: String,
        default: '/'
    }
})

</script>

<style scoped>
.wrapper {
    display: block;
    height: auto;
    -webkit-column-break-inside: avoid;
    break-inside: avoid;
    /* 卡片阴影 */
    /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); */
    /* 边框线 */
    border: 0.1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin-bottom: 20px;
    padding: 20px;
}

/* 悬浮放大 */
.wrapper:hover {
    transform: scale(1.01);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
}

.container {
    width: 100%;
    /* height: 300px; */
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 20px;
    /* 取消下划线 */
    text-decoration: none;
    font-weight: 800;
    color: black;
    /* 装饰线 */
  text-decoration: underline;
  text-decoration-color: #2d96bd;
  /* 装饰线宽度 */
  text-decoration-thickness: 3px;

    /* 鼠标悬浮 */
    &:hover {
        text-decoration: underline;
        color: #2d96bd;
        cursor: pointer;
        transition: all 0.3s ease;
        transform: scale(1.01);
    }
}

.more {
    font-weight: 500;
    /* 取消下划线 */
    text-decoration: none;
    color: #2d96bd;

    /* 鼠标悬浮 */
    &:hover {
        text-decoration: underline;
        cursor: pointer;
        transition: all 0.3s ease;
    }

}

.content {
    font-size: 15px;
    font-weight: 400;
    color: #73828c;
    margin-top: 10px;
    margin-bottom: 10px;
    line-height: 1.5;
    text-align: justify;
    text-indent: 2em;
    white-space: pre-wrap;
    word-break: break-all;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
}

.footer {
    display: flex;
    flex-direction: row;

}

.time {
    font-size: 15px;
    color: #73828c;
    /* margin-left: 10px; */
    margin-right: 10px;
    margin-top: 10px;
    /* margin-bottom: 10px; */
    line-height: 1.5;
    text-align: left;
}

.tag {
    font-size: 15px;
    color: #73828c;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    line-height: 1.5;
    text-align: left;
}

.img-container {
    display: flex;
    /* 水平居中 */
    justify-content: center;
    width: 100%;
    margin-bottom: 20px;
    max-height: 400px;
    /* height: 100px; */
}

.n-image {
    max-width: 100%;
    border-radius: 10px;
    /* height: 100%; */
    transition: all 0.3s ease;

    &:hover {
        transform: scale(1.01);
    }
}
</style>