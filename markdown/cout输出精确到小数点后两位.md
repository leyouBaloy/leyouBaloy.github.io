---
author: 孙百乐
categories:
- 刷题
date: 2020-11-01 17:13:53
draft: false
title: cout输出精确到小数点后两位
---

【题目描述】

给出两幅相同大小的黑白图像（用 0表示黑，1表示白）表示，求它们的相似度。说明：若两幅图像在相同位置上的像素点颜色相同，则称它们在该位置具有相同的像素点。两幅图像的相似度定义为相同像素点数占总像素点数的百分比。

【输入】

第一行包含两个整数 m 和 n，表示图像的行数和列数，中间用单个空格隔开。1≤ m≤ 100, 1≤ n≤ 100。

之后 m 行，每行 n 个整数，表示第一幅黑白图像上各像素点的颜色。相邻两个数之间用单个空格隔开。

之后 m 行，每行 n 个整数，表示第二幅黑白图像上各像素点的颜色。相邻两个数之间用单个空格隔开。

【输出】

两幅图像的相似度，结果保留小数点后两位。

For example:

Input

Result

3 3  
1 0 1  
0 0 1  
1 1 0  
1 1 0  
0 0 1  
0 0 1

44.44

## 答案

```
#include <iostream>
#include <iomanip>

using namespace std;

int main()
{
    int a[500][500];
    int b[500][500];
    int m,n,j,k;


    //输入部分
    cin >> n >> m;
    for(j=1;j<=n;j++)
    {
        for(k=1;k<=m;k++)
        {
            cin >> a[j][k];
        }
    }


    for(j=1;j<=n;j++)
    {
        for(k=1;k<=m;k++)
        {
            cin >> b[j][k];
        }
    }


    //计算部分
    float cnt=0;
    for(j=1;j<=n;j++)
    {
        for(k=1;k<=m;k++)
        {
            if(a[j][k]==b[j][k])
                cnt++;
        }
    }
    cnt = cnt * 100;


    //输出部分
    cout << fixed << setprecision(2) << cnt/(m*n);
    return 0;
}
```

输出精确的方式：

#include cout << fixed << setprecision(2) << a; //其中fixed自动补0，setprecision(2)是精确到小数点后两位