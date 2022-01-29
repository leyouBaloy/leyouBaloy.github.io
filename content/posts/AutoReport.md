---
author: 孙百乐
categories:
- 技能分享
date: 2021-04-05 13:18:35
draft: true
title: AutoReport
---

疫情防控通自动填报教程

### 前言

“天下苦疫情防控通久矣！”作为UPC学子，每天都要做一件“无聊”的事情——填报疫情防控通。如果哪天忘了填报，就会被导员无情通报批评。  

为什么不做一个自动填报的工具呢？  

毕竟 “有需求就有市场”，有了自动填报疫情防控通的需求，当然就有大佬基于计算机知识做出了这样的工具。切实解决了同学们痛点需求，就其实用性来说，应当得到推广。但考虑到非计算机专业的学生使用起来有一定的门槛，于是本人写下这篇详细教程来教大家使用这个程序。

首先感谢作者：

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads//2021/04/image.png)

作者

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads//2021/04/image-1.png)

作者的免责声明

### 原理简介

我们在微信里打开“疫情防控通”时，实际上是打开了一个网页（此时的微信只是相当于一个浏览器），用其它浏览器一样可以访问。该网页的地址可以通过抓包获得，网址如下：

[https://app.upc.edu.cn/ncov/wap/default/index](https://app.upc.edu.cn/ncov/wap/default/index)

打开后填入数字石大的账号和密码就可以进入如下页面：

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads//2021/04/image-2-1-1024x895.png)

那么，我们就可以跳过微信，直接通过编写程序打开这个页面，登录完成后通过代码实现自动化操作，进行填报。

大佬已经编写好这样的程序了，使用的语言是js，每次执行这个程序，就可以完成自动填报。那么，如何让这个程序每天自己自动执行一次呢？

大佬提出了解决方案，借助外界工具“腾讯云函数”来实现这个程序的每天定时执行。腾讯云函数服务就相当于你把你的程序放在了一台24小时不关机的电脑上，这台电脑位于“云端”，你看不见也摸不着，只能通过远程访问。之后你在这台电脑上设定一个“触发器”，让它在指定的时间周期触发这个程序运行。从此以后，你将不再需要手动进行任何操作，这台云端上的电脑，会坚持不懈地，准时无误地完成你让它执行的任务。而且，目前“腾讯云函数”功能是免费的哦~当然，它和普通电脑还是有很大差别的，你不能把它当成一台真正的电脑，但是完成咱们的疫情防控通自动填报任务还是绰绰有余的。

### 下载程序并进行配置

下面进入教程环节：

首先打开github上的项目地址：

[https://github.com/tienskowl/AutoReport](https://github.com/tienskowl/AutoReport)

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads//2021/04/image-3-1024x446.png)

点击download ZIP 下载压缩文件，然后解压（不会吧不会吧，不会真有人连解压都不会吧?(阴阳怪气)）

解压完的样子：

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads//2021/04/image-6.png)

点进去之后有个index.js文件，这个文件需要安装Nodejs环境才可以执行，我们不需要在自己的电脑上执行这个文件，只要修改其中的代码就可以。所以点击右键，选择打开方式，用记事本打开就可以。

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads//2021/04/image-7.png)

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads//2021/04/image-8-1.png)

然后你就可以看到具体的代码内容啦，看不懂不要紧，我们只要修改“学号”、“密码”。

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads//2021/04/image-9-944x1024.png)

将“学号”、“密码”替换成你数字石大的学号和密码。

这里有几个问题，你可能会问到：

*   问：这个程序会不会有病毒，作者会不会窃取我的数字石大账号密码？

答：不会。这个程序是完全开源的，你可以看到它所有的源代码，就像是你把一个人全身的衣服都扒光了看，你觉得他可能藏有武器吗？

*   问：下面还有第三个参数“Server酱APIKEY”，这个要不要填写？

答：这个“Server酱”可以帮助这个程序实现微信推送功能。个人建议最好去搞一个Server酱的apikey填在这里。至于这个apikey如何获得，请参考server酱官网 [http://sc.ftqq.com/3.version](http://sc.ftqq.com/3.version)，本教程不作详细说明。这就相当于你买了一辆汽车，建议你再安装一个车载导航，但是你具体买哪个牌子的车道导航就看你自己的决定了。

修改完之后大概是这个样子：

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads//2021/04/image-11-1.png)

保存后关闭，一定要保存！

### 上传到腾讯云函数并设置触发器

打开腾讯云函数官网：

[https://console.cloud.tencent.com/scf](https://console.cloud.tencent.com/scf)

在“函数服务”里点“新建”

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads//2021/04/image-13-1.png)

创建方式“自定义创建”，函数名称随意，运行环境选择“nodejs12.16”，提交方法选择“本地上传文件夹”，点击“上传”

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads//2021/04/image-14-1-914x1024.png)

可能会弹出这样的消息，点上传就可：

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads//2021/04/image-15.png)

如果上传失败了，也可以把AutoReport-master文件夹压缩后选择“本地上传zip包”提交。

然后点击“完成”

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads//2021/04/image-16.png)

之后就能看见这个函数创建完成，点进去进行测试

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads//2021/04/image-17-2-1024x251.png)

腾讯云提供了在线编辑器，如果想修改代码，可以直接在这里改，确实很方便。  
这里我们一定要把“自动安装依赖”打开，然后点“部署”，再点“测试”

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads//2021/04/image-18-1-1024x738.png)

预期的测试结果

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads//2021/04/image-19.png)

如果你填了Server酱的APIKEY，应该还能收到微信发的推送通知。

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads//2021/04/image-20-1-892x1024.png)

好啦，最后一步，设置触发器

如下图，点左侧“触发管理”、“创建触发器”

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads//2021/04/image-21.png)

选择“自定义触发周期”，填写Cron表达式，推荐使用 0 1 1,8 \* \* \* \*

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads//2021/04/image-22-2-1024x643.png)

该表达式是作者推荐的一个表达式，它所表达的意思就是每天触发两次，时间为每天的01:01和08:01

提交之后，就大功告成啦！你可以过上“从此君王不早朝”的生活啦！（误）

### Tips

Question: 这个程序是如何填写定位信息的？

Answer: 通过返回昨天填报的地点填写到今天的位置。从这里可以看出这个程序真的很巧妙，如果你的位置发生了改变（比如从学校回家），你可以在回家之后，抢在程序自动填报之前，手动填报一次。

如果有问题请在下方评论区提出，谢谢！