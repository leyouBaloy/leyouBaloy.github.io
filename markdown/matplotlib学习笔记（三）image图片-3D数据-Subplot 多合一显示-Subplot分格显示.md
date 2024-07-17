---
author: 孙百乐
categories:
- 笔记
date: 2021-02-26 12:06:38
draft: false
title: matplotlib学习笔记（三）image图片-3D数据-Subplot 多合一显示-Subplot分格显示
---

视频地址：https://www.bilibili.com/video/BV1Jx411L7LU?p=13&spm\_id\_from=pageDriver  
仅用于学习  
感谢莫烦up主

### image图片

```
import matplotlib.pyplot as plt
import numpy as np

# image data
a = np.array([0.313660827978, 0.365348418405, 0.423733120134,
              0.365348418405, 0.439599930621, 0.525083754405,
              0.423733120134, 0.525083754405, 0.651536351379]).reshape(3,3)

"""
for the value of "interpolation", check this:
http://matplotlib.org/examples/images_contours_and_fields/interpolation_methods.html
参数interpolation见下图
for the value of "origin"= ['upper', 'lower'], check this:
http://matplotlib.org/examples/pylab_examples/image_origin.html
参数origin如果为'upper'图像就会反过来
"""
plt.imshow(a, interpolation='nearest', cmap='bone', origin='lower')
plt.colorbar(shrink=.92) #shrink压缩到百分之九十二

plt.xticks(())
plt.yticks(())
plt.show()
```

![](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/mypic/wp-content/uploads//2021/03/image-7-1024x631.png)

interpolation参数有这些

![](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/mypic/wp-content/uploads//2021/03/image-7-1-1024x797.png)

### 3D数据

```
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D #添加3D坐标轴显示

fig = plt.figure()
ax = Axes3D(fig) #在figure上加一个3D的Axes
# X, Y value
X = np.arange(-4, 4, 0.25)
Y = np.arange(-4, 4, 0.25)
X, Y = np.meshgrid(X, Y)
R = np.sqrt(X ** 2 + Y ** 2)
# height value 高度是Z轴
Z = np.sin(R)

#创建3D图
ax.plot_surface(X, Y, Z, rstride=1, cstride=1, cmap=plt.get_cmap('rainbow'))
"""
r代表row, c代表col， rstride和cstride都是控制跨度的参数，简单理解，就是控制这个3D图像的稠密程度
============= ================================================
        Argument      Description
        ============= ================================================
        *X*, *Y*, *Z* Data values as 2D arrays
        *rstride*     Array row stride (step size), defaults to 10
        *cstride*     Array column stride (step size), defaults to 10
        *color*       Color of the surface patches
        *cmap*        A colormap for the surface patches.
        *facecolors*  Face colors for the individual patches
        *norm*        An instance of Normalize to map values to colors
        *vmin*        Minimum value to map
        *vmax*        Maximum value to map
        *shade*       Whether to shade the facecolors
        ============= ================================================
"""

# I think this is different from plt12_contours
#在3D图下面创建一个等高线图
ax.contourf(X, Y, Z, zdir='z', offset=-2, cmap=plt.get_cmap('rainbow'))
"""
zdir='z'表示这个等高线图是从z轴压下去的，offset表示把等高线图放到-2这个位置
==========  ================================================
        Argument    Description
        ==========  ================================================
        *X*, *Y*,   Data values as numpy.arrays
        *Z*
        *zdir*      The direction to use: x, y or z (default)
        *offset*    If specified plot a projection of the filled contour
                    on this position in plane normal to zdir
        ==========  ================================================
"""

ax.set_zlim(-2, 2)

plt.show()
```

![](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/mypic/wp-content/uploads//2021/03/image-2.png)

### Subplot 多合一显示

```
import matplotlib.pyplot as plt

# example 1:
###############################
plt.figure(figsize=(6, 4))
# plt.subplot(n_rows, n_cols, plot_num)
plt.subplot(2, 2, 1)
#2行2列，共4张图，编辑第1张图
plt.plot([0, 1], [0, 1])

plt.subplot(222)
#2行2列，共4张图，编辑第2张图，这里不写逗号也可以识别（惊了）
plt.plot([0, 1], [0, 2])

plt.subplot(223)
#2行2列，共4张图，编辑第3张图
plt.plot([0, 1], [0, 3])

plt.subplot(224)
#2行2列，共4张图，编辑第4张图
plt.plot([0, 1], [0, 4])

plt.tight_layout()

# example 2:
###############################
plt.figure(figsize=(6, 4))
# plt.subplot(n_rows, n_cols, plot_num)
plt.subplot(2, 1, 1)
# figure splits into 2 rows, 1 col, plot to the 1st sub-fig
plt.plot([0, 1], [0, 1])

plt.subplot(234)
# figure splits into 2 rows, 3 col, plot to the 4th sub-fig
plt.plot([0, 1], [0, 2])

plt.subplot(235)
# figure splits into 2 rows, 3 col, plot to the 5th sub-fig
plt.plot([0, 1], [0, 3])

plt.subplot(236)
# figure splits into 2 rows, 3 col, plot to the 6th sub-fig
plt.plot([0, 1], [0, 4])


plt.tight_layout()
plt.show()
```

![](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/mypic/wp-content/uploads//2021/03/image-7-4-1024x775.png)

figure1

![](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/mypic/wp-content/uploads//2021/03/image-7-3-1024x769.png)

figure2

### Subplot分格显示

```
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec

# 方法一：method 1: subplot2grid
##########################
plt.figure()
ax1 = plt.subplot2grid((3, 3), (0, 0), colspan=3)  # 分3行3列的格子，从(0,0)开始，跨列=3,跨行colspan默认为1
ax1.plot([1, 2], [1, 2])
ax1.set_title('ax1_title')
ax2 = plt.subplot2grid((3, 3), (1, 0), colspan=2)
ax3 = plt.subplot2grid((3, 3), (1, 2), rowspan=2)
ax4 = plt.subplot2grid((3, 3), (2, 0))
ax4.scatter([1, 2], [2, 2])
ax4.set_xlabel('ax4_x')
ax4.set_ylabel('ax4_y')
ax5 = plt.subplot2grid((3, 3), (2, 1))

# 方法二：method 2: gridspec
#########################
plt.figure()
gs = gridspec.GridSpec(3, 3)
# use index from 0
ax6 = plt.subplot(gs[0, :])
ax7 = plt.subplot(gs[1, :2])
ax8 = plt.subplot(gs[1:, 2])
ax9 = plt.subplot(gs[-1, 0])
ax10 = plt.subplot(gs[-1, -2])

# 方法三：method 3: easy to define structure
####################################
f, ((ax11, ax12), (ax13, ax14)) = plt.subplots(2, 2, sharex=True, sharey=True)
#用ax11,ax12,ax13,ax14接收返回的第一行第一列图，第一行第二列图，第二行第一列图，第二行第二列图
ax11.scatter([1,2], [1,2])

plt.tight_layout()
plt.show()
```

![](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/mypic/wp-content/uploads//2021/03/image-5-1.png)

method1和method2效果图

![](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/mypic/wp-content/uploads//2021/03/image-7-6-1024x874.png)

method2