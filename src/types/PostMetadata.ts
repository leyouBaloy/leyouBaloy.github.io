export interface PostMetadata {
    title: string;
    date: string;
    updatedAt?: string;
    file: string;
    slug: string;
    legacySlug?: string;
    aliases?: string[];
    excerpt: string;
    tags?: string[] | undefined;
    categories?: string[] | undefined;
    img?: string;
    totalPages?: number;
    wordCount?: number;
    readingTime?: number;
    searchContent?: string;
  }
  
