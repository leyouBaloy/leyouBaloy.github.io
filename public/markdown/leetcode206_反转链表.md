---
title: "Leetcode206:反转链表"
author: 孙百乐
date: 2022-03-14T19:15:57+08:00
draft: false
categories: 
- 刷题
---

一件事情只有做了一段时间之后才能找到方向。前段时间随便找了一些题刷，开始逐渐了解数据结构和算法。最近在知乎上看到一篇文章，列举了400道数据结构入门题目，感觉找到了方向。

所以从今天开始进入新的刷题阶段。

题单在此：https://www.zhihu.com/question/399753856/answer/2311845630

不一定非要按照这个顺序把所有题目刷完，但是有了这个题单作指导，思路会清晰很多。

别的不多说了，总之坚持把这件事情做下去吧✊。

## 题目

https://leetcode-cn.com/problems/reverse-linked-list/

## 题解

假设链表为 1 -> 2 -> 3 -> 4 -> null

要把它改为 null <- 1 <- 2 <- 3 <- 4

伪代码：

```c++
ListNode reverseList(ListNode head){
  前一个节点 = null;
  当前节点 = head;
  while(当前节点不为空){
    当前节点.next = 上一个节点;
    前一个节点 = 当前节点;
    当前节点 = 下一个节点;
  }
}
```

代码：

```c++
class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}

作者：LeetCode-Solution
链接：https://leetcode-cn.com/problems/reverse-linked-list/solution/fan-zhuan-lian-biao-by-leetcode-solution-d1k2/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```



