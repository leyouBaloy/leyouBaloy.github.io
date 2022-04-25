---
title: "Leetcode11:盛水最多的容器——双指针"
author: 孙百乐
date: 2022-04-25T17:26:41+08:00
draft: false
categories: 
- 刷题
---

## 题目

https://leetcode-cn.com/problems/container-with-most-water/

每次看题解：“我又会了！”

下一题：“我是废物。”

## 题解

### 双指针

定义两个指针`left`和`right`分别在最左边和最右边，指向两个柱子，那么面积肯定等于两柱子中最小的柱子乘上宽度。

求出面积后要移动指针，那么移动哪一个指针呢？当然是指向柱子中较矮的那个指针。因为如果移动高的珠子，宽度减小，而由于短板效应，高度仍取决于矮柱子，所以移动后的面积只减不增。

那如果两指针指向柱子的高度相同呢？那就两个指针一起向中间移动，原理同上。

代码：

```c++
class Solution {
public:
    int maxArea(vector<int>& height) {
        int max_area = 0;
        int left=0,right=height.size()-1;
        while(left<right){
            if(height[left]<height[right]){
                max_area = max(max_area, height[left]*(right-left));
                left++;
            }
            else if(height[left]>height[right]){
                max_area = max(max_area, height[right]*(right-left));
                right--;
            }
            else{
                max_area = max(max_area, height[left]*(right-left));
                left++;
                right--;
            }
        }
        return max_area;
    }
};
```

相比于暴力搜索，这种方法相当于是剪枝，把不可能的情况都嘎掉了。

时间复杂度O(n)，空间复杂度O(1)。
