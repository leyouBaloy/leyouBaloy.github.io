---
title: "Leetcode55:跳跃游戏——贪心"
author: 孙百乐
date: 2022-04-01T16:03:13+08:00
draft: false
categories: 
- 刷题
---

## 题目

https://leetcode-cn.com/problems/jump-game/

## 题解

所谓贪心算法，我个人浅薄的理解就是每一步找局部最优解，最终找到整体最优解。

那么这道题可以有这样的思路：从前往后遍历`nums`的元素，实时维护**最远可以到达的位置** `far`。

对于当前遍历的位置`i`，先判断`i<=far`，再有`far = max(far, i+nums[i])`

直到`far>=len(nums)`，则返回True，否则返回False。

代码：

```python
class Solution:
    def canJump(self, nums: List[int]) -> bool:
        far = nums[0]
        size = len(nums)
        for i in range(size):
            if i > far:
                return False
            far = max(far, nums[i]+i)
            if far >= size-1:
                return True
        return False
```



ps:因为前面做了几题递归，所以本来想用递归做，尝试一下代码不太会写，但我觉得思路上应该是行得通的。看来我的技术还有很大的提升空间呀！
