---
title: "Roboflow+colab优雅地训练yolov5模型"
author: 孙百乐
date: 2022-03-19T13:37:49+08:00
draft: false
categories: 
- 技能分享
---

## roboflow

roboflow是一个支持数据集在线打标，在线导出的网站。除此之外它还支持可多人合作、数据增强，版本控制等功能。是我用过最好用的数据集处理平台。

网址：https://roboflow.com/

提示：

* 可以免费使用
* 需要挂代理
* 套餐一定要选public，选择private后导出数据集会很麻烦

## colab

谷歌提供的计算平台

优点：

* 提供免费的tesla k80算力
* 可以很方便的上传下载文件，还可挂载谷歌云盘
* 用的人多，环境配置起来方便
* 网速不错，git clone,pip install都麻利的

## 训练yolov5模型

完全在云端操作，你只需要一个浏览器就行了。

1. 在roboflow上标好数据，点export导出，不用下载，只要复制这段代码就可以了

![image-20220319133335481](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/img/image-20220319133335481.png)

2. 打开https://colab.research.google.com/github/roboflow-ai/yolov5-custom-training-tutorial/blob/main/yolov5-custom-training.ipynb

替换你的下载代码，点`运行全部单元格`

3. 然后你就什么都不用管了，这个脚本会帮你训练、评估效果，最后把权重下载下来。



是不是非常优雅～
