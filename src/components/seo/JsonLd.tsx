import { SITE } from "@/const/seo";

/**
 * Site-wide structured data (JSON-LD).
 * Rendered once in the root layout. Powers Google rich results,
 * sitelinks search box and the brand knowledge panel.
 */
export default function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    alternateName: ["CLT Trading Academy", SITE.legalName],
    url: SITE.url,
    logo: `${SITE.url}/logo.png`,
    image: `${SITE.url}/logo.png`,
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone,
    foundingDate: SITE.foundingDate,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.streetAddress,
      addressLocality: SITE.address.addressLocality,
      addressCountry: SITE.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    // Accreditation as machine-readable, checkable data rather than a marketing
    // phrase — both numbers sit on public government registers.
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Accreditation",
        identifier: SITE.credentials.khdaPermit,
        name: `KHDA Educational Services Permit ${SITE.credentials.khdaPermit}`,
        recognizedBy: {
          "@type": "GovernmentOrganization",
          name: "Knowledge and Human Development Authority (KHDA)",
          url: "https://www.khda.gov.ae/",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Professional Licence",
        identifier: SITE.credentials.tradeLicence,
        name: `Dubai Professional Licence ${SITE.credentials.tradeLicence}`,
        recognizedBy: {
          "@type": "GovernmentOrganization",
          name: SITE.credentials.licensingAuthority,
        },
      },
    ],
    areaServed: [
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "City", name: "Dubai" },
      { "@type": "City", name: "Sharjah" },
      { "@type": "City", name: "Abu Dhabi" },
    ],
    sameAs: SITE.socials,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: "en-AE",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
