---
author: 孙百乐
categories:
- 刷题
date: 2020-11-07 09:11:20
draft: false
title: 字符数组的拼接和排序-strcat()-sort()-strlen()
---

【题目描述】

小明参加学校每年一度的大学生科技节活动的游戏，这次遇到的题目是字符接龙。主持人拿出2张卡片，每张卡片上都有一个顺序字符串，即字符串是按ASCII码顺序编排的。现在要求小明把2个字符串连接成一个字符串，而且连接以后的字符串内容还是按ASCII码顺序排列的。（假设每张卡片上的字符串都不包含空格）。

【输入格式】

有2行。分别为两个不包含空格的字符串，每个字符串长度不超过1000。

【输出格式】

       连接后的顺序字符串（按ASCII码顺序排列）。

For example:

Input

Result

acd  
br

abcdr

## Answer

```
#include <iostream>
#include<string.h>
#include<cstdio>
#include<algorithm>
using namespace std;

int main()
{
    char a[100];
    char b[100];
    int len;
    scanf("%s",a);
    scanf("%s",b);
    strcat(a,b);
    len = strlen(a);
    sort(a,a+len);
    cout << a;
    return 0;
}
```

头文件好像没有全部用到。这段代码写得我还是比较满意的，如果要造轮子的话，光是一个拼接就够我搞一节课了。