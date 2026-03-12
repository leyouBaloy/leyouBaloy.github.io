---
title: "Linux输出重定向以及crontab的坑"
author: 孙百乐
date: 2022-07-13T11:14:42+08:00
draft: false
categories: 
- 技能分享
- 笔记
---

有一个python脚本，需要每天定时执行。我想使用crontab解决，但是无论怎样都不生效，最后问了专业人士（我表哥）才解决。下面分享一下踩过的坑：

## 编辑crontab

首先执行

```shell
crontab -e
```

编辑cron表达式，注意：每个用户都有自己的crontab，如果想省事的话建议直接

```shell
sudo crontab -e
```

只使用root用户的就好了。

## 写cron表达式

一行一个。一般自己在执行脚本的时候在终端里打的是`python 脚本.py`，但是在cron里可能会有问题。最好把所有的路径都换成绝对路径，比如`/usr/bin/python3.8 /home/ubuntu/脚本.py`，前面加上时间（比如说每天23点执行），完整如下：

```shell
0 23 * * * /usr/bin/python3.8 /home/ubuntu/脚本.py
```

注意：有的时候python脚本里会打开其它文件（存在其它文件的相对路径），这个时候必须得cd到当前目录下才可以正确执行，改成如下：

```shell
0 23 * * * cd /home/ubuntu/ && /usr/bin/python3.8 /home/ubuntu/脚本.py
```

## 输出重定向

有几个符号要认识一下：

```
> file      // 标准输出重定向到文件-覆盖
>>file      // 标准输出重定向到文件-追加
2>file      // 标准错误重定向到文件-覆盖
2>>file     // 标准错误重定向到文件-追加
2>/dev/null // 标准错误重定向到回收站
&>file      // 标准输出和标准错误重定向到文件-覆盖
>>file 2>&1 // 标准输出和标准错误重定向到文件-追加
```

偷懒的话，就用最后一个就可以啦。把所有的输出（包括报错）都输出到自己定义的日志文件里，这个很实用，因为你的脚本一旦出现问题，查日志是很好的追溯手段。所以表达式又复杂一点：

```shell
0 23 * * * cd /home/ubuntu/ && /usr/bin/python3.8 /home/ubuntu/脚本.py >> /home/ubuntu/out.log 2>&1
```

最后还可以加一个`&`，表示后台执行：

```shell
0 23 * * * cd /home/ubuntu/ && /usr/bin/python3.8 /home/ubuntu/脚本.py >> /home/ubuntu/out.log 2>&1 &
```



