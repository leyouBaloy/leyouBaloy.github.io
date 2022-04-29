---
title: "Leetcode46:全排列——交换、回溯"
author: 孙百乐
date: 2022-04-29T17:22:24+08:00
draft: false
categories: 
- 刷题
---

## 题目

https://leetcode-cn.com/problems/permutations/

全排列问题也是比较经典的问题，其所用的交换法也很巧妙。

## 题解

### 纯dfs

首先想到的办法，不用回溯，每次递归传参都是数组的复制，空间复杂度很大，但是时间复杂度和回溯法是相同的（应该）。

```python
class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        path = []
        res = []
        size = len(nums)
        def recursion(leftnums,path):
            if len(path)==size:
                res.append(path)
            else:
                for num in leftnums:
                    new_path = path.copy()
                    new_path.append(num)
                    new_leftnums = leftnums.copy()
                    new_leftnums.remove(num)
                    recursion(new_leftnums, new_path)
        recursion(nums, path)
        return res
```



### 交换、回溯

在前面做过的回溯题中，比如Leetcode17:电话号码的字母组合、Leetcode113:路径总和，我们都是用栈来维护储存路径的数组，但是在这题当中我们用交换的方法来维护，很巧妙啊！

有两个变量`first`和`i`。在每一次递归当中，`0～first`是已确定的路径，`i`是与`first`交换的数的位置。看下图：

{{< figure src="https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/img/fig14.PNG" >}}

代码（c++的stl里有swap函数，写出的代码更简洁）

```c++
class Solution {
public:
    void backtrack(vector<vector<int>>& res, vector<int>& output, int first, int len){
        if(first==len){
            res.emplace_back(output);
            return;
        }
        for(int i=first;i<len;i++){
            // 动态维护数组
            swap(output[i], output[first]);
            // 继续递归填下一个数
            backtrack(res, output, first+1, len);
            // 撤销操作
            swap(output[i], output[first]);
        }
    }
    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> res;
        backtrack(res, nums, 0, (int)nums.size());
        return res;
    }
};
```

