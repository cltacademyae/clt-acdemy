import Schema from "@/components/seo/Schema";
import { SITE } from "@/const/seo";

/**
 * No `aggregateRating`/`review` until reviews come from a verifiable source —
 * the on-site testimonials are hard-coded strings with stock avatars, and
 * marking those up is a manual-action risk.
 */
export default function LocalBusinessSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE.url}/contact#localbusiness`,
    name: SITE.name,
    url: `${SITE.url}/contact`,
    image: `${SITE.url}/logo.png`,
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: "$$",
    parentOrganization: { "@id": `${SITE.url}/#organization` },
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.streetAddress,
      addressLocality: SITE.address.addressLocality,
      addressCountry: SITE.address.addressCountry,
    },
    // Taken from the Google Maps embed on /contact, which is pinned on the
    // "CLT trading academy" place entry.
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.279983,
      longitude: 55.351095,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: SITE.openingHours.days,
        opens: SITE.openingHours.opens,
        closes: SITE.openingHours.closes,
      },
    ],
    sameAs: SITE.socials,
  };

  return <Schema data={data} />;
}
