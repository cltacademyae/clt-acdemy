import CommercialPageView from "@/components/page-sections/commercial/commercialPage";
import { commercialBySlug, commercialSlugs } from "@/const/commercial";
import { pageMetadata } from "@/const/seo";
import { getBlogPosts } from "@/lib/getBlogPosts";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// Root-level catch-all for the commercial routes. dynamicParams=false keeps it
// from swallowing every unmatched path in the app.
export const dynamicParams = false;
export const revalidate = 300;

export function generateStaticParams() {
  return commercialSlugs.map((commercial) => ({ commercial }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ commercial: string }>;
}): Promise<Metadata> {
  const { commercial } = await params;
  const page = commercialBySlug(commercial);
  if (!page) return {};

  return {
    ...pageMetadata({
      // absolute: metaTitle already carries the brand, and this segment still
      // inherits the root title template.
      title: { absolute: page.metaTitle },
      description: page.metaDescription,
      path: `/${page.slug}`,
    }),
    // Copy is dev-written pending a marketing rewrite; indexing stays off until
    // each page is signed off.
    ...(page.indexable ? {} : { robots: { index: false, follow: true } }),
  };
}

const Page = async ({
  params,
}: {
  params: Promise<{ commercial: string }>;
}) => {
  const { commercial } = await params;
  const page = commercialBySlug(commercial);
  if (!page) notFound();

  const posts = await getBlogPosts();

  return <CommercialPageView page={page} related={posts.slice(0, 3)} />;
};

export default Page;
