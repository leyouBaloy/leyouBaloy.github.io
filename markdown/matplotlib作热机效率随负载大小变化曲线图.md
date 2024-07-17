---
author: 孙百乐
categories:
- 技能分享
date: 2021-04-02 09:28:08
draft: false
title: matplotlib作热机效率随负载大小变化曲线图
---

大物实验得到的数据，用python的matplotlib很方便处理

数据准备：

```
r = np.arange(0.5,6.0,0.5)
u2 = np.array([6.66,6.49,6.37,6.37,6.17,6.12,6.18,5.98,5.97,5.93,5.91])
i2 = np.array([2.06,2.01,1.97,1.98,1.91,1.90,1.92,1.85,1.85,1.84,1.83])
uw = np.array([0.145,0.259,0.338,0.419,0.467,0.513,0.552,0.586,0.616,0.641,0.663])
n = ((uw*uw)/r)/(u2*i2)
# len(r)
# r
n
```

画图：

```
import matplotlib.pyplot as plt
import numpy as np
%matplotlib inline

x = np.linspace(0.5,5.5,11) #横坐标11个数据
# y = np.array([0.31,]) #纵坐标11个数据

plt.rcParams['font.sans-serif'] = ['SimHei']  # 用来正常显示中文标签
plt.rcParams['axes.unicode_minus'] = False  # 用来正常显示负号
plt.grid(True)#网格线
plt.title('热机效率随负载大小变化曲线图')#标题


plt.plot(x,n,'r') #显示红线
plt.plot(x, n, 'k.') #显示黑点

plt.xlabel(r'负载大小/R') 
plt.ylabel(r'热机效率') 

plt.xticks(x) #重新设置x坐标



plt.show
plt.savefig('./热机效率随负载大小变化曲线图.png',dpi=200) #保存图片，清晰度200
```

效果

![](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/mypic/wp-content/uploads//2021/04/热机效率随负载大小变化曲线图-1024x683.jpg)