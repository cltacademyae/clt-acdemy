import React from "react";
import Image from "next/image";
import Breadcrumbs from "@/components/global/breadcrumbs";
import PageTitleContainer from "@/components/global/pageTitleContainer";
import TableOfContents from "./tableOfContents";
import GuideCourseCta from "./guideCourseCta";
import { withHeadingIds } from "@/lib/headingIds";
import { stripThemeColors } from "@/lib/guideHtml";
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
  const { html, toc } = withHeadingIds(stripThemeColors(guide.content));

  return (
    <>
      <PageTitleContainer title={guide.title} description={guide.description} />

      <Breadcrumbs
        trail={[
          { name: "Learn", href: "/learn" },
          { name: guide.title, href: guidePath(guide.slug) },
        ]}
      />

      {/* Same container as the blog listing, which this page sits beside. */}
      {/* The blog shows a post's photo at the top of the page; guides carry the
          same photo but were not displaying it, so the two looked unrelated. */}
      {guide.photo && (
        <div className="container mx-auto px-4 max-w-7xl pt-6">
          <div className="relative w-full aspect-[21/9] overflow-hidden rounded-2xl bg-gray-100">
            <Image
              src={guide.photo}
              alt={guide.title}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
              className="object-cover"
            />
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 max-w-7xl py-10">
        <Byline guide={guide} />

        <div className="grid gap-10 lg:grid-cols-4">
          <aside className="lg:col-span-1 lg:order-last">
            <TableOfContents toc={toc} />
          </aside>

          <article className="lg:col-span-3 max-w-3xl">
            <div
              className="learn-article ql-editor rich-content max-w-none text-black/80 leading-[1.8] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-black/90 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-black/90 [&_h3]:mt-8 [&_h3]:mb-3 [&_a]:text-primary [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </article>
        </div>
      </div>

      <GuideCourseCta />

      {related}
    </>
  );
}
