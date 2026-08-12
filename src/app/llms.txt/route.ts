import { SITE } from "@/const/seo";
import { COURSE_SLUGS } from "@/lib/catalog.slugs";
import { courseData } from "@/const/data";
import { cleanCourseName } from "@/lib/catalog";

/**
 * Plain-text org summary for AI crawlers. Generated rather than static so the
 * course list cannot drift from what the pages render.
 */
export const dynamic = "force-static";

export function GET() {
  const courses = courseData
    .map((course) => {
      const slug = COURSE_SLUGS[String(course.id)];
      const name = cleanCourseName(course.name);
      const duration = course.name.match(/\((\d+\s*weeks?)\)/i)?.[1] ?? "";
      return `- [${name}](${SITE.url}/courses/${slug})${
        duration ? `: ${duration}.` : "."
      }`;
    })
    .join("\n");

  const body = `# ${SITE.name}

> KHDA-approved trading academy in Dubai, UAE. Founded ${SITE.foundingDate}.
> Structured forex, stock, crypto and Indian markets education.
> Education and training only — not investment advice, not a brokerage.

## Verifiable registrations
- Legal name: ${SITE.legalName}
- KHDA Educational Services Permit: ${SITE.credentials.khdaPermit}
- Dubai Professional Licence: ${SITE.credentials.tradeLicence}
- Licensing authority: ${SITE.credentials.licensingAuthority}

## Courses
${courses}

## Key pages
- [About](${SITE.url}/about)
- [Courses](${SITE.url}/courses)
- [Team](${SITE.url}/team)
- [Press & facts](${SITE.url}/press)
- [Blog](${SITE.url}/blogs)
- [Contact](${SITE.url}/contact)

## Contact
${SITE.address.streetAddress}, ${SITE.address.addressLocality}, United Arab Emirates
${SITE.phone} | ${SITE.email}
Open ${SITE.openingHours.opens}–${SITE.openingHours.closes} daily.

## Risk notice
Trading carries a high level of risk and can result in the loss of capital.
Past performance does not indicate future results.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
