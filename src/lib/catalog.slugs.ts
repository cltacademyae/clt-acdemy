// Dependency-free: next.config.ts imports this and cannot resolve the "@/" alias.
export const COURSE_SLUGS: Record<string, string> = {
  "1": "trade-craft-beginner-forex",
  "2": "profit-matrix-intermediate-trading",
  "3": "market-code-advanced-trading",
  "4": "clt-vantage-pro-mentorship",
};

// Ids differ from the SEO handover's mapping, which was off by one. Slugs match it.
export const SERVICE_SLUGS: Record<string, string> = {
  "1": "digital-trading-journal",
  "2": "discord-trading-community",
  "3": "clt-precision-indicator",
  "4": "lifetime-mentorship",
  "5": "the-profit-block-ebook",
  "6": "whatsapp-community",
};
