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
    legalName: SITE.legalName,
    url: `${SITE.url}/contact`,
    image: `${SITE.url}/logo.png`,
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: "$$",
    hasMap: SITE.googleBusinessProfile,
    parentOrganization: { "@id": `${SITE.url}/#organization` },
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.streetAddress,
      addressLocality: SITE.address.addressLocality,
      addressCountry: SITE.address.addressCountry,
    },
    // Read off the Google Business Profile listing so the pin, the NAP data
    // here and the GBP entry all agree.
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
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
