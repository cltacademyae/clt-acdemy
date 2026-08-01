import type { Post } from "@/types";

/**
 * Controlled category taxonomy for the blog.
 *
 * The CMS stores free-text tags, which had drifted to 30 distinct values —
 * mostly one-offs, plus case duplicates ("Risk Management" / "Risk
 * management"). Building a hub per tag would ship 30 near-empty pages, so tags
 * are mapped onto a fixed set here and the raw tag stays as a tag.
 *
 * The mapping is the interim measure described in DEV-023; the durable fix is
 * a category field in the CMS, at which point `categoryOf` reads it directly
 * and the keyword rules become the fallback for legacy posts.
 */
export type Category = {
  slug: string;
  name: string;
  description: string;
};

export const CATEGORIES: Category[] = [
  {
    slug: "forex-basics",
    name: "Forex Basics",
    description:
      "Foundational forex concepts for new traders — how the market works, what moves it, and the vocabulary you need before placing a first trade.",
  },
  {
    slug: "trading-psychology",
    name: "Trading Psychology",
    description:
      "The mental side of trading: discipline, emotional control, patience and the habits that separate consistent traders from impulsive ones.",
  },
  {
    slug: "risk-management",
    name: "Risk Management",
    description:
      "Position sizing, leverage, margin and drawdown — how professional traders protect capital before they think about profit.",
  },
  {
    slug: "trading-strategies",
    name: "Trading Strategies",
    description:
      "Setups, market structure and execution: liquidity zones, volatility patterns, order flow and the timing behind each entry.",
  },
  {
    slug: "uae-markets-regulation",
    name: "UAE Markets & Regulation",
    description:
      "Trading in the UAE — regulation, licensed brokers, tax treatment and what traders in Dubai and the wider Emirates need to know.",
  },
  {
    slug: "crypto-trading",
    name: "Crypto Trading",
    description:
      "Cryptocurrency markets explained for traders: how crypto differs from forex, and how to approach it with the same structure.",
  },
  {
    slug: "stock-markets",
    name: "Stock Markets",
    description:
      "Equity market education — indices, stock selection and how equities behave differently from leveraged instruments.",
  },
];

export const categoryBySlug = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug);

// First match wins, so the more specific rules are listed first.
const RULES: [RegExp, string][] = [
  [/crypto|bitcoin|blockchain/i, "crypto-trading"],
  [/\buae\b|dubai|emirat|regulat|legal|licen[cs]|\bsca\b/i, "uae-markets-regulation"],
  [/stock|equit|index|indices|nasdaq/i, "stock-markets"],
  [/psycholog|emotion|mindset|discipline|confidence|patience/i, "trading-psychology"],
  [/risk|drawdown|margin|leverage|lot size|\bloss(es)?\b|survival/i, "risk-management"],
  [
    // \b on short words: an unanchored /plan/ matched "Explanation".
    /strateg|vwap|volatil|order flow|breakout|vcp|execution|timing|time compression|market structure|liquidity|supply and demand|journal|\bplan\b/i,
    "trading-strategies",
  ],
];

/** Resolve a post to exactly one category. Everything unmatched is Forex Basics. */
export function categoryOf(post: Pick<Post, "tags" | "title">): Category {
  const haystack = [...(post.tags || []), post.title || ""].join(" ");
  for (const [pattern, slug] of RULES) {
    if (pattern.test(haystack)) return categoryBySlug(slug)!;
  }
  return categoryBySlug("forex-basics")!;
}

export function postsByCategory(posts: Post[], slug: string): Post[] {
  return posts.filter((p) => categoryOf(p).slug === slug);
}

/** Only categories that actually hold posts — an empty hub is a thin page. */
export function activeCategories(posts: Post[]): Category[] {
  const counts = categoryCounts(posts);
  return CATEGORIES.filter((c) => (counts.get(c.slug) || 0) > 0);
}

export function categoryCounts(posts: Post[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const post of posts) {
    const { slug } = categoryOf(post);
    counts.set(slug, (counts.get(slug) || 0) + 1);
  }
  return counts;
}
