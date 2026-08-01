import BlogPostView from "@/components/page-sections/blogs/BlogPostView";
import Breadcrumbs from "@/components/global/breadcrumbs";
import Schema from "@/components/seo/Schema";
import { SITE, PRIMARY_INSTRUCTOR, withBrand } from "@/const/seo";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/getBlogPosts";
import RelatedPosts from "@/components/page-sections/blogs/relatedPosts";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  const url = `${SITE.url}/blogs/${slug}`;
  if (!post) return { title: "Blog Post", alternates: { canonical: url } };
  const images = post.photo ? [{ url: post.photo }] : undefined;
  const title = withBrand(post.title);
  return {
    title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: post.description,
      url,
      type: "article",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description,
      images: post.photo ? [post.photo] : undefined,
    },
  };
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.photo ? [post.photo] : undefined,
    datePublished: post.createdAt,
    dateModified: post.updatedAt || post.createdAt,
    // Person with a resolvable sameAs, not a bare string — author entity
    // resolution is a significant E-E-A-T factor for financial content.
    author: {
      "@type": "Person",
      name: post.authorDetails?.name || post.author,
      ...(post.authorDetails?.profession
        ? { jobTitle: post.authorDetails.profession }
        : {}),
      sameAs: post.authorDetails?.link || PRIMARY_INSTRUCTOR.sameAs,
    },
    publisher: { "@id": `${SITE.url}/#organization` },
    mainEntityOfPage: `${SITE.url}/blogs/${slug}`,
  };

  return (
    <>
      <Schema data={jsonLd} />
      {/* Overlay covers the viewport, so the trail renders inside it. */}
      <BlogPostView
        post={post}
        related={<RelatedPosts post={post} posts={await getBlogPosts()} />}
        breadcrumbs={
          <Breadcrumbs
            trail={[
              { name: "Blog", href: "/blogs" },
              { name: post.title, href: `/blogs/${slug}` },
            ]}
          />
        }
      />
    </>
  );
};

export default Page;
