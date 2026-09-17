import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GuideView from "@/components/page-sections/learn/guideView";
import RelatedArticles from "@/components/page-sections/learn/relatedArticles";
import Schema from "@/components/seo/Schema";
import { SITE, PRIMARY_INSTRUCTOR } from "@/const/seo";
import { getGuides, getGuideBySlug, guidePath } from "@/lib/getGuides";
import { getBlogPosts } from "@/lib/getBlogPosts";

export const revalidate = 300;

// Unknown slugs must 404 rather than render a 200 shell, and a guide created
// in the CMS later must work without a deploy. Both hold here: the four pillar
// slugs prerender from generateStaticParams, any further guide is rendered on
// demand, and a slug matching no guide reaches notFound() below — verified to
// return a real 404 with the not-found page, not a soft one.
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getGuides()).map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) return {};

  const url = `${SITE.url}${guidePath(guide.slug)}`;
  const images = guide.photo ? [{ url: guide.photo }] : undefined;

  return {
    title: { absolute: guide.metaTitle },
    description: guide.metaDescription,
    alternates: { canonical: guide.canonicalOverride || url },
    // Scaffolding must never reach the index on its own.
    ...(guide.noindex || guide.placeholder
      ? { robots: { index: false, follow: true } }
      : {}),
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url,
      type: "article",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: guide.metaTitle,
      description: guide.metaDescription,
      images: guide.photo ? [guide.photo] : undefined,
    },
  };
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) notFound();

  const url = `${SITE.url}${guidePath(guide.slug)}`;

  const author = {
    "@type": "Person" as const,
    name: guide.author?.name || PRIMARY_INSTRUCTOR.name,
    ...(guide.author?.profession ? { jobTitle: guide.author.profession } : {}),
    sameAs: guide.author?.link || PRIMARY_INSTRUCTOR.sameAs,
  };

  // reviewedBy belongs to WebPage, not Article, so the reviewer hangs off
  // mainEntityOfPage rather than being bolted onto the Article itself.
  const mainEntityOfPage = guide.reviewer
    ? {
        "@type": "WebPage" as const,
        "@id": url,
        reviewedBy: {
          "@type": "Person" as const,
          name: guide.reviewer.name,
          ...(guide.reviewer.profession
            ? { jobTitle: guide.reviewer.profession }
            : {}),
          ...(guide.reviewer.link ? { sameAs: guide.reviewer.link } : {}),
        },
      }
    : url;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription,
    image: guide.photo ? [guide.photo] : undefined,
    datePublished: guide.createdAt,
    dateModified: guide.updatedAt || guide.createdAt,
    author,
    publisher: { "@id": `${SITE.url}/#organization` },
    mainEntityOfPage,
  };

  const posts = await getBlogPosts();

  return (
    <>
      {/* Draft scaffolding is noindex; no point advertising it as an Article. */}
      {!guide.placeholder && <Schema data={schema} />}

      <GuideView
        guide={guide}
        related={
          <RelatedArticles
            posts={posts}
            category={guide.category}
            pinned={guide.relatedPosts}
          />
        }
      />
    </>
  );
};

export default Page;
