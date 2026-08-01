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
  readTime?: string;
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
