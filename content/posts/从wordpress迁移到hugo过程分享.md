---
title: "从wordpress迁移到hugo过程分享"
date: 2022-01-28T15:52:50+08:00
draft: false
categories: 
- 技能分享
featuredImage: https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/img/hugologo.jpeg
---

### 为什么抛弃wordpress选择hugo

* 不用买服务器了
* wordpress经常奔溃，易受攻击
* hugo编译速度真tm快
* 有一款钟爱的hugo主题

### 文章迁移

文章迁移使用一个hexo插件（你没看错，就是hexo插件）。

首先新建一个hexo博客（用完就可以删了）。

```shell
$ hexo init <folder>
$ cd <folder>
$ npm install
```

再安装 `hexo-migrator-wordpress` 插件。

```shell
$ npm install hexo-migrator-wordpress --save
```

在 WordPress 仪表盘中导出数据(“Tools” → “Export” → “WordPress”)

插件安装完成后，执行下列命令来迁移所有文章。`source` 可以是 WordPress 导出的文件路径或网址。

```shell
$ hexo migrate wordpress <source>
```

文章很快就能出现在source/_posts目录下，转换效果特别棒。

### 修改文章的属性

刚迁移完的每篇文章都有yaml配置，像这样：

```yaml
title: 年度总结
tags: []
id: '1191'
categories:
  - - 生活
date: 2022-01-21 11:35:06
```

其实直接丢到hugo的posts文件夹里也没问题，但咱最好还是自己改一下。比如改成这样：

```
author: sunbaile
categories:
- 随笔杂记
date: 2022-01-21 11:35:06
draft: false
title: 年度总结
```

写了一个python脚本，100多篇文章，1秒钟全搞定（写脚本写了一下午qwq)：

```python
import os
import yaml
import re

path = "/Users/sunbaile/myBlog/content/posts"
# path = "/Users/sunbaile/myBlog/python脚本"
cnt = 0

for file in os.listdir(path):
    if file[-3:]==".md" : #判断是否为md文件
        cnt += 1
        print(cnt,file)

        with open(os.path.join(path,file),"r+") as f:
            all_text = f.read()

        yaml_text = re.findall("---([\s\S]*?)---",all_text)[0] #找到yaml字符串
        old_dic = yaml.load(yaml_text)  # 用yaml库转字典对象
        # print("categories:",old_dic["categories"])
        
        new_dic = {
            "title": old_dic["title"],
            "author": "sunbaile",
            "draft": False,
            "categories": old_dic['categories'],
            "date": old_dic["date"]
        }
        # print("new_dic",new_dic)
        yaml_res = yaml.dump(new_dic,allow_unicode=True)    #用yaml库将字典解析为yaml字符串
        # print("***",yaml_res,"***")

        res = all_text.replace(yaml_text,"\n"+yaml_res)
        with open(os.path.join(path,file),"w+") as f:
            f.write(res)
```



### 图片迁移

如果你打算用github+jsdelivr做图床，迁移图片更简单。思路就是先从服务器上把wordpress的wp-content目录（里面有个uploads文件夹存了你所有的图片）下载下来，然后原封不动的丢到github仓库里，最后把文章中的路径改一下就可以啦。

> 注意：每张图片都是由`固定链接`+`路径`+`名字`组成。

比如说原来文章的图片链接是这样的：

```markdown
![](https://www.leyoubaloy.xyz/wp-content/uploads/2021/06/728da9773912b31b0c11b3568418367adab4e154.jpg)
或者是这样的：
![](/wp-content/uploads/2021/02/image-1-1024x431.png)
```

要替换成这样：

```markdown
![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads/2021/06/728da9773912b31b0c11b3568418367adab4e154.jpg)
和这样
![](https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads/2021/02/image-1-1024x431.png)
```

那肯定还是用python脚本啦，python，yyds!

```python
import os
import re

path = "/Users/sunbaile/myBlog/content/posts"
# path = "/Users/sunbaile/myBlog/python脚本"
cnt = 0

for file in os.listdir(path):
    if file[-3:]==".md" :
        cnt += 1
        print(cnt,file)

        with open(os.path.join(path,file),"r+") as f:
            all_text = f.read()
        res = re.sub("\((\/wp-content\/uploads)","(https://cdn.jsdelivr.net/gh/leyouBaloy/mypic/wp-content/uploads/",all_text)
        res = res.replace("www.leyoubaloy.xyz","cdn.jsdelivr.net/gh/leyouBaloy/mypic")
        with open(os.path.join(path,file),"w+") as f:
            f.write(res)
```

### 视频教程：

{{< bilibili BV18S4y1y7jo >}}







