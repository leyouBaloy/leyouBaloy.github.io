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

2025.03.09 又重新做了一次

## 题解

### 纯dfs

首先想到的办法，cur_path 记录当前路径，left_path 记录剩下可选择的元素。不用回溯，每次递归传参都是数组的复制，空间复杂度很大，但是时间复杂度和回溯法是相同的（应该）。

```python
class Solution:
    def recursion(self, left_path, cur_path):
        if len(cur_path) == self.size:
            self.res.append(cur_path)
            return
        else:
            for num in left_path:
                new_cur_path = cur_path.copy()
                new_cur_path.append(num)
                new_left_path = left_path.copy()
                new_left_path.remove(num)
                self.recursion(new_left_path, new_cur_path)
                
    def permute(self, nums: List[int]) -> List[List[int]]:
        self.size = len(nums)
        self.res = []
        self.recursion(nums, [])
        return self.res
```

### 回溯

直接在原有变量上操作，每次递归结束之后复原。可以节省空间。

```
class Solution:
    def recursion(self):
        if len(self.cur_path) == self.size:
            self.res.append(self.cur_path.copy())
            return
        else:
            for i in range(len(self.left_path)):
                deal_num = self.left_path[i]
                self.cur_path.append(deal_num)
                self.left_path.pop(i)
                self.recursion()
                self.cur_path.pop()
                self.left_path.insert(i, deal_num)
                
    def permute(self, nums: List[int]) -> List[List[int]]:
        self.size = len(nums)
        self.res = []
        self.cur_path = []
        self.left_path = nums
        self.recursion()
        return self.res
```

注意添加答案的时候要添加数组的复制，否则如果添加的是引用后续操作会影响前面添加的结果：self.res.append(self.cur_path.copy())

### 回溯模板

```
void backtracking(参数) {
    if (终止条件) {
        存放结果;
        return;
    }
    for (选择 : 本层集合中的元素) {
        处理节点;
        backtracking(路径, 选择列表); // 递归
        撤销处理; // 回溯
    }
}
```

### 交换、回溯

在前面做过的回溯题中，比如Leetcode17:电话号码的字母组合、Leetcode113:路径总和，我们都是用栈来维护储存路径的数组，但是在这题当中我们用交换的方法来维护，很巧妙啊！

有两个变量`first`和`i`。在每一次递归当中，`0～first`是已确定的路径，`i`是与`first`交换的数的位置。看下图：

{{< figure src="https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/mypic/img/fig14.PNG" >}}

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

