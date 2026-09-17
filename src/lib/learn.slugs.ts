// Dependency-free: next.config.ts imports this and cannot resolve the "@/" alias.
//
// Old blog URL -> pillar guide slug under /learn.
//
// Two kinds of entry live here. A post promoted to a guide keeps its words but
// changes address, so its old URL redirects. A post absorbed into a guide was
// merged into that guide's text and then deleted, so its old URL redirects too
// — otherwise every link and share pointing at it would 404.
//
// `sanitizeContent` reads this map as well, so links written inside other
// articles are rewritten to the new address as the page renders and never take
// the redirect hop.
export const LEARN_REDIRECTS: Record<string, string> = {
  // Promoted
  "forex-trading-for-beginners-the-complete-guide-2026": "forex-trading-for-beginners",
  "what-are-pips-lots-and-leverage-in-forex": "forex-risk-management",
  "learning-to-read-the-market-why-market-structure-is-every-forex-trader-s-foundation":
    "smart-money-concepts",

  // Absorbed into the risk management guide
  "trading-drawdown-why-it-happens-and-how-to-recover-smartly": "forex-risk-management",
  "what-is-lot-size-leverage-and-margin-in-forex": "forex-risk-management",
  "small-losses-big-survival-how-professionals-think-about-risk": "forex-risk-management",

  // Absorbed into the smart money concepts guide
  "understanding-supply-and-demand-in-forex-markets": "smart-money-concepts",
  "how-liquidity-zones-control-market-movement": "smart-money-concepts",
  "order-flow-imbalance-trading-strategy-a-deep-dive-into-institutional-footprint-analysis":
    "smart-money-concepts",
  "anchored-vwap-reversion-strategy-trading-institutional-fair-value-zones":
    "smart-money-concepts",
};
