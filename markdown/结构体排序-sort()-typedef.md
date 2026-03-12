---
author: 孙百乐
categories:
- 刷题
date: 2020-11-21 09:18:25
draft: false
title: 结构体排序-sort()-typedef
---

【题目描述】

中超联赛拥有大量的现场观众和收视观众，球迷都渴望观看比赛，同时希望能有一个平台更深度的了解中超联赛，体验中超球队的辛苦和努力。每场足球比赛历时90分钟，分为上半场和下半场。

中超的积分规则如下：赢得一场比赛得3分，平一场得1分，输球不得分。例如一个球队的胜平负的场次分别为11,2和 2，那么积分就是11\*3+2\*1=35。9102年的中超联赛已经落下帷幕，请你帮忙计算出各球队的总积分并按照积分给出球队最终的排名吧！

【输入】

有多行。第1行是球队数量n（1<n≤16）。

接下来有n行，每行数据包含球队的名称（不含空格，长度不超过30个字符）和胜、平、负的场次，数据间以空格分开。

【输出】

各个球队按照积分的排名情况（保证所有球队的积分各不相同），每行输出球队的名次、名称和该队的积分，数据间用一个空格分开，每行末尾没有空格。

For example:

Input

Result

3  
shanghaishanggang 11 2 2  
beijingguoan 12 2 1  
shandonglunengtaishan 10 1 4

1 beijingguoan 38  
2 shanghaishanggang 35  
3 shandonglunengtaishan 31

Answer:(penalty regime: 20 %)

```
#include <iostream>
#include <algorithm>

using namespace std;

typedef struct footballteam  //不懂
{
    char name[1000];
    int win;
    int equals;
    int fail;
    int sum;
}TEAM;
int cmp(TEAM &a,TEAM &b)    //不懂
{
    return a.sum > b.sum;
}

int main()
{
    TEAM a[20];
    int n,i;
    cin >> n;
    for(i=0;i<n;i++)
    {
        cin >> a[i].name >> a[i].win >> a[i].equals >> a[i].fail;
        a[i].sum = a[i].win*3 + a[i].equals;
    }
    sort(a,a+n,cmp);
    for(i=0;i<n;i++)
    {
        cout << i+1 <<' '<<a[i].name <<' '<<a[i].sum << endl;
    }
    return 0;
}
```