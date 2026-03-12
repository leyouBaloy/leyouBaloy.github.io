---
author: 孙百乐
categories:
- 刷题
date: 2020-12-17 21:10:39
draft: false
title: 字符处理软件-substr-insert-find
---

题目描述

你需要开发一款文字处理软件。最开始时输入一个字符串（不超过 100 个字符）作为初始文档。可以认为文档开头是第 0 个字符。需要支持以下操作：

*   `1 str`：后接插入，在文档后面插入字符串 str，并输出文档的字符串。
*   `2 a b`：截取文档部分，只保留文档中从第 a 个字符起 b 个字符，并输出文档的字符串。
*   `3 a str`：插入片段，在文档中第 a 个字符前面插入字符串 str，并输出文档的字符串。
*   `4 str`：查找子串，查找字符串 str 在文档中最先的位置并输出；如果找不到输出 -1。

```
#include <bits/stdc++.h>

using namespace std;

int main()
{
    int n,i;
    cin >> n;
    string s;
    cin >> s;
    for(i=0;i<n;i++)
    {
        int menu;
        cin >> menu;
        if(menu==1)
        {
            string tmp;
            cin >> tmp;
            s = s + tmp;
            cout << s << endl;
        }
        if(menu==2)
        {
            int a,b;
            cin >> a >> b;
            s = s.substr(a,b);
            cout << s << endl;
        }
        if(menu==3)
        {
            int location;
            string tmp;
            cin >> location >> tmp;
            s.insert(location,tmp);
            cout << s << endl;
        }
        if(menu==4)
        {
            string tmp;
            cin >> tmp;
            if(s.find(tmp)<s.size())
                cout << s.find(tmp) << endl;
            else
                cout << -1 << endl;
        }
    }
    return 0;
}
```