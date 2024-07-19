---
author: 孙百乐
categories:
- 刷题
date: 2020-12-13 17:23:02
draft: false
title: requests爬表情包
---

需要的库：

!pip install lxml

!pip install request

!pip install pathlib

代码：

```
import time
#代码合集并修改为下载多页表情
import requests
from bs4 import BeautifulSoup
from pathlib import Path

for i in range(1,4):
    url =  f'https://www.fabiaoqing.com/biaoqing/lists/page/{i}.html'
    response = requests.get(url)
    time.sleep(3)
    soup = BeautifulSoup(response.content,'lxml')
    img_list = soup.find_all('img', class_="ui image lazy")
    for index,img in enumerate(img_list):
        image = img.get('data-original')
        content = requests.get(image).content
        file = Path('d:/emotion') / f'{index}{Path(image).suffix}'
        file.write_bytes(content)
```