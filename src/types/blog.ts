export type BlogPost = {
  id: string;

  title: string;

  slug: string;

  excerpt: string;

  content: string;

  cover_image: string;

  seo_title: string;

  seo_description: string;

  keywords: string[];

  published: boolean;

  created_at: string;
};