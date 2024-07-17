---
author: 孙百乐
categories:
- 刷题
date: 2020-11-07 08:48:03
draft: false
title: 删除重复的字符并重新排列-这个题太jb烦人了
---

【题目描述】

输入一个长度不超过 100 的字符串，删除串中的重复字符。例如：输入的字符串为abacaeedabcdcd，

删除重复字符串后为abced。

【输入格式】

一个长度不超过100个字符。

【输出格式】

删除重复字符后的字符串，保留原来的顺序。

For example:

Input

Result

abacaeedabcd

abced

## Answer

```
#include <stdio.h>
#define N 100
int main()
{
    char a[N];
    int i,j,m;
    scanf("%s",a);
    for(i=0; a[i]!=0; i++)
        for(j=i+1; a[j]!=0; j++)
            if(a[i]==a[j])
            {
                for(m=j; a[m]!=0; m++)
                {
                    a[m]=a[m+1];
                }
                j--;
            }
    puts(a);
    return 0;
}
```

完全就是造轮子，没意思，明明知道有很好用的函数可以直接解决，但是我一个都不会！！