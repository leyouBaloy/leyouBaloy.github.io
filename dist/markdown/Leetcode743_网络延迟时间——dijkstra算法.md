---
title: "Leetcode743:网络延迟时间——dijkstra算法"
author: 孙百乐
date: 2022-04-21T17:35:07+08:00
draft: false
categories: 
- 刷题
---

## 题目

https://leetcode-cn.com/problems/network-delay-time/

关于最短路径dijkstra算法，学了很多遍，每次学的都不深，所以学完就忘，代码肯定更是写不出来。今天再学一次。

## 题解

关于dijkstra算法具体内容就不在这里细说了，网上一大堆，这里主要关注代码。

### 代码

```python
class Solution:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        g = [[float('inf')]*n for _ in range(n)]
        for x, y, time in times:
            g[x-1][y-1] = time

        dist = [float('inf')] * n
        dist[k-1] = 0
        used = [False] * n
        for _ in range(n):
            x = -1
            for y, u in enumerate(used):
                if not u and (x == -1 or dist[y] < dist[x]):
                    x = y
            used[x] = True
            for y,time in enumerate(g[x]):
                dist[y] = min(dist[y], dist[x]+time)
        ans = max(dist)
        return ans if ans < float('inf') else -1
```

### 代码详解

`g[][]`：用`邻接矩阵`来储存这个图。`g[x][y]`表示从节点`x`到节点`y`的距离。如果不能到达，储存距离为无穷大。注意这段代码中把所有的节点都-1，这只是表示方式的问题，不重要。

这段代码就是在构建`g`：

```python
g = [[float('inf')]*n for _ in range(n)]
for x, y, time in times:
  g[x-1][y-1] = time
```

`dist[]`：`dist[i]`表示从起点`k`到节点`i`的最短距离（当前已知）。赋初值为无穷大。

`used[]`：记录算法运行时使用过的节点。初值是把起始节点赋值为True，其余False。

```python
for y, u in enumerate(used):
  if not u and (x == -1 or dist[y] < dist[x]):
    x = y
  used[x] = True
```

上面这段代码，每次从「未确定节点」中取一个与起点距离最短的点，将它归类为「已确定节点」，并用它「更新」从起点到其他所有「未确定节点」的距离。直到所有点都被归类为「已确定节点」。`x`就是要找的那个已确定节点，第一次x=k。

```python
for y,time in enumerate(g[x]):
	dist[y] = min(dist[y], dist[x]+time)
```

用节点 A「更新」节点 B 的意思是，用起点到节点 A 的最短路长度加上从节点 A 到节点 B 的边的长度，去比较起点到节点 B 的最短路长度，如果前者小于后者，就用前者更新后者。这种操作也被叫做「松弛」。这里节点A就是`x`，节点B就是`y`。

最后根据这题的要求，找`dist[]`里最大的返回就行了。

时间复杂度：O(n^2+m)，其中 m 是数组times 的长度。

空间复杂度：O(n^2)。邻接矩阵需占用 O(n^2)的空间。

dijkstra算法的时间复杂度为O(n^2)



###  用小根堆优化

可以使用一个小根堆来寻找「未确定节点」中与起点距离最近的点。

这个具体就不研究了，能把基本算法搞明白就不错了😂。





