---
title: "在word中使用通配符进行高级的查找和替换"
author: 孙百乐
date: 2022-06-16T17:03:05+08:00
draft: false
categories: 
- 技能分享
---

## 需求

一个212页的word文档，包含如下反复出现的单元：

```word
2022.2.2   英语1902班王彤
每日一词∣快递包装绿色治理 
green governance of express packaging
来源：中国日报网
国家邮政局发展研究中心近日发布《中国邮政快递业绿色发展报告（2019-2020年）》。报告称，2019年我国在快递包装绿色治理方面取得显著成效，行业正加速构建绿色发展体系。到2025年年底，全国范围邮政快递网点禁止使用不可降解的塑料包装袋、塑料胶带和一次性塑料编织袋。
China made remarkable progress on the green governance of express packaging in 2019, with a more environment-friendly development framework taking shape, according to a recent report on the green development of China's post and express industry. Compiled by the development and research center of the State Post Bureau, the report reaffirmed the country's plan to cease the use of non-degradable plastic packaging, plastic tape, and single-use plastic woven bags at postal and express service outlets by 2025.
【知识点】
2019年，我国快递业务量完成635.2亿件，同比增长25.3%，连续6年稳居世界第一。随着电商快递的快速发展，产生的快递包装废弃物问题引起各界关注，推进快递包装绿色治理刻不容缓。
为了适应新形势新要求，推进快递包装绿色治理，国家邮政局坚持系统治理，强化责任分工和部署落实，印发了《2020年行业生态环境保护工作要点》，围绕快递包装绿色治理明确年度工作任务和措施，提出实施“9792”工程，即“瘦身胶带”封装比例达90%，电商快件不再二次包装率达70%，循环中转袋使用率达90%，新增2万个设置标准包装废弃物回收装置的邮政快递网点。
下一步，国家邮政局将制定出台《邮政业绿色发展行动计划（2021—2025）》，明确未来五年的目标任务和主要措施，确定路线图。同时，将深入推进责任落实，指导各地邮政管理部门认真履行监管责任，加快建立与绿色理念相适应的法律标准和政策体系，加强监督管理和行政执法，推动寄递企业落实主体责任，推动落实邮政业污染治理的地方属地责任。
【重要讲话】
要倡导环保意识、生态意识，构建全社会共同参与的环境治理体系，让生态环保思想成为社会生活中的主流文化。要倡导尊重自然、爱护自然的绿色价值观念，让天蓝地绿水清深入人心，形成深刻的人文情怀。
We need to raise people's awareness, develop a conservation system in which everyone plays a part, and mainstream ecological conservation into every aspect of social life. We need to advocate the value of green development that reveres and cares for nature so that blue skies, green fields and clear waters will be a vision cherished by all.
——2019年4月28日，习近平在2019年中国北京世界园艺博览会开幕式上的重要讲话
绿水青山就是金山银山，贯彻创新、协调、绿色、开放、共享的发展理念，加快形成节约资源和保护环境的空间格局、产业结构、生产方式、生活方式，给自然生态留下休养生息的时间和空间。
Lucid waters and lush mountains are invaluable assets. China must pursue the vision of innovative, coordinated, green and open development that is for everyone, accelerate forming spatial patterns, industrial structures, production and living modes that are resource-saving and environmental-friendly, and provide time and space for the natural ecology to rehabilitate.
——2018年5月19日，习近平在全国生态环境保护大会上的重要讲话
【相关词汇】
绿色发展
green development
遏制环境破坏
curb environmental damage
```

现将其中的

```
2022.2.2   英语1902班王彤
每日一词∣快递包装绿色治理 
green governance of express packaging
...
【相关词汇】
绿色发展
green development
遏制环境破坏
curb environmental damage
```

保留，中间省略号部分删除。使用正则表达式可以轻松解决这个问题：

```regex
每日一词.*\n[a-zA-Z\s]+([\s\S]*)【相关词汇】
```

使用上面的正则表达式就能匹配到需要删除的内容，替换成空格就好了。

However, 用编程语言操作word是比较麻烦的，不如使用word自带的查找替换功能。word自带的查找替换支持使用通配符，类似正则表达式，但功能比较简单。它与正则表达式有如下不同：

* 只支持懒惰匹配，即匹配最小长度的文本
* 一些符号不同，比如*表示任何一段文本

那么我们考察一下如何使用吧！

## 解决方案

注意，我们并不是要把匹配到的所有内容都替换掉，而是只替换所匹配内容中的一部分。这在正则表达式里只需要加两个括号就能解决，在word里不可以！

我想到一个办法，就是先匹配上文，即

```
每日一词∣快递包装绿色治理 
green governance of express packaging
```

然后在它后面加上`abcdefg`（自己随便弄的标识）

```
每日一词∣快递包装绿色治理 
green governance of express packaging
abcdefg
```

同理，匹配下文，在前面加上`abcdefg`

```
abcdefg
【相关词汇】
```

最后再匹配两个`abcdefg`中的内容，替换成空白就可以啦。原本在正则表达式中一个步骤就能搞定的，在word中拆成三个步骤也是可以解决的。

下面是我所使用的通配符

```
查找内容
每日一词*^13*^13
替换为
^&abcdefg
```

```
查找内容
【相关词汇】
替换为
abcdefg^&
```

```
查找内容
abcdefg*abcdefg
替换为

```

其中，`^13`表示回车，`^&`表示查找内容



