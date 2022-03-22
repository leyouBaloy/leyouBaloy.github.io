---
title: "Leetcode994:腐烂的橘子——多源广度优先搜索—有趣的题目"
author: 孙百乐
date: 2022-03-22T17:50:53+08:00
draft: false
categories: 
- 刷题
---

## 题目

https://leetcode-cn.com/problems/rotting-oranges/

这道题就接着733题做刚刚好。正好介于有点思路但又写不出来中间，属于够一够脚尖才能实现的目标。

## 题解

### 解题思路

这道题很明显要使用广度优先搜索，搜索的目标是每个腐烂橘子周围的新鲜橘子。相较于733题图像渲染来说，这道题由一个搜索源点变成了可能有多个源点。而且你得一轮一轮去搜索，并统计出搜索的轮数。

如果只用一个队列的话，难以区分队列中的烂橘子是在哪一轮烂掉的。所以本菜鸡突发奇想，用两个队列交替push。例如：第一轮把烂橘子push给que队列，第二轮push给newque队列，清空que队列，第三轮再push给que队列...以此类推。

官方题解只用了一个队列，它并不是在搜索时区分第几轮的。而是使用了一个dis[][]数组，记录了每一个橘子相较于上一个橘子腐烂时间+1。也非常巧妙。

### 代码

```c++
class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        vector<int> dx = {-1, 1, 0, 0};
        vector<int> dy = {0, 0, -1, 1};
        queue<pair<int,int>> que;
        queue<pair<int,int>> newque; // 定义了两个队列
        int maxrow = grid.size(); 
        int maxcol = grid[0].size();
        int fresh = 0; // 新鲜橘子
        // 先把坏橘子入队
        for(int i=0; i<maxrow; i++){
            for(int j=0;j<maxcol; j++){
                if(grid[i][j] == 2){
                    que.emplace(i,j);
                }else if(grid[i][j] == 1){
                    fresh += 1;
                }
            }
        }
        newque = que;
        int minute = 0;
        // 一轮一轮地搜索腐烂橘子四周的新鲜橘子
        while(!newque.empty()){
            minute += 1;
            que = newque;
            newque = queue<pair<int,int>>(); // 清空
            while(!que.empty()){
                pair<int,int> rot = que.front();que.pop();
                for(int i=0;i<4;i++){
                    int x = rot.first+dx[i];
                    int y = rot.second+dy[i];
                    if(x>=0 && x<maxrow && y>=0 && y<maxcol && grid[x][y]==1){
                        grid[x][y] = 2;
                        fresh -= 1;
                        newque.emplace(x,y);
                    }
                }
            }
        }
        
        if(fresh){return -1;} // 检查一下还有没有腐烂橘子
        return max(0,minute-1);
    }
};
```

看了下其他人的题解没有用我这种双队列方法的，哈哈，还特意发了个题解显摆一下，作者竟我自己



