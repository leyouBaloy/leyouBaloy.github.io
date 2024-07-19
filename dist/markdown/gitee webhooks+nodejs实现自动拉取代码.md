---
author: 孙百乐
categories:
- 技能分享
date: 2022-01-25 20:50:41
draft: false
title: gitee/github webhooks+nodejs实现自动拉取代码
---

### 需求

很简单，就是想在gitee上一提交代码，服务器就自动执行一个sh脚本。脚本的内容就是把代码拉取下来。gitee webhook和sh脚本都好办，关键是如何让服务器监听webhook发来的请求。

在网上一搜，各路大神各显神通，有用jenkins的，有用php的，还有travis CI…各位大佬，我就想实现一个简单的小功能，用这么牛逼的工具真没必要qwq（求饶

终于在谷歌上（百度真的搜不到）搜到一个用nodejs解决的，确实很方便。原博主写的很好，但是有几个小坑，我在这里提醒一下。

> 版权声明：CSDN博主「如风521」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。  
> 原文链接：https://blog.csdn.net/qq\_31667715/article/details/100117028

### 什么是webhook

webhook也叫钩子。粗浅的来说，就是你写一个小脚本，每次提交代码的时候，让gitee或者github帮你执行一下。重点是这个脚本是你自己编写的，但不是你自己执行的，是GitHub或者gitee帮你执行的。就像在钩子上放个东西，让人家帮你拉一下，所以叫钩子。

### 环境

*   Git ，这个服务器上肯定要装的
*   nodejs

### 配置公钥

配了公钥后，你打`git clone (repo地址)`就不用输入密码了。这个很简单，网上教程很多。

有个小坑：配完公钥后git仓库地址一定要用ssh，而不是https

![image-20220125201303579](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/mypic/img/image-20220125201303579.png)

成功的结果就是你打git clone的时候不用输入密码了

### 用nodejs监听web-hooks服务

创建目录，用npm初始化，下载插件gitee-webhook-handler（ps:用了nodejs才发现它有很多好用的插件：

```shell
mkdir /usr/soft/web_hooks #创建目录
cd /usr/soft/web_hooks
npm init 
npm install  gitee-webhook-handler --save 
```

创建js文件，按照自己的需求修改：

```javascript
var http = require('http')
var createHandler = require('gitee-webhook-handler')
var handler = createHandler({ path: '/webhooks_push', secret: '654321'}) //post 所需要用到的密码，自己设置，跟下面对应就行
function run_cmd(cmd, args, callback) {
  var spawn = require('child_process').spawn;
  var child = spawn(cmd, args);
  var resp = "";
  child.stdout.on('data', function(buffer) { resp += buffer.toString(); });
  child.stdout.on('end', function() { callback (resp) });
}
handler.on('error', function (err) {
  console.error('Error:', err.message)
})
handler.on('Push Hook', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref);

    var name = event.payload.repository.name    //这个name是仓库的名字
    if (name === "Gitee FeedBack" || name === "xaiweb") { 
        run_cmd('sh', ['/www/xaiweb/pull.sh'], function (text) {// 需要执行的脚本位置
            console.log(text)
        });
    }else {
        console.log("unknow repository name:" + name);
    }
})
try {
  http.createServer(function (req, res) {
    handler(req, res, function (err) {
      res.statusCode = 404
      res.end('no such location')
    })
  }).listen(6666) // 服务监听的端口，可以自行修改
}catch(err){
  console.error('Error:', err.message)
}
```

原博主的这里的name没有定义，看日志才发现问题。

还有个小坑，如果你用gitee的话，push代码和点击“测试”的时候name的值是不一样的。前者是"Gitee FeedBack"，后者是仓库名。（我的仓库名xaiweb

![image-20220125202515465](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/mypic/img/image-20220125202515465.png)

gitee和github应该也不一样，总之，测试的时候多看日志，就能发现问题。（日志下面有

### 启动服务

下载forever，这个能解决node服务自动停掉的问题。-g是全局安装

```shell
npm install -g forever
```

把nodejs目录下的forever软链接到系统的/usr/bin目录下，这样就能全局访问了

```shell
ln -s /usr/local/node(这里可能不一样)/lib/node_modules/forever/bin/forever /usr/bin/forever 
```

不知道nodejs目录在哪的打whereis node或者which node试试，注意，这样找到的目录可能不是原始目录，而是软连接目录。

启动：

```shell
forever start -l ./forever.log -o ./out.log -e ./err.log webhook.js #第一次启动
forever start -a -l ./forever.log -o ./out.log -e ./err.log webhook.js #之后再启动打这个
```

这里给两个forever常用命令

```shell
forever list #列出服务，能看到日志在哪
forever stop + id或文件名 #停止服务
```

### nginx反向代理

```nginx
location ^~ /webhooks_push {
            proxy_set_header Host $host;
            proxy_set_header X-Real-Ip $remote_addr;
            proxy_set_header X-Forwarded-For $remote_addr;
            proxy_pass http://127.0.0.1:6666;
        }
```

如果你不会nginx也没啥问题，直接用ip:6666也行

### gitee配置

![在这里插入图片描述](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/mypic/img/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMxNjY3NzE1,size_16,color_FFFFFF,t_70.png)密码就是跟上面那个对应的。

大功告成。

### 1月31日补充

如果用GitHub：

```javascript
//webhook.js
var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/', secret: '密码' })
// 上面的 secret 保持和 GitHub 后台设置的一致

function run_cmd(cmd, args, callback) {
    var spawn = require('child_process').spawn;
    var child = spawn(cmd, args);
    var resp = "";

    child.stdout.on('data', function (buffer) { resp += buffer.toString(); });
    child.stdout.on('end', function () { callback(resp) });
}

http.createServer(function (req, res) {
    handler(req, res, function (err) {
        res.statusCode = 404
        res.end('no such location')
    })
}).listen(6666)

handler.on('error', function (err) {
    console.error('Error:', err.message)
})

handler.on('push', function (event) {
    console.log('Received a push event form %s to %s',
        event.payload.repository.name,
        event.payload.ref);
    run_cmd('sh', ['./pull.sh', event.payload.repository.name], function (text) { console.log(text) });
})
```

请求：http://ip:6666/

content type: application/json