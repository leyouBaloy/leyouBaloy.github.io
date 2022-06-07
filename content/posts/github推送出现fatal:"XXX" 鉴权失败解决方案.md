---
author: 孙百乐
categories:
- 技能分享
date: 2021-11-21 09:04:54
draft: false
title: github推送出现fatal:"XXX" 鉴权失败解决方案
---

### 问题描述

![](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/mypic/wp-content/uploads/2021/11/image-3-1024x215.png)

如图，有一天在push的时候要求输入Username和Password，输入了GitHub登录名和密码后，提示“鉴权失败”。

### 解决方案

看它给的提示，Please see https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information.

> [2020年7月](https://github.blog/2020-07-30-token-authentication-requirements-for-api-and-git-operations/)，我们宣布打算要求对所有经过身份验证的Git操作使用基于令牌的身份验证（例如，个人访问、OAuth或GitHub应用程序安装令牌）。从2021年8月13日开始，在GitHub.com上验证Git操作时，我们将不再接受帐户密码。

也就是说输入的Password不是登录密码，而是这个Access Token！另外，Username也不是用户名，而是登录邮箱。

获取个人Access Token的方法：https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token

记得一定要把repo的权限勾选上

![选择令牌范围](https://docs.github.com/assets/images/help/settings/token_scopes.gif)

## 在命令行上使用令牌

一旦您拥有了令牌，在通过HTTPS执行Git操作时，您可以输入令牌而不是密码。

例如，在命令行中，您将输入以下内容：

```
$ git clone https://github.com/username/repo.git
Username: your_username
Password: your_token
```

### 后续

怎么把Access Token添加到环境变量里呢？