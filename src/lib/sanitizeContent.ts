import { COURSE_SLUGS, SERVICE_SLUGS } from "@/lib/catalog.slugs";

/**
 * Normaliser for editor-authored blog HTML coming from the CMS.
 *
 * Authors paste raw URLs and the editor anchors them with the URL as the
 * visible text, so ~39 links across the archive carry no anchor text at all.
 * Rewriting at render time fixes the existing archive and keeps the CMS as the
 * source of truth. Runs server-side, so SSR output is already clean.
 */

const INTERNAL_HOSTS = new Set([
  "clt-academy.com",
  "www.clt-academy.com",
  // Typo'd in some posts; this domain does not resolve.
  "cltacademy.com",
  "www.cltacademy.com",
]);

const PATH_LABELS: Record<string, string> = {
  "": "CLT Academy",
  "/about": "About CLT Academy",
  "/contact": "Contact CLT Academy",
  "/courses": "Forex Trading Courses",
  "/team": "Our Trading Mentors",
  "/blogs": "CLT Academy Trading Blog",
  "/addons": "Trading Tools and Add-Ons",
  "/gallery": "CLT Academy Gallery",
  "/courses/trade-craft-beginner-forex": "Trade Craft Beginner Forex Course",
  "/courses/profit-matrix-intermediate-trading": "Profit Matrix Trading Course",
  "/courses/market-code-advanced-trading": "Market Code Advanced Trading Course",
  "/courses/clt-vantage-pro-mentorship": "CLT Vantage Mentorship Programme",
};

const isBareUrlText = (text: string) => /^(https?:\/\/|www\.)\S*$/i.test(text);

/** Legacy numeric ids resolve via a 301; internal links should skip the hop. */
function canonicalPath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, "");
  const course = trimmed.match(/^\/courses\/(\d+)$/);
  if (course && COURSE_SLUGS[course[1]]) return `/courses/${COURSE_SLUGS[course[1]]}`;
  const service = trimmed.match(/^\/services\/(\d+)$/);
  if (service && SERVICE_SLUGS[service[1]]) return `/services/${SERVICE_SLUGS[service[1]]}`;
  if (trimmed === "/termsandcondition") return "/terms-and-conditions";
  return trimmed;
}

function labelFor(pathname: string): string {
  if (PATH_LABELS[pathname] !== undefined) return PATH_LABELS[pathname];
  const last = pathname.split("/").filter(Boolean).pop();
  if (!last) return "CLT Academy";
  return last.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

const stripAttr = (attrs: string, name: string) =>
  attrs.replace(new RegExp(`\\s*${name}="[^"]*"`, "gi"), "");

export function sanitizeContent(html: string): string {
  if (!html) return html;

  return html.replace(
    /<a\b([^>]*?)href="([^"]*)"([^>]*)>([\s\S]*?)<\/a>/gi,
    (full, pre: string, rawHref: string, post: string, inner: string) => {
      const href = rawHref.trim();
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return full;
      }

      let url: URL;
      try {
        url = new URL(href, "https://clt-academy.com");
      } catch {
        return full;
      }

      const text = inner.replace(/<[^>]+>/g, "").trim();
      let attrs = stripAttr(`${pre} ${post}`, "rel").replace(/\s+/g, " ").trim();

      if (INTERNAL_HOSTS.has(url.hostname)) {
        const path = canonicalPath(url.pathname);
        // Internal links need no rel, and reopening the same site in a new tab
        // is a usability cost with no upside.
        attrs = stripAttr(attrs, "target").trim();
        const label = !text || isBareUrlText(text) ? labelFor(path) : inner;
        return `<a href="${path || "/"}${url.search}${url.hash}"${
          attrs ? ` ${attrs}` : ""
        }>${label}</a>`;
      }

      const label = !text || isBareUrlText(text)
        ? url.hostname.replace(/^www\./, "")
        : inner;
      return `<a href="${href}"${attrs ? ` ${attrs}` : ""} rel="nofollow noopener">${label}</a>`;
    }
  );
}
