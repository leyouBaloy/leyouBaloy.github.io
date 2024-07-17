---
title: "Leetcode105:从前序与中序遍历序列构造二叉树"
author: 孙百乐
date: 2022-03-26T17:02:51+08:00
draft: false
categories: 
- 刷题
---

## 题目

https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/

上数据结构这门课时研究过这个问题，思路很快就有，难在debug

## 题解

### 递归法

众所周知，只有前序遍历或中序遍历的结果是推演不出原树的。但是前序遍历+中序遍历可以推演出来。因为它们包含的信息特征不同，可以互补。

前序遍历得到的结果形式可以表示为这样：`[ 根节点, [左子树的前序遍历结果], [右子树的前序遍历结果] ]`

中序遍历得到的结果形式可以表示为这样：`[ [左子树的中序遍历结果], 根节点, [右子树的中序遍历结果] ]`

所以说，由前序遍历数组的第一个元素可以确定根节点，然后在中序遍历中找到根节点的位置，这个位置左边是左子树，右边是右子树。递归的这么推演下去，就能把整颗树构造出来啦。

举个例子吧：比如`preorder = [3,9,20,15,7]`, `inorder = [9,3,15,20,7]`。那么首先确定的根节点是`preorder[0]`，即为`3`。然后把`inorder`劈成两半，一半是3左边的`left_inorder=[9]`，另一半是3右边的`right_inorder=[15,20,7]`。再把`preorder`劈成两半，`left_preorder=[9]`和`right_preorder=[20,15,7]`。

分别把`left_preorder`和`left_inorder`作为参数向左构造子树，把`right_preorder`和`right_inorder`作为参数向右构造子树。递归下去。

因为python的数组切片比较好用，所以这题就用了python：

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:

    def buildTree(self, preorder: List[int], inorder: List[int]) -> TreeNode:

        def bt(preorder, inorder, node):
            node.val = preorder[0]
            left_inorder = inorder[0:inorder.index(preorder[0])]
            left_preorder = preorder[1:len(left_inorder)+1]
            right_inorder = inorder[inorder.index(preorder[0])+1:]
            right_preorder = preorder[len(left_inorder)+1:]
            if len(left_preorder)==1:
                node.left = TreeNode(left_preorder[0],None,None)
            elif len(left_preorder)==0:
                node.left = None
            else:
                node.left = TreeNode()
                bt(left_preorder,left_inorder,node.left)

            if len(right_preorder)==1:
                node.right = TreeNode(right_preorder[0],None,None)
            elif len(right_preorder)==0:
                node.right = None
            else:
                node.right = TreeNode()
                bt(right_preorder,right_inorder,node.right)
            

        root = TreeNode()
        bt(preorder,inorder,root)
        return root
```



细节

* 先确定`left_inorder`，因为`left_inorder`和`left_preorder`的长度应该相同，所以由它的`长度`可以确定`left_preorder`。`right_inorder`和`right_preorder`同理。
* 如果order数组为的长度为1，说明下一个节点是叶节点，后面就不用继续构造下去了。
* 如果order数组为的长度为0，即为`[]`，说明当前节点是叶节点，直接令下一个节点为None。

### 改进

```python
left_inorder = inorder[0:inorder.index(preorder[0])]
right_inorder = inorder[inorder.index(preorder[0])+1:]
```

这两段代码在`preorder`中搜索根节点要花费很多时间，我们在一开始就创建一个哈希表储存每个数的索引，这样搜索时间就是O(1)了。

另外官方题解并没有把数组切片，而是传了指针的位置。

官方题解做法python：

```python
class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> TreeNode:
        def myBuildTree(preorder_left: int, preorder_right: int, inorder_left: int, inorder_right: int):
            if preorder_left > preorder_right:
                return None
            
            # 前序遍历中的第一个节点就是根节点
            preorder_root = preorder_left
            # 在中序遍历中定位根节点
            inorder_root = index[preorder[preorder_root]]
            
            # 先把根节点建立出来
            root = TreeNode(preorder[preorder_root])
            # 得到左子树中的节点数目
            size_left_subtree = inorder_root - inorder_left
            # 递归地构造左子树，并连接到根节点
            # 先序遍历中「从 左边界+1 开始的 size_left_subtree」个元素就对应了中序遍历中「从 左边界 开始到 根节点定位-1」的元素
            root.left = myBuildTree(preorder_left + 1, preorder_left + size_left_subtree, inorder_left, inorder_root - 1)
            # 递归地构造右子树，并连接到根节点
            # 先序遍历中「从 左边界+1+左子树节点数目 开始到 右边界」的元素就对应了中序遍历中「从 根节点定位+1 到 右边界」的元素
            root.right = myBuildTree(preorder_left + size_left_subtree + 1, preorder_right, inorder_root + 1, inorder_right)
            return root
        
        n = len(preorder)
        # 构造哈希映射，帮助我们快速定位根节点
        index = {element: i for i, element in enumerate(inorder)}
        return myBuildTree(0, n - 1, 0, n - 1)

作者：LeetCode-Solution
链接：https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/solution/cong-qian-xu-yu-zhong-xu-bian-li-xu-lie-gou-zao-9/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

官方题解的c++代码，学习一下：

```c++
class Solution {
private:
    unordered_map<int, int> index;

public:
    TreeNode* myBuildTree(const vector<int>& preorder, const vector<int>& inorder, int preorder_left, int preorder_right, int inorder_left, int inorder_right) {
        if (preorder_left > preorder_right) {
            return nullptr;
        }
        
        // 前序遍历中的第一个节点就是根节点
        int preorder_root = preorder_left;
        // 在中序遍历中定位根节点
        int inorder_root = index[preorder[preorder_root]];
        
        // 先把根节点建立出来
        TreeNode* root = new TreeNode(preorder[preorder_root]);
        // 得到左子树中的节点数目
        int size_left_subtree = inorder_root - inorder_left;
        // 递归地构造左子树，并连接到根节点
        // 先序遍历中「从 左边界+1 开始的 size_left_subtree」个元素就对应了中序遍历中「从 左边界 开始到 根节点定位-1」的元素
        root->left = myBuildTree(preorder, inorder, preorder_left + 1, preorder_left + size_left_subtree, inorder_left, inorder_root - 1);
        // 递归地构造右子树，并连接到根节点
        // 先序遍历中「从 左边界+1+左子树节点数目 开始到 右边界」的元素就对应了中序遍历中「从 根节点定位+1 到 右边界」的元素
        root->right = myBuildTree(preorder, inorder, preorder_left + size_left_subtree + 1, preorder_right, inorder_root + 1, inorder_right);
        return root;
    }

    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        int n = preorder.size();
        // 构造哈希映射，帮助我们快速定位根节点
        for (int i = 0; i < n; ++i) {
            index[inorder[i]] = i;
        }
        return myBuildTree(preorder, inorder, 0, n - 1, 0, n - 1);
    }
};

作者：LeetCode-Solution
链接：https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/solution/cong-qian-xu-yu-zhong-xu-bian-li-xu-lie-gou-zao-9/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

### 感想

解决树的问题，代码复杂度明显要高一点。以后我会更多使用较为熟悉方便的python而不是c++。
