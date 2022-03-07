---
title: "C语言中值传递、指针传递和引用传递"
author: 孙百乐
date: 2022-03-07T17:15:10+08:00
draft: false
categories: 
- 刷题
- 技能分享
---

## 2022年我才搞懂这个！

## 比较

| 传递方式 | 函数定义    | 函数调用 | 函数内对a修改的影响 |
| :------- | :---------- | :------- | :------------------ |
| 值传递   | fun(int a)  | fun(x)   | 外部x不变           |
| 指针传递 | fun(int *a) | fun(&x)  | 外部x同步更改       |
| 引用传递 | fun(int &a) | fun(x)   | 外部x同步更改       |

## 值传递

值传递是最常用的一种方式。它就是从函数外拷贝到函数内。

## 指针传递

指针传递跟值传递其实差不多，只是传递的内容从一个值换成了指针。定义函数的时候要写成`fun(int *a)`，函数内的`a`就是一个`int类型指针`要使用`a对象`的话就得写成`*a`。

在函数外如果定义一个`int b=1`，想把它传到函数里的话需要用到取地址符`&`，像这样写`fun(&b)`。

示例：

```c++
#include <stdio.h>
 
void swap(int *a, int *b){
    printf("swap enter\n");
    printf("a = %d, ptr = %p\n", *a, a);
    printf("b = %d, ptr = %p\n", *a, b);
 
    int tmp = *b;
    *b = *a;
    *a = tmp;
 
    printf("a = %d, ptr = %p\n", *a, a);
    printf("b = %d, ptr = %p\n", *b, b);
    printf("swap leave\n");
}
 
int main() {
    int x = 1;
    int y = 2;
    printf("x = %d, ptr = %p\n", x, &x);
    printf("y = %d, ptr = %p\n", y, &y);
 
    swap(&x, &y);
 
    printf("x = %d, ptr = %p\n", x, &x);
    printf("y = %d, ptr = %p\n", y, &y);
 
    return 0;
}
```

结果：

```c++
x = 1, ptr = 000000000022FE4C
y = 2, ptr = 000000000022FE48
swap enter
a = 1, ptr = 000000000022FE4C
b = 1, ptr = 000000000022FE48
a = 2, ptr = 000000000022FE4C
b = 1, ptr = 000000000022FE48
swap leave
x = 2, ptr = 000000000022FE4C
y = 1, ptr = 000000000022FE48
```

## 引用传递

在定义的时候形参前要加一个`&`，这个不是取地址符，而是一个记号。（这就是c语言贼tm绕人的地方qwq）比如`int fun(int &a)`。

调用函数时参数前不需要加任何记号，比如`int a=10`，`fun(a)`。

在函数内使用的时候不用加任何东西，直接用即可，比如`a=20`。

函数内和函数外a的值会同步改变。

示例：

```c++
class Solution {
public:
    void preorder(TreeNode *root, vector<int> &res){ //这里res前要加一个&
        if (root == nullptr){
            return;
        }
        res.push_back(root->val);
        preorder(root->left, res); // res可以直接访问到对象内容，且函数内外指向同一个对象
        preorder(root->right, res);
    }
    vector<int> preorderTraversal(TreeNode* root) {
        vector<int> res; //创建res对象
        preorder(root, res);
        return res;
    }
};
```



## 参考资料

以上我自己的总结是非常简单的，仅能保证我在做题时看懂题解，但其实这里面还有很多细节没提到。学到现在终于能体会到当年为什么老师说c语言的指针很难了。

参考csdn文章：http://t.csdn.cn/suCK6







