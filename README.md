# Bailey's Blog

## 简介

本站是使用 Vue3 + Naive UI 开发的纯静态博客。使用markdown-it插件来对markdown文件进行渲染。具有简洁美观大方的UI和快速的性能。
该博客借鉴了[LoveIt](https://github.com/dillonzq/LoveIt)和[SkyWT](https://skywt.cn/)，感谢你们给我提供了许多灵感！❤

## 实现方法

文章页的实现方法是用axios请求markdown文件，然后使用markdown-it渲染成html文档树。通过vue渲染函数将html文档树渲染到页面（可以使用其它组件）。

列表页和归档页的实现方式是先对所有markdown文件进行预处理，脚本代码放在src/scripts目录下，将markdown文件中的标题、时间、分类等信息提取出来，然后存入json文件中（public/markdown/metadata/xxx.json）。在vue中通过axios请求json文件，然后渲染到页面。

## Demo

可以访问[https://www.imbailey.cn/](https://www.imbailey.cn/)查看Demo。

## Todo

目前这个博客还有很多不足，我会持续更新。

- [x] 移动端屏幕适配
- [x] 文章页的评论功能
- [ ] 统一使用typescript（为了开发方便，目前处于ts/js混用状态）
- [x] 路由跳转动画、页面/图像加载动画、页面滚动优化
- [x] 速度提升（目前速度不是很理想，需要压缩一些资源）
- [x] 美化主页和文章页的样式，包括代码块等
- [ ] 修改归档页的样式和数据加载逻辑
- [X] 主页改造为瀑布流布局
- [ ] 添加搜索功能
- [ ] markdown表格无法解析

## 开发环境

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### 添加新文章

```
npm run newp <文件名(不含.md)>
```


### 瀑布流的实现原理
1. 首先定义一个瀑布流容器，它的高度暂定（后面会更新）。把需要布局的组件（这里叫做waterfall-item）放在瀑布流容器里面渲染出来。使用绝对定位（position: absolute），把它移到屏幕外面，不要占用页面高度，并且设置不可见（visibility:hidden）。
2. 渲染出来之后才能计算高度。获取.waterfall-item的dom元素，遍历这些元素，使用getBoundingClientRect()获取高度。
3. 开始布局。以2列为例，新建两个变量分别表示2列的高度。遍历第2步获取的dom元素的高度，把dom元素的高度加到最小的高度上。这个过程还可以考虑在组件之间加上留白（gutter）。
4. 使用transform样式将waterfall-item移动到对应高度所在的位置。transform将组件移动到指定坐标，横坐标跟列有关，纵坐标跟高度有关。
5. 更新瀑布流容器的高度为两列高度中最大者。
详情请见[https://www.imbailey.cn/post/Vue3实现小红书瀑布流布局任意组件动态更新页面方法实践.md](https://www.imbailey.cn/post/Vue3实现小红书瀑布流布局任意组件动态更新页面方法实践.md)