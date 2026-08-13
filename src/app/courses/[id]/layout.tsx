import { pageMetadata, withBrand } from "@/const/seo";
import { cleanCourseName, courseSlugs, getCourseBySlug } from "@/lib/catalog";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

// Unknown slugs previously rendered a 200 shell, opening an unbounded
// soft-404 URL space (/courses/999, /courses/anything).
export function generateStaticParams() {
  return courseSlugs.map((id) => ({ id }));
}

// Required for a real 404 on unknown slugs. Removing it makes the route answer
// 200 with a 404 body — a soft 404, which Google treats as a thin duplicate.
//
// The cost is an internal `NoFallbackError` logged on every miss. That is noise,
// not a failure: the visitor still gets a 404 status and the custom not-found
// page. Verified by removing the line — the errors stopped and the soft 404 came
// straight back, so do not "fix" the log by deleting this.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const course = getCourseBySlug(id);
  if (!course) {
    return pageMetadata({ title: "Course Not Found", path: "/courses" });
  }

  const name = cleanCourseName(course.detail.name);
  return pageMetadata({
    title: withBrand(
      `${name} — ${course.detail.duration} Trading Course in Dubai`
    ),
    description: course.detail.description.slice(0, 158),
    path: `/courses/${id}`,
  });
}

const layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  if (!getCourseBySlug(id)) notFound();
  return <>{children}</>;
};

export default layout;
