---
title: "如何将语雀文档导出为html（使用语雀API）"
author: 孙百乐
date: 2023-03-09T16:12:56+08:00
draft: false
categories: 
- 技能分享
---

## 需求

语雀本身是用web端访问的，按理来说，导出为html文件应该是最接近原生文档的观感的，但是却不支持，反倒是可以导出为pdf、markdown、word等格式。

可以用爬虫把文档给爬下来，但是我很不喜欢用爬虫，因为大型网站总是会使用各种反爬技术，这些阻拦会使我爬出的结果不够优雅。

如果优雅的解决这个问题呢，思路是利用语雀的API，很轻松就能获取一个文档的各种信息（作者、页面的markdown内容，html内容等）。很多个人博客可以跟语雀相关联，也是通过API实现的。这是一个可玩性很高的功能。

## 解决方法

1. 在语雀的`账户设置`->`Token`里新建一个token
2. 问ChatGPT，如何使用语雀API拿到一个页面的内容（它真的能给你一个可运行的代码！）
3. 这里记录一下我修改后，适用于我自己的需求的代码：

```python
import requests
import os

# 设置API访问令牌
token = 'YOUR_ACCESS_TOKEN'

# 设置API请求URL
url = 'https://www.yuque.com/api/v2/repos/upcxailixin/ua125n/docs/'
chapters = ['rqwsfpzkh97ivvxm','hl788mwbbw2d82is','hcxgg7','afrstd','iz3dks','khnvy8','bhbw2z','qvzagc','dky80n','zzw6o7','qrg1f2eds2h8talq']


# 设置API请求头
headers = {
    'User-Agent': 'Mozilla/5.0',
    'X-Auth-Token': token
}

for i in range(len(chapters)):
    # 发送API请求
    response = requests.get(os.path.join(url,chapters[i]), headers=headers)

    # 解析API响应
    if response.status_code == 200:
        doc = response.json()
        # print(doc['data']['body_html'])
        print('标题:', doc['data']['title'])
        # print('内容:', doc['body'])
    else:
        print('请求失败:', response.status_code)

        
    # 写入
    with open(f"/Users/sunbaile/临时/语雀2html/{doc['data']['title'].replace('/','')}.html",'w') as f:
        f.write(doc['data']['body_html'])

    # import json
    # with open('./raw.json','w',encoding='utf8') as f:
    #     f.write(json.dumps(doc,ensure_ascii=False))
```

4. 这时候html文档已经搞出来了，但是文档中的图片、以及svg公式都指向语雀的cdn，这是不能直接放在服务器上的，因为会有跨域的问题。所以我们得再写个脚本把文档中的img都下载到本地的images目录下（这一步的代码仍然是通过问ChatGPT获得的），下面记录适用于我自己的需求的修改后的代码：

```python
import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import time

basepath = '/Users/sunbaile/临时/语雀2html/下载图片'
# # 创建存储图片的文件夹
# if not os.path.exists('/Users/sunbaile/临时/语雀2html/下载图片/images'):
#     os.makedirs('/Users/sunbaile/临时/语雀2html/下载图片/images')
for filename in os.listdir(basepath):
    if filename.endswith('.php'):

        # 读取HTML文件
        with open(os.path.join(basepath,filename), 'r') as f:
            html = f.read()

        # 解析HTML文件
        soup = BeautifulSoup(html, 'html.parser')

        # 获取所有图片链接
        img_tags = soup.find_all('img')
        img_urls = [img['src'] for img in img_tags]
        print(filename)
        print(img_urls)

        # 下载图片
        for url in img_urls:
            # img_url = urljoin('http://example.com', url)  # 根据相对链接生成绝对链接
            img_url = url
            response = requests.get(img_url)
            filename = os.path.join(os.path.join(basepath,'images'), os.path.basename(url))  # 使用图片链接的文件名作为下载的文件名
            with open(filename, 'wb') as f:
                f.write(response.content)
        time.sleep(1)

```

5. 最后，要将html文档中img标签的src内容修改一下，把绝对路径改成相对路径

```python
from bs4 import BeautifulSoup
import os

basepath = '/Users/sunbaile/临时/语雀2html/下载图片'
for fname in os.listdir(basepath):
    if fname.endswith('.php'):
        # 读取HTML文件
        with open(os.path.join(basepath,fname), 'r') as f:
            html = f.read()

        # 解析HTML文件
        soup = BeautifulSoup(html, 'html.parser')

        # 获取所有图片标签
        img_tags = soup.find_all('img')

        # 替换所有图片链接
        for img_tag in img_tags:
            img_url = img_tag['src']
            if img_url.startswith('http'):  # 判断是否为绝对链接
                filename = os.path.basename(img_url)  # 获取文件名
                img_tag['src'] = 'book/images/{}'.format(filename)

        # 将修改后的HTML文档写回原始文件
        with open(os.path.join(basepath,fname), 'w') as f:
            f.write(soup.prettify())

```

## 总结

ChatGPT真好用～以后就不用自己思考代码框架了，直接面向ChatGPT编程。

