---
author: 孙百乐
categories:
- 笔记
date: 2021-03-15 23:02:45
draft: false
title: Django学习笔记
---

### 安装虚拟环境

在Powershell中执行

```
Set-ExecutionPolicy Unrestricted
#执行策略更改
y #yes
pip freeze #输出所有在本地已安装的包
```

```
pip install virtualenv
cd 目标文件夹
virtualenv . #在当前目录创建虚拟环境
.\Scripts\activate #切换虚拟环境
deactivate #取消虚拟环境
```

### 安装django

```
pip install django
```

### 创建django项目

```
django-admin startproject 项目名(mysite)
cd ./mysite
code . #用vscode启动
python manage.py runserver #启动服务器
```

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads//2021/03/image-7-9.png)

解决报错信息

```
python manage.py migrate #注意要在mysite目录下执行
```

### 配置路由urls

在虚拟环境中，且在mysite目录下

```
python manage.py startapp 名字(misterwu)
```

在mysite的settings.py里的INSTALLED\_APPS里添加'misterwu'进行关联

在mysite的urls.py里添加import path,include，再添加一个urlpatterns

在misterwu里新建一个urls.py，把mysite里的urls拷贝到这里

删掉import admin和第二行末尾的path

删掉urlpatterns里的内容

### 展示html页面

在misterwu的urls.py的urlpatterns里添加

```
path('',views.home,name="home")
```

还要在前面添加

```
from . import views
```

在misterwu的views.py里定义一个"home"方法

```
def home(request):
  return render(request,'home.html',{})
```

在misterwu下创建一个新文件夹templates，在下面创建home.html，在里面写

```
<h1>hello world!</h1>
```

### 创建公共html模板

打开www.bootcss.com，进入bootstrap4中文文档，初学者模板，拷贝一份

```
<!doctype html>
<html lang="zh-CN">
  <head>
    <!-- 必须的 meta 标签 -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap 的 CSS 文件 -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">

    <title>Hello, world!</title>
  </head>
  <body>
    <h1>Hello, world!</h1>

    <!-- JavaScript 文件是可选的。从以下两种建议中选择一个即可！ -->

    <!-- 选项 1：jQuery 和 Bootstrap 集成包（集成了 Popper） -->
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-LCPyFKQyML7mqtS+4XytolfqyqSlcbB3bvDuH9vX2sdQMxRonb/M3b9EmhCNNNrV" crossorigin="anonymous"></script>

    <!-- 选项 2：Popper 和 Bootstrap 的 JS 插件各自独立 -->
    <!--
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.min.js" integrity="sha384-gRC4eoaRyQ8xv2X6Mnf+eOIrtON3wId3dAkwO0HQX26OrFBoLpjX/XWOJacSiZhL" crossorigin="anonymous"></script>
    -->
  </body>
</html>
```

在misterwu下的templates里新建一个base.html，把初学者模板拷贝到这里

然后在home.html里添加代码，最终样子如下:

```
{% extends 'base.html'%}

{% block content %}
  <h1>hello world!</h1>
  <p>测试是否可以看到我!</p>
{% endblock %}
```

然后在base.html的body里调用这个代码块(这种写法貌似是php里的)

```
...
<body>
link1link2link3
{% block content %}
{% endblock %}
...
```

### 展示导航信息

在base.html的导航那一部分替换成如下代码：

```
<br>
<div class="container">
  {% block content %}
  {% endblock %}
</div>
```

从bootstap上找到导航条源码

```
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
```

上述代码也粘贴到<body>下面

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads//2021/03/image-7-10-1024x184.png)

效果图

把home所在的<li></li>标签都删掉

dropdown，disabled标签也删掉

把Navbar改掉，如（米斯特务）

search也可以改掉

### 接口介绍

pass

### 接口请求和解析

在misterwu的views.py的 def home(request)函数中加入以下代码：

```
import requests
import json
api_request = requests.get("https://api.github.com/users?since=0")
api = json.loads(api_request.content)
```

注意，在虚拟环境里先装requests

然后在return render(request,'home.html',{})后面的空字典里添加：

```
return render(request,'home.html',{"api":api})
```

来到home.html，在{%block content%}...{%endblock%}内添加

```
<p>{{api}}</p>
```

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads//2021/03/image-11-2-1024x433.png)

成功！

### 展示数据信息

在misterwu的home.html的block里写入

```
<div class="container">
  <div class="row">
    {% for x in api %}
    <div class="col-sm">
      <div class="card" style="width: 18rem;">
        <img src="{{x.avatar_url}}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">{{x.login}}</h5>
          <p class="card-text">{{x.login}}的github</p>
          <a href="{{x.html_url}}" class="btn btn-primary">点进他的博客主页</a>
        </div>
      </div>
      <br>
    </div>>
    {% endfor %}
  </div>
</div>
```

上面代码中div里的内容是bootstrap4复制来的，原文如下

```
<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
```

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads//2021/03/image-13-2-1024x576.png)

### 搜索页面跳转

在misterwu的urls.py的urlpatterns里加入一行：

```
path('user/',views.home,name="user"),
```

在views.py里加入一个函数:

```
def user(request):
  return render(request,'user.html',{})
```

在templates里创建user.html，写入：

```
{% extends 'base.html'%}

{% block content %}
<h1>hello user</h1>

  {% endblock %}
```

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads//2021/03/image-7-12.png)

成功

在base.html的<form class="form-inline my-2 my-lg-0" >里，再加两个属性

```
method="POST" 
action="{% url 'user' %}"
```

并在下面加入

```
{% csrf_token %}
```

之后点搜索，就可以正常跳转了

在base.html的<form>下的<input>里面加一个属性name="user"

再到views.py里面的函数user里增加语句:

```
user = request.POST['user']
```

return render最后的字典里面写

```
{'user':user}
```

在user.html中改成

```
hello {{user}}
```

### 获取搜索数据

在base.html的<a class="navbar-brand" href="#">米斯特务</a>里添加属性

```
href = "{% url 'home' %}"
```

在<a class="nav-link" href="#">Link</a>里添加属性

```
href = "{% url 'user' %}"
```

“link”改成"查询"

在views.py的user函数中修改如下：

```
妈的，不想记了
```