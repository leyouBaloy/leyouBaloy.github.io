---
author: 孙百乐
categories:
- 刷题
date: 2020-12-28 16:21:28
draft: false
title: 使用reverse反向排列算法
---

```
#include <bits/stdc++.h>
using namespace std;

int main()
{
    srand(time(NULL));
    vector<int>v(10);
    for(int i=0;i<10;i++)
    {
        v[i] = rand()%100;
    }
    vector<int>::iterator it;
    for(it=v.begin();it!=v.end();it++)
    {
        cout << *it << " ";
    }
    cout << endl;
    reverse(v.begin(),v.end());
    for(it=v.begin();it!=v.end();it++)
    {
        cout << *it << ' ';
    }
    cout << endl;

    return 0;
}
```

运行结果

94 66 52 71 33 43 91 59 78 69  
69 78 59 91 43 33 71 52 66 94

Process returned 0 (0x0) execution time : 0.013 s  
Press any key to continue.

string容器

```
#include <bits/stdc++.h>
using namespace std;

int main()
{
    string s;
    s = "123456";
    reverse(s.begin(),s.end());
    cout << s;
    return 0;
}
```