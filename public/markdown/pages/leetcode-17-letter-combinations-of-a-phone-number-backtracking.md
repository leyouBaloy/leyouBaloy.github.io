# Leetcode17:电话号码的字母组合——回溯

> 发布于：2022-04-27 | 分类：刷题 | 原文：https://leyoubaloy.github.io/post/leetcode-17-letter-combinations-of-a-phone-number-backtracking

## 题目

https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/

终于能自己做出一道题了😭，之前的回溯题没白刷

## 题解

### 回溯

思路：先用哈希表储存数字对应的字母，然后用回溯法记录搜索路径。

画个图帮助理解：

{{< figure src="https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/mypic/img/image-20220427155047587.png" >}}



代码：

```python
class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        if digits=="":
            return []
        tel = {"2":"abc","3":"def","4":"ghi","5":"jkl","6":"mno","7":"pqrs","8":"tuv","9":"wxyz"}
        size = len(digits)
        path = []
        res = []
        def backtracking(i, path, res):
            for letter in tel[digits[i]]:
                path.append(letter)
                if i==size-1:
                    res.append("".join(path))
                    path.pop()
                else:
                    backtracking(i+1, path, res)
                    path.pop()
        backtracking(0, path, res)
        return res
```

时间复杂度：O(3^m * 4^n)，m是电话键盘上有三个字母对应的数的个数，n是电话键盘上有四个字母对应的数的个数。需要遍历一遍所有的组合。

空间复杂度：O(m+n)，主要为记录路径的开销，路径最长也只有`len(digits)`
