---
author: 孙百乐
categories:
- 技能分享
date: 2021-11-12 16:57:43
draft: false
title: macOS下matplotlib无法显示中文字体问题解决
---

网上教程大多都是说下载微软雅黑字体到系统文件夹，然后更改matplotlib的配置文件。实际操作过程发现更改系统文件夹需要权限，而且matplotlib的配置文件也和网上说的不一样。

后来参考了：https://www.cnblogs.com/cymwill/p/10554916.html

## 解决方法

找到字体路径

```
import matplotlib
print(matplotlib.matplotlib_fname())
```

进入该路径然后编辑文件matplotlibrc可以直接在最下面加上三行：

```
font.family: sans-serif
font.sans-serif: Arial Unicode MS, Bitstream Vera Sans, Lucida Grande, Verdana, Geneva, Lucid, Arial, Helvetica, Avant Garde, sans-serif
axes.unicode_minus: False
```

然后把~/.matplotlib目录下的两个文件删除掉（缓存文件可以放心删）：

 rm -rf ~/.matplotlib/\* 

重启python，并引入字体

plt.rcParams\['font.sans-serif'\] = \['Arial Unicode MS'\]

即可解决中文及负号无法正常解决的问题。