---
author: 孙百乐
categories:
- 笔记
date: 2021-07-19 20:57:21
draft: false
title: docker笔记
---

# 打开docker服务

```shell
systemctl start docker
```

# docker一直在后台运行

`` `docker run -dit judge:0.2 /bin/bash` ``

# 复制

`` `docker cp 容器id:容器内路径 目的主机路径` `` `` `docker cp /root/testPython/test01/ $(docker ps -q):/usr/src/app` `` `` `docker cp /root/testPython/judge_file_o.py $(docker ps -q):/usr/src/app/test01/judge` ``

# 容器外执行命令

`` `docker exec -it $(docker ps -q) /bin/bash -c "python /usr/src/app/test01/judge/judge_file_o.py"` ``

# 进入正在运行的容器

`` `docker exec -it $(docker ps -q) /bin/bash` `` `` `docker attach 容器id` ``

# 显示容器编号

`` `$(docker ps -q)` ``

# 将文件拷贝出来

`` `docker cp $(docker ps -q):/usr/src/app/test01/user/tmp.txt /root/testPython/` ``

# 强制删除容器

`` `docker rm -f $(docker ps -q)` ``

# 停止容器

```
docker stop 容器ID或容器名
```

优雅的停止容器

# 删除镜像

```
docker rmi -f 镜像id
docker rmi -f $(docker images -aq)
```

# MySql同步数据

### 拉取

```
docker search mysql
docker pull mysql:5.7
```

### 运行

```
docker run -d -p 3310:3306 -v /home/mysql/conf:/etc/mysql/conf.d -v /home/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=12345 --name mysql01 mysql:5.7
```

# \-d后台运行

# 3306是容器外端口

# \-v数据挂载；本地：容器

# 要配密码，怎么配？在dockerhub上帮助文档

# 容器名

# 所选镜像

# python操作数据库

`` `pip install mysqlclient` ``

使用mysqlclient，要自己写sql语句

```
conn= MySQLdb.connect(
        host='localhost',
        port = 3306,
        user='root',
        passwd='123456',
        db ='test',
        )
```

# 数据库权限

```sql
mysql>GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '123456' WITH GRANT OPTION;
 mysql>flush privileges;
// 其中各字符的含义：
// *.* 对任意数据库任意表有效
// "root" "123456" 是数据库用户名和密码
// '%' 允许访问数据库的IP地址，%意思是任意IP，也可以指定IP
// flush privileges 刷新权限信息
```

# Dockerfile

```
FROM # 基础镜像，当前新镜像是基于哪个镜像的 
MAINTAINER # 镜像维护者的姓名混合邮箱地址 
RUN # 容器构建时需要运行的命令 
EXPOSE # 当前容器对外保留出的端口 
WORKDIR # 指定在创建容器后，终端默认登录的进来工作目录，一个落脚点 
ENV # 用来在构建镜像过程中设置环境变量 
ADD # 将宿主机目录下的文件拷贝进镜像且ADD命令会自动处理URL和解压tar压缩包 
COPY # 类似ADD，拷贝文件和目录到镜像中！ 
VOLUME # 容器数据卷，用于数据保存和持久化工作 
CMD # 指定一个容器启动时要运行的命令，dockerFile中可以有多个CMD指令，但只有最 后一个生效！ 
ENTRYPOINT # 指定一个容器启动时要运行的命令！和CMD一样 
ONBUILD # 当构建一个被继承的DockerFile时运行命令，父镜像在被子镜像继承后，父镜像的 ONBUILD被触发
```