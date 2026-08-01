import Breadcrumbs from "@/components/global/breadcrumbs";
import PageTitleContainer from "@/components/global/pageTitleContainer";
import BlogsListing from "@/components/page-sections/blogs/blogsListing";
import Schema from "@/components/seo/Schema";
import { SITE, pageMetadata, withBrand } from "@/const/seo";
import { activeCategories, categoryBySlug, postsByCategory } from "@/lib/categories";
import { getBlogPosts, postPath } from "@/lib/getBlogPosts";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

export const revalidate = 300;

// notFound() on an on-demand ISR param renders the 404 body with a 200 status,
// which is the soft-404 this taxonomy exists to avoid. Enumerating the params
// and refusing the rest is the only way to get a real 404.
//
// generateStaticParams does not re-run on revalidate, so a category that gains
// its first post needs a deploy before its hub resolves.
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return activeCategories(posts).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) return pageMetadata({ title: "Category Not Found", path: "/blogs" });

  return pageMetadata({
    title: withBrand(`${category.name} — Trading Articles`),
    description: category.description.slice(0, 158),
    path: `/blogs/category/${slug}`,
  });
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) notFound();

  const posts = await getBlogPosts();
  const inCategory = postsByCategory(posts, slug);
  if (!inCategory.length) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE.url}/blogs/category/${slug}#collection`,
    name: category.name,
    description: category.description,
    url: `${SITE.url}/blogs/category/${slug}`,
    isPartOf: { "@id": `${SITE.url}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: inCategory.length,
      itemListElement: inCategory.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE.url}${postPath(post)}`,
        name: post.title,
      })),
    },
  };

  return (
    <>
      <Schema data={schema} />
      <PageTitleContainer title={category.name} description={category.description} />
      <Breadcrumbs
        trail={[
          { name: "Blog", href: "/blogs" },
          { name: category.name, href: `/blogs/category/${slug}` },
        ]}
      />
      <BlogsListing initialPosts={inCategory} />
      <div className="mb-20"></div>
    </>
  );
};

export default Page;
