import type { Metadata } from "next";

/**
 * Single source of truth for all SEO / metadata.
 * Per-page layouts call `pageMetadata()` instead of duplicating blocks.
 */
export const SITE = {
  name: "CLT Academy",
  url: "https://clt-academy.com",
  // No superlatives ("No.1", "leading"): YMYL category, unverifiable claims
  // are a quality and advertising-compliance risk.
  defaultTitle: "KHDA-Approved Trading Academy in Dubai | CLT Academy",
  titleTemplate: "%s | CLT Academy",
  description:
    "CLT Academy is a KHDA-approved trading academy in Dubai — structured forex, stock & crypto trading courses with mentorship, live sessions and certification.",
  // Fallback only; routes generate their own card via opengraph-image.
  ogImage: "/logo-black.png",
  locale: "en_AE",
  phone: "+971557454939",
  email: "info@clt-academy.com",
  // Registered trade name on the DED professional licence. "CLT" is the
  // trading name; both are published so the entity resolves either way.
  legalName: "Career and Life Transformation Management Development Training",
  address: {
    streetAddress: "M09, Al Shaibani Building, Hor Al Anz East",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  // Coordinates read off the Google Business Profile listing, not estimated.
  geo: { latitude: 25.2812375, longitude: 55.3541152 },
  foundingDate: "2020",
  // Verifiable registrations. Both are public-register numbers — publishing
  // them is what turns "KHDA-approved" from a claim into a checkable fact.
  credentials: {
    khdaPermit: "633004",
    tradeLicence: "1483845",
    licensingAuthority: "Dubai Department of Economy and Tourism",
  },
  openingHours: {
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "10:00",
    closes: "22:00",
  },
  googleBusinessProfile:
    "https://maps.app.goo.gl/ttc5Bzdjbuk1zguq5",
  socials: [
    "https://www.linkedin.com/company/clt-academy/",
    "https://www.youtube.com/@CLTAcademyDxB",
    "https://www.instagram.com/clt_academy.ae/",
    "https://www.trustpilot.com/review/clttradingacademy.com",
    "https://maps.app.goo.gl/ttc5Bzdjbuk1zguq5",
  ],
} as const;

/** Fallback `instructor` on CourseInstance and `author` on blog posts. */
export const PRIMARY_INSTRUCTOR = {
  name: "Mathson Mathew",
  jobTitle: "Forex Trading Mentor",
  sameAs: "https://www.linkedin.com/in/mathson-mathew-30474226a/",
} as const;

/**
 * The root `title.template` only reaches one segment down. Use this on nested
 * routes whose parent layout sets its own title.
 */
export function withBrand(title: string) {
  return title.endsWith(SITE.name) ? title : `${title} | ${SITE.name}`;
}

type PageMetaInput = {
  /** Use `{ absolute }` on segments where the root title template still applies. */
  title?: Metadata["title"];
  description?: string;
  /** Path with leading slash, e.g. "/courses". Used for canonical + og:url. */
  path?: string;
  images?: { url: string; width?: number; height?: number; alt?: string }[];
};

export function pageMetadata({
  title,
  description,
  path = "/",
  images,
}: PageMetaInput): Metadata {
  const url = `${SITE.url}${path === "/" ? "" : path}`;
  const desc = description ?? SITE.description;
  const ogImages =
    images ?? [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }];

  return {
    title,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title: title ?? SITE.defaultTitle,
      description: desc,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type: "website",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? SITE.defaultTitle,
      description: desc,
      images: ogImages.map((i) => i.url),
    },
  };
}
