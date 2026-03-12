---
author: 孙百乐
categories:
- 笔记
date: 2021-02-25 11:10:35
draft: false
title: csv库的使用方法
---

上一篇我们讲了怎么用 json格式保存数据，这一篇我们来看看如何用 csv模块进行数据读写。

### 一、csv简介

CSV (Comma Separated Values)，即逗号分隔值（也称字符分隔值，因为分隔符可以不是逗号），是一种常用的文本格式，用来存储表格数据，包括数字或者字符。

csv的使用很广泛，很多程序都会涉及到 csv的使用，但是 csv却没有通用的标准，所以在处理csv格式时常常会碰到麻烦。

因此在使用 csv时一定要遵循某一个标准，这不是固定的，但每个人都应该有一套自己的标准，这样在使用 csv时才不会犯低级错误。

### 二、csv库的使用

关于 csv库的使用，我们从写和读两个方面来讲。

csv库有四个主要的类 writer，DictWriter，reader，DictReader

reader和 DictReader都接受一个可以逐行迭代的对象作为参数，一般是一个包含 csv格式数据的文件对象。

writer和 DictWriter则接受一个 csv文件对象，csv格式的数据将会写入到这个文件中。

他们都会返回一个对应的对象，我们通过这个对象来进行数据的读和写。

这四者中 reader和 writer对应，DictReader和 DictWriter对应，也就是说通过 writer类写的 csv文件只能通过 reader类来读取，DictReader同理。

**1、csv将数据写入文件**

```
#-*- coding: utf-8 -*
import csv


#通过 writer类写入数据
#待写入的数据 注意到两个列表的元素个数不一样
test_writer_data_1 = ['Tom', 'Cody', 'Zack']
test_writer_data_2 = ['Mike', 'Bill']

#创建并打开文件
with open('test_writer.csv', 'w', newline='', encoding='utf-8') as csvfile:
    #获得 writer对象 delimiter是分隔符 默认为 ","
    writer = csv.writer(csvfile, delimiter=' ')
    #调用 writer的 writerow方法将 test_writer_data写入 test_writer.csv文件
    writer.writerow(test_writer_data_1)
    writer.writerow(test_writer_data_2)


#通过 DictWriter类写入数据
#待写入的数据 注意到待写入的数据类型为 dict 且第二个字典没有 lastname
test_dict_writer_data_1 = {'firstname': 'Tom', 'lastname': 'Loya'}
test_dict_writer_data_2 = {'firstname': 'Tom', 'lastname': 'Loya'}

#创建并打开文件
with open('test_dict_writer.csv', 'w', newline='', encoding='utf-8') as csvfile:
    #设置表头
    fieldnames=['firstname', 'lastname']
    # 获得 DictWriter对象 delimiter是分隔符 默认为 "," 表头为 'firstname' 'lastname'
    dict_writer = csv.DictWriter(csvfile, delimiter=' ', fieldnames=fieldnames)
    #第一次写入数据先写入表头
    dict_writer.writeheader()
    #调用 DictWriter的 writerow方法将 test_dict_writer_data写入 test_dict_writer.csv文件
    dict_writer.writerow(test_dict_writer_data_1)
    dict_writer.writerow(test_dict_writer_data_2)




```

前面讲到，csv没有统一的标准，通过上面的例子我们可以发现，csv对写入的数据不做任何检查，也就是说几乎没有任何标准可言。

我们发现 writerow方法不会对数据进行检查，即使前后两句 writerow语句写入的数据的格式不同也不会报错。

所以在用 csv写入数据时要特别注意数据的格式问题！！！

也可以用 `writerows(list)` 一次写入多行，例如：

```
with open('test_writer.csv', 'w', newline='', encoding='utf-8') as csvfile:
    #获得 writer对象 delimiter是分隔符 默认为 ","
    writer = csv.writer(csvfile, delimiter=' ')
    #调用 writer的 writerows方法将 test_writer_data写入 test_writer.csv文件
    writer.writerows([test_writer_data_1, test_writer_data_2])

with open('test_dict_writer.csv', 'w', newline='', encoding='utf-8') as csvfile:
    #设置表头
    fieldnames=['firstname', 'lastname']
    # 获得 DictWriter对象 delimiter是分隔符 默认为 "," 表头为 'firstname' 'lastname'
    dict_writer = csv.DictWriter(csvfile, delimiter=' ', fieldnames=fieldnames)
    #第一次写入数据先写入表头
    dict_writer.writeheader()
    #调用 DictWriter的 writerows方法将 test_dict_writer_data写入 test_dict_writer.csv文件
    dict_writer.writerows([test_dict_writer_data_1, test_dict_writer_data_2])
```

**2、csv从文件读取数据**

```
#-*- coding: utf-8 -*
import csv


#通过 reader读取文件内容 注意到之前我们设置了 delimiter为空格，这里也要继续设置为空格
with open('test_writer.csv', 'r', newline='', encoding='utf-8') as csvfile:
    reader = csv.reader(csvfile, delimiter=' ')
    for row in reader:
        print(row)


with open('test_dict_writer.csv', 'r', newline='', encoding='utf-8') as csvfile:
    dict_reader = csv.DictReader(csvfile, delimiter=' ')
    for row in dict_reader:
        print(row)
```

打印结果：

![](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/mypic/wp-content/uploads//2021/02/8516750-efdf5e1a0252d666-1024x144.png)

观察打印出的结果我们发现，reader读取的内容打印出来后还是列表格式，而 DictReader读取的内容却变为了列表加元组的格式，显然和我们刚开时传入的字典格式很不同。

而我们总是希望输入和输出能够一致，但是 csv模块并没有提供这样的方法，所以我们需要自己将 csv模块再进行一次封装，封装后的包应该满足下面的标准：

1.  统一的分隔符 delimiter
2.  统一的编码
3.  统一的打开文件的方式
4.  能够自己判断文件是否存在并且选择合适的方式打开文件
5.  输入格式和输出格式保持一致
6.  强制检查格式，格式错误禁止插入并报错

封装后的包的源码会在完成后贴出(￣▽￣)"

最后让我们来总结一下使用 csv库的注意事项：

1.  打开文件时要 注意模式 读用 r，写用 w
2.  打开文件时要设置 newline=''（空字符）
3.  打开文件时要指定编码打开，写入时也一样
4.  如果设置过分隔符就要一直保持，读写时的分隔符必须一致
5.  csv不会检查格式（虽然有个 strict模式，但 strict模式下也不会对格式进行检查），写入文件时一定要注意格式

以上就是 csv库的使用方法和注意事项，觉得不错就点个赞吧(●ˇ∀ˇ●)

作者：渔父歌  
链接：https://www.jianshu.com/p/51211fcdf4b8%20  
来源：简书  
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。