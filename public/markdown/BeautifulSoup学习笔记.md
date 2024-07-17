---
author: 孙百乐
categories:
- 笔记
date: 2021-02-14 19:08:15
draft: false
title: BeautifulSoup学习笔记
---

发现宝藏视频和宝藏up主，讲的内容正是我的疑惑点。

[https://www.bilibili.com/video/BV1Pg4y1z7Lr?from=search&seid=13958657789515093044](https://www.bilibili.com/video/BV1Pg4y1z7Lr?from=search&seid=13958657789515093044)

### 导入

from bs4 import BeautifulSoup `#导入模块`

soup = BeautifulSoup(text,'lxml') `#实例化BeautifulSoup对象`

### 获取所有的div标签

divs = soup.find\_all('div')

print(divs)

`divs不是列表，是bs4的ResultSet，输出结果是一个列表形式，每个div作为列表中的一个元素`

### 获取指定的div标签

div = soup.find\_all('div')\[1\]

print(div)

`#输出第二个数据，还可以切片，不举例了`

div = list(soup.find\_all('div'))

`把结果转换成列表，还是很方便的`

### 获取拥有指定属性的标签(id=even的div标签)

方法一：

divs = soup.find\_all('div',id='even')

`如果指定属性是class，会与Python关键字冲突，改为class_`

方法二：

divs = soup.find\_all('div',attrs={"id":"even","class":"L square"}) `#以字典的形式找到多个指定属性的`div标签

### 获取标签的属性值

alist = soup.find\_all('a')

方法一：通过下标方式提取

for a in alist:

href = a\['href'\]

print(href)

方法二：利用attrs方法提取

for a in alist:

href = a.attrs\['href'\]

print(href)

### 输出文字

`使用string方法`

print(div.string)