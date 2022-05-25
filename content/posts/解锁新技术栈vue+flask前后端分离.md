---
title: "解锁新技术栈vue+flask前后端分离"
author: 孙百乐
date: 2022-05-25T23:41:05+08:00
draft: false
categories: 
- 技能分享
---

## Vue

之前有小程序开发基础，上手Vue稍微容易一点，但也走了很长一段路。学习框架，理解逻辑是最重要的，一旦理解了逻辑，写代码就可以听着歌边查文档边写了。前端框架逻辑都差不多，一通百通，很开心能掌握这项技术。

我的学习路线：

* 先了解web基础知识，比如http，get，post请求等等
* 了解html，css，js等前端基础知识（非常基础，我甚至没写过一行css代码
* 看b站的手把手教学视频（非常长，只需要看一部分就可以啦
* 看Vue官方文档（不建议新手直接看，很难懂

Vue官方文档：https://cn.vuejs.org/

一个案例（后台管理系统：

* 教学视频：https://www.bilibili.com/video/BV14y4y1M7Nc?spm_id_from=333.1007.top_right_bar_window_default_collection.content.click

* 源代码：https://gitee.com/xqnode/springboot-vue-demo



## Vue Cli

Vue的脚手架工具，配合编译器Vscode就可以拿来直接开发Vue啦

同样是看b站手把手教学视频，官方文档，搜索引擎搜索问题



## ElementUI

https://element.eleme.io/

大名鼎鼎的UI工具，不用手写样式啦



## 通信axios，解决跨域问题

前后端通信，主流的解决方案是使用axios，视频里有演示如何在Vue里使用axios，也非常方便。

跨域问题是由于浏览器为了安全性拒绝向其它ip或端口的地址发送请求，vue的解决方案是它帮你在后台发送请求，部署的时候用nginx可以非常方便的解决



## 后端Flask

直接看官方文档，很简单好用，做小项目速度起飞



## 数据库

团队项目用腾讯云或阿里云云MySQL数据库，一年也就几块钱

小项目直接SQLite，开发速度起飞



## 部署

我针的针的没想到我能一次性部署成功～

首先把前端build一下

```shell
npm run build
```

产生dist文件夹，直接拖到服务端（我使用的是ubuntu

配置nginx（要改的地方已标出

```nginx
server {
        listen       80;
        server_name  你的server_name，ip or 域名;

        location ^~ /api {
            rewrite  ^/api/(.*)$ /$1 break; # 解决跨域，路径替换，把前端中的/api替换掉
            proxy_pass   http://localhost:9090; # 后端地址
            add_header Access-Control-Allow-Methods *;
            add_header Access-Control-Max-Age 3600;
            add_header Access-Control-Allow-Credentials true;
            add_header Access-Control-Allow-Origin $http_origin;
            add_header Access-Control-Allow-Headers $http_access_control_request_headers;
            if ($request_method = OPTIONS ) {
                return 200;
            }
        }

        location / {
            root   /home/ubuntu/sgjyb/vue2/dist; # 前端路径
            index  index.html index.htm;
            add_header 'Access-Control-Allow-Origin' '*';
            try_files $uri $uri/ /index.html;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
```

然后可以测试一下能不能访问

最后部署后端：在服务器上装python=>上传后端到服务器=>运行

可以使用screen让它一直保持运行



