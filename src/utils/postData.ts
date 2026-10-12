import { getCachedJson } from './requestCache';

declare const process: {
  cwd: () => string;
};

export interface PostPayload {
  title: string;
  date: string;
  updatedAt?: string;
  updated?: string;
  file: string;
  slug: string;
  legacySlug?: string;
  aliases?: string[];
  routeSlug?: string;
  excerpt?: string;
  categories?: string[];
  tags?: string[];
  img?: string;
  wordCount?: number;
  readingTime?: number;
  body?: string;
  html?: string;
  headings?: Array<{
    level: number;
    text: string;
    id: string;
  }>;
  hasMath?: boolean;
}

export interface RelatedPost {
  title: string;
  date: string;
  updatedAt?: string;
  slug: string;
  tags?: string[];
  readingTime?: number;
}

const readPublicJson = async <T>(relativePath: string): Promise<T> => {
  const importNodeModule = new Function('specifier', 'return import(specifier)') as (specifier: string) => Promise<any>;
  const [{ readFile }, { join }] = await Promise.all([
    importNodeModule('node:fs/promises'),
    importNodeModule('node:path')
  ]);
  const filePath = join(process.cwd(), 'public', relativePath);
  return JSON.parse(await readFile(filePath, 'utf8')) as T;
};

export const getPostPayload = async (slug: string): Promise<PostPayload> => {
  const path = `markdown/posts/${encodeURIComponent(slug)}.json`;
  if (import.meta.env.SSR) {
    return readPublicJson<PostPayload>(path);
  }
  return getCachedJson<PostPayload>(`/${path}`);
};

export const getRelatedBySlug = async (): Promise<Record<string, RelatedPost[]>> => {
  const path = 'markdown/metadata/related_by_slug.json';
  if (import.meta.env.SSR) {
    return readPublicJson<Record<string, RelatedPost[]>>(path);
  }
  return getCachedJson<Record<string, RelatedPost[]>>(`/${path}`);
};

/**
 * 读取 public 目录下的 JSON：SSG 构建时直接读磁盘，客户端走网络请求。
 * 用于让首页/归档/见闻录等页面在静态 HTML 中包含真实内容。
 */
export const fetchPublicJson = async <T>(url: string): Promise<T> => {
  if (import.meta.env.SSR) {
    return readPublicJson<T>(url.replace(/^\//, ''));
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  return response.json() as Promise<T>;
};
