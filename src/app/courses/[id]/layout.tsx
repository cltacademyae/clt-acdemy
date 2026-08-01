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
