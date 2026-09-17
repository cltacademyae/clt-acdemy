import { getBlogPosts, slugify } from "@/lib/getBlogPosts";
import { withBrand } from "@/const/seo";
import {
  PILLAR_SLUGS,
  PLACEHOLDER_GUIDES,
  placeholderBySlug,
  type Guide,
} from "@/const/learn";
import type { Post } from "@/types";

/**
 * Guides are blog posts the CMS has marked `type: "guide"`. They are served
 * from /learn, and deliberately excluded from /blogs, the category hubs and
 * the blog half of the sitemap — the same content on two indexable URLs is the
 * duplication this section exists to avoid.
 *
 * Until the CMS field ships and marketing delivers copy, the four pillar slugs
 * resolve to the placeholders in `@/const/learn`, so the URLs and layout are
 * reviewable now and swap over with no code change.
 */

/** Canonical URL path for a guide. */
export const guidePath = (slug: string): string => `/learn/${slug}`;

export const isGuide = (post: Post): boolean => post.type === "guide";

function toGuide(post: Post): Guide {
  const slug = post.slug || slugify(post.title);
  const fallback = placeholderBySlug(slug);
  const seo = post.seo || {};

  return {
    slug,
    title: post.title,
    metaTitle: seo.metaTitle?.trim() || withBrand(post.title),
    metaDescription: seo.metaDescription?.trim() || post.description,
    description: post.description,
    content: post.content,
    category: post.category ?? fallback?.category ?? null,
    photo: post.photo,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    readTime: post.readTime,
    author: post.authorDetails ?? null,
    reviewer: post.reviewerDetails ?? null,
    // Editor's choice wins; the provisional mapping is the fallback.
    courseIds: post.relatedCourses?.length
      ? post.relatedCourses
      : fallback?.courseIds ?? [1, 2],
    relatedPosts: post.relatedPosts ?? [],
    canonicalOverride: seo.canonicalOverride?.trim() || undefined,
    noindex: Boolean(seo.noindex),
    placeholder: false,
  };
}

/**
 * The four pillars in the order the brief sets, then any further CMS guides.
 * A real guide always beats the placeholder on the same slug.
 */
export async function getGuides(): Promise<Guide[]> {
  const fromCms = (await getBlogPosts()).filter(isGuide).map(toGuide);
  const bySlug = new Map(fromCms.map((g) => [g.slug, g]));

  const pillars = PILLAR_SLUGS.map(
    (slug) => bySlug.get(slug) ?? placeholderBySlug(slug)!
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
  return (await getGuides()).filter((g) => !g.noindex && !g.placeholder);
}

export { PLACEHOLDER_GUIDES };
