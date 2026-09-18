import type { AuthorProfile } from "@/types";

/**
 * The /learn section — pillar reference guides on permanent URLs outside the
 * blog.
 *
 * Entirely CMS-driven: a post with `type: "guide"` becomes a guide, and
 * `getGuides()` maps it onto the shape below. Nothing here supplies content.
 *
 * This file used to carry placeholder guides so the URLs and layout could be
 * reviewed before copy existed. Real guides are published now, so they have
 * been removed — a page that says "final copy pending" has no business on a
 * live site.
 */

/** Fixed by the brief. Order drives the /learn landing page. */
export const PILLAR_SLUGS = [
  "forex-trading-for-beginners",
  "forex-risk-management",
  "smart-money-concepts",
  "prop-firm-trading-uae",
] as const;

export type PillarSlug = (typeof PILLAR_SLUGS)[number];

export type Guide = {
  slug: string;
  /** Visible H1. */
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** Intro paragraph, and the card text on /learn. */
  description: string;
  /** Editor-authored HTML, same shape as a blog post's content. */
  content: string;
  photo?: string;
  createdAt?: string;
  updatedAt?: string;
  readTime?: number;
  author?: AuthorProfile | null;
  reviewer?: AuthorProfile | null;
  /**
   * Drives the supporting-article block. Guides are not listed in the blog's
   * category hubs, but they still belong to a topic.
   */
  category?: string | null;
  /** Course ids for the CTA block. Provisional until marketing confirms. */
  courseIds: number[];
  /** Supporting blog post ids an editor mapped to this guide. */
  relatedPosts?: string[];
  canonicalOverride?: string;
  noindex: boolean;
};
