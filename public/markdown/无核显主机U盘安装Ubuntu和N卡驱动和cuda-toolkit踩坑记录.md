---
categories:
- 笔记
- 技能分享
date: 2024-11-27 06:47:24
title: 无核显主机U盘安装Ubuntu和N卡驱动和cuda-toolkit踩坑记录
img: https://myblog-1257298572.cos.ap-shanghai.myqcloud.com//imgimage-20241127151604083.png
---

### 无核显主机U盘安装Ubuntu

先用Runfus（开源软件）制作启动盘，插到电脑上，进BIOS后选择U盘启动，选择安装Ubuntu，安装过程中需要指定安装在哪个磁盘，是否需要分区等等。安装好了之后会提示拔掉U盘进入系统，之后画面会卡在这个界面。

原因是nouveau这个倒霉驱动跟N卡不适配。nouveau是一个通过逆向工程开发的开源驱动，被Ubuntu 默认使用，但是Nouveau 一直未获得英伟达官方的认可，所以在使用的时候bug层出不穷。

解决方案是禁用这个驱动，禁用的方法是在开启进入GRUB界面编辑命令，加一小段代码就可以在本次启动禁用nouveau。进入系统之后在Ubuntu的blacklist里添加nouveau，这样以后启动都默认禁用了。然后再安装英伟达官方的驱动。具体教程网上很多。

为什么禁用了显卡驱动，依然可以进系统，并且正常显示图形界面呢？这是因为Ubuntu还内置了通用显卡驱动，只不过这个通用驱动性能非常低，表现为进系统之后只能以很低的分辨率显示。不过没关系，我们只要装好了nvidia官方驱动就能正常显示了。

![6b6f460a7560c751a8b127473358399e](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com//img6b6f460a7560c751a8b127473358399e.jpg)

### 安装nvidia官方驱动

到官网选择显卡型号，就能下载驱动。下载完是一个.run文件，用sudo运行就可以了。

坑点是安装gcc版本可能要改变，我用的Ubuntu22，默认gcc版本11，但是需要切换成12才行。

![image-20241127151604083](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com//imgimage-20241127151604083.png)

### 安装cuda-toolkit

这个也是官网选择合适显卡版本，下载最新的就可以。

坑点是gcc版本和内核版本要对应，有的时候即使对应了也还是会报错，我就是这样。可以点进下方的`Installation Guide for Linux`链接，我按照这个教程执行了下面这个命令就可以安装了。

```
sudo apt-get install linux-headers-$(uname -r)
```

![image-20241127151713160](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com//imgimage-20241127151713160.png)
