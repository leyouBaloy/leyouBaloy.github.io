---
author: 孙百乐
categories:
- 刷题
date: 2020-10-11 16:11:03
draft: false
title: Python-洗牌算法
---

原理在这[https://www.bilibili.com/video/BV1k7411q7jo](https://www.bilibili.com/video/BV1k7411q7jo)

## 倒序写法

```
import random
def shuffle(lis):
    for i in range(len(lis) -1,0,-1):
        p = random.randrange(0,i+1)
        lis[i],lis[p] = lis[p],lis[i]
    return lis
```

*   这里在random库下定义了一个函数shuffle
*   之所以是i+1是因为random.randrange()是左闭右开的，不包括i+1

```
lst = [1,2,2,3,3,4,5,10]
random.shuffle(lst)
print(lst)
```

*   每次运行这段代码结果应该都是不一样的

## 正序写法

```
import random
def shuffle(lis):
    for i in range(0,len(lis) -1,1):
        p = random.randrange(i,len(lis)+1)
        lis[i],lis[p] = lis[p],lis[i]
    return lis
```

```
lst = [1,2,2,3,3,4,5,10]
random.shuffle(lst)
print(lst)
```

### 实际上在random库中本事提供了这样的函数

这样直接写也是可以的

```
import random
lst = [1,2,2,3,3,4,5,10]
random.shuffle(lst)
print(lst)
```