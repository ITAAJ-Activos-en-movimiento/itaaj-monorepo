import { Base } from "../../../common";

export interface Comment {
  uuid: string;
  text: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post extends Base {
  title: string;
  slug: string;
  author: string;
  category: string;
  description: string;
  tags: string[];
  excerpt: string;
  content: string;
  featuredImage?: string;
  socialImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  canonicalUrl?: string;
  relatedPosts?: string[];
  commentsEnabled: boolean;
  comments?: Comment[];
  likes: number;
  shares: number;
  views: number;
  rating?: number;
  language?: string;
  duration?: string;
  location?: string;
  source?: string;
  inGeneral: boolean;
  company: string;
}
