---
title: "Leetcode695:岛屿的最大面积——中等难度的搜索算法"
author: 孙百乐
date: 2022-03-24T15:47:10+08:00
draft: false
categories: 
- 刷题
---

## 题目

https://leetcode-cn.com/problems/max-area-of-island/

leetcode的中等难度题对于我这种弱鸡来说确实花一点时间才能做出来。（即使是看了答案）和简单难度题相比，它的难点在于代码要注意很多细节。

## 题解

这道题相较于Leetcode994:腐烂的橘子，有哪些不一样呢？

* 994题给了你几个源点，而这题你需要从每个连通图里自己选择一个源点，才能进行搜索。
* 994题要统计的是轮数，而这题在搜索时你需要统计节点总共的数量。

解决方案：

* 初始时遍历整个图，一旦遇到岛屿就开始做搜索。为了避免重复搜索，可以把已搜索节点标为0。
* 带有返回值的递归。把整个递归过程看成一颗树，那么叶节点返回应该为1，其他节点返回应该是1+所有子节点。



![带有返回值的递归](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/img/带有返回值的递归.jpg)

上面这个图是我随手画的，只是便于理解，跟这个测试案例没啥关系😂。

上代码：

```c++
class Solution {
public:
    int get_area(vector<vector<int>>& grid, int i,int j){
        if(i<0 || i>grid.size()-1 || j<0 || j>grid[0].size()-1 || grid[i][j]==0){
            return 0;
        }
        grid[i][j] = 0;
        int ans = 1;
        vector<int> di = {0,0,1,-1};
        vector<int> dj = {1,-1,0,0};
        for(int x=0;x<4;x++){
            int next_i = i+di[x];
            int next_j = j+dj[x];
            ans += get_area(grid, next_i, next_j);
        }
        return ans;
    }

    int maxAreaOfIsland(vector<vector<int>>& grid) {
        int maxarea = 0;
        for(int i=0;i<grid.size();i++){
            for(int j=0;j<grid[0].size();j++){
                if(grid[i][j] == 1){
                    int area  = get_area(grid,i,j);
                    if(maxarea < area){
                        maxarea = area;
                    }
                }
            }
        }
        return maxarea;
    }
};
```

细节：

* 搜索一个节点的时候先判断传入的坐标是否越界，如果越界了，或者所搜索的节点是0，直接return 0;因为只有1才有必要进行下一步操作。
* ans这个变量就很关键了，先赋初值为0，再累加。结合上面的图思考。
* `di`和`dj`这两个数组的定义就是节省了代码，上一道搜索算法的题目我也是这样写的。
