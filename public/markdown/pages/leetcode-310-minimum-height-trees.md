# Leetcode310:最小高度树

> 发布于：2022-04-06 | 分类：刷题 | 原文：https://leyoubaloy.github.io/post/leetcode-310-minimum-height-trees

# 题目

https://leetcode-cn.com/problems/minimum-height-trees/

这是一道理论性很强，代码也很有技巧性的“中等”难度题目。

# 题解

## 暴力法

献上我的超时代码：

```python
class Solution:
    def findMinHeightTrees(self, n: int, edges: List[List[int]]) -> List[int]:
        find = {}
        for edge in edges:
            if edge[0] in find.keys():
                find[edge[0]].append(edge[1])
            else:
                find[edge[0]] = [edge[1]]
            if edge[1] in find.keys():
                find[edge[1]].append(edge[0])
            else:
                find[edge[1]] = [edge[0]]
        if not len(find):
            return [0]
        def findlevel(edges, root):
            que = [root]
            used = []
            cnt = 0
            while(len(que)):
                # print(que)
                for i in range(len(que)):
                    root = que.pop(0)
                    used.append(root)
                    for f in find[root]:
                        if f not in used:
                            que.append(f)
                cnt+=1
            return cnt-1
        res_num = [findlevel(edges, root) for root in range(n)]
        min_num = min(res_num)
        return [i for i in range(len(res_num)) if res_num[i]==min_num]
```

## 广度优先搜索

有如下结论：

![最小高度树](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/mypic/img/%E6%9C%80%E5%B0%8F%E9%AB%98%E5%BA%A6%E6%A0%91.png)

用反证法证明，证明过程挺复杂的。

所以我们就把这题从寻找最短距离变成了寻找最长距离。然后把路径记录下来，路径的中点就是我们要找的根节点。

你不觉得这个结论很奇妙吗？我想到了一团乱的绳子，如果你从中间把这堆绳子拎起来，四周绳子的末梢就会垂下去...

这题代码我分段详解：

首先是第一段代码：

```python
g = [[] for _ in range(n)]
for x, y in edges:
  g[x].append(y)
  g[y].append(x)
parents = [0] * n
```

因为后面要在`edges`里面查找某个节点连接的另一个节点，所以这里第一步先是做了一个初始化，便于后面的查询。最后得到的结果是`g[x]=[a,b,c...]`，表示标号为`x`的节点，连接了a,b,c等节点。（在我的代码中也有类似处理，但我用的是字典）

第二段：

```python
def bfs(start: int):
  vis = [False] * n
  vis[start] = True
  q = deque([start])
  while q:
    x = q.popleft()
    for y in g[x]:
      if not vis[y]:
        vis[y] = True
        parents[y] = x
        q.append(y)
  return x
x = bfs(0)  # 找到与节点 0 最远的节点 x
y = bfs(x)  # 找到与节点 x 最远的节点 y
```

这是一个用队列实现的广度优先搜索。`vis`是记录已搜索过的节点。`deque`是双向队列（震惊！原来python也是有数据结构的，我才知道😂）。`parents`记录每个节点的父节点，用于下面找路径。

然后从0开始，找到最远节点x，再从x找最远节点y。那么x，y之间的距离就是最远的（这很奇妙）。

第三段：

```python
path = []
parents[x] = -1
while y != -1:
  path.append(y)
  y = parents[y]
  m = len(path)
return [path[m // 2]] if m % 2 else [path[m // 2 - 1], path[m // 2]]
```

在这里要找路径了，这时候`parents`就派上用场了。如果找到路径长度为奇数，那么正中间那个数就是我们要找的根节点。如果路径长度为偶数，中间的数有两个，那么两个都是我们要找的根节点。

## 其他解法

这题还有深度优先搜索（跟广度优先搜索差不多），拓扑序列，不断剔除度为1的节点等方法，我太懒了，不想研究了...
