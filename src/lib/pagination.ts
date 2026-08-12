import type { Post } from "@/types";

/**
 * Blog listing pagination.
 *
 * /blogs rendered every post in a single view. That is fine at 30-odd posts and
 * a crawl problem well before it becomes a reading problem — the page grows
 * without bound and every post sits at the same depth with no stable URL to
 * link to. Paginated URLs give each batch its own address.
 *
 * Page 1 is always /blogs, never /blogs/page/1 — two URLs for one set of posts
 * is the duplicate-content problem this is meant to avoid. /blogs/page/1 is
 * redirected in next.config.ts.
 */
export const POSTS_PER_PAGE = 9;

export function pageCount(total: number): number {
  return Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
}

export function paginate(posts: Post[], page: number): Post[] {
  const start = (page - 1) * POSTS_PER_PAGE;
  return posts.slice(start, start + POSTS_PER_PAGE);
}

/** Canonical path for a page number. */
export function blogPagePath(page: number): string {
  return page <= 1 ? "/blogs" : `/blogs/page/${page}`;
}
