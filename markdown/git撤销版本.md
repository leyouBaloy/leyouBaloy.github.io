---
title: "Git撤销版本"
author: 孙百乐
date: 2022-04-16T20:23:57+08:00
draft: false
categories: 
- 技能分享
- 笔记
---

## Git如何撤回远程仓库已经提交的版本？

1. 不能直接在像gitee, github这样的远程仓库上直接操作。所以先把项目clone下来。
2. 执行` git log`查看日志，获取需要回退的版本号 ，如5f6935bcc46d480113f0c49d4b54052d10c5aec0。
3. 执行`git reset --hard <版本号>`，重置到这个版本。(此时相当于撤回了commit)

> --soft 表示只是改变了HEAD的指向，本地代码不会变化
>
> --hard 表示本地代码也重置到此版本

4. 执行` git push origin 分支名 –-force` 强制提交。

   如`git push origin master –f`

然后看远程仓库，你会惊喜的发现5f6935bcc46d480113f0c49d4b54052d10c5aec0之后的版本都消失啦！

