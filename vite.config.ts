/// <reference types="vite-ssg" />

import { fileURLToPath, URL } from "node:url";
import fs from "node:fs";
import path from "node:path";
import { setup } from "@css-render/vue3-ssr";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
    async onPageRendered(_, renderedHTML, appCtx) {
      return renderedHTML.replace(
        /<\/head>/,
        `${(appCtx as any).__collectStyle()}</head>`
      );
    },
  },
});
