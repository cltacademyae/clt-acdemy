import Link from "next/link";
import type { Post } from "@/types";
import { categoryOf, categoryBySlug } from "@/lib/categories";
import { postPath } from "@/lib/getBlogPosts";
import { isGuide } from "@/lib/getGuides";
import { formatDate } from "@/lib/formatDate";
import { getReadTime } from "@/lib/readTime";

/**
 * Supporting blog articles for a pillar guide.
 *
 * The blog's own RelatedPosts block is styled for the dark modal, so this is a
 * light-theme sibling rather than a reuse. Other guides are filtered out — the
 * blog is where supporting articles live, and a guide linking to a guide under
 * "supporting articles" would misrepresent the hierarchy.
 *
 * When an editor maps specific posts to the guide in the CMS, those win;
 * otherwise it falls back to the guide's category, then to the newest posts,
 * so a guide is never a dead end.
 */
export default function RelatedArticles({
  posts,
  category,
  pinned,
  limit = 3,
}: {
  posts: Post[];
  category?: string | null;
  /** Post ids an editor mapped to this guide in the CMS. */
  pinned?: string[];
  limit?: number;
}) {
  const articles = posts.filter((p) => !isGuide(p));

  const chosen = pinned?.length
    ? (pinned
        .map((id) => articles.find((p) => p._id === id))
        .filter(Boolean) as Post[])
    : [];

  const sameCategory = category
    ? articles.filter((p) => categoryOf(p).slug === category)
    : [];

  const seen = new Set<string>();
  const related = [...chosen, ...sameCategory, ...articles]
    .filter((p) => (seen.has(p._id) ? false : seen.add(p._id)))
    .slice(0, limit);

  if (!related.length) return null;

  const categoryName = category ? categoryBySlug(category)?.name : undefined;

  return (
    <section
      aria-labelledby="supporting-articles"
      className="container mx-auto px-4 max-w-7xl py-12 border-t border-gray-200"
    >
      <h2 id="supporting-articles" className="text-2xl font-bold text-black/90 mb-6">
        {categoryName ? `More on ${categoryName}` : "Supporting articles"}
      </h2>

      <ul className="grid gap-6 sm:grid-cols-3">
        {related.map((post) => (
          <li key={post._id}>
            <Link href={postPath(post)} className="group flex h-full flex-col gap-2">
              <h3 className="font-semibold text-black/90 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-black/60 line-clamp-3">
                {post.description}
              </p>
              <p className="mt-auto pt-2 text-xs text-black/40">
                {formatDate(post.createdAt)} • {getReadTime(post.content, post.readTime)}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
