import os
path = "/Users/sunbaile/myBlog/content/posts"

num = 0

for file in os.listdir(path):
    if file[-3:]==".md":
        num += 1
        print(f"edit passage {num}")
        with open(os.path.join(path, file), "r+") as f:
                text = f.read()
        # text = text.replace("https://cdn.jsdelivr.net/gh/leyouBaloy","https://myblog-1257298572.cos.ap-shanghai.myqcloud.com")
        text = text.replace("https://cdn.jsdelivr.net/gh/aiupc/drawingbed","https://cs.aiupc.xyz")
        with open(os.path.join(path, file), "w+") as f2:
                f2.write(text)