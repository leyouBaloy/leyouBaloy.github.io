---
title: "Linux在指定时间区间内的随机时间点执行任务"
author: 孙百乐
date: 2022-10-23T23:52:09+08:00
draft: false
categories: 
- 技能分享
- 笔记
---

在Linux上如果你有一个定时任务需要执行，只需要在crontab中设置一个触发器就可以啦。

现在升级需求，比如说我想在6:00到9:00之间，随机找一个时间执行这个任务，怎么做呢？

思路：我们不能在crontab里指定一个随机的时间（只能指定一个具体的时间），但是我们可以指定一个具体的时间运行`shell`脚本，再在shell脚本里设置一个延迟执行，这样就能解决问题啦！

## example

假如xxx.py是我们要执行的程序，我们需要它执行的时间是从6:00到9:00之间随机一个时间，那么，

crontab中这样编辑：

```
0 6 * * * sh /home/ubuntu/xxxx.sh >> /home/ubuntu/xxxx.log 2>&1 &
```

xxxx.sh这样写:

```shell
#!bin/bash
# 随机等待0～180分钟
sleep $[( $RANDOM % 180 )*60]
curtime = $(date "+%Y-%m-%d %H:%M:%S")
# 输出当前时间
echo $curtime
# 运行程序
/usr/bin/python3.8 /home/ubuntu/xxxx.py >> /home/ubuntu/xxxx.log 
```

完成！
