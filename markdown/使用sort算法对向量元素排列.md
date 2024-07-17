---
author: 孙百乐
categories:
- 刷题
date: 2020-12-28 16:26:38
draft: false
title: 使用sort算法对向量元素排列
---

```
#include <bits/stdc++.h>
using namespace std;

int main()
{
    srand(time(NULL));
    vector<int>v;
    int i;
    for(int i=0;i<10;i++)
    {
        v.push_back(rand()%100);
    }
    for(i=0;i<10;i++)
    {
        cout << v[i] << " ";
    }
    cout << endl;
    sort(v.begin(),v.end()); //升序排列
    for(i=0;i<10;i++)
    {
        cout << v[i] << ' ';
    }
    cout << endl;

    return 0;
}
```

结果：

13 32 13 85 48 99 36 53 18 16  
13 13 16 18 32 36 48 53 85 99

Process returned 0 (0x0) execution time : 0.013 s  
Press any key to continue.

自定义函数：

```
#include <bits/stdc++.h>
using namespace std;
bool cmp(const int &a,const int &b)
{
    return a > b;
}
int main()
{
    srand(time(NULL));
    vector<int>v;
    int i;
    for(int i=0;i<10;i++)
    {
        v.push_back(rand()%100);
    }
    for(i=0;i<10;i++)
    {
        cout << v[i] << " ";
    }
    cout << endl;
    sort(v.begin(),v.end(),cmp); //升序排列
    for(i=0;i<10;i++)
    {
        cout << v[i] << ' ';
    }
    cout << endl;

    return 0;
}
```

实测const可以去掉，不影响结果  
结果：  

3 26 45 43 42 72 71 63 35 63  
72 71 63 63 45 43 42 35 26 3

一、const int 和int 的区别

1、返回值

const int & 是返回这个数值的一个常量的引用。

而int 是返回这个数值的一个拷贝。

int 是进行拷贝构造，而const int & 是返回的引用。拷贝构造更消耗时间，与此同时还用析构函数。因为产生了一个拷贝，你就可以轻易地修改拷贝的内容。

2、取指针

const int类型一旦定义以后就不能修改，int类型是随时可以修改的。

在取指针方面，const有略复杂的东西，但是常规的、合理的操作不应该涉及到，因为const int是用来保存一些全局常量的，这些常量在编译期可以改，在运行期不能改。

听起来这像宏，其实这确实就是用来取代宏的： [#define](https://www.baidu.com/s?wd=%23define&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao) [PI](https://www.baidu.com/s?wd=PI&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao) 3.14 const float [Pi](https://www.baidu.com/s?wd=Pi&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao) = 3.14; 如果你的代码里用到了100次[PI](https://www.baidu.com/s?wd=PI&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)（宏），你的代码中会保存100个3.14这个常数。

鉴于使用常数进行运算的机器代码很多时候会比使用变量来的长，如果你换用100次Pi（const float)，程序编译后的机器码里就不需要出现100次常量3.14，只要在需要的时候引用存有3.14的常量就行了。

特别在复杂的运算里，3.14这个常量（其实是无法修改的变量）会被一直装载在寄存器里带来一些性能提升。

3、内容

constint\* p; //p可变，p指向的内容不可变，int const\* p; //p可变，p指向的内容不可变。 int\* const p; //p不可变，p指向的内容可变 const int\* const p; //p和p指向的内容都不可变。

二、const的作用：

1、可以定义const常量，具有不可变性。 

例如：const int Max=100; Max++会产生错误; 

2、便于进行类型检查，使编译器对处理内容有更多了解，消除了一些隐患。

例如： void f(const int i) { .........} 编译器就会知道i是一个常量，不允许修改； 

3、可以避免意义模糊的数字出现，同样可以很方便地进行参数的调整和修改。 同宏定义一样，可以做到不变则已，一变都变！

如1中，如果想修改Max的内容，只需要它修改成：const int Max=you want;即可！

4、可以保护被修饰的东西，防止意外的修改，增强程序的健壮性。 还是上面的例子，如果在函数体内修改了i，编译器就会报错； 

例如： void f(const int i) { i=10;//error! } 

5、可以节省空间，避免不必要的内存分配。