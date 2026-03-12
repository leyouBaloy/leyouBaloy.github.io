---
author: 孙百乐
categories:
- 技能分享
date: 2021-09-23 15:58:12
draft: false
title: 浏览器不支持getUserMedia
---

现在主流浏览器的安全机制就是对非https和localhost的ip拒绝调用摄像头和麦克风。在设置里无法直接更改权限。 其实这是因为浏览器不支持http：IP开头的路径，认为这个路径不安全 浏览器只支持file:,https:,[http://localhost](http://localhost)，

### 解决方法

chrome

地址栏输入：chrome://flags/#unsafely-treat-insecure-origin-as-secure

![](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/mypic/wp-content/uploads/2021/09/chromegetmedia-1024x570.png)

然后就ok了