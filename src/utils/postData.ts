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
