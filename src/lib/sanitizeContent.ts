/**
 * Defensive sanitiser for editor-authored blog HTML coming from the CMS.
 *
 * Trims leading/trailing whitespace inside href values so a pasted URL with a
 * stray space ("URL contains space" in SEO crawls) still renders as a clean
 * link. The known broken links have been corrected at source in the CMS; this
 * only guards against the same whitespace mistake in future posts.
 * Applied server-side so the SSR output crawlers see is already clean.
 */
export function sanitizeContent(html: string): string {
  if (!html) return html;
  return html.replace(/href="([^"]*)"/g, (_full, raw: string) => `href="${raw.trim()}"`);
}
