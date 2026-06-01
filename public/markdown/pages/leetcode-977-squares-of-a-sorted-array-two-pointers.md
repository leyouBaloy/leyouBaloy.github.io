# Leetcode977:有序数组的平方——双指针

> 发布于：2022-03-23 | 分类：刷题 | 原文：https://leyoubaloy.github.io/post/leetcode-977-squares-of-a-sorted-array-two-pointers

## 题目

https://leetcode-cn.com/problems/squares-of-a-sorted-array/

## 题解

### 先平方再排序

```c++
class Solution {
public:
    vector<int> sortedSquares(vector<int>& nums) {
        for(int i=0;i<nums.size();i++){
            nums[i] = nums[i]*nums[i];
        }
        sort(nums.begin(),nums.end());
        return nums;

    }
};
```

没啥好说的，打败40%的用户😂

### 双指针

不难发现，一个一般的nums数组前面是负数后面是正数，nums数组平方后的最大值一是第一个元素或最后一个元素。所以在第一位和最后一位分别放两个指针`i`和`j`。

判断`if nums[i]*nums[i] > nums[j]*nums[j]`，则把`nums[i]*nums[i]`放到`res`数组最后一位，否则把`nums[j]*nums[j]`放到最后一位。然后往前移动`i`，或者往后移动`j`。

这里有个动画：[977.有序数组的平方.gif](https://code-thinking.cdn.bcebos.com/gifs/977.有序数组的平方.gif)

代码：

```c++
class Solution {
public:
    vector<int> sortedSquares(vector<int>& nums) {
        int i = 0;
        int j = nums.size()-1;
        int k = j;
        vector<int> res(nums.size());
        while(i<=j){
            if(nums[i]*nums[i] <= nums[j]*nums[j]){
                res[k--] = nums[j]*nums[j];
                j--;
            }else{
                res[k--] = nums[i]*nums[i];
                i++;
            }
        }
    return res;
    }
};
```

细节：

* 因为可能`i`和`j`所指的元素相等，所以判断里要加个等于
* while循环停止的条件，可以是`i<=j`，或许也可以是`k>=0`  ?
