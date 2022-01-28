---
author: 孙百乐
categories:
- 技能分享
date: 2021-08-29 21:20:21
draft: false
title: Conda 配置虚拟环境
---

### 创建虚拟环境

```
conda create -n 名字 python=3.8
```

### 进入虚拟环境

```
conda activate 名字
```

### 退出虚拟环境

```
conda deactivate
```

### 删除虚拟环境

```
conda remove -n 名字 --all
```

### 查看环境下已有安装包

```
conda list
```

### 查看已有虚拟环境

```
conda-env list
```

### jupyter notebook使用虚拟环境

安装一个库

```
pip install ipykernel
```

往kernel里写入虚拟环境

```
python -m ipykernel install --user --name 环境名字 --display-name 显式的名字 a
```

虚拟环境里没有notebook，安装一下

```
pip install notebook
```

启动

```
ipython notebook
```

在Notebook里更换环境：

Kernel => Change kernel => 环境名

![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads/2021/08/image-20210813181313433-1024x634.png)