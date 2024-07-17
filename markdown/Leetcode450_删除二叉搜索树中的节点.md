---
title: "Leetcode450:删除二叉搜索树中的节点"
author: 孙百乐
date: 2022-04-02T10:20:05+08:00
draft: false
categories: 
- 刷题
---

## 题目

https://leetcode-cn.com/problems/delete-node-in-a-bst/

这道题完全可以当作一个知识点来对待。

## 题解

### 思路

众所周知，一颗二叉搜索树的中序遍历是一个递增序列，这是二叉搜索树最基本的性质之一。

某个节点`node`的后继节点`successor`，就是中序遍历中仅次于`node`的后一个节点，是比`node`大的节点当中最小的节点。`node`的右子树中最左边那个节点就是`successor`。

某个节点`node`的前继节点`predecessor`，就是中序遍历中稍大于`node`的前一个节点，是比`node`小的节点当中最大的节点。`node`的左子树中最右边那个节点就是`successor`。

我们要维护这个性质，所以，当删除一个节点时，我们要拿这个节点的后继节点`successor`或者前继节点`predecessor`来替换它，然后递归的删除它的后继节点或者前继节点。比如删除[1,2,3,4,5]中的3，我们就拿4来替换它（或者拿2替换）。然后为了删除4，拿5来替换。5后面没有节点了，就直接删除5。

删除的时候可能有三种情况：

1. 要删除节点是叶节点。直接删除就好了。
2. 要删除的节点只有左子树，或者只有右子树。如果是左子树，就找前继节点替换；如果是右子树，就找后继节点替换。
3. 要删除的节点既有左子树又有右子树。前继，后继都可以。一般我们选择后继。

上面的描述比较易于理解，但为了写代码方便，我们稍作改变：

1. 要删除节点是叶节点。直接删除。
2. 要删除的节点有右子树，就拿后继替换。
3. 否则，拿左继替换。

### 代码

先看下ac的代码吧：

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def get_successor(self, node):
        node = node.right
        while node.left:
            node = node.left
        return node.val
      
    def get_predecessor(self, node):
        node = node.left
        while node.right:
            node = node.right
        return node.val
      
    def deleteNode(self, root: Optional[TreeNode], key: int) -> Optional[TreeNode]:
        if not root:
            return None
        if key > root.val:
            root.right = self.deleteNode(root.right, key)
        elif key < root.val:
            root.left = self.deleteNode(root.left, key)
        else:
            if (not root.left) and (not root.right):
                root = None
            elif root.right:
                root.val = self.get_successor(root)
                root.right = self.deleteNode(root.right, root.val) # 从root.right开始删除，
                # 如果从当前root删除，会死循环
            else:
                root.val = self.get_predecessor(root)
                root.left = self.deleteNode(root.left, root.val)
        return root
```

为什么非要优先找后继节点呢？其实你优先找前继节点也可以，把这段代码改成这样：

```python
            elif root.left:
                root.val = self.get_predecessor(root)
                root.left = self.deleteNode(root.left, root.val)
            else:
                root.val = self.get_successor(root)
                root.right = self.deleteNode(root.right, root.val)
```

为什么非要写成`root.left = xxx`，`root.right = xxx`呢？

我把`root.right = self.deleteNode(root.right, key)`改成`self.deleteNode(root.right, key)`；

以及后面三处的赋值语句都改成了直接递归，结果只和正确答案差了一点，就是在递归的末端的叶子节点当中`root=None`没有生效。也就是说叶子节点没有成功删除。

我猜想可能是因为python的引用传递有关，这条赋值语句修改的只是形参而不是实参，所以无效！

总之递归的代码好难写qwq，孩子根本想不到...



