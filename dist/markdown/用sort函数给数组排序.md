---
author: 孙百乐
categories:
- 刷题
date: 2020-11-01 20:27:22
draft: false
title: 用sort函数给数组排序
---

sort函数的调用需要头文件#include <algorithm>

从小到大排：  
例如：a\[50\]={2,3,5,1,-1},想让它按照从小到大的顺序排列，那么就可以这么写，sort(a,a+5),然后数组就会变成{-1,1,2,3,5}。  
具体代码如下：

```
#include<cstdio>
#include<algorithm>
using namespace std;
int main()
{
    int i,a[50]={2,3,5,1,-1};
    sort(a,a+5);//规定排序的范围
    for(i=0;i<5;i++)
        printf("%d ",a[i]);
    return 0;
}
```

从大到小排：  
例如：a\[50\]={2,3,5,1,-1},想让它按照从大到小的顺序排列，那么就可以这么写，sort(a,a+5,cmp),调用cmp函数,然后数组就会变成{5,3,2,1,-1}。  
具体代码如下：

```
#include<cstdio>
#include<algorithm>
using namespace std;
bool cmp(int x,int y)
{
    return x>y;
}
int main()
{
    int i,a[50]={2,3,5,1,-1};
    sort(a,a+5,cmp);
    for(i=0;i<5;i++)
        printf("%d ",a[i]);
    return 0;
}
```