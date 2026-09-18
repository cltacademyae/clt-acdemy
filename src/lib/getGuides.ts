import { getBlogPosts, slugify } from "@/lib/getBlogPosts";
import { withBrand } from "@/const/seo";
import { PILLAR_SLUGS, type Guide } from "@/const/learn";
import type { Post } from "@/types";

/**
 * Guides are blog posts the CMS has marked `type: "guide"`. They are served
 * from /learn, and deliberately excluded from /blogs, the category hubs and
 * the blog half of the sitemap — the same content on two indexable URLs is the
 * duplication this section exists to avoid.
 *
 * Guides come only from the CMS. The pillar slugs set the order they appear
 * in; a pillar with no guide published simply does not appear.
 */

/** Canonical URL path for a guide. */
export const guidePath = (slug: string): string => `/learn/${slug}`;

export const isGuide = (post: Post): boolean => post.type === "guide";

function toGuide(post: Post): Guide {
  const slug = post.slug || slugify(post.title);
  const seo = post.seo || {};

  return {
    slug,
    title: post.title,
    metaTitle: seo.metaTitle?.trim() || withBrand(post.title),
    metaDescription: seo.metaDescription?.trim() || post.description,
    description: post.description,
    content: post.content,
    category: post.category ?? null,
    photo: post.photo,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    readTime: post.readTime,
    author: post.authorDetails ?? null,
    reviewer: post.reviewerDetails ?? null,
    // Editor's choice wins; the CTA falls back to the beginner ladder.
    courseIds: post.relatedCourses?.length ? post.relatedCourses : [1, 2],
    relatedPosts: post.relatedPosts ?? [],
    canonicalOverride: seo.canonicalOverride?.trim() || undefined,
    noindex: Boolean(seo.noindex),
  };
}

/** The pillars in the order the brief sets, then any further CMS guides. */
export async function getGuides(): Promise<Guide[]> {
  const fromCms = (await getBlogPosts()).filter(isGuide).map(toGuide);
  const bySlug = new Map(fromCms.map((g) => [g.slug, g]));

  // Only pillars that actually have a published guide.
  const pillars = PILLAR_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (g): g is Guide => Boolean(g)
  );

  const extras = fromCms.filter(
    (g) => !PILLAR_SLUGS.includes(g.slug as (typeof PILLAR_SLUGS)[number])
  );

  return [...pillars, ...extras];
}

export async function getGuideBySlug(slug: string): Promise<Guide | undefined> {
  const target = decodeURIComponent(slug);
  return (await getGuides()).find((g) => g.slug === target);
}

/** Slugs that must not also render under /blogs. */
export async function guideSlugs(): Promise<string[]> {
  return (await getGuides()).map((g) => g.slug);
}

/** Every guide that may be advertised to search engines. */
export async function indexableGuides(): Promise<Guide[]> {
  return (await getGuides()).filter((g) => !g.noindex);
}

