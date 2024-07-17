---
title: "Leetcode3:无重复字符的最长子串——滑动窗口"
author: 孙百乐
date: 2022-04-08T19:59:03+08:00
draft: false
categories: 
- 刷题
---

# 题目

https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/

乍一看好像做过，再一看好像不会😂

# 题解

## 暴力法

设字符串为`s`，假如我们要找的这段没有重复字符的序列是从`i`起始，到`rk`结束（即`s[i:rk]`）。

那么用两个循环暴力枚举`i`和`rk`，看`s[i:rk]`是不是无重复元素的序列，记录下最大的序列。

贴个超时代码：

```python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        s = s.replace(" ","1")
        size = len(s)
        max = 0
        for i in range(size):
            for j in range(size+1):
                n = len(s[i:j])
                if n==len(set(s[i:j])) and n>max:
                    max = n
        return max
```

暴力法是无脑的，不懂得使用先前循环的经验。那么如何优化呢？

## 滑动窗口

首先就是建议看官方题解....我这里再稍微总结一下：

这道题目有这样的性质：当`i`递增时，`rk`也一定是递增的，因此我们不用像暴力法那样一次又一次把`rk`回溯。

为什么呢？因为如果`s[i:rk]`没有重复元素，那么`s[i+1:rk]`也一定没有重复元素。因此`rk`只需要向后移动，不需要回到前面。

所以滑动窗口的思路就是这样：

* 我们使用两个指针表示字符串中的某个子串（或窗口）的左右边界，其中左指针代表着上文中「枚举子串的起始位置」，而右指针即为上文中的 rk。

* 在每一步的操作中，我们会将左指针向右移动一格，表示 我们开始枚举下一个字符作为起始位置，然后我们可以不断地向右移动右指针，但需要保证这两个指针对应的子串中没有重复的字符。在移动结束后，这个子串就对应着 以左指针开始的，不包含重复字符的最长子串。我们记录下这个子串的长度；

* 在枚举结束后，我们找到的最长的子串的长度即为答案。

判断一个序列是否有重复的字符用到的数据结构是**哈希集合**。c++和python都有这种数据结构。

看代码：

```c++
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        // 哈希set
        unordered_set<char> occ;
        int rk=0;
        int n = s.size();
        int max_len = 0;
        // 左指针初始为-1，此时不需要删除
        for(int i=-1;i<n-1;i++){
            if(i!=-1){
                occ.erase(s[i]);
            }
            // 右指针先加入set，再右移1格
            while(rk<n && !occ.count(s[rk])){
                occ.insert(s[rk]);
                rk++;
            }
            max_len = max(max_len, rk-i-1);
        }
        return max_len;
    }
};
```

细节：

* 左指针移动，从哈希set中删除一个元素
* 右指针移动，从哈希set中添加一个元素
* 左指针从-1开始，如果从0开始，会导致第一个元素不能被删除
* ...这段代码细节蛮多的，涉及到双指针的问题，一定要在草稿纸上演算好，不然写代码一时爽，debug火葬场。

