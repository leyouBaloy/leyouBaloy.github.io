---
title: "如何在Windows上编译Python39源代码"
author: 孙百乐
date: 2023-12-10T20:51:01+08:00
draft: false
categories: 
- 技能分享
---

# 安装Visual Studio 2017

先下载Visual Studio Installer

https://learn.microsoft.com/en-us/visualstudio/python/installing-python-support-in-visual-studio?view=vs-2022

打开Visual Studio Installer->选择“工作负荷”->使用C++的桌面开发、Python开发。

另外，在“Python开发”里，选择Python本机开发工具。

![img](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/img/1702186333481-795f9c06-8190-4e53-b0b1-3cb0e02ae25a.png)

然后开始安装这一套软件，默认装的是社区版，够用。

# 下载Python源代码

https://www.python.org/downloads/release/python-3913/

![img](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/img/1702186438498-d3f8a9d7-de88-4f4e-9ef0-ccc20db9a801.png)

下载完解压

# 开始编译

用命令行进入PCbuild目录，执行build.bat文件

编译完了之后，编译后文件会出现在PCbuild目录的amd64目录下

可以用命令行执行amd64目录下的python.exe

![img](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/img/1702186910646-0e855187-b9de-49ee-bb18-356a0073840d.png)

![img](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/img/1702186914548-f43a9eee-674d-467d-85f3-d3f4dc463f67.png)

# 测试编译

- 参考这个文档，可以对源代码做一个小修改

https://flaggo.github.io/python3-source-code-analysis/preface/modify-code/

然后进入PCbuild/amd64目录下的python.exe试试效果

- 可能还会有其它报错，我就遇到了

```plain
D:\Program Files (x86)\Microsoft Visual Studio\2017\Community\Common7\IDE\VC\VCTargets\Microsoft.Cpp.WindowsSDK.targets
(46,5): error MSB8036: 找不到 Windows SDK 版本10.0.22621.0。请安装所需的版本的 Windows SDK 或者在项目属性页中或通过右键 单击解决方案并选择“重定解决方案目标”来更改 SDK 版本
。 [D:\Python-3.9.13\Python-3.9.13\PCbuild\pythoncore.vcxproj]

生成失败。

D:\Program Files (x86)\Microsoft Visual Studio\2017\Community\Common7\IDE\VC\VCTargets\Microsoft.Cpp.WindowsSDK.targets
(46,5): error MSB8036: 找不到 Windows SDK 版本10.0.22621.0。请安装所需的版本的 Windows SDK 或者在项目属性页中或通过右键 单击解决方案并选择“重定解决方案目标”来更改 SDK 版本
。 [D:\Python-3.9.13\Python-3.9.13\PCbuild\pythoncore.vcxproj]
    0 个警告
    1 个错误
```

按照它的提示，把该项目的Windows SDK版本改了之后就好了。

具体问题具体对待吧

# 参考

PCbuild目录下有readme.txt，里面的流程和我的流程是一样的
