---
title: "Leetcode160:相交链表——哈希、双指针"
author: 孙百乐
date: 2022-03-16T20:06:00+08:00
draft: false
categories: 
- 刷题
---

## 题目

https://leetcode-cn.com/problems/intersection-of-two-linked-lists/

## 题解

**法一：哈希表**

先把一个链表放到哈希表里，再遍历另一个链表。

```c++
class Solution {
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        unordered_set<ListNode *> visited;
        ListNode *temp = headA;
        while (temp != nullptr) {
            visited.insert(temp);
            temp = temp->next;
        }
        temp = headB;
        while (temp != nullptr) {
            if (visited.count(temp)) {
                return temp;
            }
            temp = temp->next;
        }
        return nullptr;
    }
};
```

时间复杂度O(m+n)

空间复杂度O(m)

**法二：双指针**

这个方法还是很巧妙的！

两个指针分别指向headA和headB，然后同时同速向后移动，A指针到结尾了就转移到headB，B指针到结尾了就转移到headA。

如果两个链表相交，那一定可以在第二次遍历时指向同一个节点。如果不相交，一定会同时指向nullptr。

详情请看官方题解的证明，不难理解。

自己写的垃圾代码：

```c++
class Solution {
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        ListNode *A = headA;
        ListNode *B = headB;
        while(headA!=nullptr || headB!=nullptr){
            if(A==B){
                return A;
            }
            if(A==nullptr){
                A = headB;
            }else{
                A = A->next;
            }
            if(B==nullptr){
                B = headA;
            }else{
                B = B->next;
            }
        }
        return nullptr;
        
    }
};
```

看到一条评论：

> 错的人就算走过了对方的路也还是会错过😔 这题我希望大家都返回`true`

蚌埠住了兄弟们，刷个算法题都能emo。

