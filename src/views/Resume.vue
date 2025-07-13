<template>
  <div class="resume-container">
    <div class="resume">
      <header class="resume-header">
        <div class="header-left">
          <h1>
            {{ personalInfo.name }} <span>{{ personalInfo.englishName }}</span>
          </h1>
          <div class="contact-grid">
            <div
              v-for="contact in contactInfo"
              :key="contact.label"
              class="contact-item"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path :d="contact.iconPath"></path>
                <polyline
                  v-if="contact.polyline"
                  :points="contact.polyline"
                ></polyline>
                <circle
                  v-if="contact.circle"
                  :cx="contact.circle.cx"
                  :cy="contact.circle.cy"
                  :r="contact.circle.r"
                ></circle>
                <line
                  v-if="contact.line"
                  :x1="contact.line.x1"
                  :y1="contact.line.y1"
                  :x2="contact.line.x2"
                  :y2="contact.line.y2"
                ></line>
              </svg>
              <a v-if="contact.isLink" :href="contact.href" target="_blank">{{
                contact.value
              }}</a>
              <span v-else>{{ contact.value }}</span>
            </div>
          </div>
        </div>
        <div class="profile-pic-container">
          <img
            src="../assets/白底证件照压缩.png"
            alt="Profile Picture"
            class="profile-pic"
          />
        </div>
      </header>

      <main class="resume-main">
        <!-- 教育背景 -->
        <section class="section">
          <h2 class="section-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#335b9a">
              <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
              <path
                d="M12 14l6.16-3.422a12.067 12.067 0 0 1-4.16 5.232L12 22l-7.81-4.34a12 12 0 0 1 4.81-5.66L12 14z"
              ></path>
            </svg>
            教育背景
          </h2>
          <div class="section-content">
            <p v-for="edu in education" :key="edu.label">
              <strong>{{ edu.label }}：</strong>
              <strong v-if="edu.highlight">{{ edu.school }}</strong>
              <span v-else>{{ edu.school }}</span>
              {{ edu.additional }}
              <span v-if="edu.duration" style="float: right">{{
                edu.duration
              }}</span>
            </p>
          </div>
        </section>

        <!-- 实习经历 -->
        <section class="section">
          <h2 class="section-title">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#335b9a"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            实习经历
          </h2>
          <div class="section-content internship-content">
            <div class="internship-header">
              <p>
                <strong>实习公司:</strong>
                <strong>{{ internship.company }}</strong> |
                <strong>{{ internship.position }}</strong> |
                {{ internship.department }}
              </p>
              <p>{{ internship.duration }}</p>
            </div>
            <p><strong>工作内容:</strong></p>
            <div class="work-content-columns">
              <div class="column">
                <ul>
                  <li v-for="task in internship.tasks.left" :key="task">
                    {{ task }}
                  </li>
                </ul>
              </div>
              <div class="vertical-line"></div>
              <div class="column">
                <ul>
                  <li v-for="task in internship.tasks.right" :key="task">
                    {{ task }}
                  </li>
                </ul>
              </div>
            </div>
            <img src="../assets/网易logo.png" alt="NetEase Logo" class="logo" />
          </div>
        </section>

        <!-- 荣誉获奖 -->
        <section class="section">
          <h2 class="section-title">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#335b9a"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="8" r="6"></circle>
              <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
            </svg>
            荣誉获奖
          </h2>
          <div class="section-content">
            <p v-for="honor in honors" :key="honor.category">
              <strong>{{ honor.category }}:</strong>
              <span v-html="honor.content"></span>
            </p>
          </div>
        </section>

        <!-- 项目经历 -->
        <section class="section">
          <h2 class="section-title">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#335b9a"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
            项目经历
          </h2>
          <div class="section-content">
            <div
              v-for="project in projects"
              :key="project.title"
              class="project-item"
            >
              <h3>
                <strong>{{ project.title }}</strong>
                <span style="float: right">{{ project.duration }}</span>
              </h3>
              <p v-for="detail in project.details" :key="detail.label">
                <strong>{{ detail.label }}:</strong> {{ detail.content }}
              </p>
            </div>
          </div>
        </section>

        <!-- 知识技能 -->
        <section class="section">
          <h2 class="section-title">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#335b9a"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
              ></path>
            </svg>
            知识技能
          </h2>
          <div class="section-content">
            <ul>
              <li v-for="skill in skills" :key="skill">{{ skill }}</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 类型定义
interface ContactInfo {
  label: string;
  value: string;
  iconPath: string;
  polyline?: string;
  circle?: { cx: string; cy: string; r: string };
  line?: { x1: string; y1: string; x2: string; y2: string };
  isLink?: boolean;
  href?: string;
}

interface EducationInfo {
  label: string;
  school: string;
  additional: string;
  duration?: string;
  highlight?: boolean;
}

interface ProjectDetail {
  label: string;
  content: string;
}

interface Project {
  title: string;
  duration: string;
  details: ProjectDetail[];
}

interface Honor {
  category: string;
  content: string;
}

// 个人信息
const personalInfo = ref({
  name: "孙百乐",
  englishName: "BAILE SUN",
});

// 联系信息
const contactInfo = ref<ContactInfo[]>([
  {
    label: "电话",
    value: "130 0301 0978",
    iconPath:
      "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
  },
  {
    label: "邮箱",
    value: "sunbaile@foxmail.com",
    iconPath:
      "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z",
    polyline: "22,6 12,13 2,6",
  },
  {
    label: "年龄",
    value: "年龄 23",
    iconPath: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z",
  },
  {
    label: "GitHub",
    value: "github.com/leyouBaloy",
    iconPath:
      "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22",
    circle: { cx: "12", cy: "12", r: "10" },
    line: { x1: "2", y1: "12", x2: "22", y2: "12" },
    isLink: true,
    href: "https://www.github.com/leyouBaloy",
  },
  {
    label: "网站",
    value: "www.imbailey.cn",
    iconPath:
      "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
    circle: { cx: "12", cy: "12", r: "10" },
    line: { x1: "2", y1: "12", x2: "22", y2: "12" },
    isLink: true,
    href: "https://www.imbailey.cn",
  },
  {
    label: "学历",
    value: "中国石油大学(华东)",
    iconPath: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z",
    circle: { cx: "12", cy: "10", r: "3" },
  },
]);

// 教育背景
const education = ref<EducationInfo[]>([
  {
    label: "本科院校",
    school: "中国石油大学(华东)",
    additional: "(211,双一流),计算机科学与技术",
    duration: "2020.09-2024.06",
    highlight: true,
  },
  {
    label: "本科成绩",
    school: "综合成绩: 91.29, 专业排名: 1/20, 四/六级已过",
    additional: "",
  },
  {
    label: "硕士院校",
    school: "保研本校软件工程专业, 本硕连读",
    additional: "",
    duration: "2024.09-2026.06",
  },
  {
    label: "研究方向",
    school: "RAG、表征学习、数据压缩、数据分析、可视化与可视分析",
    additional: "",
  },
]);

// 实习经历
const internship = ref({
  company: "网易有道",
  position: "RAG 算法实习生",
  department: "人工智能产品部",
  duration: "2025.02-2025.09",
  tasks: {
    left: [
      "文档解析功能研发，切片算法优化",
      "基于多模态大模型的图表理解功能研发",
      "双向MCP功能研发、ReAct机制实现",
      "知识图谱构建与查询、实体智能合并算法研发",
    ],
    right: [
      "xlsx表格向量化优化算法",
      "长期记忆模块设计与研发",
      "前端处理流式响应，防抖与节流功能设计",
      "前沿论文调研、竞品功能调研、客户支持",
    ],
  },
});

// 荣誉获奖
const honors = ref<Honor[]>([
  {
    category: "奖学金",
    content:
      "<strong>综合优秀一等奖学金 (两次)</strong>, 综合优秀二等奖学金, 社会工作奖学金 (两次), 科技创新奖学金, 突出成绩、卓越之星奖学金 (团体).",
  },
  {
    category: "竞赛",
    content:
      "<strong>第十八届全国大学生智能汽车竞赛全国总决赛一等奖 (2023.08)</strong>; 中国高校计算机大赛 2023 网络技术挑战赛华东赛区二等奖, 全国总决赛三等奖 (2023.08); 美国大学生数学建模竞赛 HonorableMention 奖 (2023); 第十三届中国大学生服务外包创新创业大赛区域赛二等奖, 全国总决赛三等奖, 担任主要负责人 (2022).",
  },
  {
    category: "专利",
    content: "1篇已授权+2篇在审(学生一作).",
  },
  {
    category: "荣誉称号",
    content: "优秀学生、优秀学生干部, 优秀共青团员, Linux 自由软件协会会长.",
  },
]);

// 项目经历
const projects = ref<Project[]>([
  {
    title: "基于 Django 的石油大学在线测评系统(组长)",
    duration: "2021.06-2021.07",
    details: [
      {
        label: "项目背景",
        content:
          "大创项目,为石大开发oj系统,前端采用 Bootstrap+jQuery+AJAX. 后端Django+MySQL.",
      },
      {
        label: "项目亮点",
        content:
          "通过摄像头抓拍和人脸比对来实现在线答题过程中的作弊检测. 基于用户行为数据和余弦相似度算法设计个性化推荐系统,为学生提供精准的题目推荐.利用数据库事务管理实现判题队列. 使用Docker封装判题机,实现快速部署和扩展. 使用Nginx+Gunicorn进行高性能部署, 同时在线人数100+.",
      },
    ],
  },
  {
    title: "基于Yolo+PaDim的主板缺陷检测(组长)",
    duration: "2022.03-2022.05",
    details: [
      {
        label: "项目背景",
        content:
          "参加工业缺陷检测竞赛,基于Yolo+PaDiM+Vue3+Flask开发高精度主板缺陷检测平台。",
      },
      {
        label: "项目亮点",
        content:
          'YOLOv5实现结构缺陷初检与定位，DeepLabV3+结合PaDiM完成纹理缺陷语义分割与热图回归，搭配SRGAN超分技术聚焦微小瑕疵，检测精度提升30%。系统采用前后端分离架构（Vue+Flask）；前端实现"4+4"数据可视化模式（年/月/周/日维度+柱状图/折线图等），支持错误位置回溯与报表生成。项目在GPU 16G显存环境下实现实时检测.',
      },
    ],
  },
  {
    title: "科研项目:基于深度学习的时空数据压缩(独立完成)",
    duration: "2023.06-2025.01",
    details: [
      {
        label: "项目背景",
        content:
          "提出了一种创新的双精度交互式压缩策略. 一阶段压缩采用向量量化自编码器, 生成紧凑的时空特征表示, 实现超高的压缩比; 二阶段压缩通过神经网络概率建模和熵编码优化残差数据, 避免冗余压缩, 满足多精度需求.",
      },
      {
        label: "项目亮点",
        content:
          "创新性将表征学习技术应用于特定领域, 发表专利 1 篇, 论文 1 篇.",
      },
    ],
  },
]);

// 知识技能
const skills = ref([
  "系统学习过统计学习方法、机器学习、深度学习知识理论，阅读大量前沿学术论文.",
  "熟悉 Numpy、Pandas、Matplotlib、Pytorch 等数据分析/可视化/人工智能工具.",
  "熟悉 Vue3、微信小程序等前端框架. 熟悉 Django、Flask 等后端框架.",
  "熟练使用 Linux、Git、Docker 等常用开发环境/运维工具.",
  "英语水平优秀, 新加坡南洋理工大学访学经历. 性格乐观开朗, 抗压能力强.",
]);
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap");

.resume-container {
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  padding: 8px 0;
  font-family: "lucida grande", "lucida sans unicode", lucida, helvetica, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  color: #333;
  font-size: 10pt;
  line-height: 1.4;
}

.resume {
  width: 210mm;
  max-height: 297mm;
  background-color: white;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

h1, h2, h3 {
  font-family: "Noto Sans SC", "lucida grande", "lucida sans unicode", lucida, helvetica, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  font-size: 1.3em;
}

@media print {
  .resume-container {
    background-color: white;
    padding: 0;
    margin: 0;
  }
  .resume {
    box-shadow: none;
    margin: 0;
    width: 100%;
    min-height: auto;
  }
}

.resume a {
  color: #333;
  text-decoration: none;
}

.resume-header {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  padding: 8px 20px;
  border-bottom: 2px solid #eee;
}

.header-left {
  flex: 1;
}

.header-left h1 {
  font-size: 24pt;
  margin: 0 0 8px 0;
  font-weight: bold;
  letter-spacing: 1px;
}

.header-left h1 span {
  font-size: 18pt;
  font-weight: normal;
  color: #555;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px 12px;
  font-size: 8.5pt;
}

.contact-item {
  display: flex;
  align-items: center;
}

.contact-item svg {
  margin-right: 6px;
  flex-shrink: 0;
}

.profile-pic-container {
  margin-left: 15px;
}

.profile-pic {
  width: 90px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.resume-main {
  padding: 8px 20px;
}

.section {
  margin-bottom: 10px;
}

.section-title {
  font-size: 12pt;
  color: #335b9a;
  border-left: 4px solid #335b9a;
  padding-left: 8px;
  margin: 0px 0 8px 0;
  display: flex;
  align-items: center;
}

.section-title svg {
  margin-right: 6px;
}

.section-content {
  margin-left: 12px;
}

.section-content p,
.project-item p {
  margin: 2px 0;
}

.internship-header {
  display: flex;
  justify-content: space-between;
}

.internship-content {
  position: relative;
}

.internship-content .logo {
  position: absolute;
  top: 70px;
  right: 10px;
  width: 80px;
}

.work-content-columns {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 3px;
  position: relative;
}

.column ul {
  margin: 0;
  padding-left: 0;
  list-style-type: "›  ";
  width: 280px;
}

.work-content-columns .vertical-line {
  width: 1px;
  background-color: #ddd;
  min-height: 80px;
  align-self: stretch;
  margin: 0 12px;
}

.project-item {
  margin-bottom: 8px;
}

.project-item h3 {
  margin: 2px 0;
  font-size: 10pt;
}

.project-item span {
  font-weight: 400;
}

.section-content ul {
  margin: 0;
  padding-left: 12px;
  list-style-type: none;
}

.section-content ul li {
  position: relative;
  padding-left: 4px;
  margin-bottom: 2px;
}

.section-content ul li::before {
  content: "›";
  position: absolute;
  left: -8px;
  top: 1px;
  color: #335b9a;
  font-weight: bold;
}
</style>
