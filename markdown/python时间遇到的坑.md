---
author: 孙百乐
categories:
- 笔记
date: 2021-08-22 15:21:03
draft: false
title: python时间遇到的坑
---

python中与时间相关的标准库有三个：

*   time
*   datetime
*   calendar

吐槽：真tm傻逼，时间也要用三个库？搞得我现在都不会

### 时区坑

查看时间的方式有很多

法一：

```python
from datetime import datetime
print(datetime.now())
```

在windows上输出2021-08-22 15:04:09.958720，没问题

法二：

```python
import time

localtime = time.localtime(time.time())
print("本地时间为 :", localtime)
```

本地时间为 : time.struct\_time(tm\_year=2021, tm\_mon=8, tm\_mday=22, tm\_hour=15, tm\_min=5, tm\_sec=20, tm\_wday=6, tm\_yday=234, tm\_isdst=0)，没问题

**注意：可是到了linux上都不对**

*   GMT 时间：格林威治时间，基准时间
*   UTC 时间：Coordinated Universal Time，全球协调时间，更精准的基准时间，与 GMT 基本等同
*   CST 中国基准时间：为 UTC 时间 + 8 小时，即 UTC 时间的 0 点对应于中国基准时间的 8 点，即为一般称为东八区的时间

在我的linux机器的shell里打`date`，可以显示正确CST的时间，但是在python里用上述两种方法，时区都是GMT，写程序的时候一直都没发现，真是害惨我了。

### datetime引入

datetime下有个类名字还叫datetime，所以你得这样写代码

```python
import datetime
datetime.datetime.now()
```

或者

```python
from datetime import datetime
datetime.now()
```

哇这真是太傻逼的，python这么好用的语言也有反人类的时候。

### python获取当前时间（CST时间）

很简单，如果你发现你用datetime获取到的是UTC时间，就把他加上8小时就是CST时间了

```python
import datetime,timedelta
localtime = datetime.now()+timedelta(hours=8)
```

获取小时（格式化字符串）

```python
import datetime,timedelta
localtime = datetime.now()+timedelta(hours=8)
print(localtime.strftime("%H"))
```