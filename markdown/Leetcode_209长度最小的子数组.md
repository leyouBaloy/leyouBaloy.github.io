---
categories:
- 刷题
date: 2024-11-21 13:28:00
title: Leetcode_209长度最小的子数组——滑动窗口
img: 
---

# Leetcode_209长度最小的子数组

给定一个含有 `n` 个正整数的数组和一个正整数 `target` **。**

找出该数组中满足其总和大于等于 `target` 的长度最小的 **子数组**

`[numsl, numsl+1, ..., numsr-1, numsr]` ，并返回其长度**。**如果不存在符合条件的子数组，返回 `0` 。

**示例 1：**

```
输入：target = 7, nums = [2,3,1,2,4,3]
输出：2
解释：子数组 [4,3] 是该条件下的长度最小的子数组。
```

**示例 2：**

```
输入：target = 4, nums = [1,4,4]
输出：1
```

**示例 3：**

```
输入：target = 11, nums = [1,1,1,1,1,1,1,1]
输出：0
```

# 题解

```
class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int left = 0;
        int right = 1;
        if(nums[0]>=target){
            return 1;
        }
        int sum = nums[left];
        int min_con = nums.size()+1;
        for(;right<nums.size();right++){
            sum += nums[right];
            while(sum>=target && left<=right){
                if(right-left+1<min_con){
                    min_con = right-left+1;
                    cout << "min: " << min_con << " left: " << nums[left] << endl;
                }
                if(sum-nums[left]>=target){
                    sum = sum-nums[left];
                    left++;
                    if(right-left+1<min_con){
                    min_con = right-left+1;
                    cout << "min: " << min_con << "left: " << nums[left] << endl;
                }
                }else{
                    break;
                }
            }
            
        }
        if(min_con==nums.size()+1){
            return 0;
        }
        return min_con;
        
    }
};
```

这题的核心思想是滑动窗口，窗口右端把所有可能都遍历一遍（for循环），左端则需要不断地缩小以找到最优解（while循环）。

我自己的代码是适合我自己理解的。官方题解虽然简洁，我是真理解不了细节。

最讨厌这种需要处理很多细节的问题，我是大老粗，整不来这些。

