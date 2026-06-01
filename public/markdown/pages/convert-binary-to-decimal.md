# 输入二进制转化为十进制

> 发布于：2020-11-10 | 分类：刷题 | 原文：https://leyoubaloy.github.io/post/convert-binary-to-decimal

```
        bitset<16> bint;  // 16 bit 二进制数据，还有 bitset<32>

        cin >> bint;
        int a;
        a = bint.to_ulong();
        cout << a;
```
