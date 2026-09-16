import React from "react";
import Breadcrumbs from "@/components/global/breadcrumbs";
import PageTitleContainer from "@/components/global/pageTitleContainer";
import TableOfContents from "./tableOfContents";
import GuideCourseCta from "./guideCourseCta";
import { withHeadingIds } from "@/lib/headingIds";
import { formatDate } from "@/lib/formatDate";
import { getReadTime } from "@/lib/readTime";
import { guidePath } from "@/lib/getGuides";
import type { Guide } from "@/const/learn";

/**
 * Layout for a pillar guide.
 *
 * A standard page, not the modal the blog reuses — a reference page needs a
 * stable URL, a sticky contents list and no close button that throws the
 * reader back to wherever they came from.
 */

const Byline = ({ guide }: { guide: Guide }) => {
  const updated =
    guide.updatedAt && guide.updatedAt !== guide.createdAt
      ? guide.updatedAt
      : null;

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-black/60 border-b border-gray-200 pb-6 mb-10">
      {guide.author && (
        <p>
          <span className="text-black/40">Written by </span>
          {guide.author.link ? (
            <a
              href={guide.author.link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-black/80 hover:text-primary"
            >
              {guide.author.name}
            </a>
          ) : (
            <span className="font-semibold text-black/80">
              {guide.author.name}
            </span>
          )}
          {guide.author.profession && (
            <span className="text-black/40">, {guide.author.profession}</span>
          )}
        </p>
      )}

      {guide.reviewer && (
        <p>
          <span className="text-black/40">Reviewed by </span>
          {guide.reviewer.link ? (
            <a
              href={guide.reviewer.link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-black/80 hover:text-primary"
            >
              {guide.reviewer.name}
            </a>
          ) : (
            <span className="font-semibold text-black/80">
              {guide.reviewer.name}
            </span>
          )}
          {guide.reviewer.profession && (
            <span className="text-black/40">, {guide.reviewer.profession}</span>
          )}
        </p>
      )}

      {updated && (
        <p>
          <span className="text-black/40">Last updated </span>
          <time dateTime={updated}>{formatDate(updated)}</time>
        </p>
      )}

      <p>{getReadTime(guide.content, guide.readTime)}</p>
    </div>
  );
};

export default function GuideView({
  guide,
  related,
}: {
  guide: Guide;
  related?: React.ReactNode;
}) {
  const { html, toc } = withHeadingIds(guide.content);

  return (
    <>
      <PageTitleContainer title={guide.title} description={guide.description} />

      <Breadcrumbs
        trail={[
          { name: "Learn", href: "/learn" },
          { name: guide.title, href: guidePath(guide.slug) },
        ]}
      />

      <div className="w-full md:px-20 px-5 py-10">
        {guide.placeholder && (
          <p
            role="status"
            className="mb-10 rounded-xl border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-900"
          >
            <strong className="font-bold">Placeholder content.</strong> This
            guide is layout scaffolding, not published copy. It is set to
            noindex and excluded from the sitemap until the final content is
            supplied.
          </p>
        )}

        <Byline guide={guide} />

        <div className="grid gap-10 lg:grid-cols-4">
          <aside className="lg:col-span-1 lg:order-last">
            <TableOfContents toc={toc} />
          </aside>

          <article className="lg:col-span-3 max-w-3xl">
            <div
              className="ql-editor rich-content max-w-none text-black/80 leading-[1.8] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-black/90 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-black/90 [&_h3]:mt-8 [&_h3]:mb-3 [&_a]:text-primary [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </article>
        </div>
      </div>

      <GuideCourseCta courseIds={guide.courseIds} />

      {related}
    </>
  );
}
