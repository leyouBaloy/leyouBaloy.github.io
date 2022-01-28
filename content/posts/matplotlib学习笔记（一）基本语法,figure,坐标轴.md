---
author: 孙百乐
categories:
- 笔记
date: 2021-02-23 10:48:54
draft: false
title: matplotlib学习笔记（一）基本语法,figure,坐标轴
---

学习视频地址：[https://www.bilibili.com/video/BV1Jx411L7LU?](https://www.bilibili.com/video/BV1Jx411L7LU?)  
github地址：[https://github.com/MorvanZhou/tutorials/tree/master/matplotlibTUT](https://github.com/MorvanZhou/tutorials/tree/master/matplotlibTUT)

### 基本语法

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads//2021/02/image-4.png)

  

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads//2021/02/image-5.png)

### 一个figure就是一张图片

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads//2021/02/image-7.png)

这里有两个figure(两张图)，其中第二个figure有两个plot(两条线)

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads//2021/02/image-9-1-1024x811.png)

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads//2021/02/image-8-1-1024x636.png)

### 设置坐标轴

```
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(-3, 3, 50)
y1 = 2*x + 1
y2 = x**2

plt.figure()
plt.plot(x, y2)
# plot the second curve in this figure with certain parameters
plt.plot(x, y1, color='red', linewidth=1.0, linestyle='--')
# set x limits
plt.xlim((-1, 2)) #限制x坐标轴范围
plt.ylim((-2, 3)) #限制y坐标轴范围
plt.xlabel('I am x') #x轴的名字
plt.ylabel('I am y') #y轴的名字

# set new sticks
new_ticks = np.linspace(-1, 2, 5) #np数组
print(new_ticks)
plt.xticks(new_ticks) #设置新ticks
# set tick labels设置tick的标签，这些是一一对应的，反斜杠加空格是空格的转义字符，加$符号变成好看的斜体
plt.yticks([-2, -1.8, -1, 1.22, 3],
           [r'$really\ bad$', r'$bad$', r'$normal$', r'$good$', r'$really\ good$'])
plt.show()
```

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads//2021/02/image-10-1024x743.png)

移动坐标轴

```
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(-3, 3, 50)
y1 = 2*x + 1
y2 = x**2

plt.figure()
plt.plot(x, y2)
# plot the second curve in this figure with certain parameters
plt.plot(x, y1, color='red', linewidth=1.0, linestyle='--')
# set x limits
plt.xlim((-1, 2))
plt.ylim((-2, 3))

# set new ticks
new_ticks = np.linspace(-1, 2, 5)
plt.xticks(new_ticks)
# set tick labels
plt.yticks([-2, -1.8, -1, 1.22, 3],
           ['$really\ bad$', '$bad$', '$normal$', '$good$', '$really\ good$'])
# to use '$ $' for math text and nice looking, e.g. '$\pi$'

# gca = 'get current axis'，获取当前正在编辑的这张图的坐标轴
ax = plt.gca() 
ax.spines['right'].set_color('none') #把右边和上边的边框线的颜色设置成“无”,"spines"翻译成“脊梁”？？？
ax.spines['top'].set_color('none')

ax.xaxis.set_ticks_position('bottom') #用“下面”的轴的ticks代替“x坐标轴”的ticks,有如下参数可选（其实不太明白qwq）
# ACCEPTS: [ 'top'  'bottom'  'both'  'default'  'none' ]

ax.spines['bottom'].set_position(('data', 0)) #设置下面“脊梁”的位置（即x轴的位置），以“data”的方式，设置在y轴的0刻度上
# the 1st is in 'outward'  'axes'  'data' 还可以用其它方式确定这个位置，比如outer，axes这些
# axes: percentage of y axis
# data: depend on y data

ax.yaxis.set_ticks_position('left')  #用“左边”的轴的ticks代替“y坐标轴”的ticks,有如下参数可选
# ACCEPTS: [ 'left'  'right'  'both'  'default'  'none' ]

ax.spines['left'].set_position(('data',0)) #把y轴位置设置在x轴的0刻度上
plt.show()
```

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads//2021/02/image-11-1.png)