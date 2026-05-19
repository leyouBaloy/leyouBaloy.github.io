# 博客文章页性能优化计划

## 背景与目标

当前文章页打开慢的主要表现是：即使文章正文很小，首屏仍然要等待较长时间。截图中的 `/post/7fde58cd` 页面里，`测试仪.md` 本身只有几百字节，但 `search_index.json`、文章页 JS chunk、评论组件和多段串行请求共同拉长了加载链路。

本计划以文章页为核心优化对象，目标是：

- 让文章正文更早可见，减少首屏等待。
- 减少文章页不必要的数据请求和大文件加载。
- 将可预计算的内容前移到构建阶段。
- 建立可重复的性能验证流程，避免后续功能再次拖慢文章页。

## 当前问题拆解

### 1. 文章页不是完整静态页

当前构建产物中没有 `dist/post/<slug>.html`，文章页依赖 SPA 在客户端启动后再解析路由、请求数据、渲染 Markdown。

影响：

- 首屏 HTML 不能直接包含文章正文。
- 浏览器必须先下载并执行应用 JS。
- 弱网络下首屏会被 JS 和数据请求同时拖慢。

相关文件：

- `src/router/index.ts`
- `src/views/PostView.vue`
- `vite.config.ts`

### 2. 正文请求被 slug 映射请求串行阻塞

`PostView.vue` 先请求 `/markdown/metadata/slug_mapping.json`，拿到文件名后才渲染 `MarkdownRenderer`，然后 `MarkdownRenderer` 再请求 `/markdown/<filename>.md`。

当前链路：

```text
打开 /post/:slug
  -> 加载 SPA
  -> 请求 slug_mapping.json
  -> 根据 slug 找 filename
  -> 请求 markdown 正文
  -> 前端解析 frontmatter 和 Markdown
  -> 渲染文章
```

影响：

- 文章正文请求无法和映射请求并行。
- 一个很小的正文也要等前置请求完成。
- 映射逻辑完全可以在构建阶段提前完成。

相关文件：

- `src/views/PostView.vue`
- `src/components/MarkdownRenderer.vue`
- `src/scripts/generate-metadata.js`

### 3. 文章页加载完整搜索索引

文章页为了计算 3 条相关推荐，会请求 `/markdown/metadata/search_index.json`。该文件本地 raw 约 772 KB，gzip 后约 281 KB，而且包含每篇文章的 `searchContent` 全文搜索字段。

影响：

- 文章页为一个非首屏核心功能加载全站全文索引。
- 网络慢时该请求会非常显眼。
- 数据解析也会增加主线程压力。

相关文件：

- `src/views/PostView.vue`
- `src/scripts/generate-metadata.js`

### 4. 文章页 JS chunk 偏重

文章页默认加载 Markdown 渲染、数学公式、代码块、图片预览等能力。即使某篇文章没有公式、代码或图片，也会加载这套能力。

影响：

- `PostView` chunk 偏大。
- 首屏 JS 下载、解析、执行成本偏高。
- 简短文章的固定成本过高。

相关文件：

- `src/components/MarkdownRenderer.vue`
- `src/components/CodeBlock.vue`
- `package.json`

### 5. 评论组件过早加载

`giscus.app/client.js` 在文章页 mounted 后立即插入。截图中还出现了 giscus discussion 404 请求。

影响：

- 评论并非首屏必须内容，却会抢占网络资源。
- 第三方脚本存在额外不确定性。
- 404 请求说明配置或讨论映射可能需要检查。

相关文件：

- `src/views/PostView.vue`

## 优化路线

### 阶段一：低风险止血优化

目标：不大改架构，先明显减少文章页请求体积和串行等待。

#### 1.1 生成轻量推荐数据

在 `generate-metadata.js` 中新增 `related_by_slug.json`。

建议结构：

```json
{
  "7fde58cd": [
    {
      "title": "RAG图谱实体和边智能合并",
      "date": "2025-07-13",
      "slug": "xxx",
      "readingTime": 5,
      "tags": ["随笔杂记"]
    }
  ]
}
```

实现要点：

- 构建时根据标签重合度和发布日期计算每篇文章的前 3 条相关推荐。
- 不包含 `searchContent`、`excerpt`、`img` 等非必要字段。
- 文章页只请求 `/markdown/metadata/related_by_slug.json`，或进一步拆成 `/markdown/metadata/related/<slug>.json`。

验收标准：

- `PostView.vue` 不再请求 `search_index.json`。
- 文章页相关推荐功能保持可用。
- 新推荐数据 raw 体积显著小于 `search_index.json`。

#### 1.2 文章页改用 slug 直达数据

新增构建产物 `/markdown/posts/<slug>.json`，把文章页需要的内容放进单篇 JSON。

建议结构：

```json
{
  "title": "测试仪",
  "date": "2026-03-11 14:13:43",
  "updatedAt": "2026-03-11 14:13:43",
  "categories": ["随笔杂记"],
  "tags": ["随笔杂记"],
  "wordCount": 9,
  "readingTime": 1,
  "body": "# 测试仪\n\n这里是内容的起始点。"
}
```

实现要点：

- `generate-metadata.js` 遍历 Markdown 时同步输出每篇文章的 slug JSON。
- `PostView.vue` 直接传 `slug` 给文章渲染组件。
- `MarkdownRenderer.vue` 从 `/markdown/posts/${slug}.json` 读取数据，不再读取 `/markdown/<filename>.md`。
- 删除文章页对 `slug_mapping.json` 的依赖，或只保留兼容旧链接。

验收标准：

- 文章正文请求由两段串行变成一段请求。
- `/post/:slug` 能直接加载对应文章。
- 原有文章元信息、目录、过期提示、分享按钮正常。

#### 1.3 评论组件懒加载

把 giscus 脚本加载从 mounted 立即执行改成懒加载。

优先方案：

- 使用 `IntersectionObserver` 监听评论容器。
- 评论区进入视口附近时再插入 giscus script。
- 若浏览器不支持 `IntersectionObserver`，用 `requestIdleCallback` 或 `setTimeout` 兜底。

验收标准：

- 首屏 Network 中不再立即出现 giscus 请求。
- 滚动到评论区后评论正常加载。
- 不重复插入多个 giscus script。

#### 1.4 增加简单请求缓存

新增一个轻量数据读取工具，例如 `src/utils/requestCache.ts`。

作用：

- 缓存已请求的文章 JSON。
- 缓存相关推荐 JSON。
- 站内跳转时避免重复请求同一资源。

验收标准：

- 从文章 A 跳到文章 B 再返回文章 A，不重复请求 A 的文章 JSON。
- 缓存逻辑不影响刷新页面后的正常加载。

#### 1.5 增加加载状态提示

文章页即使已经优化请求链路，也仍然可能受到慢网、第三方脚本或 CDN 回源影响。需要给用户明确反馈，避免白屏或空区域造成“卡死”的错觉。

优化方案：

- 正文区域在客户端数据未返回时展示轻量 skeleton。
- 正文加载失败时展示错误提示和重试按钮。
- 相关推荐加载时展示 3 条占位卡片。
- 评论区展示延迟加载提示，并提供“立即加载评论”按钮。

验收标准：

- 慢网下打开文章页能看到正在加载的状态。
- 文章 JSON 请求失败时能手动重试。
- 评论脚本未加载前有明确提示，且不阻塞正文阅读。

### 阶段二：减少首屏 JS 和主线程压力

目标：让文章页首屏只加载真正需要的功能。

#### 2.1 按需加载公式渲染

当前 `MarkdownRenderer.vue` 默认导入：

- `markdown-it-texmath`
- `katex`
- `katex/dist/katex.min.css`

优化方案：

- 在加载文章正文后先检测是否包含公式语法。
- 只有包含 `$...$`、`$$...$$`、`\(...\)`、`\[...\]` 时才动态导入 KaTeX 相关模块。
- 无公式文章使用基础 MarkdownIt 实例。

验收标准：

- 无公式文章的文章页 chunk 体积下降。
- 有公式文章仍能正确渲染。

#### 2.2 按需加载代码块组件和高亮库

当前所有文章都会引入 `CodeBlock.vue`，而代码高亮能力只对含代码块文章有意义。

优化方案：

- 检测正文是否包含 fenced code block。
- 有代码块时再动态加载 `CodeBlock.vue` 和高亮相关依赖。
- 普通行内代码继续用原生 `<code>` 渲染。

验收标准：

- 无代码块文章不加载代码高亮相关 chunk。
- 有代码块文章复制、行号、高亮等功能正常。

#### 2.3 普通图片先用原生 img

当前 Markdown 图片被转换为 Naive UI `NImage`。

优化方案：

- 默认渲染原生 `<img loading="lazy" decoding="async">`。
- 点击图片时再进入全局 lightbox。
- 如确实需要 Naive UI 预览能力，再在点击时动态加载。

验收标准：

- 文章图片可正常显示和放大。
- 首屏不因图片预览组件加载额外代码。

#### 2.4 清理未使用依赖

检查 `package.json` 中未使用或重复的库：

- `marked`
- `prismjs`
- `html2pdf.js`
- `emoji-vue`
- `vue3-emoji`
- `@giscus/vue`
- `three`
- `@types/three`

处理原则：

- 确认未使用后移除。
- 如果只在特定页面使用，改成动态导入。
- 清理后重新构建检查 chunk 变化。

验收标准：

- 构建通过。
- 首页、文章页、归档页、关于页、媒体页功能正常。
- 主 chunk 和文章页 chunk 体积下降。

### 阶段三：文章页静态化

目标：让每篇文章在构建后都有 HTML，首屏直接可读。

#### 3.1 配置 vite-ssg includedRoutes

使用 `vite-ssg` 的 `includedRoutes`，把所有文章 slug 加入预渲染路径。

目标产物：

```text
dist/post/7fde58cd.html
dist/post/<other-slug>.html
```

实现要点：

- 在构建阶段读取 metadata 或 slug mapping。
- 返回静态页面路径列表。
- 保留现有静态页面：`/`、`/archive`、`/media`、`/about`、`/resume`。

验收标准：

- `dist/post/<slug>.html` 存在。
- 直接访问文章 URL 能返回包含文章标题和正文的 HTML。
- 刷新文章页不依赖 rewrite 到 `index.html` 才能显示内容。

#### 3.2 构建时预渲染 Markdown HTML

进一步把 Markdown 解析前移到构建阶段。

建议方案：

- `generate-metadata.js` 输出每篇文章的 `html` 和 `headings`。
- 前端文章组件只负责渲染 HTML、绑定目录、处理图片点击等增强功能。
- 对代码块和公式保留必要的客户端增强。

验收标准：

- 首屏 HTML 中能看到正文内容。
- 客户端 hydration 后交互功能正常。
- Markdown 解析不再成为文章页运行时成本。

#### 3.3 页面级 head 信息

为每篇文章生成更完整的 SEO 和社交分享信息。

建议内容：

- `title`
- `description`
- `canonical`
- `og:title`
- `og:description`
- `og:type`
- `article:published_time`
- `article:modified_time`

验收标准：

- 查看生成的文章 HTML，head 中有对应元信息。
- 分享链接时标题和摘要正确。

### 阶段四：缓存与部署优化

目标：让静态资源在真实网络下更稳定、更快。

#### 4.1 配置静态资源缓存

如果部署在 Vercel，补充 `vercel.json` headers。

建议策略：

- `/assets/*`：`Cache-Control: public, max-age=31536000, immutable`
- `/markdown/posts/*`：`Cache-Control: public, max-age=86400, stale-while-revalidate=604800`
- `/markdown/metadata/*`：`Cache-Control: public, max-age=3600, stale-while-revalidate=86400`

验收标准：

- 线上响应头符合预期。
- 二次访问文章页时静态资源命中缓存。

#### 4.2 检查自定义域名和 CDN

截图中 303B 的 Markdown 请求也耗时接近 13 秒，这更像网络链路或 CDN 缓存问题，而不是文件本身体积问题。

检查项：

- `www.imbailey.cn` 当前解析到哪里。
- 是否走 Vercel、GitHub Pages、Cloudflare 或其他 CDN。
- 中国大陆访问是否稳定。
- 是否存在回源慢、缓存未命中、TLS 握手慢等问题。

可选方案：

- 使用 Cloudflare 做缓存。
- 使用 Vercel Edge 并正确配置缓存头。
- 若主要读者在国内，考虑腾讯云 COS/CDN、阿里云 OSS/CDN 等静态托管。

验收标准：

- 冷启动文章页主要静态资源 TTFB 明显下降。
- 小文件请求不再出现 10 秒级耗时。

### 阶段五：验证与监控

目标：让优化效果可量化。

#### 5.1 建立本地性能基线

每次优化前后记录：

- `dist/assets/PostView*.js` raw/gzip 大小。
- `search_index.json` raw/gzip 大小。
- 文章页首屏请求数量。
- 文章正文可见时间。
- Lighthouse Performance 分数。

推荐命令：

```bash
yarn build
gzip -c dist/assets/PostView-*.js | wc -c
gzip -c public/markdown/metadata/search_index.json | wc -c
```

#### 5.2 浏览器验证清单

使用 DevTools 或 Playwright 检查：

- 禁用缓存后打开 `/post/7fde58cd`。
- 正文是否尽早出现。
- 首屏是否请求 `search_index.json`。
- 首屏是否请求 giscus。
- 相关推荐是否正常。
- 目录点击是否正常。
- 深色模式、分享、图片预览是否正常。

#### 5.3 线上真实用户监控

已有：

- `@vercel/analytics`
- `@vercel/speed-insights`

后续关注：

- LCP
- INP
- CLS
- TTFB
- 文章页按路径聚合的慢请求

## 推荐实施顺序

1. 生成 `related_by_slug.json`，文章页停止加载 `search_index.json`。
2. 生成 `/markdown/posts/<slug>.json`，文章页用 slug 一次请求拿正文和元信息。
3. giscus 评论懒加载。
4. 公式、代码块、图片预览按需加载。
5. 配置 `vite-ssg includedRoutes`，生成文章静态 HTML。
6. 构建时预渲染 Markdown HTML。
7. 配置缓存头和 CDN。
8. 建立每次发布前的性能检查清单。

## 已实施记录

- 已生成 `related_by_slug.json`，文章页不再为相关推荐加载完整 `search_index.json`。
- 已生成 `/markdown/posts/<slug>.json`，文章正文从 slug 直达单篇数据。
- 已为文章页增加模块级 JSON 请求缓存。
- 已将 giscus 改为评论区附近懒加载，并增加评论加载提示和手动加载按钮。
- 已将 KaTeX、texmath、代码块组件改为按需加载。
- 已移除文章页对 Naive UI 图片预览组件的依赖，Markdown 图片使用原生懒加载图片。
- 已清理未使用直接依赖，降低依赖图噪声。
- 已配置 `vite-ssg includedRoutes`，构建 276 篇文章静态 HTML。
- 已在构建阶段预渲染 Markdown HTML 和目录 headings，文章页运行时优先使用预生成 HTML。
- 已为 Vercel 增加静态资源、文章 JSON、metadata JSON 的缓存头。

## 预期收益

完成阶段一后：

- 文章页首屏不再加载 772 KB raw 的搜索索引。
- 文章正文请求链路减少一跳。
- 评论第三方脚本不再抢首屏网络。

完成阶段二后：

- 文章页 JS chunk 下降。
- 无公式、无代码、无图片的短文章加载成本明显降低。

完成阶段三后：

- 文章页具备真正静态 HTML。
- 弱网下也能更早看到标题和正文。
- SEO 和社交分享质量提升。

完成阶段四后：

- 线上小文件 10 秒级慢请求应显著减少。
- 二次访问和站内跳转体验更稳定。
