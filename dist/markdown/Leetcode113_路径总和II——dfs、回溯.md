---
title: "Leetcode113:路径总和——dfs、回溯"
author: 孙百乐
date: 2022-03-30T19:19:10+08:00
draft: false
categories: 
- 刷题
---

## 题目

https://leetcode-cn.com/problems/path-sum-ii/

## 题解

### dfs无回溯

我们用深度优先搜索，在搜索时把当前路径记录下来为`nums`。如果满足

1. `sum(nums)==targetSum`；
2. 该节点是叶节点；

就记录下这个路径。搜索完成后，我们就能把所有满足条件的路径找出来了。

代码的总体框架就是一个深度优先搜索，在这个框架的基础上修改使其符合题意。这是写代码的思路。下面是自己写的代码：

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> List[List[int]]:
        if not root:
            return []
        res = []
        nums = []
        
        def backtracking(nums, node):
            nums.append(node.val)
            # print(nums)
            if sum(nums)==targetSum and not node.left and not node.right:
                res.append(nums.copy())
            if node.left:
                backtracking(nums.copy(), node.left)
            if node.right:
                backtracking(nums.copy(), node.right)
                
        backtracking(nums, root)
        return res
```

细节：

* 在往下递归是我传的参数不是`nums`的引用，而是复制了一个`nums`传给下一个函数。因此在做每一步递归时都有专属于它的一个`nums`，所以这段代码没有用到回溯。占用空间也比较大。
* 上面一点很重要！

### dfs、回溯

如果把`nums.copy()`改成`nums`，然后在backtracking()的末尾加上`nums.pop()`，就是回溯了。

这样的话，传递的就是`nums`的引用，所有的递归过程用的都是同一个`nums`。在每次递归结束，往上回溯的时候通过`pop()`删去`nums`中最后一个元素。

```python
class Solution:
    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> List[List[int]]:
        if not root:
            return []
        res = []
        nums = []
        def backtracking(nums, node):
            nums.append(node.val)
            # print(nums)
            if sum(nums)==targetSum and not node.left and not node.right:
                res.append(nums.copy())
            if node.left:
                backtracking(nums, node.left)
            if node.right:
                backtracking(nums, node.right)
            nums.pop()
        backtracking(nums, root)

        return res
```

把这段代码跟Leetcode78题放在一起看，发现都是在合适的位置加一个pop()，这其实是回溯的重要特点。

时间和空间复杂度：不会算...

### 记录父节点、bfs

还有个很聪明的做法，就是用一个哈希表来每一个节点的父节点。这样，不用记录路径，只记录累加和。每找到一个满足条件的叶节点，就从该节点出发向父节点迭代，还原路径。

代码在官方题解～



