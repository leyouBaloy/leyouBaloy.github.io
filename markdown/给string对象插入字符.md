---
author: 孙百乐
categories:
- 刷题
date: 2020-12-28 16:52:10
draft: false
title: 给string对象插入字符
---

```
#include <bits/stdc++.h>
using namespace std;

int main()
{
    string s;
    s = "123456";
    string::iterator it;
    it=s.begin();
    s.insert(it+1,'p');     //把p插到第1个字符前，从0开始计数
    cout << s << endl;

    return 0;
}
```

运行结果

1p23456

Process returned 0 (0x0) execution time : 0.011 s  
Press any key to continue.

## 看了课本后面的内容，发现新大陆了。string其实也是容器，而且功能很强大。