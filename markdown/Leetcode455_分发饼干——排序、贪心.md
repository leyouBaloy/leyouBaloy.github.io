---
title: "Leetcode455:分发饼干——排序、贪心"
author: 孙百乐
date: 2022-03-18T16:01:16+08:00
draft: false
categories: 
- 刷题
---

## 题目

https://leetcode-cn.com/problems/assign-cookies/

## 题解

为了满足更多的孩子，应该把孩子的胃口从小到大排序，尽量先满足胃口小的孩子。（因为如果胃口小的孩子都满足不了，肯定也满足不了胃口大的孩子）

然后对于每个胃口小的孩子，找到一个能刚好满足他的饼干。

思路很简单，我是个菜鸡，看了题解才想出来qwq

这是我第一次写的代码：

```c++
class Solution {
public:
    int findContentChildren(vector<int>& g, vector<int>& s) {
        sort(g.begin(),g.end());
        sort(s.begin(),s.end());
        int cnt = 0;

        for(int i=0;i<g.size();i++){
            for(int j=0;j<s.size();j++){
                if(s[j]>=g[i]){
                    cnt+=1;
                    s[j]=0;
                    break;
                }
            }
        }
        return cnt;
        

    }
};
```

`i`和`j`分别是孩子和饼干的指针，由于`j`指针有回溯，所以效率很低。776ms

改进一下：

```c++
class Solution {
public:
    int findContentChildren(vector<int>& g, vector<int>& s) {
        sort(g.begin(),g.end());
        sort(s.begin(),s.end());
        int cnt = 0;
        int j = 0;
        for(int i=0;i<g.size();i++){
            while(j<s.size()){
                if(s[j]>=g[i]){
                    cnt++;
                    s[j]=0;
                    break;
                }else{
                    j++;
                }
            }
        }
        return cnt;
        

    }
};
```

如果饼干不能满足小胃口的孩子，那么大胃口的孩子肯定也满足不了。不让`j`指针回溯，效率一下子提上来了，20ms



时间复杂度：O(mlogm+nlogn)主要是排序的时间复杂度。

空间复杂度：O(logm+logn)主要是排序的空间复杂度。
