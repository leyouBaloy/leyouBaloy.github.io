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
        if old_dic["categories"][0] == "生活":
            old_dic["categories"] = ["随笔杂记"]
        if old_dic["categories"][0] == "uncategorized":
            old_dic["categories"] = ["刷题"]
        if old_dic["categories"][0] == "编程学习":
            old_dic["categories"] = ["笔记"]
        if old_dic["categories"][0] == "书/影评":
            old_dic["categories"] = ["书影记录"]
        
        new_dic = {
            "title": old_dic["title"],
            "author": "孙百乐",
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