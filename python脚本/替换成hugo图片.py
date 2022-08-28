import os
import re
path = "/Users/sunbaile/myBlog/content/posts"
# path = "/Users/sunbaile/myBlog/python脚本"
file = "人生就是不断的相识与别离.md"

with open(os.path.join(path, file),"r") as f:
    all_text = f.read()
    res = re.sub(r"!\[.*\]\((https:\/\/myblog.*)\)", '{{< figure src="\\1" >}}', all_text, 0, re.MULTILINE)
    
    
with open(os.path.join(path, file),"w") as f:
    f.write(res)


