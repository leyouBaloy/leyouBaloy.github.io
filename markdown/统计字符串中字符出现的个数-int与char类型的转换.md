---
author: 孙百乐
categories:
- 刷题
date: 2020-11-05 16:31:07
draft: false
title: 统计字符串中字符出现的个数-int与char类型的转换
---

【题目描述】

从键盘输入一行文本，统计其中数字字符‘0’~‘9’出现的频率并输出。没出现的不需要输出。

【输入格式】

一行文本，长度不超过1000。

【输出格式】

按照从0到9顺序输出统计结果。每个数字的信息占一行，如“0:2”表示数字字符0出现了2次。

For example:

Input

Result

Hello No 007.

0:2  
7:1

## Answer

```
#include <iostream>

using namespace std;

int main()
{
    char a[9999];
    int i,j,cnt;
    
    //输入部分
    cin.getline(a,9999);
    
    //处理部分
    for(i=0;i<10;i++) 
    {
        cnt = 0;
        char x;
        x = i + '0';  //这里将i的值从int类型变成char类型，存入x中，不能再存回i中，因为i的类型为int
        for(j=0;a[j]!='\0';j++)
        {

            if(a[j] == x)
            {
                cnt++;
            }
        }
        
        //输出部分
        if(cnt != 0)
        {
            cout << x << ':'<<cnt<<endl;
        }
    }


    return 0;
}
```