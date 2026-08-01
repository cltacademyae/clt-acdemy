import { BLOG_POSTS } from "@/const/data";
import { Post } from "@/types";
import { sanitizeContent } from "@/lib/sanitizeContent";

/** Clean editor-authored HTML (broken/whitespace hrefs) before it reaches the DOM. */
function sanitizePosts(posts: Post[]): Post[] {
  return posts.map((p) =>
    p.content ? { ...p, content: sanitizeContent(p.content) } : p
  );
}

/**
 * Turn a post title into a clean, URL-safe slug.
 * "Best Online Trading Course UAE!" -> "best-online-trading-course-uae"
 */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Server-side fetch of all blog posts (list endpoint returns full content).
 * Falls back to bundled BLOG_POSTS if the backend URL is unset or the
 * request fails — so SSR always has content.
 */
export async function getBlogPosts(): Promise<Post[]> {
  const base = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!base) return sanitizePosts(BLOG_POSTS);
  try {
    const res = await fetch(`${base}/api/blogs`, { next: { revalidate: 300 } });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length) return sanitizePosts(data);
    }
  } catch (e) {
    console.error("getBlogPosts failed:", e);
  }
  return sanitizePosts(BLOG_POSTS);
}

/** Stored slug wins; title-derived and exact-title lookups keep old links alive. */
export async function getBlogPostBySlug(slug: string): Promise<Post | undefined> {
  const target = decodeURIComponent(slug);
  const posts = await getBlogPosts();
  return (
    posts.find((p) => p.slug === target) ||
    posts.find((p) => slugify(p.title) === target) ||
    posts.find((p) => p.title === target)
  );
}

/** Canonical URL path for a post. */
export function postPath(post: Pick<Post, "slug" | "title">): string {
  return `/blogs/${post.slug || slugify(post.title)}`;
}
