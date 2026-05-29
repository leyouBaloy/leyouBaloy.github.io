# Bailey's Blog

一个基于 Vue 3、Vite SSG、Naive UI 和 markdown-it 的纯静态博客。文章以 Markdown 文件存放在 `public/markdown`，构建前会生成文章索引、搜索索引、RSS、Sitemap 和每篇文章的 JSON payload，最终输出到 `dist`。

线上示例：[https://www.imbailey.cn/](https://www.imbailey.cn/)

## 特性

- Markdown 写作，支持 frontmatter、代码块、数学公式和目录提取。
- 预生成文章元数据，首页、归档、标签和搜索都直接读取 JSON。
- Vite SSG 静态生成，适合部署到 GitHub Pages、Vercel、Nginx 等静态托管环境。
- 内置博客 CLI，命令风格向 Hexo 靠齐，支持新建文章、生成静态文件和启动本地服务。

## 目录结构

```txt
.
├── public/
│   ├── markdown/              # Markdown 文章源文件
│   │   ├── metadata/          # 自动生成的列表、归档、搜索等元数据
│   │   └── posts/             # 自动生成的文章 JSON payload
│   ├── data/                  # 媒体页等静态数据
│   ├── rss.xml                # 自动生成的 RSS
│   └── sitemap.xml            # 自动生成的 Sitemap
├── scripts/                   # 辅助脚本，例如图片上传工具
├── src/
│   ├── assets/                # 前端资源
│   ├── components/            # Vue 组件
│   ├── data/                  # 源数据
│   ├── router/                # 路由配置
│   ├── scripts/               # 博客 CLI 和元数据生成脚本
│   ├── types/                 # TypeScript 类型
│   ├── utils/                 # 数据请求、缓存等工具
│   └── views/                 # 页面视图
├── dist/                      # 静态构建产物，默认不提交
├── package.json               # 项目脚本和依赖
└── vite.config.ts             # Vite 与 SSG 配置
```

`public/markdown/metadata`、`public/markdown/posts`、`public/rss.xml` 和 `public/sitemap.xml` 都是由 `src/scripts/generate-metadata.js` 自动生成的派生文件。修改文章后重新执行生成命令即可刷新它们。

## 环境要求

- Node.js 20 或更高版本
- Yarn 1.x

安装依赖：

```sh
yarn install
```

## CLI 用法

统一入口：

```sh
yarn blog <command> [options]
```

### 新建文章

```sh
yarn blog new "我的新文章"
```

常用选项：

```sh
yarn blog new "Vue 学习笔记" --slug vue-notes --category 前端 --tag Vue --tag Vite
yarn blog new "草稿标题" --draft
```

新建文章会写入 frontmatter `slug` 字段。配置 AI slug 后，未显式传入 `--slug` 时会优先生成英文 SEO slug；没有配置密钥或生成失败时会退回本地规则。

生成文件位置：`public/markdown/<slug>.md`。

#### AI slug 配置

默认使用 Gemini slug 服务；脚本会优先尝试 OpenAI Chat Completions 兼容接口，并在可用时回退到 Gemini `generateContent` 接口：

```sh
export BLOG_AI_SLUG_API_BASE_URL="https://gcli.ggchan.dev/"
export BLOG_AI_SLUG_MODEL="Gemini 3.1 Pro Preview"
export BLOG_AI_SLUG_API_KEY="你的密钥"
```

也可以把这些变量放在本地 `.env.local` 中，博客 CLI 会自动读取；`.env.local` 不会提交到仓库。

单独测试 slug 生成：

```sh
yarn blog slug "Vue3 实现小红书瀑布流布局"
```

给所有还没有 `slug` 的文章批量补齐英文 slug：

```sh
yarn blog slug:missing
```

可以先预览，不写入文件：

```sh
yarn blog slug:missing --dry-run --limit 20
```

如果某篇文章不想使用 AI，可显式关闭：

```sh
yarn blog new "我的新文章" --no-ai-slug
```

兼容旧命令：

```sh
yarn new "我的新文章"
yarn newp "我的新文章"
```

### 生成静态文件

```sh
yarn blog generate
```

等价短命令：

```sh
yarn blog g
```

该命令会先刷新文章元数据，再执行 Vite SSG 构建，最终产物输出到 `dist`。

### 启动本地服务

```sh
yarn blog server
```

等价短命令：

```sh
yarn blog s --port 3000
```

该命令会先刷新文章元数据，再启动 Vite 开发服务。也可以直接使用：

```sh
yarn dev
```

### 只刷新文章元数据

```sh
node src/scripts/generate-metadata.js
```

## 开发流程

1. 安装依赖：`yarn install`
2. 新建或编辑文章：`yarn blog new "文章标题"`，或直接修改 `public/markdown/*.md`
3. 启动开发服务：`yarn blog server`
4. 生成静态站点：`yarn blog generate`
5. 预览构建产物：`yarn preview`

## 文章 frontmatter

推荐格式：

```md
---
title: 我的新文章
date: 2026-05-28 21:30:00
categories:
- 随笔杂记
tags:
- Vue
- 博客
img:
---

# 我的新文章
```

字段说明：

- `title`：文章标题。
- `date`：发布时间，参与排序、RSS 和 Sitemap 生成。
- `updatedAt` 或 `updated`：可选，文章更新时间。
- `categories` / `tags`：分类和标签，列表页优先使用 `categories`，搜索和归档会合并使用。
- `slug`：可选，自定义文章 URL；未设置时会根据文件名生成稳定 hash。
- `img` 或 `featuredImagePreview`：可选，首页卡片封面图。
- `draft: true`：可选，生成元数据时跳过该文章。

当文章从 hash URL 迁移到自定义 `slug` 后，构建脚本会继续生成旧 hash 路由作为兼容入口，避免老链接 404；Sitemap 和 canonical 会指向新的自定义 slug。

## 构建与部署

```sh
yarn blog generate
```

生成后的 `dist` 是完整静态站点，可部署到任意静态托管服务。Vite SSG 会根据 `public/markdown/metadata/slug_mapping.json` 自动生成所有文章详情页。

## 空白站点模板

仓库提供空白站点分支，里面不包含任何文章，适合其他人直接基于它搭建自己的博客。切换到该分支后执行：

```sh
yarn install
yarn blog server
```

然后用 `yarn blog new "第一篇文章"` 开始写作。
