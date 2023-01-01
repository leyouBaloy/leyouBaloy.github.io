---
title: "Livego——小而美的直播串流软件"
author: 孙百乐
date: 2023-01-01T16:11:53+08:00
draft: false
categories: 
- 技能分享
- 笔记
---

近期想跟异地女朋友一起看电影，试了几种方式都不够优雅，

方式一：用chrome插件，双方同时打开一个视频源，然后通过这个插件能控制两个人的进度条保持一致。

缺点：因为有的视频源是收费的，两个人想一起看得交两份钱，还有的不支持网页播放（需要下载软件），所以这种方式灵活性很差，不好用。

方式二：用腾讯会议，两个人进同一个会议，开共享屏幕看视频。

缺点：因为是共享屏幕所以啥都能看，灵活性比较高，腾讯会议的实时性也比较高，但是流畅度低，看起视频来卡卡的，不好用。

方式三：开直播，直播是拿延迟换流畅度（延迟大概也就5秒左右），需要一台设备串流。

缺点：成本比较高。

以上几种方式都试过了，我觉得还是第三种比较好。一番搜索之后，发现了一个好用的开源软件叫`livego`，在朋友的一个腾讯云的服务器闲置上跑个直播，跟对象两人一起啥都能看，效果还不错。服务器系统是ubuntu，配置2核4G，实测够用。

## LiveGo

LiveGo是go语言写的一个软件，go语言的性能确实不错，我的博客用的框架是`Hugo`，也是go语言写的，速度确实很快。

安装起来也很方便，用docker的话只需要打一行命令：

`docker run -p 1935:1935 -p 7001:7001 -p 7002:7002 -p 8090:8090 -d gwuhaolin/livego`

我总觉得docker性能不好，所以选择在本地安装，也很方便：

下载源码：`git clone https://github.com/gwuhaolin/livego.git`

进入文件夹后编译：`go build` or `make build`

跑起来之后，打`http://localhost:8090/control/get?room=movie`获取直播key

用obs（一个常用的直播软件）通过rmtp协议串流：`rtmp://localhost:1935/{appname}/{channelkey}`，appname默认是live

最后拉取直播，支持三种协议，一般用第二种flv即可

- `RTMP`:`rtmp://localhost:1935/{appname}/movie`
- `FLV`:`http://127.0.0.1:7001/{appname}/movie.flv`
- `HLS`:`http://127.0.0.1:7002/{appname}/movie.m3u8`

windows可以用potplayer这个软件，其它设备可以用VLC（安卓，iOS，macOS）

项目地址：https://github.com/gwuhaolin/livego

官方文档：https://github.com/gwuhaolin/livego/blob/master/README_cn.md

像LiveGo这种软件真的是太棒了，几行代码就能用起来，不整那些复杂的东西，我很喜欢。







