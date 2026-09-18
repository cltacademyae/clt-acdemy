import Link from "next/link";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/global/breadcrumbs";
import PageTitleContainer from "@/components/global/pageTitleContainer";
import Schema from "@/components/seo/Schema";
import { SITE, pageMetadata } from "@/const/seo";
import { getGuides, guidePath } from "@/lib/getGuides";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const guides = await getGuides();
  // A hub with nothing on it has nothing to index.
  const empty = guides.length === 0;

  return {
    ...pageMetadata({
      title: "Learn Trading — Reference Guides",
      description:
        "In-depth reference guides on forex trading, risk management, smart money concepts and prop firm trading, written by CLT Academy's Dubai-based mentors.",
      path: "/learn",
    }),
    ...(empty ? { robots: { index: false, follow: true } } : {}),
  };
}

const Page = async () => {
  const guides = await getGuides();

  // Lets an assistant retrieve the set of guides as a set, rather than
  // inferring it from four unrelated pages.
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "CLT Academy trading guides",
    itemListElement: guides
      .filter((g) => !g.noindex)
      .map((guide, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: guide.title,
        url: `${SITE.url}${guidePath(guide.slug)}`,
      })),
  };

  return (
    <>
      <Schema data={schema} />

      <PageTitleContainer
        title="Learn Trading"
        description="Reference guides that cover a topic end to end. Start here, then follow the supporting articles on the blog."
      />

      <Breadcrumbs trail={[{ name: "Learn", href: "/learn" }]} />

      {/* Same container as the blog listing: /learn is its sibling. */}
      <section className="container mx-auto px-4 max-w-7xl py-12">
        <ul className="grid gap-6 md:grid-cols-2">
          {guides.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={guidePath(guide.slug)}
                className="group flex h-full flex-col rounded-2xl border border-gray-200 p-6 hover:border-primary transition-colors"
              >
                <h2 className="text-xl font-bold text-black/90 group-hover:text-primary transition-colors">
                  {guide.title}
                </h2>
                <p className="mt-3 text-sm text-black/60 leading-relaxed">
                  {guide.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Page;
