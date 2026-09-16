import type { AuthorProfile } from "@/types";

/**
 * The /learn section — four pillar reference guides on permanent URLs outside
 * the blog.
 *
 * Content is CMS-driven: a post with `type: "guide"` becomes a guide, and
 * `getGuides()` maps it onto the shape below. The placeholders here exist so
 * the four URLs, the layout and the table of contents are reviewable before
 * marketing delivers final copy — the same pattern `commercial.ts` uses.
 *
 * A guide still carrying `placeholder: true` renders a visible notice and is
 * noindex, so draft copy cannot reach the index by accident. The flag clears
 * itself the moment a real CMS guide exists on that slug.
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
  /** True while this is scaffolding rather than delivered copy. */
  placeholder: boolean;
};

const DRAFT_NOTE =
  "<p><em>Placeholder section. Final copy is pending from the Media/Marketing team.</em></p>";

const draft = (headings: string[]): string =>
  headings
    .map((h) => `<h2>${h}</h2>${DRAFT_NOTE}`)
    .join("");

export const PLACEHOLDER_GUIDES: Guide[] = [
  {
    slug: "forex-trading-for-beginners",
    title: "Forex Trading for Beginners",
    metaTitle: "Forex Trading for Beginners — Complete Guide | CLT Academy",
    metaDescription:
      "Placeholder meta description — pending final copy from marketing.",
    description:
      "A structured introduction to the forex market for new traders. Final copy pending.",
    content: draft([
      "What the forex market actually is",
      "How a currency pair is quoted",
      "Lots, pips and position size",
      "What a beginner should learn first",
      "Common beginner mistakes",
    ]),
    category: "forex-basics",
    courseIds: [1, 2],
    noindex: true,
    placeholder: true,
  },
  {
    slug: "forex-risk-management",
    title: "Forex Risk Management",
    metaTitle: "Forex Risk Management — Complete Guide | CLT Academy",
    metaDescription:
      "Placeholder meta description — pending final copy from marketing.",
    description:
      "How professional traders protect capital before thinking about profit. Final copy pending.",
    content: draft([
      "Why risk comes before strategy",
      "Position sizing and the 1% rule",
      "Stop placement and invalidation",
      "Leverage and margin in practice",
      "Drawdown and recovery maths",
    ]),
    category: "risk-management",
    courseIds: [2, 3],
    noindex: true,
    placeholder: true,
  },
  {
    slug: "smart-money-concepts",
    title: "Smart Money Concepts",
    metaTitle: "Smart Money Concepts (SMC) — Complete Guide | CLT Academy",
    metaDescription:
      "Placeholder meta description — pending final copy from marketing.",
    description:
      "Market structure, liquidity and order flow explained. Final copy pending.",
    content: draft([
      "What smart money concepts describe",
      "Market structure and breaks of structure",
      "Liquidity, sweeps and stop hunts",
      "Order blocks and fair value gaps",
      "Where SMC is misapplied",
    ]),
    category: "trading-strategies",
    courseIds: [3, 4],
    noindex: true,
    placeholder: true,
  },
  {
    slug: "prop-firm-trading-uae",
    title: "Prop Firm Trading in the UAE",
    metaTitle: "Prop Firm Trading in the UAE — Complete Guide | CLT Academy",
    metaDescription:
      "Placeholder meta description — pending final copy from marketing.",
    description:
      "How proprietary trading firms and evaluations work for traders in the UAE. Final copy pending.",
    content: draft([
      "What a proprietary trading firm is",
      "How an evaluation or challenge works",
      "Payout structures and profit splits",
      "Rules that most candidates fail on",
      "Regulatory position in the UAE",
    ]),
    category: "uae-markets-regulation",
    courseIds: [3, 4],
    noindex: true,
    placeholder: true,
  },
];

export const placeholderBySlug = (slug: string): Guide | undefined =>
  PLACEHOLDER_GUIDES.find((g) => g.slug === slug);
