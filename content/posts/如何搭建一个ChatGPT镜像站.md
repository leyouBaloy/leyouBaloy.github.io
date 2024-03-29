---
title: "如何搭建一个ChatGPT镜像站"
author: 孙百乐
date: 2023-04-12T14:11:41+08:00
draft: false
categories: 
- 技能分享
- 笔记
---

### 为什么要搭建一个ChatGPT镜像站？

用过ChatGPT的都知道，刚开始速度嗖嗖的，甚至不用挂代理就能用。但是后来速度越来越慢，还开始封国内IP，封梯子IP，封国内账号，搞得没法再国内使用，但是已经形成了依赖，不用不行呀。天下苦ChatGPT久矣～

自从api接口开放之后，操作空间就大了。我们可以搭建一个国内的镜像站给身边的人使用，搭建得好的话，可以加快访问速度，让国内的用户不挂梯子就能访问，非常便捷。

搭建的难点之一是如何提供一个稳定的海外网络环境，这里我表哥提供了一个非常nice的解决方法：使用cloudflare提供的免费云函数做代理，一天10w请求量完全够用。

搭建的过程并不难，但需要懂一点运维的知识（域名、Linux）。以下是我总结的搭建流程：

### 1. 搭建前后端

用这个开源项目：https://github.com/Chanzhaoyu/chatgpt-web

### 2. 使用cloudflare作为代理

cloudflare有一个workers，就是海外版的腾讯云函数，亲测访问速度是不错的，可以绑定自己的域名整一个

### 3. 提速

近期openai对免费接口又做了限速，绑定信用卡之后能提速（像极了资本家的丑恶嘴脸）。国内的信用卡是不行的，必须得是国外的，而且梯子的IP还得和信用卡所在地的IP对应，自己弄很麻烦，建议找人帮忙弄。

说下我的经历，我花80块钱申请了一张depay的虚拟信用卡，然后花10块钱找人帮忙绑的卡。depay这家小公司的可信度是存疑的，更何况我还把卡的信息给了别人，所以这套流程是非常不安全的。这张卡我只敢存点小钱用于openai消费。这套流程可以走通，但是不建议。





