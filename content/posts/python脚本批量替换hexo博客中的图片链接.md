---
author: 孙百乐
categories:
- 技能分享
date: 2022-01-15 23:10:24
draft: false
title: python脚本批量替换hexo博客中的图片链接
---

### 前言

最近想把wordpress上的文章迁移到hexo，图片从原服务器迁移到GitHub图床。所以文章中的图片需要重新下载，上传到GitHub图床，再把文章中的链接替换。

我的思路是用正则表达式把文章中的原链接找出来，用requests库下载到本地。因为原链接和新链接只有前半部分不一样（比如名为“头像.jpg”的图片，原链接是“https://www.aiupc.xyz/**头像.jpg**”，新链接是“https://cdn.jsdelivr.net/gh/aiupc/cdn/img/custom/**头像.jpg**”），所以可以先替换链接，再把下载到本地的图片批量上传到GitHub。

### 代码

```
import requests
import os
import re


def download_img(img_url, path):
    filename = img_url[img_url.rindex("/") + 1:]
    # print (filename)
    try:
        r = requests.get(img_url, stream=True)
        # print(r.status_code)  # 返回状态码
        if r.status_code == 200:
            f = open(f'/Users/sunbaile/myHexoBlog/实验室/{filename}', 'wb').write(r.content)
            return True
        else:
            print("status_code错误", r.status_code)
            return False
    except:
        print("下载失败", filename)
        return False


def get_pic_name(img_url):
    return img_url[img_url.rindex("/") + 1:]


if __name__ == '__main__':
    dir_path = "/Users/sunbaile/myHexoBlog/source/_posts/"
    cnt = 0
    for file in os.listdir(dir_path):
        rep_cnt = 0
        cnt += 1
        if file[-3:] == ".md":
            with open(os.path.join(dir_path, file), "r+") as f:
                text = f.read()

            url_lst = re.findall('!\[.*?\]\((.*?)\)', text)
            # print(url_lst)
            for url in url_lst:
                if "aiupc" in url:
                    ret = download_img(url, dir_path)
                    if ret:
                        text = text.replace(url, f"https://cdn.jsdelivr.net/gh/aiupc/drawingbed/img/{get_pic_name(url)}")
                        rep_cnt+=1
            with open(os.path.join(dir_path, file), "w+") as f2:
                f2.write(text)
            print(f"{cnt}.{file},替换{rep_cnt}个")
```