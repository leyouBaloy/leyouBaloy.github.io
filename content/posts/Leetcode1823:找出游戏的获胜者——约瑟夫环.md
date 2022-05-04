---
title: "Leetcode1823:找出游戏的获胜者——约瑟夫环"
author: 孙百乐
date: 2022-05-04T16:24:22+08:00
draft: false
categories: 
- 刷题
---

## 题目

https://leetcode-cn.com/problems/find-the-winner-of-the-circular-game/

约瑟夫环问题非常经典，记得大一学c++程序设计的时候遇到过这题，当时貌似没有做出来，现在就游刃有余了。

## 题解

### 朴素的模拟法

即真正按照题目的描述，维护一个初始长度为`n`的数组和计数变量`cnt`，迭代找到最终解。最朴素的方法，一般都会超时。

### 模拟+队列

使用队列来模拟这个过程，首先创建一个双端队列（python中有此数据结构），包括`n`个数。然后在接下来的`n-1`次迭代中每次从队首pop出`k-1`个数到队尾。最终剩下的数就是答案。

```python
class Solution:
    def findTheWinner(self, n: int, k: int) -> int:
        q = deque(range(1, n + 1))
        while len(q) > 1:
            for _ in range(k - 1):
                q.append(q.popleft())
            q.popleft()
        return q[0]
```

因为要执行`n-1`轮，每轮把`k-1`个数从队首拿到队尾，所以时间复杂度为O(nk)。和第一种方法差不多，但代码更简洁。

### 直接pop

对上面的方法进行优化，也是我采用的方法。就是在每轮迭代中省去计数这个过程，直接找到要pop的数。

```python
class Solution:
    def findTheWinner(self, n: int, k: int) -> int:
        people = [i for i in range(1,n+1)]
        kick = 1
        while(len(people)!=1):
            kick = (kick-1+k)%len(people)
            if kick==0:kick=len(people)
            people.pop(kick-1)
            print(kick,end=" ")
            print(people)
        return people[0]
```

细节：

* 记录上一次杀掉的人的位置为kick（从1开始计数），那么下一次从第kick人开始计k个数，它的位置是`kick+k-1`。
* 但考虑到是一个环，所以要把位置mod当前数组的长度。
* mod时有一个问题，如果位置恰好是最后一个元素，mod结果为0，所以加一个判断条件，如果结果为0，就令它等于len(people)。
* 因为我们分析的位置是从1开始计数，所以pop的时候要-1

由于pop的时间复杂度比较高，所以这也不是一种十分优雅的方法。

### 数学+递归/数学+迭代

递归公式

```
f(n,m)=(f(n-1,m)+m)%n
f(n,m)指n个人，报第m个编号出列最终编号
```

这个推理没搞懂...题解：https://leetcode-cn.com/circle/article/BOoxAL/

时间复杂度O(n)





