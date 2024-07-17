---
author: 孙百乐
categories:
- 笔记
date: 2021-08-08 11:08:25
draft: false
title: django笔记进阶
---

## models

#### 写入新数据，返回此条新数据

`` `new_data = Queue.objects.create(**queue_dic)` ``

访问新写入数据的id字段

`` `new_data.id` ``

#### 查询数据

查询一条数据

`` `student = Student.objects.get(name='django')` ``

查看字典类型

`` `student.__dict__(前后两个下划线)` ``

筛选多条数据

`` `student = Student.objects.filter(name='python')` ``

它返回的student是一个对象的列表，可以看的出来student\[0\]和上面的get方式返回的student的结果是一样的。

#### 修改数据库

对单一数据修改

```
data = Queue.objects.filter(statue=-1)[0]
data.score = points
data.msg = errorLst
data.statue = 1
data.save()
```

批量修改

```
Queue.objects.filter(id=1).update(username='nick',is_active=True)
```

## screen

新建窗口

`` `screen -S 名称` ``

连接到窗口

`` `screen -r 名称` ``

强制连接

`` `screen -D -r 名称` ``

查看列表

`` `screen -ls` ``

## python导包

导入上级目录的包

```python
import sys 
sys.path.append("..") 
import xxx
```

**sys.path的作用：**当使用import语句导入模块时，解释器会搜索当前模块所在目录以及sys.path指定的路径去找需要import的模块，所以这里是直接把上级目录加到了sys.path里。

**“..”的含义：**等同于linux里的‘..’，表示当前工作目录的上级目录。实际上python中的‘.’也和linux中一致，表示当前目录。

## django-crontab定时任务

django-crontab还挺方便的，但是不好使:[https://www.jianshu.com/p/b1ac0d7ae20c](https://www.jianshu.com/p/b1ac0d7ae20c)

django-crontab官网：[django-crontab · PyPI](https://pypi.org/project/django-crontab/)

cron表达式：[https://cloud.tencent.com/developer/article/1343175](https://cloud.tencent.com/developer/article/1343175)

菜鸟教程linux：[https://www.runoob.com/w3cnote/linux-crontab-tasks.html](https://www.runoob.com/w3cnote/linux-crontab-tasks.html)

```
crontab -e #编写cron
```

```
python3 manage.py crontab add
python3 manage.py crontab remove
python3 manage.py crontab show
```

linux中cron表达式有五位数

（秒）\[分 时 日 月 星期\] （年）

秒和年都不是unix系统自带的

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

其它，在这里https://www.bilibili.com/video/BV19t411G7KU?from=search&seid=1398478951454031547

## 在外部使用django的orm

```python
import sys
import os
from django.core.wsgi import get_wsgi_application
sys.path.extend(['/autoReport',]) #修改django项目位置
os.environ.setdefault("DJANGO_SETTINGS_MODULE","autoReport.settings") #修改自己的django项目名
application = get_wsgi_application()

from home.models import Reportinfo
```

## 部署

#### gunicron

安装

```
pip3 install gevent
```

```
pip3 install gunicorn
```

配置文件，和settings.py放在同一目录

```python
# gunicorn.py
import logging
import logging.handlers
from logging.handlers import WatchedFileHandler
import os
import multiprocessing
bind = '0.0.0.0:1234'      #绑定ip和端口号
backlog = 512                #监听队列
chdir = '/autoReport'  #gunicorn要切换到的目的工作目录
timeout = 30      #超时
worker_class = 'gevent' #使用gevent模式，还可以使用sync 模式，默认的是sync模式

workers = multiprocessing.cpu_count() * 2 + 1    #进程数
threads = 2 #指定每个进程开启的线程数
loglevel = 'info' #日志级别，这个日志级别指的是错误日志的级别，而访问日志的级别无法设置
access_log_format = '%(t)s %(p)s %(h)s "%(r)s" %(s)s %(L)s %(b)s %(f)s" "%(a)s"'    #设置gunicorn访问日志格式，错误日志无法设置

"""
其每个选项的含义如下：
h          remote address
l          '-'
u          currently '-', may be user name in future releases
t          date of the request
r          status line (e.g. ``GET / HTTP/1.1``)
s          status
b          response length or '-'
f          referer
a          user agent
T          request time in seconds
D          request time in microseconds
L          request time in decimal seconds
p          process ID
"""
accesslog = "/autoReport/gunicorn_access.log"      #访问日志文件
errorlog = "/autoReport/gunicorn_error.log"        #错误日志文件
```

启动服务器

```
gunicorn -c ./autoReport/gunicorn_conf.py autoReport.wsgi:application
```

关闭

```
fuser -k 1234/tcp
```

#### nginx

用宝塔