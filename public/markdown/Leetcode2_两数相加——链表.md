---
title: "Leetcode2:两数相加——链表"
author: 孙百乐
date: 2022-04-05T16:50:12+08:00
draft: false
categories: 
- 刷题
---

# 题目

https://leetcode-cn.com/problems/add-two-numbers/

这道题主要是debug

# 题解

我自己写的代码：

```c++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;
        while (curr) {
            ListNode* next = curr->next;
            curr->next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode* res = nullptr;
        int carry = 0;
        while(l1!=nullptr || l2!=nullptr){
            int sum = 0;
            if(l1==nullptr){
                sum = l2->val;
            }
            else if(l2==nullptr){
                sum = l1->val;
            }
            else{
                sum = l1->val + l2->val;
            }
            if(carry){
                sum += carry;
                carry = 0;
            }
            if(sum>=10){
                carry = 1;
                sum = sum%10;
            }
            res = new ListNode(sum, res);
            if(l1!=nullptr) l1=l1->next;
            if(l2!=nullptr) l2=l2->next;
        }
        if(carry){
            res = new ListNode(1, res);
        }
        return reverseList(res);
    }
};
```

还用了一个反转链表的函数，属于绕弯形选手😂

评论里给出的代码，我认为是最简洁优雅易懂的（虽然是java，不过其实和c艹差不多：

```java
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode root = new ListNode(0); // 工具性的头节点
        ListNode cursor = root;
        int carry = 0;
        while(l1 != null || l2 != null || carry != 0) {
            int l1Val = l1 != null ? l1.val : 0;
            int l2Val = l2 != null ? l2.val : 0;
            int sumVal = l1Val + l2Val + carry;
            carry = sumVal / 10;
            
            ListNode sumNode = new ListNode(sumVal % 10);
            cursor.next = sumNode;
            cursor = sumNode;
            
            if(l1 != null) l1 = l1.next;
            if(l2 != null) l2 = l2.next;
        }
        
        return root.next;
    }
}
```

时间复杂度O(max(m,n))；空间复杂度O(1)；

感想：这道题看起来很简单，但如果在csp考试中遇到我就完蛋了。因为细节太多，debug比较难。
