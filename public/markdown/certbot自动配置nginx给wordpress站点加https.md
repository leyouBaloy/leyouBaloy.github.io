---
author: 孙百乐
categories:
- 技能分享
date: 2021-09-08 22:42:40
draft: false
title: certbot自动配置nginx给wordpress站点加https
---

# 思路

1.  安装snap
2.  安装certbot
3.  自动配置nginx

完事儿了，确实很方便。具体执行语句访问 [https://certbot.eff.org/](https://certbot.eff.org/) 按下图选择环境后就能看到所有执行语句 ![](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/mypic/wp-content/uploads/2021/09/certbot选择环境-1024x222.png)

# 踩过的坑

### 配置nginx的时候报错如图

![](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/mypic/wp-content/uploads/2021/09/certbot报错-1024x432.png)

报错的意思就是说，在nginx的配置文件中server\_name字段不正确。我把它修改成了aiupc.xyz，仍然报错。

后来问了我哥，才知道nginx配置文件最底下有一行：

![](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/mypic/wp-content/uploads/2021/09/includevhost.png)

wordpress真正的配置文件其实是在/usr/local/nginx/conf/vhost文件夹里。把这个里面的server\_name改一下就OK了。

### server\_name不能随意

`server_name = aiupc.xyz` 和 `server_name = www.aiupc.xyz` 是不一样的，弄混的话会导致站点一些图片链接浏览器不予显示。

我的解决方案：nginx配置`server_name = www.aiupc.xyz`，`server_name = aiupc.xyz`, 域名解析`aiupc.xyz`和`www.aiupc.xyz`， certbot给`aiupc.xyz`和`www.aiupc.xyz`都申请证书， wordpress后台设置里url写`https://www.aiupc.xyz`， 这样，在浏览器中打`aiupc.xyz`也会跳转到`www.aiupc.xyz` 的，这个问题应该已经彻底解决了。