# 在vue中使用highlightjs-line-numbersjs实现代码高亮并且增加行号

> 发布于：2023-03-16 | 分类：技能分享 | 原文：https://leyoubaloy.github.io/post/vue-highlightjs-line-numbers-code-highlight

## highlight.js

实现代码高亮是很容易的，有很多库都支持，比较有名的是highlightjs，它的使用方法是：

1. 先引入css文件和js文件

```html
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.3/styles/default.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.3/highlight.min.js"></script>
```

2. 再将你的代码用`<code>`包裹

```html
<code>{{ 你的代码 }}</code>
```

3. 再调用hljs的高亮函数，它的原理是找到所有的code标签，然后通过操作DOM，给你的代码设置高亮样式。

```html
<script>
		hljs.initHighlightingOnLoad();
	</script>
```

## highlightjs-line-numbers.js

hilightjs-line-numbers.js在highlight.js的基础上，给代码增加了行号，项目地址👇：

https://github.com/wcoder/highlightjs-line-numbers.js

它的原理是将highlight.js渲染结构改装成`<table>`，第一列是行号，第二列才是代码。这种思路是非常棒的！

它的使用方法是在highlight.js的使用方法上加了两步：

1. 除了引用highlight.js之外，还要引用highlightjs-line-numbers.js

```html
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.3/styles/default.min.css">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.3/highlight.min.js"></script>
  <script src="../src/highlightjs-line-numbers.js"></script>
```

2. 将你的代码用`<pre>`和`<code>`包裹

```html
<pre><code>{{ 你的代码 }}</code></pre>
```

3. 调用

```html
<script>
		hljs.initHighlightingOnLoad();
		hljs.initLineNumbersOnLoad({
            // singleLine:true,
            // startFrom: 5,
        });
	</script>
```

## 在vue中使用

奶奶的，在vue的组件中引用这个库，发现总是不能正确调用。我试了好久，终于找到了一个很nice的方法，就是直接在public下的`index.html`中引用，然后在组件中调用。

![image-20230317001209249](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/img/image-20230317001209249.png)

效果差强人意，但总算是把功能实现了

![image-20230317001321999](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/img/image-20230317001321999.png)

## 其它实现方法

在网上搜索，会发现还有另一种实现原理：使用vue.directive，自动在代码前面加一个`<ul>`，显示行号；这种方法也可以实现，但是样式很难调整，容易出现行号错位。
