# 递归法求最大公约数

> 发布于：2020-11-17 | 分类：刷题 | 原文：https://leyoubaloy.github.io/post/recursive-greatest-common-divisor

求m和n的最大公约数

```
int gcd(int m,int n)
{
    if(m%n==0)
    {
        return n;
    }
    else
    {
        return gcd(n,m%n);
    }
}
```
