---
author: 孙百乐
categories:
- 笔记
date: 2021-03-09 11:04:10
draft: false
title: Pandas学习笔记
---

### map()和apply()和applymap()区别

map()是Series对象的一个函数，DataFrame中没有map()，map()的功能是将一个自定义函数作用于Series对象的每个元素。

apply()函数的功能是将一个自定义函数作用于DataFrame的行或者列

applymap()函数的功能是将自定义函数作用于DataFrame的所有元素

案例可以看这个：[https://www.cnblogs.com/jason--/p/11427145.html](https://www.cnblogs.com/jason--/p/11427145.html)  
讲的非常清晰

能看出map,apply,apply还是蛮有用的，但是上手不太容易

### sort\_values()和sort\_index()区别

1、sort\_index()

sort\_index()通俗点讲，就是根据index的值进行排序，如果是按行排序，可以认为是根据index的值排序，如果是按列排序，可以认为是根据columns的值进行排序。用法如下：

```
### 按索引排序，需要指定轴和方向，默认为列方向排序
unsorted_df.sort_index()#默认为index升序
unsorted_df.sort_index(ascending=False)#此时为index降序   
 
unsorted_df.sort_index(axis=1,ascending=True,inplace=False,na_position='last')
#此时为columns方向升序，inplace指明是否替代原df,na_position指明缺失值的位置（'last'，'first'）
 
unsorted_df.sort_index().sort_index(axis=1,ascending=True,inplace=False,na_position='last')
#index和colimns同时排序，可以直接粘在后面
```

sort\_values()对dataframe按某一列的值进行排序，或者按某一行的值进行排序。具体的参数设置如下：

```

# 参数
DataFrame.sort_values（by，axis = 0，ascending = True，inplace = False，kind =' quicksort '，na_position ='last' ）
 
#参数说明
by: str或str的列表，如果axis=0或axis='index'，那么by='列名'；如果axis=1或axis='columns'，那么by='行名'
 
axis: {0或'index';1或'columns'} 默认为0，即纵向排序，如果为1，则为横向排序
 
ascending: 布尔型，默认为True,即升序
 
inplace: 布尔型，是否用排序后的数据代替现有数据
 
kind: 排序算法， {'quicksort'，'mergesort'，'heapsort'}，默认'quicksort'
 
na_position: {'first'，'last'}，默认'last' ,即将缺失值放在最后。
```

摘自https://blog.csdn.net/u011412768/article/details/107251808

### pd.read\_csv()参数

```
df=pd.read_csv(filepath,
header=None,encoding="gbk",
names=["A","B","C","D","E"],
               skiprows=1,
skipfooter=1,
usecols=["A","B","C"],
index_col=0,
engine="python")
————————————————
版权声明：本文为CSDN博主「此间的少年1128」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_44056331/article/details/89366105
```

**filepath\_or\_buffer**: 数据输入的路径：可以是文件路径、可以是URL，也可以是实现read方法的任意对象。这个参数，就是我们输入的第一个参数。

还可以是一个URL，如果访问该URL会返回一个文件的话，那么pandas的read\_csv函数会自动将该文件进行读取。比如：我们用fastapi写一个服务，将刚才的文件返回。

**sep**: 读取csv文件时指定的分隔符，默认为逗号。注意："csv文件的分隔符" 和 "我们读取csv文件时指定的分隔符" 一定要一致。

比如：上面的girl.csv，我们将其分隔符从逗号改成"\\t"，如果这个时候还是用默认的逗号分隔符，那么数据读取之后便混为一体。

**delimiter**: 分隔符的另一个名字，与 sep 功能相似。

**header**/**names**:

*   当names没被赋值时，header会变成0，即选取数据文件的第一行作为列名。
*   当 names 被赋值，header 没被赋值时，那么header会变成None。如果都赋值，就会实现两个参数的组合功能。

**index\_col**: 我们在读取文件之后，生成的DataFrame的索引默认是0 1 2 3...，我们当然可以set\_index，但是也可以在读取的时候就指定某个列为索引。

**usecols**: 如果列有很多，而我们不想要全部的列、而是只要指定的列就可以使用这个参数。

详细看这篇博文，写得非常好！！[https://www.cnblogs.com/traditional/p/12514914.html](https://www.cnblogs.com/traditional/p/12514914.html)

### 样式问题

困扰了我很久是pandas样式问题，在这篇博客里写的很详细！

[https://www.gairuo.com/p/pandas-style-function](https://www.gairuo.com/p/pandas-style-function)