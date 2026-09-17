// Dependency-free: next.config.ts imports this and cannot resolve the "@/" alias.
//
// Old blog URL -> pillar guide slug under /learn. One entry per existing post
// that marketing promoted to a guide. The CMS record is renamed to the guide
// slug at the same time, so the blog route can no longer serve it; this map is
// what turns the old address into a literal 301 rather than a 404.
export const LEARN_REDIRECTS: Record<string, string> = {
  "forex-trading-for-beginners-the-complete-guide-2026": "forex-trading-for-beginners",
};
