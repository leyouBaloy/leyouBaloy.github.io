/// <reference types="vite-ssg" />

import { fileURLToPath, URL } from "node:url";
import fs from "node:fs";
import path from "node:path";
import { setup } from "@css-render/vue3-ssr";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteUrl = "https://leyoubaloy.github.io";
const siteName = "Bailey's Blog";
const siteDescription =
  "Bailey's Blog，记录技术实践、读书观影、旅行见闻与生活思考。";

interface PostSeo {
  title: string;
  date: string;
  updatedAt?: string;
  slug: string;
  excerpt?: string;
  tags?: string[];
  img?: string;
}

interface SeoMeta {
  title: string;
  description: string;
  url: string;
  type: "website" | "article";
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}

const staticPageMeta: Record<string, { title: string; description: string }> = {
  "/": {
    title: siteName,
    description: siteDescription,
  },
  "/archive": {
    title: `归档 | ${siteName}`,
    description: "按时间、标签和关键词浏览 Bailey's Blog 的全部文章。",
  },
  "/media": {
    title: `见闻录 | ${siteName}`,
    description: "Bailey 的旅行、观影、读书和生活见闻记录。",
  },
  "/about": {
    title: `关于 | ${siteName}`,
    description: "关于 Bailey 的个人介绍、经历与联系方式。",
  },
  "/resume": {
    title: `简历 | ${siteName}`,
    description: "Bailey 的个人简历与项目经历。",
  },
};

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const stripControlWhitespace = (value = "") =>
  String(value).replace(/\s+/g, " ").trim();

let postsForSeoCache: Record<string, PostSeo> | null = null;

const normalizeRoute = (route: string) => {
  if (!route || route === "/index") return "/";
  return route.endsWith("/") && route.length > 1 ? route.slice(0, -1) : route;
};

const absoluteUrl = (route: string) => `${siteUrl}${route === "/" ? "/" : route}`;

const absoluteAssetUrl = (asset?: string) => {
  if (!asset) return undefined;
  if (/^https?:\/\//i.test(asset)) return asset;
  return `${siteUrl}${asset.startsWith("/") ? asset : `/${asset}`}`;
};

const loadPostsForSeo = (): Record<string, PostSeo> => {
  if (postsForSeoCache) return postsForSeoCache;

  const postsDir = path.resolve(__dirname, "public/markdown/posts");
  if (!fs.existsSync(postsDir)) {
    postsForSeoCache = {};
    return postsForSeoCache;
  }

  postsForSeoCache = fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".json"))
    .reduce<Record<string, PostSeo>>((postsBySlug, file) => {
      const post = JSON.parse(
        fs.readFileSync(path.join(postsDir, file), "utf8")
      ) as PostSeo;
      if (post.slug && post.title) {
        postsBySlug[post.slug] = post;
      }
      return postsBySlug;
    }, {});
  return postsForSeoCache;
};

const getSeoMeta = (route: string): SeoMeta => {
  const normalizedRoute = normalizeRoute(route);
  const postMatch = normalizedRoute.match(/^\/post\/([^/]+)$/);

  if (postMatch) {
    const posts = loadPostsForSeo();
    const slug = decodeURIComponent(postMatch[1]);
    const post = posts[slug];

    if (post) {
      return {
        title: `${post.title} | ${siteName}`,
        description: stripControlWhitespace(post.excerpt || siteDescription).slice(
          0,
          160
        ),
        url: absoluteUrl(normalizedRoute),
        type: "article",
        image: absoluteAssetUrl(post.img),
        publishedTime: post.date,
        modifiedTime: post.updatedAt || post.date,
        tags: post.tags || [],
      };
    }
  }

  const staticMeta = staticPageMeta[normalizedRoute] || staticPageMeta["/"];
  return {
    title: staticMeta.title,
    description: staticMeta.description,
    url: absoluteUrl(normalizedRoute),
    type: "website",
  };
};

const buildStructuredData = (meta: SeoMeta) => {
  if (meta.type === "article") {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: meta.title.replace(` | ${siteName}`, ""),
      description: meta.description,
      url: meta.url,
      mainEntityOfPage: meta.url,
      datePublished: meta.publishedTime,
      dateModified: meta.modifiedTime,
      author: {
        "@type": "Person",
        name: "Bailey",
        url: siteUrl,
      },
      publisher: {
        "@type": "Person",
        name: "Bailey",
      },
      image: meta.image,
      keywords: meta.tags?.join(", "),
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    description: meta.description,
    url: siteUrl,
    inLanguage: "zh-CN",
  };
};

const injectSeoMeta = (html: string, route: string) => {
  const meta = getSeoMeta(route);
  const structuredData = JSON.stringify(buildStructuredData(meta)).replace(
    /</g,
    "\\u003c"
  );
  const imageMeta = meta.image
    ? `
    <meta property="og:image" content="${escapeHtml(meta.image)}">
    <meta name="twitter:image" content="${escapeHtml(meta.image)}">`
    : "";
  const articleMeta =
    meta.type === "article"
      ? `
    <meta property="article:published_time" content="${escapeHtml(
      meta.publishedTime || ""
    )}">
    <meta property="article:modified_time" content="${escapeHtml(
      meta.modifiedTime || ""
    )}">${(meta.tags || [])
          .map(
            (tag) =>
              `
    <meta property="article:tag" content="${escapeHtml(tag)}">`
          )
          .join("")}`
      : "";
  const seoHead = `
    <meta name="description" content="${escapeHtml(meta.description)}">
    <link rel="canonical" href="${escapeHtml(meta.url)}">
    <meta property="og:site_name" content="${escapeHtml(siteName)}">
    <meta property="og:type" content="${meta.type}">
    <meta property="og:title" content="${escapeHtml(meta.title)}">
    <meta property="og:description" content="${escapeHtml(meta.description)}">
    <meta property="og:url" content="${escapeHtml(meta.url)}">${imageMeta}${articleMeta}
    <meta name="twitter:card" content="${
      meta.image ? "summary_large_image" : "summary"
    }">
    <meta name="twitter:title" content="${escapeHtml(meta.title)}">
    <meta name="twitter:description" content="${escapeHtml(meta.description)}">
    <script type="application/ld+json">${structuredData}</script>`;

  return html
    .replace(/<html lang="[^"]*"/, '<html lang="zh-CN"')
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(meta.title)}</title>`)
    .replace(
      /<meta name="description" content="[\s\S]*?">\s*/g,
      ""
    )
    .replace(/<link rel="canonical" href="[\s\S]*?">\s*/g, "")
    .replace(/<\/head>/, `${seoHead}</head>`);
};

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3000,
    open: true,
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  ssr: {
    noExternal: ["naive-ui", "vueuc", "date-fns"],
  },
  ssgOptions: {
    includedRoutes(paths) {
      const slugMappingPath = path.resolve(
        __dirname,
        "public/markdown/metadata/slug_mapping.json"
      );

      if (!fs.existsSync(slugMappingPath)) {
        return paths;
      }

      const slugMapping = JSON.parse(fs.readFileSync(slugMappingPath, "utf8"));
      const postRoutes = Object.keys(slugMapping).map((slug) => `/post/${slug}`);
      const staticPaths = paths.filter((routePath) => !routePath.includes(":"));
      return Array.from(new Set([...staticPaths, ...postRoutes]));
    },
    async onBeforePageRender(_, __, appCtx) {
      const { collect } = setup(appCtx.app);
      (appCtx as any).__collectStyle = collect;
      return undefined;
    },
    async onPageRendered(route, renderedHTML, appCtx) {
      const htmlWithStyles = renderedHTML.replace(
        /<\/head>/,
        `${(appCtx as any).__collectStyle()}</head>`
      );
      return injectSeoMeta(htmlWithStyles, route);
    },
  },
});
