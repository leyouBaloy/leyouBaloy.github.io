# Bailey's Blog

## 简介

本站是使用 Vue3 + Naive UI 开发的纯静态博客。使用markdown-it插件来对markdown文件进行渲染。具有简洁美观大方的UI和快速的性能。
该博客借鉴了[LoveIt](https://github.com/dillonzq/LoveIt)和[SkyWT](https://skywt.cn/)，感谢你们给我提供了许多灵感！❤

## 实现方法

文章页的实现方法是用axios请求markdown文件，然后使用markdown-it渲染成html文档树。通过vue渲染函数将html文档树渲染到页面（可以使用其它组件）。

列表页和归档页的实现方式是先对所有markdown文件进行预处理，脚本代码放在src/scripts目录下，将markdown文件中的标题、时间、分类等信息提取出来，然后存入json文件中（public/markdown/metadata/xxx.json）。在vue中通过axios请求json文件，然后渲染到页面。

## Demo

可以访问[https://www.leyoubaloy.xyz/](https://www.leyoubaloy.xyz/)查看Demo。

## Todo

目前这个博客还有很多不足，我会持续更新。

- [x] 移动端屏幕适配（虽然所有页面都尽可能以flex布局，但是仍然有一些问题）
- [x] 文章页的评论功能（计划使用[Gitalk](https://gitalk.github.io/)）
- [x] 统一使用typescript（为了开发方便，目前处于ts/js混用状态）
- [x] 路由跳转动画、页面/图像加载动画、页面滚动优化
- [x] 速度提升（目前速度不是很理想，需要压缩一些资源）
- [x] 美化主页和文章页的样式，包括代码块等

## 开发环境

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

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
