import os
import re
import yaml

path = "/Users/sunbaile/myBlog/content/posts"
cnt = 0

for file in os.listdir(path):
    if file[-3:]==".md":
        cnt += 1
        print(cnt,file)
        with open(os.path.join(path,file),"r+") as f:
            all_text = f.read()

        yaml_text = re.findall("---([\s\S]*?)---",all_text)[0]
        old_dic = yaml.load(yaml_text)
        os.rename(os.path.join(path,file),os.path.join(path,old_dic["title"]+".md"))