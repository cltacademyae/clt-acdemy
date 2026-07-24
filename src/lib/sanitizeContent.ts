import { SITE } from "@/const/seo";

/**
 * Defensive sanitiser for editor-authored blog HTML coming from the CMS.
 *
 * The CMS lets authors paste raw anchors, and a few posts shipped with broken
 * hrefs that SEO crawlers (Screaming Frog) flag:
 *   - trailing/leading whitespace inside href values -> "URL contains space"
 *   - a relative link missing the /blogs/ prefix       -> internal 4xx
 *   - a stray "CLT Academy" href (space, no target)    -> "URL contains space"
 *
 * The correct long-term fix is editing the content in the CMS; this keeps the
 * rendered HTML clean until that happens and guards against the same mistakes
 * in future posts. Applied server-side so SSR output crawlers see is already
 * clean.
 */

// Known content errors that can't be corrected generically (author intent).
// Keyed by the exact broken href value.
const HREF_CORRECTIONS: Record<string, string> = {
  "CLT Academy": SITE.url,
  "/trading-is-not-about-doubling-your-money": `${SITE.url}/blogs/trading-is-not-about-doubling-your-money-it-is-about-building-the-right-skills`,
};

export function sanitizeContent(html: string): string {
  if (!html) return html;

  return html.replace(/href="([^"]*)"/g, (_full, raw: string) => {
    // Exact-match corrections first (before trimming changes the key).
    if (Object.prototype.hasOwnProperty.call(HREF_CORRECTIONS, raw)) {
      return `href="${HREF_CORRECTIONS[raw]}"`;
    }
    // Generic: strip leading/trailing whitespace from the URL.
    const trimmed = raw.trim();
    return `href="${trimmed}"`;
  });
}
