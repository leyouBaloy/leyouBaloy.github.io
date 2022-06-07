---
title: "Yolov5训练自己的目标检测模型"
author: 孙百乐
date: 2022-02-28T22:34:57+08:00
draft: false
categories: 
- 技能分享
---

# yolov5训练自己的目标检测模型

## yolov5

yolo是当前最火的目标检测模型之一，效果很好速度很快，也很适合小白上手。yolov5是yolo的第五代模型。

项目地址：[https://github.com/ultralytics/yolov5](https://github.com/ultralytics/yolov5)

克隆下来之后，用`pycharm`打开，选择3.8版本的python解释器，自动安装依赖。

## 制作数据集

数据集在线打标网站：[https://www.makesense.ai/](https://www.makesense.ai/)

打标完成后可以下载符合yolo格式的txt文件。

然后需要对数据集进行组织。

我的数据集目录如下：

```
screwdata
├── images
│   ├── test
│   │   ├── 若干测试图片.jpg
│   └── train
│       ├── 若干训练图片.jpg
└── labels
    ├── test
    │   ├── 若干测试图片的标签.txt
    ├── train
    │   ├── 若干训练图片的标签.txt
```

注意：images目录下的图片文件名需和labels目录下的文件名保持一致（后缀名不同）

其中测试/训练图片的标签文件为文本文件，其格式如下：

```txt
0 0.991121 0.932710 0.017757 0.059813
```

0表示类别，这里我只用到一个类别，后面四个数字表示矩形选框四个顶点的位置。

还需准备一个yaml配置文件：

```yaml
# screwdata.yaml
train: /Users/sunbaile/yolov5/screw/images/train # 训练集path
val: /Users/sunbaile/yolov5/screw/images/test # 验证集path

# Classes
nc: 1
names: ['screw_missing'] # class names
```

## 训练

在yolov5根目录下有`train.py`文件，修改其data字段：

```python
parser.add_argument('--data', type=str, default=ROOT / 'data/screwdata.yaml', help='dataset.yaml path') # screwdata.yaml就是前面配置的数据集配置文件
```

右键运行即可开始训练，训练结果会保存到runs/train目录下。

可以使用colab提供的免费gpu算力进行训练，亲测很好用：

[https://colab.research.google.com/](https://colab.research.google.com/)

训练完把权重下载下来即可。

## 推理

负责推理的文件是`detect.py`。

使用命令行工具进行推理，在终端键入：

```shell
python detect.py --source 图片路径 --weights 权重路径
```

举个例子：

```shell
python detect.py --source /Users/sunbaile/yolov5/screw/images/test/CPU风扇-缺2颗螺丝2.jpg --weights /Users/sunbaile/yolov5/runs/train/exp/weights/best.pt --conf-thres 0.5
# 这里我加了一个conf-thres 0.5 表示置信度高于0.5才标记
```

推理结果保存在`runs/detect/exp`

![image-20220228223237431](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/mypic/img/image-20220228223237431.png)

效果不错！



## 参考资料

> 目标检测 YOLOv5 开源代码项目调试与讲解实战【土堆 x 布尔艺数】: https://www.bilibili.com/video/BV1tf4y1t7ru?p=8&spm_id_from=333.1007.top_right_bar_window_history.content.click
>
> 感谢土老师的教学视频。


