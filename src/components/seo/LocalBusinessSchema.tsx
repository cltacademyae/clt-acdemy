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
    // TODO: approximate. Replace with the exact Google Business Profile pin.
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.2854,
      longitude: 55.3271,
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
