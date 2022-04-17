---
title: "C++和python常用函数"
author: 孙百乐
date: 2022-04-08T20:23:24+08:00
draft: false
categories: 
- 刷题
- 笔记
---

## c++常用函数

### sort(v.begin(),v.end())

```c++
// 向量v
vector<int> v;
sort(v.begin(),v.end()) 
// 数组a
sort(a,a+n);
```

```c++
// 可以加参数cmp
// 比如对intervals = [[1,2],[2,3],[3,4],[1,3]] 中每个向量第一个元素按从小到大排序
sort(intervals.begin(), intervals.end(), [](const auto& u, const auto& v) {
            return u[0] < v[0];
        });
```

* 默认升序

如果要逆序就麻烦了

```c++
template <typename T>
struct cmp
    {
        bool operator()(const T &x, const T &y)
        {
            return x>y;
        }
    };

sort(nums.begin(),nums.end(),cmp<int>());
```



### max_element(v.begin(),v.end())

* 返回指针，指向最大元素



### pair<int,int>

1. `pair<int, int> p1(1, 2);` 定义和初始化
2. 可以用已有对象初始化pair<int, int> p2(p1);
3. 没有初始化，默认为(0,0)

赋值：`p2 = pair<int, int> (1, 4);` 强制类型转换

访问：`p2.first`,`p2.second`

`make_pair(1,2)`





### queue()

`queue<pair<int,int>> que` 构造

`que.emplace(1,2)` emplace自带调用构造函数，而push需要先自己搞出对象再传入

`que.front()`返回队首元素的引用

`que.back()`返回队尾元素的引用

`que.pop()`删除第一个元素

`queue.size()`元素数量



### find()

`find(v.begin(), v.end(), 3)` 查找v中==3的元素的位置，返回指针



### priority_queue

头文件： `#include<queue>`

定义：`priority_queue<int> p;` 默认为大顶堆

或priority_queue<Type, Container, Functional> Type为数据类型， Container为保存数据的容器，Functional为元素比较方式。

如`priority_queue<pair<int, int>, vector<pair<int, int>>, decltype(&cmp)> q(cmp);`

其中比较函数为：

```
static bool cmp(pair<int, int>& m, pair<int, int>& n) {        return m.second > n.second;    } 
```

这里定义的是一个储存pair<int,int>的小顶堆。

操作（和队列基本操作相同：

- top 访问队头元素
- empty 队列是否为空
- size 返回队列内元素个数
- push 插入元素到队尾 (并排序)
- emplace 原地构造一个元素并插入队列
- pop 弹出队头元素
- swap 交换内容

参考：https://blog.csdn.net/weixin_36888577/article/details/79937886



### unordered_set()

创建：`unordered_set<char> occ;`

删除：`occ.erase('a')`

插入：`occ.insert('a')`

判断是否在set中：`occ.count('a')`



### vector<>

创建一个n*n的二维数组：`vector<vector<int>> dp(n, vector<int>(n));`



## python常用函数

### sorted()

```
sorted(iterable, key=None, reverse=False)  
```

参数说明：

- iterable -- 可迭代对象。
- key -- 主要是用来进行比较的元素，只有一个参数，具体的函数的参数就是取自于可迭代对象中，指定可迭代对象中的一个元素来进行排序。
- reverse -- 排序规则，reverse = True 降序 ， reverse = False 升序（默认）。

返回重新排序的列表。



### set()

创建：`occ = set()`

`occ = set(iterable比如列表、字符串)`

删除：`occ.remove('a')`

插入：`occ.add('a')`

判断是否在set中：`'a' in occ`
