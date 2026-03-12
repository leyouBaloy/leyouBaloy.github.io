---
title: "Leetcode240:搜索二维矩阵——二分、矩阵"
author: 孙百乐
date: 2022-03-19T17:55:44+08:00
draft: false
categories: 
- 刷题
---

## 题目

https://leetcode-cn.com/problems/search-a-2d-matrix-ii/

## 题解

### 法一：逐行二分

没啥好说的，代码可以参考一下

```c++
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        for (const auto& row: matrix) {
            auto it = lower_bound(row.begin(), row.end(), target);
            if (it != row.end() && *it == target) {
                return true;
            }
        }
        return false;
    }
};

作者：LeetCode-Solution
链接：https://leetcode-cn.com/problems/search-a-2d-matrix-ii/solution/sou-suo-er-wei-ju-zhen-ii-by-leetcode-so-9hcx/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

对一行使用二分查找时间复杂度O(logm)，对n行使用二分查找时间复杂度O(nlogm)。

### 法二：巧妙的利用性质

观察矩阵最右上角的元素：

* 它是所在行最大的元素
* 它是所在列最小的元素

这就有点像二分法了。对于一个目标数`target`，如果`target<matrix[row][col]`，则`target`一定不在第`col`列。如果`target>matrix[row][col]`，则它一定不在第`row`行。

所以我们只要判断`target`和`matrix[row][col]`的大小，就能排除某一行或某一列的所有元素。

上代码：

```c++
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int row = 0;
        int col = matrix[0].size()-1;
        while(row<matrix.size() && col>=0){
            if(target < matrix[row][col]){
                col--;
            }else if(target > matrix[row][col]){
                row++;
            }else{
                return true;
            }
        }
    return false;

    }
};
```

最多把所有的行和列都排除一遍，时间复杂度只有O(m+n)。这个方法很巧妙！

其实关注左下角的元素也是一样的：

* 它是所在行最小的元素
* 它是所在列最大的元素

明白了就不觉得难了。
