import type { NextConfig } from "next";
import { COURSE_SLUGS, SERVICE_SLUGS } from "./src/lib/catalog.slugs";

/**
 * Content-Security-Policy, enforced.
 *
 * This started as a permissive `https:`-wildcard policy plus a strict candidate
 * running in report-only. The candidate collected real violations from
 * production traffic, which is how these three origins were found — none of
 * them appear in the page source:
 *
 *   connect.facebook.net        Meta Pixel, injected by GTM
 *   www.google.com/g/collect    GA4's collect endpoint
 *   static.cloudflareinsights.com  Cloudflare's beacon, auto-injected by the
 *                               proxy — it did not exist before the site was
 *                               put behind Cloudflare
 *
 * `report-uri` stays on deliberately. Any tag added in GTM later will surface
 * at /api/csp-report instead of silently breaking, and the logs are the only
 * warning that a marketing change needs an origin added here.
 *
 * If something does break: swap the key back to
 * `Content-Security-Policy-Report-Only`, redeploy, and read the reports.
 */
const CSP = [
  "default-src 'self'",
  [
    "script-src 'self' 'unsafe-inline'",
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://connect.facebook.net",
    "https://static.cloudflareinsights.com",
    "https://unpkg.com",
  ].join(" "),
  "style-src 'self' 'unsafe-inline' https://unpkg.com https://fonts.googleapis.com",
  [
    "img-src 'self' data: blob:",
    "https://cdn.clt-academy.com",
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://www.facebook.com",
  ].join(" "),
  "font-src 'self' data: https://fonts.gstatic.com",
  [
    "frame-src 'self'",
    "https://www.tradingview-widget.com",
    "https://www.tradingview.com",
    "https://www.google.com",
    "https://www.youtube.com",
    "https://www.youtube-nocookie.com",
    "https://www.googletagmanager.com",
  ].join(" "),
  [
    "connect-src 'self'",
    "https://blogs.clt-academy.com",
    "https://www.google.com",
    "https://www.google-analytics.com",
    "https://region1.google-analytics.com",
    "https://www.googletagmanager.com",
    "https://static.cloudflareinsights.com",
    "https://connect.facebook.net",
    "https://www.facebook.com",
    "https://script.google.com",
    "https://script.googleusercontent.com",
  ].join(" "),
  "form-action 'self' https://script.google.com",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "report-uri /api/csp-report",
].join("; ");

// Security response headers applied to every route.
const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "geolocation=(), microphone=(), camera=()",
  },
  { key: "Content-Security-Policy", value: CSP },
];

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Force blocking metadata for every request so <title>, description,
  // canonical and robots always render inside <head> in the initial HTML.
  // Without this, Next 15+ streams async generateMetadata (blog posts) into
  // <body> for non-JS crawlers (Screaming Frog etc.), which flags them as
  // "outside <head>". /.*/ disables streaming metadata for all user agents.
  htmlLimitedBots: /.*/,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    const slugRedirects = [
      // 301, not Next's default 308 — the SEO acceptance criteria check for a
      // literal 301.
      ...Object.entries(COURSE_SLUGS).map(([id, slug]) => ({
        source: `/courses/${id}`,
        destination: `/courses/${slug}`,
        statusCode: 301 as const,
      })),
      ...Object.entries(SERVICE_SLUGS).map(([id, slug]) => ({
        source: `/services/${id}`,
        destination: `/services/${slug}`,
        statusCode: 301 as const,
      })),
    ];

    return [
      // Numeric paths are linked from live blog content and the press release.
      ...slugRedirects,
      {
        source: "/termsandcondition",
        destination: "/terms-and-conditions",
        statusCode: 301,
      },
      // DEV-019: the same post was published twice. The "-2" record — generic
      // "Admin" author, keyword-stuffed description — was deleted, but its URL
      // was already in the sitemap, so it redirects rather than 404s.
      {
        source:
          "/blogs/what-every-new-trader-should-learn-before-placing-their-first-trade-2",
        destination:
          "/blogs/what-every-new-trader-should-learn-before-placing-their-first-trade",
        statusCode: 301,
      },
      // Page 1 of the blog listing lives at /blogs. Serving it at both URLs
      // would duplicate the set this pagination exists to split up.
      {
        source: "/blogs/page/1",
        destination: "/blogs",
        statusCode: 301,
      },
      // www served a duplicate 200 of every page.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.clt-academy.com" }],
        destination: "https://clt-academy.com/:path*",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
