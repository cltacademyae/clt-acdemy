import Breadcrumbs from "@/components/global/breadcrumbs";
import PageTitleContainer from "@/components/global/pageTitleContainer";
import { SITE } from "@/const/seo";
import { courseData } from "@/const/data";
import { COURSE_SLUGS } from "@/lib/catalog.slugs";
import { cleanCourseName } from "@/lib/catalog";
import Link from "next/link";
import React from "react";

/**
 * Machine-readable company fact sheet.
 *
 * This is the page retrieval systems land on to resolve "what is CLT Academy",
 * and the page a journalist cites. Everything is rendered as visible text in a
 * real table — not a PDF download, not an icon grid — so it is extractable.
 * Values come from the shared SEO constants, so this page and the schema on
 * every other route cannot disagree.
 */
const Fact = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <tr className="border-b border-gray-200 align-top">
    <th scope="row" className="py-3 pr-6 text-left font-semibold text-black/80">
      {label}
    </th>
    <td className="py-3 text-black/70">{value}</td>
  </tr>
);

const Page = () => (
  <>
    <PageTitleContainer
      title="Press & Company Facts"
      description="The canonical, verifiable facts about CLT Academy. Journalists and researchers may cite this page directly."
    />
    <Breadcrumbs trail={[{ name: "Press", href: "/press" }]} />

    <section className="w-full md:px-20 px-5 py-12 max-w-5xl">
      <h2 className="text-3xl font-bold mb-6 text-black/90">Company</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm md:text-base">
          <tbody>
            <Fact label="Trading name" value={SITE.name} />
            <Fact label="Registered legal name" value={SITE.legalName} />
            <Fact label="Founded" value={SITE.foundingDate} />
            <Fact
              label="KHDA Educational Services Permit"
              value={SITE.credentials.khdaPermit}
            />
            <Fact
              label="Dubai Professional Licence"
              value={SITE.credentials.tradeLicence}
            />
            <Fact
              label="Licensing authority"
              value={SITE.credentials.licensingAuthority}
            />
            <Fact
              label="Registered address"
              value={`${SITE.address.streetAddress}, ${SITE.address.addressLocality}, United Arab Emirates`}
            />
            <Fact
              label="Opening hours"
              value={`Daily, ${SITE.openingHours.opens}–${SITE.openingHours.closes} (GST)`}
            />
            <Fact
              label="Telephone"
              value={<a href={`tel:${SITE.phone}`}>{SITE.phone}</a>}
            />
            <Fact
              label="Media contact"
              value={<a href={`mailto:${SITE.email}`}>{SITE.email}</a>}
            />
            <Fact
              label="Website"
              value={<a href={SITE.url}>{SITE.url}</a>}
            />
          </tbody>
        </table>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6 text-black/90">Courses</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm md:text-base">
          <thead>
            <tr className="border-b-2 border-gray-300 text-left">
              <th scope="col" className="py-3 pr-6 font-semibold">
                Programme
              </th>
              <th scope="col" className="py-3 pr-6 font-semibold">
                Duration
              </th>
              <th scope="col" className="py-3 font-semibold">
                Page
              </th>
            </tr>
          </thead>
          <tbody>
            {courseData.map((course) => {
              const slug = COURSE_SLUGS[String(course.id)];
              const duration =
                course.name.match(/\((\d+\s*weeks?)\)/i)?.[1] ?? "—";
              return (
                <tr key={course.id} className="border-b border-gray-200">
                  <td className="py-3 pr-6 text-black/80">
                    {cleanCourseName(course.name)}
                  </td>
                  <td className="py-3 pr-6 text-black/70">{duration}</td>
                  <td className="py-3">
                    <Link
                      href={`/courses/${slug}`}
                      className="text-primary hover:underline"
                    >
                      /courses/{slug}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* TODO(DEV-020): add a fee column once prices are confirmed. */}

      <h2 className="text-3xl font-bold mt-12 mb-6 text-black/90">
        Official profiles
      </h2>
      <ul className="list-disc pl-5 space-y-2 text-black/70">
        {SITE.socials.map((url) => (
          <li key={url}>
            <a href={url} rel="noopener" className="hover:underline break-all">
              {url}
            </a>
          </li>
        ))}
      </ul>

      <h2 className="text-3xl font-bold mt-12 mb-6 text-black/90">
        Brand assets
      </h2>
      <ul className="list-disc pl-5 space-y-2 text-black/70">
        <li>
          <a href="/logo.png" download className="hover:underline">
            Logo — light backgrounds (PNG)
          </a>
        </li>
        <li>
          <a href="/logo-black.png" download className="hover:underline">
            Logo — dark backgrounds (PNG)
          </a>
        </li>
      </ul>

      <p className="mt-12 text-sm text-black/60">
        CLT Academy provides education and training only. It does not provide
        investment advice, portfolio management or brokerage services.
      </p>
    </section>
    <div className="mb-20" />
  </>
);

export default Page;
