---
title: "Leetcode283:移动零——双指针"
date: 2024-09-23T20:01:16+08:00
draft: false
categories: 
- 刷题
---

## 题目

给定一个数组 `nums`，编写一个函数将所有 `0` 移动到数组的末尾，同时保持非零元素的相对顺序。

**请注意** ，必须在不复制数组的情况下原地对数组进行操作。

**示例 1:**

```
输入: nums = [0,1,0,3,12]
输出: [1,3,12,0,0]
```

**示例 2:**

```
输入: nums = [0]
输出: [0]
```

## 官方题解

使用双指针，左指针指向当前已经处理好的序列的尾部，右指针指向待处理序列的头部。

右指针不断向右移动，每次右指针指向非零数，则将左右指针对应的数交换，同时左指针右移。

注意到以下性质：

左指针左边均为非零数；

右指针左边直到左指针处均为零。

因此每次交换，都是将左指针的零与右指针的非零数交换，且非零数的相对顺序并未改变。

代码

```
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int n = nums.size(), left = 0, right = 0;
        while (right < n) {
            if (nums[right]) {
                swap(nums[left], nums[right]);
                left++;
            }
            right++;
        }
    }
};
```

时间复杂度：O(n)，其中 n 为序列长度。每个位置至多被遍历两次。

空间复杂度：O(1)。只需要常数的空间存放若干变量。

## 我的题解

```
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int move_pos = 0;
        int cur_pos = 0;
        for(cur_pos=0; cur_pos < nums.size(); cur_pos++){
            if(nums[cur_pos]!=0){
                nums[move_pos] = nums[cur_pos];
                move_pos++;
            }
        }
        for(int i=nums.size()-1; i>=move_pos; i--){
            nums[i] = 0;
        }

    }
};
```

**整体思路**：

- 也采用双指针的思想，一个指针`move_pos`用于标记当前已经处理好的非零数字的位置，另一个指针`cur_pos`遍历整个数组。
- 首先，通过第一个循环，当遇到非零数字时，将其放置到`move_pos`位置，并将`move_pos`指针后移一位。这样就将所有非零数字依次排列在了数组的前面部分。
- 然后，通过第二个循环，从数组末尾开始，将从`move_pos`位置开始到数组末尾的元素都置为 0，从而实现将所有零移动到数组末尾，同时保持非零元素的相对顺序。

**时间复杂度**：第一个循环遍历了一次数组，时间复杂度为 O (n)，第二个循环也遍历了一部分数组，整体时间复杂度仍然是 O (n)，其中 n 为序列长度。
**空间复杂度**：只使用了几个额外的整数变量，空间复杂度为 O (1)。

