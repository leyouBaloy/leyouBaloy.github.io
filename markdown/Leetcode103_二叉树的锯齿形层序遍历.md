---
title: "Leetcode103:二叉树的锯齿形层序遍历"
author: 孙百乐
date: 2022-03-27T19:36:29+08:00
draft: false
categories: 
- 刷题
---

## 题目

https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/

做过102题后这题可以轻松做出来

## 题解

复习一下`[102. 二叉树的层序遍历]`：

* 首先根节点入队
* 当队列不为空：

* * 求队列长度s
  * 依次从队列中取s个元素拓展，然后进入下一次迭代

得到层序遍历结果后，把奇数层reverse一下，就能ac了

代码：

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def zigzagLevelOrder(self, root: TreeNode) -> List[List[int]]:
        res = []
        if not root:
            return res
        queue = [root]
        while len(queue):
            inner = []
            for i in range(len(queue)):
                node = queue.pop()
                inner.append(node.val)
                if node.left:
                    queue.insert(0,node.left)
                if node.right:
                    queue.insert(0,node.right)
            res.append(inner.copy())
        for i in range(len(res)):
            if i%2:
                res[i].reverse()
        return res
```

其实这题想让我们用一种数据结构`deque双端队列`。对于偶数层的节点，从后端插入元素；对于奇数层的节点，从前端插入元素。

我个人觉得并不比朴素的方法优秀很多，所以就不深入研究了哈哈。（其实是懒



