import type { NextConfig } from "next";
import { COURSE_SLUGS, SERVICE_SLUGS } from "./src/lib/catalog.slugs";

// Security response headers applied to every route.
// CSP is intentionally permissive (allows the external scripts/iframes the
// site already uses: GTM, TradingView widget, unpkg, the blog API) so it does
// not break the site — it can be tightened later once sources are audited.
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
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:",
      "style-src 'self' 'unsafe-inline' https:",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https:",
      "frame-src 'self' https:",
      "connect-src 'self' https:",
      "object-src 'none'",
      "base-uri 'self'",
    ].join("; "),
  },
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
