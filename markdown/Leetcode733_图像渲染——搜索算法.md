---
title: "Leetcode733:图像渲染——搜索算法"
author: 孙百乐
date: 2022-03-21T18:27:50+08:00
draft: false
categories: 
- 刷题
---

## 题目

https://leetcode-cn.com/problems/flood-fill/

美好的一天从一道简单题开始～

## 题解

理解题意后，发现这不就是windows自带画图工具里的`油漆桶`吗？

### 深度优先搜索

众所周知，深度优先搜索可以用`栈`实现，而`递归`本质上就是栈。所以直接上递归代码：

```c++
class Solution {
public:
    void fill(vector<vector<int>>& image, int currcolor, int newColor, int sr, int sc){
        image[sr][sc] = newColor;
        if(sr>0 && image[sr-1][sc]==currcolor){
            fill(image, currcolor, newColor, sr-1, sc);
        }
        if(sr<image.size()-1 && image[sr+1][sc]==currcolor){
            fill(image, currcolor, newColor, sr+1, sc);
        }
        if(sc>0 && image[sr][sc-1]==currcolor){
            fill(image, currcolor, newColor, sr, sc-1);
        }
        if(sc<image[0].size()-1 && image[sr][sc+1]==currcolor){
            fill(image, currcolor, newColor, sr, sc+1);
        }
    }
    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int newColor) {
        int currcolor = image[sr][sc];
        fill(image, currcolor, newColor, sr, sc);
        return image;

    }

};
```

五分钟敲完，提交，嘿嘿，有趣的题目～

等等，咋提示栈溢出了呢？

看了下测试用例。嗷嗷，原来有一个情况没考虑到：

当所要修改的颜色和它本身的颜色一样时，这个代码会无穷无尽的拓展下去。好家伙，原来栈溢出就是这么回事呀！

所以我加了一个判断：

```c++
class Solution {
public:
    void fill(vector<vector<int>>& image, int currcolor, int newColor, int sr, int sc){
        if(image[sr][sc]==newColor){ // 在这里加了一个判断，如果newcolor等于现有颜色，直接退出。
            return;
        }else{
            image[sr][sc] = newColor;
        }
        if(sr>0 && image[sr-1][sc]==currcolor){
            fill(image, currcolor, newColor, sr-1, sc);
        }
        if(sr<image.size()-1 && image[sr+1][sc]==currcolor){
            fill(image, currcolor, newColor, sr+1, sc);
        }
        if(sc>0 && image[sr][sc-1]==currcolor){
            fill(image, currcolor, newColor, sr, sc-1);
        }
        if(sc<image[0].size()-1 && image[sr][sc+1]==currcolor){
            fill(image, currcolor, newColor, sr, sc+1);
        }
    }
    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int newColor) {
        int currcolor = image[sr][sc];
        fill(image, currcolor, newColor, sr, sc);
        return image;

    }

};
```

官方题解的代码跟我的代码思路一样，但它的要更简洁一点。值得学习！：

```c++
class Solution {
public:
    const int dx[4] = {1, 0, 0, -1};
    const int dy[4] = {0, 1, -1, 0};
    void dfs(vector<vector<int>>& image, int x, int y, int color, int newColor) {
        if (image[x][y] == color) {
            image[x][y] = newColor;
            for (int i = 0; i < 4; i++) {
                int mx = x + dx[i], my = y + dy[i];
                if (mx >= 0 && mx < image.size() && my >= 0 && my < image[0].size()) {
                    dfs(image, mx, my, color, newColor);
                }
            }
        }
    }

    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int newColor) {
        int currColor = image[sr][sc];
        if (currColor != newColor) {
            dfs(image, sr, sc, currColor, newColor);
        }
        return image;
    }
};

作者：LeetCode-Solution
链接：https://leetcode-cn.com/problems/flood-fill/solution/tu-xiang-xuan-ran-by-leetcode-solution/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

时间复杂度O(m*n)，最坏需要遍历所有方格。

空间复杂度O(m*n)，栈的空间开销蛮大。

### 广度优先搜索

众所周知，实现广度优先搜索需要用到`队列`。

懒得写了，看一看官方题解：

```c++
class Solution {
public:
    const int dx[4] = {1, 0, 0, -1};
    const int dy[4] = {0, 1, -1, 0};
    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int newColor) {
        int currColor = image[sr][sc];
        if (currColor == newColor) return image;
        int n = image.size(), m = image[0].size();
        queue<pair<int, int>> que;
        que.emplace(sr, sc);
        image[sr][sc] = newColor;
        while (!que.empty()) {
            int x = que.front().first, y = que.front().second;
            que.pop();
            for (int i = 0; i < 4; i++) {
                int mx = x + dx[i], my = y + dy[i];
                if (mx >= 0 && mx < n && my >= 0 && my < m && image[mx][my] == currColor) {
                    que.emplace(mx, my);
                    image[mx][my] = newColor;
                }
            }
        }
        return image;
    }
};

作者：LeetCode-Solution
链接：https://leetcode-cn.com/problems/flood-fill/solution/tu-xiang-xuan-ran-by-leetcode-solution/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

复杂度分析同深度优先搜索。

别搞混了：

| 广度优先搜索 | 深度优先搜索 |
| ------------ | ------------ |
| 队列         | 栈           |

