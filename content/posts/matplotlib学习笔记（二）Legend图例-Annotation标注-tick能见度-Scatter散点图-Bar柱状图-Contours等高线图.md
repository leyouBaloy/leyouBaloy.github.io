---
author: 孙百乐
categories:
- 笔记
date: 2021-02-25 18:40:44
draft: false
title: matplotlib学习笔记（二）Legend图例-Annotation标注-tick能见度-Scatter散点图-Bar柱状图-Contours等高线图
---

内容均来源于：https://www.bilibili.com/video/BV1Jx411L7LU?p=9&spm\_id\_from=pageDriver  
仅供学习使用

### Legend图例

```
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(-3, 3, 50)
y1 = 2*x + 1
y2 = x**2

plt.figure()
# set x limits
plt.xlim((-1, 2))
plt.ylim((-2, 3))

# set new sticks
new_sticks = np.linspace(-1, 2, 5)
plt.xticks(new_sticks)
# set tick labels
plt.yticks([-2, -1.8, -1, 1.22, 3],
           [r'$really\ bad$', r'$bad$', r'$normal$', r'$good$', r'$really\ good$'])

l1, = plt.plot(x, y1, label='linear line') #这里前面加个“l1 = ”是接收返回对象，如果不用到下面的handles，就没必要接收这个对象了，直接写语句就可
l2, = plt.plot(x, y2, color='red', linewidth=1.0, linestyle='--', label='square line')

plt.legend(loc='upper right')
# plt.legend(handles=[l1, l2], labels=['up', 'down'],  loc='best')这是在显示图例的时候没有使用本来的信息，而是又自己设置了一遍，把原来的覆盖了，估计这辈子都不会用到这么麻烦的把哈哈
# the "," is very important in here l1, = plt... and l2, = plt... for this step如果要用到handles,就必须把l1和l2后面加个逗号
"""legend( handles=(line1, line2, line3),
           labels=('label1', 'label2', 'label3'),
           'upper right')
    The *loc* location codes are::
          'best' : 0,          (currently not supported for figure legends)
          'upper right'  : 1,
          'upper left'   : 2,
          'lower left'   : 3,
          'lower right'  : 4,
          'right'        : 5,
          'center left'  : 6,
          'center right' : 7,
          'lower center' : 8,
          'upper center' : 9,
          'center'       : 10,"""

plt.show()
```

![](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/mypic/wp-content/uploads//2021/02/image-12.png)

#### 简单省事儿的写法

```
plt.plot(x, y1, label='linear line') 
plt.plot(x, y2, color='red', linewidth=1.0, linestyle='--', label='square line')

plt.legend(loc='best')#自动选择好的位置显示图例，图例中每条线原本的label也会显示
```

### Annotation标注

```
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(-3, 3, 50)
y = 2*x + 1

plt.figure(num=1, figsize=(8, 5),)
plt.plot(x, y,)

ax = plt.gca()
ax.spines['right'].set_color('none')
ax.spines['top'].set_color('none')
ax.spines['top'].set_color('none')
ax.xaxis.set_ticks_position('bottom')
ax.spines['bottom'].set_position(('data', 0))
ax.yaxis.set_ticks_position('left')
ax.spines['left'].set_position(('data', 0))

x0 = 1
y0 = 2*x0 + 1
plt.plot([x0, x0,], [0, y0,], 'k--', linewidth=2.5) #画一条从(x0,y0)垂直到x轴的虚线
plt.scatter([x0, ], [y0, ], s=50, color='b') #在(x0,y0)上标记一个点

#下面的太几把麻烦了，不研究了
# method 1:
#####################
plt.annotate(r'$2x+1=%s$' % y0, xy=(x0, y0), xycoords='data', xytext=(+30, -30),
             textcoords='offset points', fontsize=16,
             arrowprops=dict(arrowstyle='->', connectionstyle="arc3,rad=.2"))

# method 2:
########################
plt.text(-3.7, 3, r'$This\ is\ the\ some\ text. \mu\ \sigma_i\ \alpha_t$',
         fontdict={'size': 16, 'color': 'r'})

plt.show()
```

### 坐标轴刻度（tick能见度）

```
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(-3, 3, 50)
y = 0.1*x

plt.figure()
plt.plot(x, y, linewidth=10, zorder=1)      # set zorder for ordering the plot in plt 2.0.2 or higher
plt.ylim(-2, 2)
ax = plt.gca()
ax.spines['right'].set_color('none')
ax.spines['top'].set_color('none')
ax.spines['top'].set_color('none')
ax.xaxis.set_ticks_position('bottom')
ax.spines['bottom'].set_position(('data', 0))
ax.yaxis.set_ticks_position('left')
ax.spines['left'].set_position(('data', 0))


for label in ax.get_xticklabels() + ax.get_yticklabels():
    label.set_fontsize(12)
    # set zorder for ordering the plot in plt 2.0.2 or higher
    label.set_bbox(dict(facecolor='white', edgecolor='none', alpha=0.8, zorder=2))
plt.show()
```

![](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/mypic/wp-content/uploads//2021/02/image-13.png)

### Scatter散点图

```
import matplotlib.pyplot as plt
import numpy as np

n = 1024    # data size
X = np.random.normal(0, 1, n) #正态分布生成散点
Y = np.random.normal(0, 1, n) ##正态分布生成散点
T = np.arctan2(Y, X)    # for color later on这个公式是表示颜色的，超纲

plt.scatter(X, Y, s=75, c=T, alpha=.5) #s是size,c是color,alpha是透明度

plt.xlim(-1.5, 1.5)
plt.xticks(())  # ignore xticks 将ticks设置为空白
plt.ylim(-1.5, 1.5)
plt.yticks(())  # ignore yticks

plt.show()
```

![](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/mypic/wp-content/uploads//2021/02/image-14-1.png)

### Bar柱状图

```
import matplotlib.pyplot as plt
import numpy as np

n = 12
X = np.arange(n)
Y1 = (1 - X / float(n)) * np.random.uniform(0.5, 1.0, n) #uniform均匀分布
Y2 = (1 - X / float(n)) * np.random.uniform(0.5, 1.0, n)

plt.bar(X, +Y1, facecolor='#9999ff', edgecolor='white') #“+”号是向上的柱状图
plt.bar(X, -Y2, facecolor='#ff9999', edgecolor='white') #“-”号是向下的柱状图

for x, y in zip(X, Y1):
    # ha: horizontal alignment 水平位置
    # va: vertical alignment 垂直位置
    plt.text(x + 0.4, y + 0.05, '%.2f' % y, ha='center', va='bottom')
#默认宽度0.8，通过加0.4来偏移到中间（其实不太懂qwq），y+0.05是不让柱状图上显示的文本与柱状图靠的太近
#'%.2f'%y 是对于传进来的数值保留两位小数

for x, y in zip(X, Y2):
    # ha: horizontal alignment
    # va: vertical alignment
    plt.text(x + 0.4, -y - 0.05, '%.2f' % y, ha='center', va='top')

plt.xlim(-.5, n)
plt.xticks(())
plt.ylim(-1.25, 1.25)
plt.yticks(())

plt.show()
```

![](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/mypic/wp-content/uploads//2021/02/image-15.png)

演示中的柱状图有两条，实际中一般用的用一条就够了

### Contours等高线图

```
import matplotlib.pyplot as plt
import numpy as np

def f(x,y):
    # the height function 计算高度的函数，不需要太关心
    return (1 - x / 2 + x**5 + y**3) * np.exp(-x**2 -y**2)

n = 256
x = np.linspace(-3, 3, n)
y = np.linspace(-3, 3, n)
X,Y = np.meshgrid(x, y)

# use plt.contourf to filling contours填充颜色
# X, Y and value for (X,Y) point
plt.contourf(X, Y, f(X, Y), 8, alpha=.75, cmap=plt.cm.hot) #X,Y是横纵坐标，f(X,Y)是高度，8是稠密程度，alpha是透明度，显示“hot”类型的等高线图

# use plt.contour to add contour lines画等高线
C = plt.contour(X, Y, f(X, Y), 8, colors='black', linewidth=.5)
# adding label 加入label
plt.clabel(C, inline=True, fontsize=10) #画在contour对象C上面，画在线内，粗细为10

plt.xticks(())
plt.yticks(())
plt.show()
```

![](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/mypic/wp-content/uploads//2021/02/image-16-2.png)