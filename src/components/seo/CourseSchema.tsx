import { SITE } from "@/const/seo";
import { courseData, courseDetails } from "@/const/data";

/**
 * Course structured data (JSON-LD) for the /courses listing.
 * Emits a schema.org ItemList of Course entries so Google can show
 * the course carousel / course rich results. Invisible to users.
 */
export default function CourseSchema() {
  const provider = {
    "@type": "EducationalOrganization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    url: SITE.url,
  };

  // "4 weeks" -> ISO-8601 duration "P4W" (Google's courseWorkload format)
  const toWorkload = (id: number): string | undefined => {
    const detail = courseDetails[String(id) as keyof typeof courseDetails];
    const weeks = detail?.duration?.match(/\d+/)?.[0];
    return weeks ? `P${weeks}W` : undefined;
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE.url}/courses/#courses`,
    itemListElement: courseData.map((course, index) => {
      const workload = toWorkload(course.id);
      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Course",
          "@id": `${SITE.url}/courses/${course.id}#course`,
          name: course.name,
          description: course.description,
          url: `${SITE.url}/courses/${course.id}`,
          provider,
          ...(workload
            ? {
                hasCourseInstance: {
                  "@type": "CourseInstance",
                  courseMode: ["Onsite", "Online"],
                  courseWorkload: workload,
                  location: {
                    "@type": "Place",
                    name: SITE.name,
                    address: {
                      "@type": "PostalAddress",
                      streetAddress: SITE.address.streetAddress,
                      addressLocality: SITE.address.addressLocality,
                      addressCountry: SITE.address.addressCountry,
                    },
                  },
                },
              }
            : {}),
        },
      };
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
    />
  );
}
