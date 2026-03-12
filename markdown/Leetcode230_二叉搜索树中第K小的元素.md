---
title: "Leetcode230:二叉搜索树中第K小的元素"
author: 孙百乐
date: 2022-04-04T15:26:44+08:00
draft: false
categories: 
- 刷题
---

# 题目

https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst/

这是一道可拓展性很高的题目

# 题解

### 中序遍历递归法

最朴素的想法就是先中序遍历得到递增序列，然后返回序列的第`k-1`个元素。

可是我们只需要第`k`个元素，不用把所有元素都遍历完再返回结果，那么如何优化呢？

那就让它遍历到第k个元素时就终止递归，返回结果呗。但是递归不是想终止就终止的，它会有“惯性”～

比如下面的代码：

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        nums = []
        def inorder(root):
            if (not root) or (len(nums)>k):
                return
            if root.left:
                inorder(root.left)
            nums.append(root.val)
            if root.right:
                inorder(root.right)
        inorder(root)
        print(nums)
        return nums[k-1]
```

对于k=1，我们想让`len(nums)>1`时就终止，实际上它一直运行到了`nums=3`。所以这种解法不够优雅。

### 中序遍历迭代法

中序遍历还有一个用栈实现的迭代法，其代码如下：

```python
stack = []
while root or stack:
  while root:
    stack.append(root)
    root = root.left
root = stack.pop()
root = root.right
```

迭代法相比递归法的优势就是随时可以终止，只需加上两句就可以啦。下面是完整代码：

```python
class Solution:
    def kthSmallest(self, root: TreeNode, k: int) -> int:
        stack = []
        while root or stack:
            while root:
                stack.append(root)
                root = root.left
            root = stack.pop()
            k -= 1
            if k == 0:
                return root.val
            root = root.right
```

时间复杂度：O(H+k)；空间复杂度：O(H)

### 记录子树的节点

这个方法适用于频繁地查找第k个最小的值。

<img src="https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/mypic/img/image-20220404154420485.png" alt="image-20220404154420485" style="zoom: 50%;" />

> 作者：LeetCode-Solution
> 链接：https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst/solution/er-cha-sou-suo-shu-zhong-di-kxiao-de-yua-8o07/
> 来源：力扣（LeetCode）
> 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
