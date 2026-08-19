import Link from "next/link";
import type { Post } from "@/types";
import { categoryOf, postsByCategory } from "@/lib/categories";
import { postPath } from "@/lib/getBlogPosts";
import { formatDate } from "@/lib/formatDate";
import { getReadTime } from "@/lib/readTime";

/**
 * Three more posts from the same category, server-rendered as real anchors.
 *
 * Falls back to filling from the newest posts so a thin category still emits
 * three links — otherwise the only articles with no internal inbound links
 * would be the ones in the smallest categories, which is backwards.
 */
export default function RelatedPosts({
  post,
  posts,
}: {
  post: Post;
  posts: Post[];
}) {
  const category = categoryOf(post);
  const sameCategory = postsByCategory(posts, category.slug).filter(
    (p) => p._id !== post._id
  );
  const filler = posts.filter(
    (p) => p._id !== post._id && !sameCategory.some((s) => s._id === p._id)
  );
  const related = [...sameCategory, ...filler].slice(0, 3);

  if (!related.length) return null;

  return (
    <section
      aria-labelledby="related-posts"
      className="px-4 sm:px-8 md:px-20 pb-16"
    >
      <h2
        id="related-posts"
        className="text-zinc-100 text-xl sm:text-2xl font-black uppercase tracking-tight mb-6"
      >
        More on {category.name}
      </h2>

      <ul className="grid gap-6 sm:grid-cols-3">
        {related.map((item) => (
          <li key={item._id}>
            <Link
              href={postPath(item)}
              className="group flex flex-col gap-3 h-full"
            >
              <div className="aspect-[16/9] overflow-hidden rounded-xl bg-zinc-800">
                <img
                  src={item.photo}
                  alt={item.title}
                  loading="lazy"
                  width={480}
                  height={270}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-zinc-100 text-sm sm:text-base font-semibold leading-snug group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-zinc-500 text-[11px] uppercase tracking-widest font-bold">
                {formatDate(item.createdAt)} • {getReadTime(item.content, item.readTime)}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href={`/blogs/category/${category.slug}`}
        className="inline-block mt-8 text-xs font-black uppercase tracking-widest text-primary hover:text-white transition-colors"
      >
        All {category.name} articles
      </Link>
    </section>
  );
}
