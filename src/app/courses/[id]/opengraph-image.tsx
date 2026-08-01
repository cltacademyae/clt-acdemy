import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE } from "@/lib/ogImage";
import { cleanCourseName, courseSlugs, getCourseBySlug } from "@/lib/catalog";

export const alt = "CLT Academy trading course";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return courseSlugs.map((id) => ({ id }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = getCourseBySlug(id);
  const name = course ? cleanCourseName(course.detail.name) : "Trading Course";

  return new ImageResponse(
    ogImage({
      title: name,
      eyebrow: course?.detail.duration
        ? `${course.detail.duration} course`
        : "Courses",
    }),
    size
  );
}
