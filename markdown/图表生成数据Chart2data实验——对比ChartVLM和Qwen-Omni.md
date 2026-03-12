---
categories:
- 技能分享
date: 2025-06-10 10:14:29
title: 图表生成数据（Chart2data）实验——对比ChartVLM和Qwen-Omni
img: https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/images/d969c3b0_1749549251583-7654c91e-ef01-4bf7-9656-11efa4778806.png
---

## **ChartVLM**

ChartVLM由两部分组成：图表结构解码器+大语言模型

截取了ChartVLM中的第一部分图表结构解码器，它的原生模型是pix2struct

显存占用基本保持在2506 MiB

### 普通图表

| 原图 | 识别结果 | 评价 |
|------|----------|------|
| ![饼图](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/images/d969c3b0_1749549251583-7654c91e-ef01-4bf7-9656-11efa4778806.png) | **CSV数据：**<br/>Category,Percentage<br/>Visual Arts,25%<br/>Music,20%<br/>Theatre,15%<br/>Dance,15%<br/>Literature,5%<br/>Film,5%<br/><br/>**标题：** Distribution of Arts Categories in the USA in 2023<br/>**类型：** pie_chart | Theatre识别错了，识别成15%，实际为20%✅ |
| ![折线图](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/images/487de254_1749549251797-405615ec-c71e-4a8d-a092-af7204caf63c.png) | **CSV数据：**<br/>Month,Facebook User(million),Twitter User(million)<br/>January,2.2,2.0<br/>February,3.0,1.0<br/>March,4.0,2.0<br/>April,5.0,2.0<br/>May,6.0,3.0<br/>June,6.0,4.0<br/>July,7.0,4.0<br/>August,8.0,5.0<br/>September,9.0,5.0<br/>October,9.0,6.0<br/><br/>**标题：** Growth of Social Media Users in 2020<br/>**类型：** line_chart_num | 2个数据识别错误，January-Facebook识别成了2.2，应该是2✅ |
| ![热力图1](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/images/a4ffa9fc_1749549252023-d3cbad79-7698-4dd6-8fb5-ffa7887ded8d.png) | **CSV数据：**<br/>Characteristic,ChartX-Redrawing,ChartX-Description<br/>Chart-to-Text,17.18,15.5<br/>OpenCQA,20.39,15.5<br/>Chart-to-Table,93.78,91.6<br/>ChartX-QA,33.35,17.19<br/>ChartX-Summary,13.35,13.8<br/>ChartInstruct-7B,7.78,7.16<br/>ChartLama-13B,66.64,69.66<br/>ChartAst-13B,55.32,56.64<br/>TinyChart-3B,38.0,38.0<br/><br/>**标题：** ChartQA<br/>**类型：** heatmap | 完全没有识别出来❌ |
| ![热力图2](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/images/28cd03bc_1749549252292-eb2ed227-09a7-4f27-82e2-bf34ba398625.png) | **CSV数据：**<br/>Characteristic,194 it/s<br/>ChartLama-13B,1.47<br/>TinyChart-3B,3.14<br/>ChartAst-13B,1.47<br/><br/>**标题：** ChartLlama - 13B<br/>**类型：** heatmap | 图表类型、标题识别错误，数据也不准确❌ |
| ![雷达图](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/images/f03975ea_1749549252559-10ff327e-b2a4-492e-95a4-d95a4d2a92a8.png) | **CSV数据：**<br/>Characteristic,ChartX-Redrawing,OpenCQA,ChartX-Table<br/>ChartX-QA,93.78,91.6,7.16<br/>ChartX-QA,33.35,17.19,13.8<br/>ChartLama-13B,30.99,13.35,10.4<br/>ChartAst-13B,147.17,138.0,9.82<br/>TinyChart-3B,1.94,1.47,6.64<br/><br/>**标题：** ChartQA<br/>**类型：** radar | 没有识别多子图的能力❌ |
| ![柱状图](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/images/1a437156_1749549252821-b1eae6e0-dcc2-4ed2-b5b0-b7399d5bc202.png) | 这张图尺寸大，显存占用达到了8754 MiB<br/><br/>**部分CSV数据：**<br/>Characteristic,2020-16 GDP,2021-17 GDP<br/>7-8,110000,124000<br/>9-10,103000,116000<br/>11-12,102000,117000<br/>...(数据过长，已截取)<br/><br/>**标题：** 近两年全面多个总价的GDP<br/>**类型：** bar_chart | 中文不支持，数据基本识别出来，数据识别的还可以 |

### 流程图

| 原图 | 识别结果 | 评价 |
|------|----------|------|
| ![流程图](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/images/a110a715_1749549253035-00d91566-dd13-4a98-8741-222ecfecde2d.png) | **CSV数据：**<br/>Characteristic,12k to 14k,15k to 19k,20k to 24k,25k to 34k,35k to 44k,45k to 54k,55k to 64k<br/>Lightweight Quantized Neural Encoder,125.5,135.5,150.5,172.5,190.5,175.5,185.5<br/>...(其他数据)<br/><br/>**标题：** Super-resolution decoder<br/>**类型：** candlestick | 流程图也是没法识别的❌ |

### ChartVLM支持的图表类型

![支持的图表类型](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/images/0aa08f18_1749549253343-06b050e4-54fb-41fe-9a61-192a233657f7.png)

## **Qwen2.5-Omni-7B**

### 普通图表

| 原图 | echarts重建效果 | python code重建效果 |
|------|----------------|-------------------|
| ![饼图原图](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/images/d969c3b0_1749549253534-4f2cb4b7-c6e2-4218-a2ee-ec37dab1a62b.png) | ![echarts饼图](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/images/96f655ba_1749549253717-8cde75d1-c48a-483d-9011-e0c41c19570b.png) | ![matplotlib饼图](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/images/358aabe9_1749549254007-38fd32fe-d3c3-4d41-ab6c-eb48c6d5cf7e.png)<br/>matplotlib库 |
| ![折线图原图](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/images/487de254_1749549254330-c8966118-c287-4f59-8ffc-51c4ac77155d.png) | ![echarts折线图](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/images/2d3b43e2_1749549254635-40fc9083-320e-47a8-9115-c0c8fb768192.png) | ![matplotlib折线图](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/images/be062bae_1749549254862-844278b7-4f19-4e04-b351-b8fecbc9acc2.png) |
| ![热力图原图](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/images/a4ffa9fc_1749549255147-1d02da0b-b3da-457a-9dff-ae7a58646d0e.png) | ![echarts热力图](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/images/8270789e_1749549255417-be5288a7-40cc-4854-9a26-d2e5b0b4cfdb.png) | 跑不出来 |
| ![另一个热力图](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/images/28cd03bc_1749549255608-ed8b94e6-6fd6-4046-b33a-1716d74e3914.png) | ![echarts热力图2](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/images/d6bc3281_1749549255772-4cf2e844-92ed-4a78-bad2-ffa550a3cb1c.png) | ![matplotlib热力图](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/images/9b7facfa_1749549255970-055c69af-4072-473b-a7f2-52d366987a98.png) |
| ![多子图](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/images/f03975ea_1749549256210-db81d0b0-6b0a-4d82-8c2c-488ebf1e3d51.png) | ![echarts多子图1](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/images/8adfd256_1749549256527-9102a08d-6f54-47f1-8ccd-d3e3e5f0d484.png)<br/>![echarts多子图2](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/images/0a1ce408_1749549256738-eb283835-39e7-4b4d-88f7-4cf50de19c6f.png)<br/>通过prompt提示可以识别出多子图，并且重建效果跟上面两个一样 | ![matplotlib多子图1](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/images/816d8d7a_1749549256924-10ad1f36-c5fa-4c52-8a3f-22b6930c2073.png)<br/>![matplotlib多子图2](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/images/58f5f338_1749549257102-436ae6d9-77af-4ceb-a95a-61f84fcd2c68.png) |
| ![中文柱状图](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/images/1a437156_1749549257336-73dda6f3-f031-4e75-9ab3-9811405040c9.png) | ![echarts中文图](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/images/9b3e2977_1749549257519-a39a86d1-35dd-49bd-8ca7-3b0e6410241a.png) | ![matplotlib中文图](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/images/270a98d1_1749549257753-fd1085ae-bfb2-43f9-80b5-eabb21916c0a.png)<br/>中文显示不出来是因为我的电脑没安装字体，源码中是有的 |

### 流程图

| 原图 | mermaid重建效果 |
|------||------|
| ![流程图原图](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/images/a110a715_1749549258080-e9863407-fec9-46eb-a07d-a4e67ee6bdeb.png) | ![mermaid流程图](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/images/c975e9a7_1749549258320-26d2a4a0-3c09-42ed-8acc-59315b84ecd5.png) |

## **echarts**

一种声明式的可视化语言，语法结构类似于json和python dict

与echarts相似的产品还有vega-lite，不过流行度不高，大模型的理解差，解析效果差，不如echarts

```javascript
option = {
    title: {
        text: 'Distribution of Arts Categories in the USA in 2023',
        left: 'center'
    },
    tooltip: {},
    legend: {
        data: ['Visual Arts', 'Music', 'Theatre', 'Dance', 'Literature', 'Film']
    },
    series: [{
        name: 'Arts Categories',
        type: 'pie',
        radius: '50%',
        data: [
            {value: 25, name: 'Visual Arts'},
            {value: 20, name: 'Music'},
            {value: 20, name: 'Theatre'},
            {value: 15, name: 'Dance'},
            {value: 15, name: 'Literature'},
            {value: 5, name: 'Film'}
        ],
        emphasis: {
            itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    }]
};
```

## **python code**

生成语法是基于matplotlib库的，这是一个面向过程的语言，类似于海龟画图，除了数据之外，还有很多绘图过程

```python
import matplotlib.pyplot as plt
import numpy as np

# 数据
categories = ['ChartX-QA', 'Chart-to-Text', 'OpenCQA', 'Chart-to-Table', 'ChartX-Redrawing', 'ChartX-Description', 'ChartX-Summary']
values_Llava1_5_13B = [93.78, 17.18, 20.39, 30.99, 83.6, 1.89, 1.64]
values_ChartInstruct_7B = [91.6, 14.23, 115.59, 33.35, 79.9, 0.94, 0.33]
values_ChartLlama_13B = [7.16, 12.92, 7.16, 17.19, 69.66, 1.03, 1.04]
values_ChartAst_13B = [14.23, 12.92, 7.16, 17.19, 69.66, 1.03, 1.04]
values_TinyChart_3B = [17.18, 14.23, 20.39, 30.99, 83.6, 1.89, 1.64]

# 设置颜色
colors = ['blue', 'green', 'orange', 'red', 'cyan']

# 创建雷达图
fig, ax = plt.subplots(subplot_kw={'projection': 'polar'})

# 绘制每种模型的数据
for i, values in enumerate([values_Llava1_5_13B, values_ChartInstruct_7B, values_ChartLlama_13B, values_ChartAst_13B, values_TinyChart_3B]):
    ax.plot(categories, values, color=colors[i], linewidth=2)
    ax.fill(categories, values, alpha=0.25, color=colors[i])

# 设置标签
ax.set_rlabel_position(-22.5)
ax.set_xticks(np.arange(len(categories)) * np.pi / len(categories) - np.pi / 2)
ax.set_xticklabels(categories)
ax.set_yticks([0, 10, 20, 30, 40, 50, 60, 70, 80, 90])
ax.set_ylim(0, 100)

# 添加图例
ax.legend(loc='upper center', bbox_to_anchor=(0.5, -0.1), ncol=5)

plt.show()
```

## **mermaid**

也是一种声明式的流程图语言，用的蛮多的，qwen和豆包的前端都支持渲染mermaid，所以在线大模型对mermaid的理解肯定也不差

```mermaid
graph TD
    A[输入图像] --> B[特征压缩器]
    B --> C[量化卷积层]
    C --> D[泄漏修正线性单元]
    D --> E[量化卷积层]
    E --> F[泄漏修正线性单元]
    F --> G[量化卷积层]
    G --> H[泄漏修正线性单元]
    H --> I[b bit]
    I --> J[霍夫曼编码器]

    K[输出图像] --> L[基于注意力的超分辨率解码器]
    L --> M[空间-光谱超分辨率]
    M --> N[卷积层]
    N --> O[Sigmoid线性单元]
    O --> P[上采样]
    P --> Q[卷积层]
    Q --> R[Sigmoid线性单元]
    R --> S[上采样]
    S --> T[特征增强主干]
    T --> U[卷积层]
    U --> V[特征通道注意力]
    V --> W[特征通道注意力]
    W --> X[特征通道注意力]
    X --> Y[特征通道注意力]
    Y --> Z[特征通道注意力]
    Z --> AA[卷积层]
    AA --> AB[霍夫曼解码器]

    style A fill:#f0f0f0 stroke:#000 stroke-width:2px
    style B fill:#e0e0e0 stroke:#000 stroke-width:2px
    style K fill:#f0f0f0 stroke:#000 stroke-width:2px
    style L fill:#e0e0e0 stroke:#000 stroke-width:2px
```

## **总结**

**ChartVLM**
- 优点：体量小2506 MiB就能跑
- 缺点：只支持简单的基本图表类型，解析效果差

**Qwen2.5-Omni-7B**
- 优点：啥都能解析，效果好
- 缺点：体量大，需大半张卡