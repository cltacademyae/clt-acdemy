import PageTitleContainer from "@/components/global/pageTitleContainer";
import Breadcrumbs from "@/components/global/breadcrumbs";
import BlogsListing from "@/components/page-sections/blogs/blogsListing";
import BlogPagination from "@/components/page-sections/blogs/pagination";
import { getBlogPosts } from "@/lib/getBlogPosts";
import { pageCount, paginate } from "@/lib/pagination";
import React from "react";

// Page 1 of the listing. Later pages live at /blogs/page/[page]; this URL is
// never /blogs/page/1, which redirects here (see next.config.ts).
const page = async () => {
  const posts = await getBlogPosts();
  const total = pageCount(posts.length);

  return (
    <>
      <PageTitleContainer
        title="Blogs"
        description="Everything beyond the classroom, build to give you the edge the market respects."
      />
      <Breadcrumbs trail={[{ name: "Blog", href: "/blogs" }]} />
      <BlogsListing
        initialPosts={paginate(posts, 1)}
        sidebarPosts={posts}
        pagination={<BlogPagination page={1} total={total} />}
      />

      <div className="mb-20"></div>
    </>
  );
};

export default page;
