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