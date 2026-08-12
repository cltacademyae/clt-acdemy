import PageTitleContainer from "@/components/global/pageTitleContainer";
import Breadcrumbs from "@/components/global/breadcrumbs";
import BlogsListing from "@/components/page-sections/blogs/blogsListing";
import BlogPagination from "@/components/page-sections/blogs/pagination";
import { getBlogPosts } from "@/lib/getBlogPosts";
import { pageCount, paginate } from "@/lib/pagination";
import { pageMetadata, withBrand } from "@/const/seo";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

/**
 * Paginated blog listing, pages 2..n.
 *
 * Each page carries a self-referencing canonical rather than pointing back at
 * /blogs — canonicalising page 2 to page 1 tells Google the deeper posts do not
 * warrant indexing, which is the opposite of the intent.
 */
/**
 * Resolve and validate the page number, redirecting anything invalid to /blogs.
 *
 * A redirect rather than `notFound()`, for two reasons:
 *
 * 1. This route is fully dynamic, so `notFound()` renders the 404 body after
 *    the 200 status has already been committed — a soft 404, which is worse
 *    than either a real 404 or a redirect. The course routes avoid this with
 *    `dynamicParams = false`, but that does not fit here: the number of pages
 *    changes whenever someone publishes, with no deploy, so a fixed param list
 *    would go stale against a sitemap that refreshes every five minutes.
 * 2. Out-of-range is a moving target. /blogs/page/5 may be invalid today and
 *    valid next week. Sending readers to the listing is the useful answer.
 *
 * Page 1 redirects too: it is served at /blogs, and two URLs for one set of
 * posts is the duplication this pagination exists to avoid.
 */
async function resolvePage(params: Promise<{ page: string }>) {
  const { page } = await params;
  const n = Number(page);
  if (!Number.isInteger(n) || n < 2) redirect("/blogs");

  const posts = await getBlogPosts();
  const total = pageCount(posts.length);
  if (n > total) redirect("/blogs");

  return { n, posts, total };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { n } = await resolvePage(params);
  return pageMetadata({
    title: withBrand(`Trading Blog — Page ${n}`),
    description:
      "More forex, stock and crypto trading insights from the CLT Academy mentors in Dubai.",
    path: `/blogs/page/${n}`,
  });
}

const Page = async ({ params }: { params: Promise<{ page: string }> }) => {
  const { n, posts, total } = await resolvePage(params);

  return (
    <>
      <PageTitleContainer
        title={`Blogs — Page ${n}`}
        description="Everything beyond the classroom, build to give you the edge the market respects."
      />
      <Breadcrumbs
        trail={[
          { name: "Blog", href: "/blogs" },
          { name: `Page ${n}`, href: `/blogs/page/${n}` },
        ]}
      />
      <BlogsListing
        initialPosts={paginate(posts, n)}
        sidebarPosts={posts}
        pagination={<BlogPagination page={n} total={total} />}
      />

      <div className="mb-20"></div>
    </>
  );
};

export default Page;
