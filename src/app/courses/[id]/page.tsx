import Breadcrumbs from "@/components/global/breadcrumbs";
import CourseTitleCotainer from "@/components/global/courseTitleCotainer";
import CourseFaq from "@/components/page-sections/course/CourseFaq";
import TabListing from "@/components/page-sections/course/tabListing";
import CourseNav from "@/components/page-sections/course/courseNav";
import Cta from "@/components/page-sections/home/cta";
import Schema from "@/components/seo/Schema";
import { SITE, PRIMARY_INSTRUCTOR } from "@/const/seo";
import {
  COURSE_LEVELS,
  cleanCourseName,
  getCourseBySlug,
  orderedCourseSlugs,
} from "@/lib/catalog";
import { notFound } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: slug } = await params;
  const resolved = getCourseBySlug(slug);
  if (!resolved) notFound();

  const { id, detail: course } = resolved;
  const url = `${SITE.url}/courses/${slug}`;
  const weeks = course.duration?.match(/\d+/)?.[0];
  const name = cleanCourseName(course.name);

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${url}#course`,
    name,
    description: course.description,
    url,
    inLanguage: "en",
    educationalLevel: COURSE_LEVELS[id],
    provider: {
      "@type": "EducationalOrganization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      url: SITE.url,
    },
    // TODO(DEV-020): no `offers` until prices are confirmed.
    ...(weeks
      ? {
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: ["Onsite", "Online"],
            courseWorkload: `P${weeks}W`,
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
            instructor: {
              "@type": "Person",
              name: PRIMARY_INSTRUCTOR.name,
              jobTitle: PRIMARY_INSTRUCTOR.jobTitle,
              sameAs: PRIMARY_INSTRUCTOR.sameAs,
            },
          },
        }
      : {}),
  };

  // Same array the accordion renders — schema cannot disagree with the page.
  const faqSchema =
    course.faq && course.faq.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${url}#faq`,
          mainEntity: course.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }
      : null;

  const index = orderedCourseSlugs.indexOf(slug);

  return (
    <>
      <Schema data={faqSchema ? [courseSchema, faqSchema] : courseSchema} />
      <CourseTitleCotainer title={name} description={course.description} />
      <Breadcrumbs
        trail={[
          { name: "Courses", href: "/courses" },
          { name, href: `/courses/${slug}` },
        ]}
      />
      <CourseFaq
        faqItems={course.faq || []}
        subtitle={course.detSubtitle || ""}
        title={course.detTitle || ""}
        description={course.detDesc || ""}
      />
      <TabListing
        duration={course.duration || ""}
        title={name}
        tabs={(course.tabs as never) || []}
      />
      <CourseNav
        courseName={name}
        previous={index > 0 ? orderedCourseSlugs[index - 1] : null}
        next={
          index < orderedCourseSlugs.length - 1
            ? orderedCourseSlugs[index + 1]
            : null
        }
      />
      <Cta />
      <div className="mb-20"></div>
    </>
  );
};

export default Page;
