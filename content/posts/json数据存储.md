---
author: 孙百乐
categories:
- 笔记
date: 2021-02-25 11:02:16
draft: false
title: json数据存储
---

转载自https://www.jianshu.com/p/0ba2b643c0f2

在上一篇文章里我们讲了 xpath写法的问题还以爬取我的文章信息写了示例，但是在上一篇中我们只是爬取并打印了信息，并没有对信息进行保存。

实际应用中爬取到的信息肯定是需要保存到本地的。保存信息的方式有数据库和文件的形式，数据库我们后面再讲，现在让我们先看看怎么把信息保存到文件里。

这里我们主要讲讲 将数据保存为 json格式和 csv格式，这就要用到两个库 json库和 csv库，这两个库都是 python自带的库。

关于数据存储我们分两篇来讲，这一篇先讲 json，下一篇再讲 csv。

### 一、关于 json

json的简介直接引用百度百科的定义：

> JSON(JavaScript Object Notation, JS 对象简谱) 是一种轻量级的数据交换格式。它基于 ECMAScript (欧洲计算机协会制定的js规范)的一个子集，采用完全独立于编程语言的文本格式来存储和表示数据。简洁和清晰的层次结构使得 JSON 成为理想的数据交换语言。 易于人阅读和编写，同时也易于机器解析和生成，并有效地提升网络传输效率。

实际上 json的格式和 python中的字典很像，也是由键值对组成，但是 python中的值可以为任何对象（列表、字典、字符串、数字等等），而 json中的值只能是数组（列表）、字典、字符串、数组、布尔值中的一中或几种。

其格式就像下面这样：

注意：json中的引号必须是双引号，否则会报错

```
{
    "key1": "value1",
    "key2": [1,2,"value2"],
    "key3": 
    {
        "key31": "value1",
        "key32": [1,2,"value2"],
        "key33": true,
    },
}
```

### 二、json库的使用

json库一共有三个方法，分别是 dump、dumps、load、loads。

其中 dump和 dumps是用来把把字典和数组转换为 json格式的，dump把转换结果直接写入文件，dumps返回字符串。

load和 loads是把 json格式的数据转换为字典格式，load直接从 json文件中读取数据并返回字典对象，loads把字符串形式的 json数据转换成字典格式。

下面讲讲这些方法的具体用法。

**1、dump和 dumps**

dump的函数原型是 `dump(obj, fp)` 第一个参数 obj是要转换的对象，第二个参数 fp是要写入数据的文件对象。

dumps的函数原型是 `dumps(obj)` 参数是要转换的对象

注意：如果要转换的对象里有中文字符的话，要把 ensure\_ascii设置为 False否则中文会被编码为 ascii格式

```
#-*- coding: utf-8 -*
import json


test = {
    "key1": "value1",
    "key2": [1,2,"value2"],
    "key3":
    {
        "key31": "value1",
        "key32": [1,2,"value2"],
        "key33": True,
        "key34": "测试",
    },
}

#没有设置 ensure_ascii为 False
with open('test.json', 'w', encoding='utf-8') as fp:
    json.dump(test, fp)
#设置了 ensure_ascii为 False
with open('test_no_ascii.json', 'w', encoding='utf-8') as fp:
    json.dump(test, fp, ensure_ascii=False)

#test.json的文件内容为：
#{... ... "key33": true, "key34": "\u6d4b\u8bd5"}}
#test_no_ascii.json的文件内容为：
#{... ... "key33": true, "key34": "测试"}}
#注意到 python中的 True转换成了 Javascript里的 true
#另外在打开文件的时候强烈建议用 encoding指定文件编码
#还需要注意文件的打开模式 w是写入，文件已存在的话就覆盖
#要追加写入的话记得用 a模式打开

test_string = json.dumps(test, ensure_ascii=False)
print(test_string)

```

打印结果：

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads//2021/02/8516750-b526e0e0eeb46343-1024x155.png)

**2、load和 loads**

load的函数原型是 `load(fp)` 参数 fp是要读取的文件对象

loads的函数原型是 `loads(string)` 参数 string是要转换成 python对象的 json字符串，通常用来将网页中的 json数据转换为 python对象

```
#-*- coding: utf-8 -*
import json


#json格式的字符串
test_string = '{"key1": "value1", "key2": [1, 2, "value2"], "key3": {"key31": "value1", "key32": [1, 2, "value2"], "key33": true, "key34": "测试"}}'

#从之前保存的 test_no_ascii.json中读取 注意模式为 r
with open('test_no_ascii.json', 'r', encoding='utf-8') as fp:
    json_obj_from_file = json.load(fp)

json_obj_from_web = json.loads(test_string)

#打印两个返回结果的类型
print(type(json_obj_from_file))
print(type(json_obj_from_web))
#打印两个返回结果的内容
print(json_obj_from_file)
print(json_obj_from_web)
```

打印结果

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads//2021/02/8516750-a6d38380a795390d-1024x149.png)

# [json的dump和dumps的区别](https://www.cnblogs.com/zhoajiahao/p/11133430.html)

dumps是将dict转化成str格式，loads是将str转化成dict格式。

dump和load也是类似的功能，只是与文件操作结合起来了。