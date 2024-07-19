---
author: 孙百乐
categories:
- 技能分享
date: 2021-08-29 21:19:42
draft: false
title: jupyter-paddle使用docker安装
---

### 安装

参考地址：paddlepaddle.org.cn/install/quick?docurl=/documentation/docs/zh/install/docker/linux-docker.html

先安装docker，参考官网

拉取镜像：

`docker pull registry.baidubce.com/paddlepaddle/paddle:2.1.2-jupyter`

运行容器

```python
docker run -d -p 8080:80 --rm --env USER_PASSWD=sbl -v /root/jupyter_docker:/home/paddle registry.baidubce.com/paddlepaddle/paddle:2.1.2-jupyter

# -d表示后台运行
# -p端口，指定宿主机的8080端口映射到容器内80端口
# --rm运行完删除容器
# USER_PASSWD=密码
# -v挂载，对应容器内的jupyter目录
```

这里有个坑，访问ip地址:8080进入notebook的时候，还有一个账号，默认是paddle

### 容器内安装dlib

更新apt:

在安装 g++ 等工具时 会提示 Unable to locate package build-essential，这种情况下先执行

```
sudo apt-get update
```

更新一下， 更新完。继续

```
sudo apt-get install build-essential
```

使用apt安装依赖：

`` `sudo apt-get install build-essential cmake` ``

`` `sudo apt-get install libgtk-3-dev` ``

`` `sudo apt-get install libboost-all-dev` ``

pip安装 dlib

`pip install dlib`

> 作者：花花儿 链接：[https://www.zhihu.com/question/34524316/answer/182278536](https://www.zhihu.com/question/34524316/answer/182278536) 来源：知乎 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。