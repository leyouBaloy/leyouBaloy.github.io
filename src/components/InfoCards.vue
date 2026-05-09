<template>
    <div class="cards">
        <div class="left-box">
            <div class="left-left">
                <div class="zhaopian">
                    <img class="xueweizhao" src="../assets/学位照-裁切压缩.jpg" />
                    <div class="hover-text">长相还算说得过去😅</div>
                </div>
                <!-- <div class="nianling" @click="downLoad()">
                    <div class="nianling-text">PDF简历下载</div><n-icon size="30"><CloudDownloadOutline/></n-icon>
                </div> -->
                <div class="nianling">
                    <div class="nianling-text" @click="jumpToResume()">个人简历</div>
                </div>
            </div>
            <div class="left-right">
                <div class="mbti">
                    <img src="../assets/infj.svg" />
              <div class="text-right">
                <span>MBTI人格类型:</span>
                <h3>
                  INFJ <br />
                  提倡者
                </h3>
              </div>
              <div class="hover-overlay">
                <span>我是绿老头👴</span>
              </div>
                </div>
                <div class="guxiang">
                    <div class="text1">故乡</div>
                    <div class="text2">安<br>徽<br>蚌<br>埠</div>
                </div>
            </div>
        </div>
        <div class="right-box">
            <div class="right-upper">
                <div class="benke">
                    <div class="text">
                <span>本硕院校</span>
                <h3 class="zgsydx">中国石油大学（华东）</h3>
                <h3 class="hover-overlay">帝国男子石油高中🔨</h3>
              </div>
                
                </div>
                <div class="yanjiusheng"><span>兴趣爱好<br>读书📚、跑步🏃‍♂️、做饭🥘、电子产品💻、折腾Blog📝</span>
                </div>
            </div>
            <div class="right-lower">
                <div class="zhuanye">所学专业🎯<br>计算机科学与技术、软件工程、人工智能</div>
                <div class="yanjiufangxiang">研究方向🏅<br>可视化与可视分析、数据表征、数据压缩</div>
            </div>
        </div>

    </div>
</template>

<script setup>
import {useRouter} from 'vue-router';

const router = useRouter();

const jumpToResume = ()=>{
    router.push('/resume');
}

</script>


<style scoped>

* {
    font-family: "Noto Serif SC", serif;
}

.guxiang .text1{
    position: absolute;
    top:0;
    font-size: 20px;
    left: 10px;
    font-weight: 800;
    color: white;
    
}

.guxiang .text2{
    font-size: 30px;
    font-weight: 800;
    color: white;
    
}

.benke:hover .hover-overlay {
  opacity: 1;
}

.benke:hover .zgsydx {
    opacity: 0;
}


.benke .text {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* gap:5px; */
}

.benke span {
    color: #174078;
    width: 100%;
    font-size: 15px;
    background-color: rgba(255, 255, 255, 0.5);
    text-align: center;
}

.benke h3 {
    font-weight: 800;
    color: #174078;
    width: 100%;
    font-size: 20px;
    margin-top: 0px;
    background-color: rgba(255, 255, 255, 0.5);
    text-align: center;
}


.nianling:hover {
    transform: scale(1.1);
    cursor: pointer;
    /* background-color: #4a4a4a; */
}

.mbti:hover {
    transform: scale(1.1);
}

.xueweizhao {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    /* 初始阴影 */
    /* box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgb(229, 231, 235) 0px 4px 6px -1px, rgb(229, 231, 235) 0px 2px 4px -2px; */
}

.zhaopian:hover .xueweizhao {
    content: url("../assets/学位照-扣人物.jpg");
    transform: scale(1.11);
}

.hover-text {
    position: absolute;
    bottom: 0%;
    left: 50%;
    transform: translate(-50%);
    color: white;
    font-size: 20px;
    font-weight: bold;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.zhaopian:hover .hover-text {
    opacity: 1;
}

.text-right {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: right;
  transition: color 0.3s ease;
}

.mbti h3 {
  font-size: 20px;
  color: rgb(51 164 116);
  font-weight: 900;
  margin: 0 0;
  margin-right: 10px;
  transition: color 0.3s ease;
}

.mbti img {
  height: 110%;
  position: absolute;
  bottom: 0;
  left: -20px;
}

.mbti:hover .text-right {
  color: transparent;
}

.mbti:hover h3 {
  color: transparent;
  background-color: transparent;
}

.mbti:hover {
  background-color: #4a4a4a;
}

.hover-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 20px;
  font-weight: bold;
  opacity: 0;
  transition: opacity 0.3s ease;
  text-align: center;
}

.mbti:hover .hover-overlay {
  opacity: 1;
}


.cards {
    position: relative;
    /* width: 1089px;
height: 1124px; */
    /* opacity: 1; */

    /* 自动布局 */
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 15px 15px;
    flex-wrap: wrap;
    align-content: flex-start;
}

.left-box {
    position: static;
    left: 90px;
    top: 0px;
    /* width: 417px; */
    height: 490px;
    opacity: 1;

    /* 自动布局 */
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    padding: 0px;
    gap: 17px;

    /* background: #D56868; */

    /* z-index: 0; */
}

.left-left {
    /* 自动布局子元素 */
    position: static;
    left: 0px;
    top: 0px;
    width: 180px;
    height: 490px;
    opacity: 1;

    /* 自动布局 */
    display: flex;
    flex-direction: column;
    padding: 0px;
    gap: 15px;

    /* background: #547291; */
}

.left-right {
    /* 自动布局子元素 */
    position: static;
    left: 217px;
    top: 0px;
    width: 180px;
    height: 490px;
    opacity: 1;

    /* 自动布局 */
    display: flex;
    flex-direction: column;
    padding: 0px;
    gap: 15px;

    /* background: #A62AAC; */
}

.right-box {
    position: static;
    left: 522px;
    top: 0px;
    width: 375px;
    height: 490px;
    opacity: 1;

    /* 自动布局 */
    display: flex;
    flex-direction: column;
    padding: 0px;
    gap: 15px;

    /* background: #28B13B; */

    /* z-index: 1; */
}

.right-upper {
    /* 自动布局子元素 */
    position: static;
    left: 0px;
    top: 145px;
    width: 375px;
    /* height: 345px; */
    opacity: 1;

    /* 自动布局 */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    gap: 15px;

    /* background: #66D29E; */
}

.right-lower {
    /* 自动布局子元素 */
    position: static;
    left: 0px;
    top: 0px;
    width: 375px;
    height: 130px;
    opacity: 1;

    /* 自动布局 */
    display: flex;
    flex-direction: row;
    padding: 0px;
    gap: 15px;
    /* background: #882424; */
}

.zhaopian {
    /* 自动布局子元素 */
    position: relative;
    left: 0px;
    top: 0px;
    width: 180px;
    height: 320px;
    opacity: 1;

    box-sizing: border-box;
    /* border: 1px solid #141313; */
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgb(229, 231, 235) 0px 4px 6px -1px, rgb(229, 231, 235) 0px 2px 4px -2px;
}


.nianling {
    position: relative;
    left: 0px;
    /* top: 370px; */
    width: 180px;
    height: 120px;
    opacity: 1;
    box-sizing: border-box;
    /* border: 1px solid #141313; */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: bold;
    color: black;
    border-radius: 10px;
    transition: transform 0.3s ease, background-color 0.3s ease;
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgb(229, 231, 235) 0px 4px 6px -1px, rgb(229, 231, 235) 0px 2px 4px -2px;
    background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
}

.mbti {
    /* 自动布局子元素 */
    position: relative;
    left: 0px;
    top: 0px;
    width: 180px;
    height: 105px;
    opacity: 1;
    background-color: #f3f4f6;

    box-sizing: border-box;
    /* border: 1px solid #000000; */
    border-radius: 10px;
    /* 阴影 */
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgb(229, 231, 235) 0px 4px 6px -1px, rgb(229, 231, 235) 0px 2px 4px -2px;
    transition: transform 0.3s ease, background-color 0.3s ease;
}

.guxiang {
    /* 自动布局子元素 */
    position: relative;
    left: 0px;
    /* top: 140px; */
    width: 180px;
    height: 335px;
    opacity: 1;

    box-sizing: border-box;
    /* border: 1px solid #000000; */
    border-radius: 10px;
    background-image: url('../assets/蚌埠南北分界线.png');
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgb(229, 231, 235) 0px 4px 6px -1px, rgb(229, 231, 235) 0px 2px 4px -2px;
    background-blend-mode: overlay;
    background-color: #646464;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    transition: transform 0.3s ease, background-color 0.3s ease;
}

.guxiang:hover {
    transform: scale(1.1);
}

.benke:hover {
    transform: scale(1.1);
}

.benke {
    /* 自动布局子元素 */
    position: relative;
    left: 0px;
    top: 0px;
    width: 375px;
    height: 150px;
    opacity: 1;

    box-sizing: border-box;
    /* border: 1px solid #000000; */
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgb(229, 231, 235) 0px 4px 6px -1px, rgb(229, 231, 235) 0px 2px 4px -2px;

    background-image: url('../assets//石大风景.jpg');
    background-position: center;
    background-size: cover;
    border-radius: 10px;
    transition: transform 0.3s ease, background-color 0.3s ease;
}

.yanjiusheng {
    /* 自动布局子元素 */
    position: static;
    left: 0px;
    top: 0px;
    width: 375px;
    height: 150px;
    opacity: 1;

    box-sizing: border-box;
    /* border: 1px solid #000000; */
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgb(229, 231, 235) 0px 4px 6px -1px, rgb(229, 231, 235) 0px 2px 4px -2px;
}

.yanjiusheng span {
    font-size: 20px;
}

.zhuanye {
    /* 自动布局子元素 */
    position: static;
    left: 215px;
    top: 0px;
    width: 180px;
    height: 125px;
    opacity: 1;

    box-sizing: border-box;
    /* border: 1px solid #000000; */
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgb(229, 231, 235) 0px 4px 6px -1px, rgb(229, 231, 235) 0px 2px 4px -2px;
}

.yanjiufangxiang {
    /* 自动布局子元素 */
    position: static;
    left: 215px;
    top: 0px;
    width: 180px;
    height: 125px;
    opacity: 1;

    box-sizing: border-box;
    /* border: 1px solid #000000; */
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgb(229, 231, 235) 0px 4px 6px -1px, rgb(229, 231, 235) 0px 2px 4px -2px;
}

.yanjiusheng, .zhuanye, .yanjiufangxiang {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    color: white;
    font-size: 16px;
    font-weight: 600;
    transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 4px 6px -1px, rgba(0, 0, 0, 0.5) 0px 2px 4px -1px;
}

/* 渐变背景 */
.yanjiusheng {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.zhuanye {
    background: linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%);
}

.yanjiufangxiang {
    background: linear-gradient(135deg, #43cea2 0%, #185a9d 100%);
}

/* 悬浮动画 */
.yanjiusheng:hover, .zhuanye:hover, .yanjiufangxiang:hover {
    transform: scale(1.05);
    box-shadow: rgba(0, 0, 0, 0.8) 0px 6px 8px -1px, rgba(0, 0, 0, 0.8) 0px 4px 6px -1px;
}

</style>
