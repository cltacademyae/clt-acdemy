export interface Post {
  _id: string;
  /** Stored slug. Absent on older records until the CMS backfill runs. */
  slug?: string;
  title: string;
  description: string;
  content: string;
  photo: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  author: string;
  __v?: number;
  /** Whole minutes, set manually by the author. Absent on posts created before this field existed. */
  readTime?: number;
  /** Controlled taxonomy slug set in the CMS. Absent on legacy posts. */
  category?: string | null;
  /**
   * Course ids an editor attached to this post. When absent, the related-course
   * block falls back to a mapping by category.
   */
  relatedCourses?: number[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    canonicalOverride?: string;
    ogImage?: string;
    noindex?: boolean;
    focusKeyword?: string;
    schemaOverride?: string;
  } | null;
  authorDetails?: AuthorProfile | null;
}

export interface AuthorProfile {
  _id: string;
  name: string;
  profession: string;
  link: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface User {
  id: string;
  username: string;
  role: "admin" | "user";
}

export type AppState = {
  posts: Post[];
  currentUser: User | null;
  selectedPost: Post | null;
};
