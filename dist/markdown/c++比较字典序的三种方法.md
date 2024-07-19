---
author: 孙百乐
categories:
- 刷题
date: 2020-12-04 08:04:09
draft: false
title: c++比较字典序的三种方法
---

[比较字符串字典序的三种方法【C++】 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/205953754)

```
#include <iostream>
using namespace std;

int main() {
 char s1[2] = "a";
 char s2[2] = "b";
 cout << strcmp(s1, s2) << endl; //-1
 cout << strcmp(s2, s1) << endl; //1
 cout << strcmp(s1, s1) << endl; //0
 return 0;
}
```

```
#include <iostream>
#include <string>
using namespace std;

int main() {
 string s1 = "a";
 string s2 = "b";
 cout << s1.compare(s2) << endl; //-1
 cout << s2.compare(s1) << endl; //1
 cout << s1.compare(s1) << endl; //0
 return 0;
}
```

```
#include <iostream>
using namespace std;

int main() {
 char s1[2] = "a";
 char s2[2] = "b";
 cout << (s1 < s2) << endl; //0
 cout << &s1 << endl;  //00BDFE74
 cout << &s2 << endl;  //00BDFE68
 cout << (string(s1) < string(s2)) << endl; //1
 cout << (string(s2) < string(s1)) << endl; //0
 cout << (string(s1) == string(s1)) << endl; //1
 return 0;
}
```