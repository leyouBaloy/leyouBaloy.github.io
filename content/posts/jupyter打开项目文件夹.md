---
author: 孙百乐
categories:
- 技能分享
date: 2021-01-19 17:52:50
draft: false
title: jupyter打开项目文件夹
---

#### 一.添加环境变量

直接在windows里面搜索“查看高级系统设置”，选择<高级>,<环境变量>，点开<path>，以下三行填入其中：

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads//2021/01/image-2.png)

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads//2021/01/image.png)

然后点确定。  
在我的电脑里<环境变量>和<系统变量>里面都有path，我也不知道该填哪个，索性把两个都填上了，这三个变量我觉得应该也有多余的，反正这个东西我是搞不太清楚的，只是照着网上说的做。

#### 二.打开终端，进入目标文件夹，运行jupyter notebook这条指令

1.打开cmd之后cd进目标文件夹。  
2.在目标文件夹里用git终端（需要安装git）  
3.在目标文件夹按shift+右键，点<在此处打开powershell窗口>  
以上三种方法打开终端都可以。

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads//2021/01/image-1.png)

然后jupyter的黑窗口就跳出来了，或者是直接在终端里显示，进入notebook页面里就能看见打开了目标文件夹，还挺方便。

### 2月17日更新

新方法

打开anaconda prompt(按win搜索)

键入jupyter notebook + 目标文件地址

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads//2021/02/image-3-1024x534.png)