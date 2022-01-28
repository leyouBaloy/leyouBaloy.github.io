---
author: 孙百乐
categories:
- 技能分享
date: 2021-08-08 08:20:29
draft: false
title: python发邮件
---

### QQ邮箱设置

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads/2021/08/QQ截图20210808081637.jpg) ![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads/2021/08/QQ截图20210808081707.jpg) ![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads/2021/08/QQ截图20210808081720.jpg)

### python代码

```
import json
import requests
import smtplib
from email.mime.text import MIMEText
from email.utils import formataddr
import re

#发邮件
def mail(my_sender,my_user,subject,msg_text):
    my_pass = 'XXXX'  # 发件人邮箱密码
    ret = 1
    try:
        msg = MIMEText(msg_text, 'html', 'utf-8')
        msg['From'] = formataddr(["XXX", my_sender])  # 括号里的对应发件人邮箱昵称、发件人邮箱账号
        msg['To'] = formataddr(["收件人昵称", my_user])  # 括号里的对应收件人邮箱昵称、收件人邮箱账号
        msg['Subject'] = subject  # 邮件的主题，也可以说是标题

        server = smtplib.SMTP_SSL("smtp.qq.com", 465)  # 发件人邮箱中的SMTP服务器，端口是25
        server.login(my_sender, my_pass)  # 括号中对应的是发件人邮箱账号、邮箱密码
        server.sendmail(my_sender, [my_user, ], msg.as_string())  # 括号中对应的是发件人邮箱账号、收件人邮箱账号、发送邮件
        server.quit()  # 关闭连接
    except Exception:  # 如果 try 中的语句没有执行，则会执行下面的 ret=False
        ret = 0
    return ret
```

### 时间判断

```
import datetime

# 范围时间
d_time = datetime.datetime.strptime(str(datetime.datetime.now().date())+'9:30', '%Y-%m-%d%H:%M')
d_time1 =  datetime.datetime.strptime(str(datetime.datetime.now().date())+'9:33', '%Y-%m-%d%H:%M')

# 当前时间
n_time = datetime.datetime.now()

# 判断当前时间是否在范围时间内
if n_time > d_time and n_time<d_time1:
    pass
```