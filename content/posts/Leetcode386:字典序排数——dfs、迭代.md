---
title: "Leetcode386:字典序排数——dfs、迭代"
author: 孙百乐
date: 2022-04-18T17:26:02+08:00
draft: false
categories: 
- 刷题
---

## 题目

https://leetcode-cn.com/problems/lexicographical-numbers/

日常做不出来😭

## 题解

什么是字典序？（原谅我到了大二才搞明白什么是字典序😂）

> 对于[字符串](https://so.csdn.net/so/search?q=字符串&spm=1001.2101.3001.7020)，先按首字符排序，如果首字符相同，再按第二个字符排序，以此类推。
> 如aa,ab,ba,bb,bc就是一个[字典序](https://so.csdn.net/so/search?q=字典序&spm=1001.2101.3001.7020)。

### dfs

我们可以画一棵树。

第一层设置为0。

第二层是1,2,3...,9

第三层是0,1,2,3,...,9

第四层及往后层都同第三层

![image.png](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/mypic/img/1650246458-ahFpqe-image.png)

深度优先遍历这棵树，记录路径就是答案啦。

当然了，把树具体化为代码其实是一件很难得事情：

```python
class Solution:
    def lexicalOrder(self, n: int) -> List[int]:
        res = []
        for i in range(1,10):
            if i > n:
                break
            res.append(i)
            self.dfs(i, n, res) # 以i为开头枚举
        return res
    
    def dfs(self, i, n, res):
        for k in range(0,10):
            val = i*10+k
            if val > n:
                return
            else:
                res.append(val)
                self.dfs(val, n, res)
```

细节：

* 先枚举1,2,3...,9，因为第一个数不能为0。
* 在后面枚举时要把0加上。

时间复杂度O(n)，空间复杂度O(logn)，主要为栈的开销

### 迭代法

很有思维的一种方法！

![image-20220418173712075](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/mypic/img/image-20220418173712075.png)



代码：

```python
class Solution:
    def lexicalOrder(self, n: int) -> List[int]:
        ans = [0] * n
        num = 1
        for i in range(n):
            ans[i] = num
            if num * 10 <= n:
                num *= 10
            else:
                while num % 10 == 9 or num + 1 > n:
                    num //= 10
                num += 1
        return ans
```

> 作者：LeetCode-Solution
> 链接：https://leetcode-cn.com/problems/lexicographical-numbers/solution/zi-dian-xu-pai-shu-by-leetcode-solution-98mz/
> 来源：力扣（LeetCode）
> 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
