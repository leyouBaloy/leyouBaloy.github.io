---
author: 孙百乐
categories:
- 刷题
date: 2020-10-19 15:10:44
draft: false
title: Python-一元二次方程，保留两位小数
---

【问题描述】一元二次方程：ax2+bx+c=0 （a ╪ 0）  
【输入形式】输入a、b和c的值（有理数）  
【输出形式】输出x的两个值，或者No（即没有有理数的解）  
【样例输入】1 2.5 3  
【样例输出】No  
【样例输入】1 -2 1  
【样例输出】1.00 1.00

【样例输出说明】输出的两个解保留两位小数，大的在前。

```
s = input()
numLst = s.split(' ')
resultLst = map(float,numLst)
a,b,c = resultLst

import math
delta = b**2-4*a*c
if delta < 0:
    print('No')
else:
    x1 = (-b+math.sqrt(delta))/(2*a)
    x2 = (-b-math.sqrt(delta))/(2*a)
    if x1 > x2:
        print("%.2f" % x1,"%.2f" % x2)
    else:
        print("%.2f" % x2,"%.2f" % x1)
```