---
author: 孙百乐
categories:
- 技能分享
date: 2021-10-30 13:58:01
draft: false
title: ubuntu安装Python3的曲折之路
---

### 思路

先安装Python版本管理器pyenv

再用Pyenv安装Python

### 安装pyenv

标准安装：找到项目地址[pyenv/pyenv: Simple Python version management (github.com)](https://github.com/pyenv/pyenv)

先git clone，再配环境变量。

作者还提供了一个自动安装的脚本，只需一行命令。

失败！因为国内云主机墙了github（真是emo了

**我的方法：**

参考[https://blog.csdn.net/m0\_37616927/article/details/108770185](https://blog.csdn.net/m0_37616927/article/details/108770185)

1.  从gitee上下载pyenv:

git clone https://gitee.com/ibuki\_fuuko/pyenv.git ~/.pyenv

会把pyenv下载到当前用户的～/.pyenv目录下

2.  再把以下内容加到~/.bashrc 里，没有就新建

export PATH=~/.pyenv/bin:$PATH  
export PYENV\_ROOT=~/.pyenv  
eval "$(pyenv init -)"

3.  激活

source .bashrc

4.  安装成功，可以看到pyenv提供可安装的python版本

pyenv install --list

### 安装python

标准思路：直接pyenv install 3.7.5 就能一键安装Python了

失败！因为Python镜像默认是从官网下的，国内网络上不去（再次emo

这之后我就开始瞎捣鼓了，参考：

https://blog.csdn.net/yxiaom/article/details/103468954

找了一个国内的镜像地址：

[http://npm.taobao.org/mirrors/python/](http://npm.taobao.org/mirrors/python/)

安装Python之前需要安装很多依赖，多用apt装一装

最后查看一下已安装的Python版本

pyenv versions

然后设置默认版本，这样你打`python`的时候默认使用这个版本

pyenv global 版本号

最离谱的是，我尝试这个命令没有成功，什么都没做，到第二天居然可以了（第三次emo

**没想到在linux上装Python比在Windows上难的多，win上装一个anaconda就能解决所有问题**

### 懒人方案

装一个宝塔面板，安装Python就比较方便了，但是也失去了学习的价值