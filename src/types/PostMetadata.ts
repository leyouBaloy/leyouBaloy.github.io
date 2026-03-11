export interface PostMetadata {
    title: string;
    date: string;
    file: string;
    excerpt: string;
    tags?: string[] | undefined;
    categories?: string[] | undefined;
    img?: string;
    totalPages?: number;
  }
  