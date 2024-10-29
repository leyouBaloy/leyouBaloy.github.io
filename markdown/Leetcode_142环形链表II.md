---
categories:
- 刷题
date: 2024-10-29 13:04:06
title: Leetcode142:环形链表II——快慢指针
img: 
---

# Leetcode_142环形链表II

https://leetcode.cn/problems/linked-list-cycle-ii/description/

给定一个链表的头节点  `head` ，返回链表开始入环的第一个节点。 *如果链表无环，则返回 `null`。*

如果链表中有某个节点，可以通过连续跟踪 `next` 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 `pos` 来表示链表尾连接到链表中的位置（**索引从 0 开始**）。如果 `pos` 是 `-1`，则在该链表中没有环。**注意：`pos` 不作为参数进行传递**，仅仅是为了标识链表的实际情况。

**不允许修改** 链表。

 

**示例 1：**

![img](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com//imgcircularlinkedlist.png)

```
输入：head = [3,2,0,-4], pos = 1
输出：返回索引为 1 的链表节点
解释：链表中有一个环，其尾部连接到第二个节点。
```

## 题解

快指针一次走两个，慢指针一次走一个，最终一定在环内相遇。从相遇节点和头节点开始走，一定同时走到入环节点。理论推导看：https://www.programmercarl.com/0142.环形链表II.html#思路

这题我想死也不可能想到的。

```python
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        if(head==nullptr){
            return nullptr;
        }
        ListNode* fastPoint = head;
        ListNode* slowPoint = head;
        ListNode* meetPoint = nullptr;
        
        while(1){
            fastPoint = fastPoint->next; // fast走一步
            if(fastPoint==nullptr){
                return nullptr;
            }

            fastPoint = fastPoint->next; // fast走一步
            if(fastPoint==nullptr){
                return nullptr;
            }

            slowPoint = slowPoint->next; // slow走一步
            if(fastPoint==slowPoint){
                meetPoint = fastPoint;
                break;
            }
        }
        printf("找到meet: %d", meetPoint->val);
        
        while(meetPoint != head){
            meetPoint = meetPoint->next;
            head = head->next;
        }
        return meetPoint;
        
    }
};
```

