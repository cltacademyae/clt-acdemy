import Link from "next/link";
import Breadcrumbs from "@/components/global/breadcrumbs";
import Schema from "@/components/seo/Schema";
import CommercialCta from "./commercialCta";
import { SITE } from "@/const/seo";
import { COURSE_HREF, type CommercialPage } from "@/const/commercial";
import type { Post } from "@/types";
import { postPath } from "@/lib/getBlogPosts";
import { getReadTime } from "@/lib/readTime";

/**
 * Shared template for the commercial landing routes.
 *
 * Everything an extraction system needs is in the initial HTML: the quick
 * answer sits first, the FAQ answers are rendered open rather than behind an
 * accordion, and the comparison stays a real <table> on mobile with horizontal
 * scroll instead of collapsing into cards.
 */
export default function CommercialPageView({
  page,
  related,
}: {
  page: CommercialPage;
  related: Post[];
}) {
  const url = `${SITE.url}/${page.slug}`;

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      name: page.h1,
      description: page.metaDescription,
      url,
      isPartOf: { "@id": `${SITE.url}/#website` },
      about: { "@id": `${SITE.url}/#organization` },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: page.faq.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ];

  return (
    <>
      <Schema data={schema} />

      <div className="w-full bg-black text-white pt-28 pb-14 md:px-20 px-5">
        <div className="max-w-4xl">
          <p className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4">
            KHDA-Approved · Dubai
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] text-balance">
            {page.h1}
          </h1>
          <p className="mt-7 text-lg md:text-xl leading-relaxed text-white/90 border-l-4 border-primary pl-5">
            {page.quickAnswer}
          </p>
        </div>
      </div>

      <Breadcrumbs trail={[{ name: page.h1, href: `/${page.slug}` }]} />

      <article className="md:px-20 px-5 py-10 max-w-3xl">
        {page.sections.map((s) => (
          <section key={s.h2} className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-balance">
              {s.h2}
            </h2>
            <p className="text-black/75 leading-relaxed">{s.body}</p>
          </section>
        ))}
      </article>

      {page.comparison && (
        <section className="md:px-20 px-5 pb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-5">
            Course comparison
          </h2>
          <div className="overflow-x-auto border border-black/10 rounded-xl">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <caption className="sr-only">{page.comparison.caption}</caption>
              <thead>
                <tr className="bg-black/[.04]">
                  {page.comparison.head.map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-black/60"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {page.comparison.rows.map((row) => (
                  <tr key={row[0]} className="border-t border-black/10">
                    {row.map((cell, i) => (
                      <td key={i} className="px-4 py-3 align-top">
                        {i === 0 && COURSE_HREF[cell] ? (
                          <Link
                            href={COURSE_HREF[cell]}
                            className="font-semibold text-primary hover:underline"
                          >
                            {cell}
                          </Link>
                        ) : (
                          cell
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-black/50 mt-3">
            Course fees are not published here. Ask for current pricing and the
            next intake date.
          </p>
        </section>
      )}

      <section className="md:px-20 px-5 pb-14">
        <h2 className="text-2xl md:text-3xl font-bold mb-5">
          Frequently asked questions
        </h2>
        <dl className="max-w-3xl">
          {page.faq.map((f) => (
            <div key={f.question} className="border-t border-black/10 py-5">
              <dt className="font-semibold text-lg mb-2">{f.question}</dt>
              <dd className="text-black/75 leading-relaxed">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      {related.length > 0 && (
        <section className="md:px-20 px-5 pb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-5">Related reading</h2>
          <ul className="grid gap-4 sm:grid-cols-3 max-w-4xl">
            {related.map((post) => (
              <li key={post._id}>
                <Link
                  href={postPath(post)}
                  className="block border border-black/10 rounded-xl p-4 h-full hover:border-primary transition-colors"
                >
                  <span className="block font-semibold leading-snug mb-2">
                    {post.title}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-black/45 font-bold">
                    {getReadTime(post.content, post.readTime)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <CommercialCta pageSlug={page.slug} />
    </>
  );
}
