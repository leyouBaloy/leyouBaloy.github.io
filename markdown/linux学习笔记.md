---
author: 孙百乐
categories:
- 笔记
date: 2021-08-08 11:09:47
draft: false
title: linux学习笔记
---

### 安装python

**1）安装依赖包** 安装 “Development tools” 软件组：

```
sudo yum groupinstall "Development tools"
```

因为 Python 3.7 源文件使用 zlib 格式打包，所以需要安装 zlib 软件包；Python 3.7 编译安装时需要使用 zlib 的头文件和链接库，所以需要安装 zlib 的头文件和链接库 zlib-devel 软件包：

```
sudo yum -y install zlib zlib-devel
```

Python 3 有个内置模块 ctypes，它是 Python 3 的外部函数库（Foreign function library），它需要使用系统外部函数库（libffi）的头文件和链接库，所以需要安装外部函数库（libffi）头文件和链接库 libffi-devel 软件包：

```
sudo yum -y install libffi-devel
```

2）运行如下命令配置、编译、安装 Python 3.7

```
wget https://www.python.org/ftp/python/3.7.0/Python-3.7.0.tar.xz
tar xJf Python-3.7.0.tar.xz
cd Python-3.7.0
sudo ./configure
sudo make
sudo make install
```

如果在编译安装时提示 zipimport.ZipImportError: can’t decompress data; zlib not available 错误，请查看关于 zlib 的解决方法。 如果在编译安装时提示 ModuleNotFoundError: No module named ‘\_ctypes’ 错误，请查看关于 ctypes 的解决方法。 3）安装完成后，Python 3.7 安装在了/usr/local文件夹中，可运行文件/usr/local/bin，库文件/usr/local/lib。因为 /usr/local/bin 在 Shell 路径中，所以可以直接在 Shell 中输入如下命令 python3 运行 Python 3.7 解释器。

### 升级sqllite3

亲测有效

```shell
[root@localhost /]#  sqlite3 --version
[root@localhost /]# wget https://www.sqlite.org/2019/sqlite-autoconf-3270200.tar.gz
[root@localhost /]# tar -zxvf sqlite-autoconf-3270200.tar.gz
[root@localhost /]# cd sqlite-autoconf-3270200
[root@localhost /]# ./configure --prefix=/usr/local
[root@localhost /]# make 
[root@localhost /]# make install
[root@localhost /]# find /usr/ -name sqlite3
＃检查版本
## 最新安装的sqlite3版本
[root@localhost /]## /usr/local/bin/sqlite3 --version
3.27.2 2019-02-25 16:06:06 bd49a8271d650fa89e446b42e513b595a717b9212c91dd384aab871fc1d0f6d7
[root@localhost /]# 

## Centos7自带的sqlite3版本
[root@localhost /]# /usr/bin/sqlite3 --version
3.7.17 2013-05-20 00:56:22 118a3b35693b134d56ebd780123b7fd6f1497668
[root@djangoServer ~]# 

## 可以看到sqlite3的版本还是旧版本，那么需要更新一下。
[root@localhost /]# sqlite3 --version
3.7.17 2013-05-20 00:56:22 118a3b35693b134d56ebd780123b7fd6f1497668
[root@localhost /]#

## 更改旧的sqlite3
[root@localhost /]# mv /usr/bin/sqlite3  /usr/bin/sqlite3_old

## 软链接将新的sqlite3设置到/usr/bin目录下
[root@localhost /]# ln -s /usr/local/bin/sqlite3   /usr/bin/sqlite3

## 查看当前全局sqlite3的版本
[root@localhost /]# sqlite3 --version
3.27.2 2019-02-25 16:06:06 bd49a8271d650fa89e446b42e513b595a717b9212c91dd384aab871fc1d0f6d7
[root@localhost /]#

＃将路径传递给共享库
# 设置开机自启动执行，可以将下面的export语句写入 ~/.bashrc 文件中，如果如果你想立即生效，可以执行source 〜/.bashrc 将在每次启动终端时执行
[root@localhost /]# export LD_LIBRARY_PATH="/usr/local/lib"

＃检查Python的SQLite3版本
[root@localhost /]#  ipython3
Python 3.7.1 (default, May  3 2019, 09:55:04) 
Type 'copyright', 'credits' or 'license' for more information
IPython 7.5.0 -- An enhanced Interactive Python. Type '?' for help.

In [1]: import sqlite3                                                     

In [2]: sqlite3.sqlite_version                                             
Out[2]: '3.27.2'

In [3]: exit                                             
————————————————
版权声明：本文为CSDN博主「Echo......」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_43883625/article/details/100709484
```

### cron表达式

linux中cron表达式有五位数 （秒）\[分 时 日 月 星期\] （年） 秒和年都不是unix系统自带的

```
21 17 14 7 7 #在7月14日星期天17时21分执行，只执行一次
```

“\*” 表示每一

```shell
20 * * * * #每小时的20分钟执行一次，一天执行24次
```

```shell
20,40 * * * * #每小时的20分钟，40分钟执行一次，一天执行48次
```

```shell
20-40 * * * * #每小时的20到40分钟执行，每分钟执行一次，闭区间，每小时执行21次
```

```shell
*/2 * * * * #0,2,4,6...58分钟时执行
```

其它，在这里https://www.bilibili.com/video/BV19t411G7KU?from=search&seid=1398478951454031547 有的时候，在crontab里必须把命令写全，路径要是绝对路径，例如： \* \* \* \* \* /root/.pyenv/shims/python3.7 /home/mail.py >> /home/mail.log

### 解压

filename.zip的解压: `unzip filename.zip` filename.tar.gz的解压: `tar -zxvf filename.tar.gz` 其中zxvf含义分别如下 z: 　　gzip 　　　　　　　　 压缩格式 x: 　　extract　　　　　　　　 解压 v:　　 verbose　　　　　　　　详细信息 f: 　　file(file=archieve)　　　　文件

### 查看时间

```
date
```