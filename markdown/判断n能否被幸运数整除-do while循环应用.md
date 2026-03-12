---
author: 孙百乐
categories:
- 刷题
date: 2020-10-27 15:18:53
draft: false
title: 判断n能否被幸运数整除-do while循环应用
---

【题目描述】

判断一个正整数 n 是否能被一个“幸运数”整除。幸运数是指一个只包含 4 或 7 的正整数，如 7、47、477 等都是幸运数，17、42 则不是幸运数。

【输入格式】

一行包含一个正整数 n(1≤n≤1000)。

【输出格式】

一行一个字符串，如果能被幸运数整除输出“YES”；否则，输出“NO”。

For example:

Input

Result

47

YES

## 答案

```
#include <iostream>

using namespace std;

int main()
{
    int n,i,j,flag;
    cin >> n;
    for(i=1;i<=n;i++)
    {
        j = i;  //这里不能直接用i来操作，因为i还要用于循环，不可以更改其值
        do
        {
            if(j%10==4  j%10==7)
            {
                flag = 1;
            }
            else
            {
                flag = 0;
                break;
            }
            j = j / 10;
        }
        while(j);   //当不符合条件时跳出循环

        if(flag==1 && n%i==0)
        {
            cout << "YES";
            return 0;
        }
    }
    cout << "NO";

    return 0;
}
```