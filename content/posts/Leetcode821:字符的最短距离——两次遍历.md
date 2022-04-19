---
title: "Leetcode821:字符的最短距离——两次遍历"
author: 孙百乐
date: 2022-04-19T16:45:09+08:00
draft: false
categories: 
- 刷题
---

## 题目

https://leetcode-cn.com/problems/shortest-distance-to-a-character/

## 题解

### 遍历k次，取最小

思路：创建结果数组`v`，赋一个很大的初始值（s.size()+1就够了）。首先遍历一遍`s`，记录下每个`c`的位置`ci`。然后对于每个`ci`遍历一次`s`，如果`abs(ci-当前位置) < v[i]`，那么就令`v[i] = ci`。最后得到的答案就是距离最近的。

代码：

```c++
class Solution {
public:
    vector<int> shortestToChar(string s, char c) {
        int size = s.size();
        vector<int> v(size, size+1);
        vector<int> cv;
        for(int i=0;i<size;i++){
            if(s[i]==c){
                cv.push_back(i);
            }
        }
        // cout << "cv:";
        // for(int i=0;i<cv.size();i++){
        //     cout << cv[i] << ",";
        // }
        for(const int& ccv:cv){
            for(int j=0;j<size;j++){
                if(abs(ccv-j)<v[j]){
                    v[j]=abs(ccv-j);
                }
            }
        }
        return v;

    }
};
```

如果有k个c，那么就要遍历k+1遍。时间复杂度O((k+1)*n)。空间复杂度O(1)，返回数组不计入。

### 两次遍历

事实上，只需要两次遍历，一次从左到右遍历`s`，若 s[i]=c 则记录下此时字符 c 的的下标 idx。遍历的同时更新 answer[i]=i-idx。

从右往左遍历 s，若 s[i]=c 则记录下此时字符 c 的的下标 idx。遍历的同时更新 answer[i]=min(answer[i],idx−i)。

代码实现时，在开始遍历的时候 idx 可能不存在，为了简化逻辑，我们可以用 −n 或 2n 表示，这里 n 是 s 的长度。

代码：

```c++
class Solution {
public:
    vector<int> shortestToChar(string s, char c) {
        int n = s.length();
        vector<int> ans(n);

        for (int i = 0, idx = -n; i < n; ++i) {
            if (s[i] == c) {
                idx = i;
            }
            ans[i] = i - idx;
        }

        for (int i = n - 1, idx = 2 * n; i >= 0; --i) {
            if (s[i] == c) {
                idx = i;
            }
            ans[i] = min(ans[i], idx - i);
        }
        return ans;
    }
};
```



> 作者：LeetCode-Solution
> 链接：https://leetcode-cn.com/problems/shortest-distance-to-a-character/solution/zi-fu-de-zui-duan-ju-chi-by-leetcode-sol-2t49/
> 来源：力扣（LeetCode）
> 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

虽然是道简单题，但我还是被秀了一脸。
