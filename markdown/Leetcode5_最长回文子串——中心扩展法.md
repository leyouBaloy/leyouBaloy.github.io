---
title: "Leetcode5:最长回文子串——中心扩展法"
author: 孙百乐
date: 2022-04-17T10:36:32+08:00
draft: false
categories: 
- 刷题
---

## 题目

https://leetcode-cn.com/problems/longest-palindromic-substring/

## 题解

中心扩展法，看到这个名字我就知道该怎么做了，然后做了二十分钟....debug总是出问题...

这道题需要注意的细节：

* 回文子串长度既可以是奇数也可以是偶数，如果是奇数，那么它有一个中心，如果是偶数，则是两个中心。

那么代码思路就是先枚举中心，然后由中心向外扩展，直到不能扩展为止，记录下最大的扩展长度。

优雅的官方题解代码如下：

```c++
class Solution:
    def expand(self, s, left, right):
        while left >=0 and right < len(s) and s[left] == s[right]:
            left -= 1
            right += 1
        return left+1, right-1
    def longestPalindrome(self, s: str) -> str:
        start, end = 0, 0
        for i in range(len(s)):
            left1, right1 = self.expand(s, i ,i)
            left2, right2 = self.expand(s, i, i+1)
            if right1-left1 > end - start:
                start, end = left1, right1
            if right2-left2 > end - start:
                start, end = left2, right2
        return s[start: end+1]
        
```

太优雅了，我感觉这代码水平领先我至少刷一年题。
