---
title: "二叉树的层序遍历——太tm妙啦"
author: 孙百乐
date: 2022-03-11T17:57:18+08:00
draft: false
categories: 
- 刷题
---

## 题目

> 本题来自：https://leetcode-cn.com/problems/binary-tree-level-order-traversal/

#### [102. 二叉树的层序遍历]

难度中等1216收藏分享切换为英文接收动态反馈

给你二叉树的根节点 `root` ，返回其节点值的 **层序遍历** 。 （即逐层地，从左到右访问所有节点）。

 

**示例 1：**

![img](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/mypic/img/tree1.jpg)

```
输入：root = [3,9,20,null,null,15,7]
输出：[[3],[9,20],[15,7]]
```

**示例 2：**

```
输入：root = [1]
输出：[[1]]
```

**示例 3：**

```
输入：root = []
输出：[]
```

 

**提示：**

- 树中节点数目在范围 `[0, 2000]` 内
- `-1000 <= Node.val <= 1000`

## 题解

这道题的技术点有两个，一是把树状结构转化成数组结构，这个在数据结构里学过，用队列就可以轻松实现。二是要把这个二叉树分层，对于我来说这是一个难点。

我自己的思路是先实现第一步，在一维数组`vector<int> v`里储存一棵完全二叉树，然后用函数`get_n(int index)`确定下标为`index`的节点所在的层数。最后组织成提交所用的格式。

然鹅，我调了两个小时代码只过了11/34 qwq。

代码不能白写，先贴上：

```c++
// 错误代码
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
    int get_n(int index){
        int n = 1;
        while(pow(2,n)-2 < index){
            n++;
        }
        return n;
    }
    vector<vector<int>> levelOrder(TreeNode* root) {
        if(root==nullptr){
            return {};
        }
        vector<int> v;
        queue<TreeNode*> q;
        q.push(root);
        v.push_back(root->val);

        while(!q.empty()){
            TreeNode* node = q.front();
            q.pop();
            if(node->left){
                q.push(node->left);
                v.push_back((node->left)->val);
            }else{
                v.push_back(-1111);
            }
            if(node->right){
                q.push(node->right);
                v.push_back((node->right)->val);
            }else{
                v.push_back(-1111);
            }
        }
        int n=get_n(v.size()-1); //层数
        for(int i=0;i<v.size();i++){
            cout << v[i] << " ";
        }
        vector<vector<int>> res(n-1);
        for(int i=0;i<v.size()&&get_n(i)<n;i++){
                if(v[i]!=-1111){
                    res[get_n(i)-1].push_back(v[i]);
                }
            }

        return res;

    }
};
```

### 官方题解的骚操作

> 作者：LeetCode-Solution
> 链接：https://leetcode-cn.com/problems/binary-tree-level-order-traversal/solution/er-cha-shu-de-ceng-xu-bian-li-by-leetcode-solution/
> 来源：力扣（LeetCode）
> 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

**先看一种朴素的方法（虽然是“朴素”的方法，但也比我的方法要巧妙，它在进行广度优先搜索时就解决了层数的问题）**：

![image-20220311181248284](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/mypic/img/image-20220311181248284.png)

**然后针对这题，可以进行如下优化，概括来说就是每次拓展一层的节点（“拓展”这个词用的真好）**：

![image-20220311181308253](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/mypic/img/image-20220311181308253.png)



**数学证明，其实这个也很容易想通**：

![image-20220311181322717](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/mypic/img/image-20220311181322717.png)

**代码**：

```c++
class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector <vector <int>> ret;
        if (!root) {
            return ret;
        }

        queue <TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int currentLevelSize = q.size();
            ret.push_back(vector <int> ()); // 先往ret里压一个空vector
            for (int i = 1; i <= currentLevelSize; ++i) {
                auto node = q.front(); q.pop(); // q.fron()取第一个元素，q.pop()删除第一个元素
                ret.back().push_back(node->val); // ret.back()取到最后一个vector，再往里push_back
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
        }
        
        return ret;
    }
};
```

**复杂度分析**

记树上所有节点的个数为 n。

时间复杂度：每个点进队出队各一次，故渐进时间复杂度为 O(n)。
空间复杂度：队列中元素的个数不超过 n 个，故渐进空间复杂度为 O(n)。

**这代码写的也很beautiful啊，真是太tm妙啦！**

