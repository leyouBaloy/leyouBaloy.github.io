---
title: "Kaggle图像分类竞赛实战总结详细代码解读"
author: 孙百乐
date: 2022-12-29T12:37:38+08:00
draft: false
categories: 
- 笔记
- 技能分享
---

## 前言

我是跟着李沐的`动手学深度学习v2`视频学习深度学习的，光看不做假把式，所以在学习完`第七章-现代卷积神经网络`之后，参加了一次李沐发布的Kaggle竞赛。自己动手，从组织数据集开始，到训练，再到推理，把整个流程走了一遍，收获颇丰，感觉学到了很多东西，（完整代码：https://www.kaggle.com/code/leyoubaloy/competition-classifyleaves/notebook?scriptVersionId=114980812 ）现总结如下：

## 组织数据集

我相信很多小伙伴跟我一样，学习深度学习不是为了在这个领域做出创新性的贡献，而是仅仅会用它解决实际问题即可，但是在用别人的模型的过程中卡在了第一步——组织数据集。

先搞明白两个类，Dataset和Dataloader（需要有python面向对象知识基础）。Dataset是对整体数据集的一个抽象，它定义了数据的读取方法等属性，而Dataloader是用于训练和、评估和测试的迭代器，它能控制batch_size，shuffle等属性。Dataset代码的编写是很灵活的，针对不同的数据集有不同的写法，想要会用深度学习一定先学会写Dataset类。

```python
class MyDataset(Dataset):
    def __init__(self, mode='train', valid_ratio=0.2, resize_height=256, resize_width=256):
        self.resize_height = resize_height
        self.resize_width = resize_width
        self.mode = mode
        
        
        if mode == 'train':
            data = pd.read_csv('/kaggle/input/classify-leaves/train.csv')
            self.train_len = int(data.shape[0] * (1 - valid_ratio))
            self.train_image = np.asarray(data.loc[:self.train_len, 'image'])
            self.train_label = np.asarray(data.loc[:self.train_len, 'label'])
            self.image_arr = self.train_image
            self.label_arr = self.train_label
        elif mode == 'valid':
            data = pd.read_csv('/kaggle/input/classify-leaves/train.csv')
            self.train_len = int(data.shape[0] * (1 - valid_ratio))
            self.valid_image = np.asarray(data.loc[self.train_len:, 'image'])
            self.valid_label = np.asarray(data.loc[self.train_len:, 'label'])
            self.image_arr = self.valid_image
            self.label_arr = self.valid_label
        elif mode == 'test':
            data = pd.read_csv('/kaggle/input/classify-leaves/test.csv')
            self.test_image = np.asarray(data.loc[:, 'image'])
            self.image_arr = self.test_image
        self._len = len(self.image_arr)
    
    def __getitem__(self, index):
        image_path = self.image_arr[index]
        image = Image.open(os.path.join('/kaggle/input/classify-leaves/', image_path))
        if self.mode == 'train':
            transform = transforms.Compose([transforms.RandomResizedCrop(224),
                                 transforms.RandomHorizontalFlip(),
                                 transforms.ToTensor(),
                                 transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])])
        else:
            transform = transforms.Compose([transforms.Resize(256),
                               transforms.CenterCrop(224),
                               transforms.ToTensor(),
                               transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])])
            
        image = transform(image)
        
        if self.mode == 'test':
            return image
        
        label = self.label_arr[index]
        label_num = label2num[label]
        return image, label_num
    
    def __len__(self):
        return self._len
```

这次竞赛等数据集是一个树叶图像分类数据集，在我的代码中定义了一个MyDataset类，在init方法中，我用pandas读取图像列表为一个Series。在getitem方法中，传入一个参数index，用Image库读取第index个图像，再用transforms对它做一些预处理（包括resize、裁切、转化成tensor、标准化），使其能够被输入到神经网络。

有三种模式，训练、验证和测试。训练和验证模式的数据是从训练集中划分的，是有标签的，而测试集是没有标签的，需要我们训练完推理得到答案，上传答案。在训练模式下，随机裁切图像即可，但是验证和测试模式最好用中心裁切，使待测试的图像尽可能完整的输入到网络中。训练和验证模式的getitem返回的是tensor和label，而测试模式返回的是tensor。

然后就可以实例化，得到train_dataset，valid_dataset，test_dataset。

```python
train_dataset = MyDataset(mode='train')
valid_dataset = MyDataset(mode='valid')
test_dataset =  MyDataset(mode='test')
```



最后用dataset生成dataloader，这个就很简单了，传几个参数就可以。batch_size是每个batch的训练样本个数，shuffle是否打乱数据，num_worker是读取数据所用的进程数，因为读取数据通常比较花时间，所以有时候需要用不止一个进程来读取数据。对于训练和验证数据，需要打乱，对于测试数据就不需要打乱了。

```python
train_loader = DataLoader(train_dataset, batch_size=10, shuffle=True, num_workers=2)
valid_loader = DataLoader(valid_dataset, batch_size=10, shuffle=True, num_workers=2)
test_loader = DataLoader(test_dataset, batch_size=10, shuffle=False, num_workers=2)
```



## label的格式

这个问题困扰了我比较久。这是一个176类的分类问题，模型输出的是有176个元素的向量，可以理解为向量中的每个元素表示该样本属于此类的概率，所以我们选择最大的元素值的index即可，也就是argmax。

按理来说，我们的label的格式也应该是one-hot编码，然鹅这样太占内存了，所以，在pytorch中规定我们的label格式是index，即只有一个数字，表示所属类的下标。

现实中的label往往是字符串，要先对其编码，用两个字典就可以了，num2label和label2num。

```python
labels = train['label'].unique()
label2num = {}
for idx,label in enumerate(labels):
    label2num[label] = idx
print('label2num:',label2num)
num2label = { a : b for b, a in label2num.items()}
print('num2label:',num2label)
```



## 网络调整

网络需要改的地方是输入size和输出size，在d2l第七章的教学中mnist数据集是黑白的，输入只有一个通道，而我们的数据集是彩色的，有三个通道，所以要改一下。mnist的输出是10类，而我们的输出有176类，这个也要改一下。

## 损失函数

训练过程是一个epoch一个epoch进行训练的，所以网络的输入输出都是是若干个样本，损失也是若干个样本一起计算一次损失。分类任务常用的是交叉熵损失，即nn.CronssEntropyLoss()，它的输入是y_hat和y_real，注意哟这两个格式是不一样的，y_hat是模型的输出，类似于one-hot编码，而y_real只是一个index。

关于这个损失函数，最好理解一下，上百度搜一下它是怎么计算类别的损失的。

## 如何推理

验证精度和推理测试集的时候都需要用到推理，推理也是分epoch进行的，推理时要把自动梯度关掉。在训练的代码中有一个细节是torch.max()函数不仅返回的是最大值，还有它的index，我们所需要的主要是它的index。

```python
net.load_state_dict(torch.load('./net.ckpt'))
net.eval()
test_labels = []
with torch.no_grad():
    for test_x in test_loader:
        test_x = test_x.to(device)
        output = net(test_x)
        for label in torch.max(output, 1)[1]:
#             print('label:',)
            test_labels.append(num2label[label.item()])
```

## 总结

很多看似简单的代码其实包含了很多理论知识，可以花个一两天的时间把这些代码好好理一理，观察一下每行代码的输出形式是什么样的。





