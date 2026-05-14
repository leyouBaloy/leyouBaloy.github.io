<template>
  <div class="cards">
    <div class="left-box">
      <div class="left-left">
        <div class="zhaopian">
          <img class="portrait-img portrait-default" :src="aboutDefault" alt="AI 生成的抽象写作头像" />
          <img class="portrait-img portrait-hover" :src="aboutHover" alt="" aria-hidden="true" />
          <div class="hover-text">灵感模式</div>
        </div>

        <button class="nianling" type="button" @click="jumpToResume">
          <span class="nianling-text">个人简历</span>
        </button>
      </div>

      <div class="left-right">
        <div class="mbti">
          <img src="../assets/infj.svg" alt="INFJ 插图" />
          <div class="text-right">
            <span>MBTI人格类型</span>
            <h3>
              INFJ <br />
              提倡者
            </h3>
          </div>
          <div class="hover-overlay">
            安静观察<br />
            认真共情
          </div>
        </div>

        <div class="privacy-card">
          <img class="city-img" :src="qingdaoCard" alt="" aria-hidden="true" />
          <div class="privacy-copy">
            <span>坐标</span>
            <strong>山东青岛</strong>
            <p>红瓦、海风、山海之间。</p>
          </div>
        </div>
      </div>
    </div>

    <div class="right-box">
      <div class="right-upper">
        <div class="learning-card">
          <div class="text">
            <span>学习路径</span>
            <h3>工科底色 / 软件训练 / AI 兴趣</h3>
            <p>比起列履历，更想展示正在生长的能力。</p>
          </div>
          <div class="hover-overlay">从写代码<br />到讲清楚</div>
        </div>

        <div class="yanjiusheng profile-card">
          <span class="card-label">日常输入</span>
          <h3>把生活也当素材库</h3>
          <div class="chip-list">
            <span>阅读</span>
            <span>运动</span>
            <span>下厨</span>
            <span>数码</span>
            <span>博客</span>
          </div>
        </div>
      </div>

      <div class="right-lower">
        <div class="zhuanye profile-card compact-card">
          <span class="card-label">能力拼图</span>
          <h3>工程实现</h3>
          <p>把想法写成可运行、可维护、可复用的东西。</p>
        </div>

        <div class="yanjiufangxiang profile-card compact-card">
          <span class="card-label">关注问题</span>
          <h3>数据表达</h3>
          <p>可视分析、表征学习，以及更轻量的数据传递。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import aboutDefault from "@/assets/about-ai-default.jpg";
import aboutHover from "@/assets/about-ai-hover.jpg";
import qingdaoCard from "@/assets/qingdao-card.jpg";

const router = useRouter();

const jumpToResume = () => {
  router.push("/resume");
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  font-family: "Noto Serif SC", serif;
}

.cards {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
  align-content: flex-start;
}

.left-box,
.right-box,
.left-left,
.left-right,
.right-upper,
.right-lower {
  display: flex;
  padding: 0;
  gap: 15px;
}

.left-box {
  width: 375px;
  height: 490px;
  flex-direction: row;
  align-items: flex-end;
}

.left-left,
.left-right {
  width: 180px;
  height: 490px;
  flex-direction: column;
}

.right-box {
  width: 375px;
  height: 490px;
  flex-direction: column;
}

.right-upper {
  width: 375px;
  flex-direction: column;
  align-items: center;
}

.right-lower {
  width: 375px;
  height: 130px;
  flex-direction: row;
}

.zhaopian,
.nianling,
.mbti,
.privacy-card,
.learning-card,
.profile-card {
  border-radius: 8px;
  box-shadow:
    rgba(0, 0, 0, 0) 0 0 0 0,
    rgba(0, 0, 0, 0) 0 0 0 0,
    rgb(229, 231, 235) 0 4px 6px -1px,
    rgb(229, 231, 235) 0 2px 4px -2px;
  transition:
    transform 0.3s ease,
    background-color 0.3s ease,
    box-shadow 0.3s ease;
}

.zhaopian {
  position: relative;
  width: 180px;
  height: 320px;
  overflow: hidden;
  background: #f4f0e9;
}

.portrait-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}

.portrait-hover {
  opacity: 0;
  transform: scale(1.02);
}

.zhaopian:hover .portrait-default {
  opacity: 0;
}

.zhaopian:hover .portrait-hover {
  opacity: 1;
  transform: scale(1.08);
}

.zhaopian:hover {
  transform: scale(1.06);
  box-shadow: rgba(21, 31, 46, 0.2) 0 14px 32px -12px;
}

.hover-text {
  position: absolute;
  bottom: 16px;
  left: 50%;
  width: calc(100% - 28px);
  transform: translateX(-50%);
  color: white;
  font-size: 19px;
  font-weight: 800;
  text-align: center;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.45);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.zhaopian:hover .hover-text {
  opacity: 1;
}

.nianling {
  position: relative;
  width: 180px;
  height: 120px;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
  font-size: 24px;
  font-weight: 800;
  color: #132030;
  background: linear-gradient(120deg, #9bd2ff 0%, #bcebd9 100%);
}

.nianling:hover {
  transform: scale(1.06);
  cursor: pointer;
  box-shadow: rgba(45, 123, 170, 0.24) 0 16px 30px -14px;
}

.mbti {
  position: relative;
  width: 180px;
  height: 105px;
  background-color: #f3f4f6;
}

.mbti:hover {
  transform: scale(1.06);
  background-color: #34423e;
}

.mbti img {
  position: absolute;
  bottom: 0;
  left: -20px;
  height: 110%;
  z-index: 1;
}

.text-right {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 10px;
  text-align: right;
  transition: opacity 0.3s ease;
}

.text-right span {
  font-size: 13px;
  color: #345148;
}

.mbti h3 {
  margin: 0;
  font-size: 20px;
  color: rgb(51 164 116);
  font-weight: 900;
}

.mbti:hover .text-right {
  opacity: 0;
}

.hover-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  width: calc(100% - 28px);
  transform: translate(-50%, -50%);
  color: white;
  font-size: 20px;
  font-weight: 800;
  opacity: 0;
  transition: opacity 0.3s ease;
  text-align: center;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.28);
  z-index: 3;
}

.mbti:hover .hover-overlay,
.learning-card:hover .hover-overlay {
  opacity: 1;
}

.privacy-card {
  position: relative;
  width: 180px;
  height: 335px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  padding: 18px;
  color: #fff;
  background: #244b5e;
}

.privacy-card:hover {
  transform: scale(1.06);
  box-shadow: rgba(31, 79, 74, 0.26) 0 16px 30px -14px;
}

.privacy-copy {
  position: relative;
  z-index: 2;
}

.city-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;
}

.privacy-card::after {
  position: absolute;
  inset: 0;
  content: "";
  background: linear-gradient(180deg, rgba(23, 37, 47, 0.08) 0%, rgba(17, 32, 42, 0.14) 44%, rgba(15, 30, 38, 0.68) 100%);
  z-index: 1;
}

.privacy-card:hover .city-img {
  transform: scale(1.08);
}

.privacy-copy span,
.card-label,
.learning-card span {
  display: block;
  margin-bottom: 8px;
  font-size: 13px;
  letter-spacing: 0;
  opacity: 0.78;
}

.privacy-copy strong {
  display: block;
  font-size: 28px;
  line-height: 1.12;
}

.privacy-copy p {
  margin: 12px 0 0;
  font-size: 13px;
  line-height: 1.7;
  opacity: 0.88;
}

.learning-card {
  position: relative;
  width: 375px;
  height: 150px;
  overflow: hidden;
  padding: 26px;
  color: #15313b;
  background:
    linear-gradient(rgba(255, 255, 255, 0.72) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.56) 1px, transparent 1px),
    linear-gradient(135deg, #bfe9db 0%, #f8d49b 52%, #f08b80 100%);
  background-size: 22px 22px, 22px 22px, auto;
}

.learning-card .text {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: opacity 0.3s ease;
}

.learning-card h3 {
  margin: 0;
  font-size: 23px;
  line-height: 1.25;
}

.learning-card p {
  margin: 10px 0 0;
  font-size: 13px;
  line-height: 1.6;
}

.learning-card:hover {
  transform: scale(1.04);
  background:
    linear-gradient(rgba(16, 38, 50, 0.8), rgba(16, 38, 50, 0.8)),
    linear-gradient(135deg, #2d8076 0%, #f08b80 100%);
}

.learning-card:hover .text {
  opacity: 0;
}

.profile-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  text-align: center;
  color: white;
  font-size: 16px;
  font-weight: 600;
  box-shadow:
    rgba(0, 0, 0, 0.22) 0 8px 18px -8px,
    rgba(0, 0, 0, 0.16) 0 2px 6px -2px;
}

.profile-card:hover {
  transform: scale(1.04);
  box-shadow:
    rgba(0, 0, 0, 0.32) 0 16px 28px -14px,
    rgba(0, 0, 0, 0.22) 0 4px 10px -4px;
}

.yanjiusheng {
  width: 375px;
  min-height: 150px;
  background: linear-gradient(135deg, #335c67 0%, #5fb49c 100%);
}

.zhuanye,
.yanjiufangxiang {
  width: 180px;
  min-height: 125px;
}

.zhuanye {
  background: linear-gradient(135deg, #263238 0%, #547a8a 100%);
}

.yanjiufangxiang {
  background: linear-gradient(135deg, #8f4b3a 0%, #d98f64 100%);
}

.profile-card h3 {
  margin: 0;
  font-size: 21px;
  line-height: 1.25;
}

.compact-card h3 {
  font-size: 19px;
}

.profile-card p {
  margin: 10px 0 0;
  font-size: 13px;
  line-height: 1.6;
  opacity: 0.9;
}

.chip-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
}

.chip-list span {
  padding: 5px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  font-size: 13px;
  line-height: 1;
  backdrop-filter: blur(8px);
}

@media (max-width: 820px) {
  .left-box,
  .right-box {
    width: min(100%, 375px);
    height: auto;
  }

  .right-lower {
    height: auto;
  }
}

@media (max-width: 480px) {
  .cards,
  .left-box,
  .left-left,
  .left-right,
  .right-box,
  .right-upper,
  .right-lower {
    width: 100%;
  }

  .left-box,
  .right-lower {
    flex-direction: column;
  }

  .left-left,
  .left-right,
  .right-box {
    height: auto;
  }

  .zhaopian,
  .nianling,
  .mbti,
  .privacy-card,
  .learning-card,
  .yanjiusheng,
  .zhuanye,
  .yanjiufangxiang {
    width: 100%;
  }

  .zhaopian {
    height: 360px;
  }

  .privacy-card {
    height: 220px;
  }

  .learning-card,
  .yanjiusheng,
  .zhuanye,
  .yanjiufangxiang {
    min-height: 145px;
  }
}
</style>
