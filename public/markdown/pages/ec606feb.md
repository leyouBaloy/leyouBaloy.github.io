# NGINX学习笔记

> 发布于：2021-08-02 | 分类：笔记 | 原文：https://leyoubaloy.github.io/post/ec606feb

# NGINX

### nginx常用命令

```shell
whereis nginx #找到nginx目录
cd /usr/local/nginx/sbin #sbin是存放命令的目录
```

```shell
./nginx #启动nginx
```

```shell
./nginx -s stop #停止
```

```shell
./nginx -s quit #优雅退出
```

```shell
./nginx -s reload #重新加载配置文件（常用
```

```shell
ps auxgrep nginx #查看Nginx进程
```

### 配置文件

```shell
# /usr/sbin/nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

配置文件解释参考： [https://blog.csdn.net/tjcyjd/article/details/50695922](https://blog.csdn.net/tjcyjd/article/details/50695922)
