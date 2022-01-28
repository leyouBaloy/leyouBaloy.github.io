---
author: 孙百乐
categories:
- 技能分享
date: 2021-11-24 18:58:03
draft: false
title: Mac上自动连接校园网的脚本
---

## 起因

傻逼Mac，每次开屏幕都要重新输入账号密码运营商连接校园网，所以我想办法用脚本去实现连接校园网的操作。

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads/2021/11/image-5.png)

mac可以直接运行shell脚本，写一个超级简单的脚本放在桌面，每次点一下就可以自动连接校园网了。

## 第一步

从GitHub上下载一段自动连接校园网的python代码，地址：[https://github.com/UPCUnofficial/UPCNet](https://github.com/UPCUnofficial/UPCNet)

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads/2021/11/image-6.png)

然后解压，修改其中config.py文件。

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads/2021/11/image-7.png)

在config.py文件下输入学号、密码和运营商编号，然后运行

```
python3 NetworkAuth.py
```

运营商对应编号：

```
default -> 校园网
unicom -> 联通
cmcc -> 移动
ctcc -> 电信
local -> 校园内网
```

再用终端cd进入该文件夹，pip install 所依赖的库。

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads/2021/11/image-8-1024x823.png)

运行代码。(以上所述在readme里都有）

```
python3 NetworkAuth.py
```

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads/2021/11/image-9-1024x666.png)

成功啦！

## 第二步

用文本编辑器创建一个文件，里面打上这行代码：

```
python 你的路径/NetworkAuth.py
```

将文件重命名为XXXX.sh

然后右键—>打开方式—>其它—>所有应用程序—>终端

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads/2021/11/image-10-1024x573.png)

然后把它放在桌面，每次等连上wifi后点一下就能连接校园网啦。[](https://github.com/UPCUnofficial/UPCNet#%E7%9B%AE%E5%89%8D%E6%94%AF%E6%8C%81%E7%9A%84%E7%BD%91%E7%BB%9C%E7%B1%BB%E5%9E%8B)