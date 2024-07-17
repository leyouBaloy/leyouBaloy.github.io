---
title: "Leetcode16:最接近的三数之和——排序、双指针"
author: 孙百乐
date: 2022-04-26T18:58:23+08:00
draft: false
categories: 
- 刷题
---

## 题目

https://leetcode-cn.com/problems/3sum-closest/

## 题解

### 排序+双指针

这道题的官方题解写的太好了：https://leetcode-cn.com/problems/3sum-closest/solution/zui-jie-jin-de-san-shu-zhi-he-by-leetcode-solution/

我总结一下：

思路是在暴力搜索枚举`i`，`j`，`k`	三个指针的基础上发展来的。首先要对数组进行排序，因为：

* 不排序的话，数组没有规律，只能暴力搜索，没有可操作空间。
* 排序完就可以在搜索过程中优化，相当于剪枝。

以升序为例，排完序后先枚举`i`，对于剩下的`j`和`k`，令`j=i+1`，`k=nums.size()-1`：

* 如果三数之和 > target，则左移`k`。
* 如果三数之和 < target，则右移`j`
* 如果三数之和 = target，直接返回target。



代码：

```c++
class Solution {
public:
    int threeSumClosest(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        int res=nums[0]+nums[1]+nums[2];
        for(int i=0;i<nums.size()-2;i++){
            int j=i+1, k=nums.size()-1;
            while(j<k){
                int cur_sum = nums[i]+nums[j]+nums[k];
                if(abs(cur_sum-target)<abs(res-target)){
                    res = cur_sum;
                }
                if(cur_sum<target){
                    j++;
                }
                else if(cur_sum>target){
                    k--;
                }
                else{
                    return cur_sum;
                }
            }
        }
        return res;
    }
};
```

时间复杂度O(N^2)，空间复杂度O(logN)，主要为排序的空间。
