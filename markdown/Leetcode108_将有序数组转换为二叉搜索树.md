---
title: "Leetcode108:将有序数组转换为二叉搜索树"
author: 孙百乐
date: 2022-03-25T15:36:05+08:00
draft: false
categories: 
- 刷题
---

## 题目

从今天开始多做一点关于数据结构“树”的题目。

https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/

## 题解

### 知识点：二叉搜索树

定义很简单：

- 若其左子树存在，则其左子树中每个节点的值都不大于该节点值；
- 若其右子树存在，则其右子树中每个节点的值都不小于该节点值。

{{< figure src="https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/mypic/img/webp" >}}

性质：

* 二叉搜索树中序遍历的结果是一个递增序列

### 递归法构造二叉搜索树

本题要求构造一棵`平衡`的二叉搜索树，所以我们要尽可能把数值大小处于中间的元素放在根节点。假设有一段从`i`到`j`的序列，如果序列的长度是奇数，根节点就是中间那个数，也就是第`(i+j)/2`个数；如果数组的长度是偶数，那也无妨，我们把中间偏左的元素作为根节点，仍然是第`(i+j)/2`个数（整除） 。然后把中间数左边的序列按照同样的方法构造成左子树，右边的序列构造成右子树，递归的这么构造下去即可。

比如`nums = [-10,-3,0,5,9]`，先选择0作为根节点，然后0左边的序列`[-10,-3]`构成左子树，0右边的序列`[5,9]`构成右子树。

递归这种东西，不会的时候觉得很难，会了之后就不觉得难了。请看代码：

```c++
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    TreeNode* sortedArrayToBST(vector<int>& nums) {
        return helper(nums, 0, nums.size()-1);
    }
    TreeNode* helper(vector<int>& nums, int left, int right){
        // 递归的终止条件
        if(left > right){ 
            return nullptr;
        }
        // 选择中间或中间左边的数为根节点
        int mid = (left+right)/2;
        TreeNode* root = new TreeNode(nums[mid]);
        root->left = helper(nums, left, mid-1);
        root->right = helper(nums, mid+1, right);
        return root;
    }
};
```

细节：

* 递归终止的条件是`left > right`，此时已经没有序列可以构成子树了，所以子节点为`nullptr`。

另外，不一定非要把中间偏左的元素作为根节点，选择中间偏右的元素也是可以的。



