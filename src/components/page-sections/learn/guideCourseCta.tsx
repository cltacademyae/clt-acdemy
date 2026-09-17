import Link from "next/link";
import { COURSE_SLUGS } from "@/lib/catalog.slugs";
import { cleanCourseName } from "@/lib/catalog";
import { courseData } from "@/const/data";

/**
 * The learning-to-enquiry path the brief asks for.
 *
 * Mirrors the blog's RelatedCourses block but takes explicit course ids, since
 * a guide's CTA is an editorial choice rather than something derived from a
 * category. Real anchors, server-rendered — not a JS-driven widget.
 */
export default function GuideCourseCta({
  courseIds,
  heading = "Learn this properly",
}: {
  courseIds: number[];
  heading?: string;
}) {
  const courses = courseIds
    .map((id) => courseData.find((c) => c.id === id))
    .filter((c): c is (typeof courseData)[number] => Boolean(c))
    .slice(0, 2);

  if (!courses.length) return null;

  return (
    <section
      aria-labelledby="guide-cta"
      className="container mx-auto px-4 max-w-7xl py-12 border-t border-gray-200"
    >
      <h2
        id="guide-cta"
        className="text-2xl font-bold text-black/90 mb-6"
      >
        {heading}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {courses.map((course) => {
          const slug = COURSE_SLUGS[String(course.id)];
          const weeks = course.name.match(/\((\d+\s*weeks?)\)/i)?.[1];
          return (
            <Link
              key={course.id}
              href={`/courses/${slug}`}
              className="block rounded-2xl border border-gray-200 p-5 hover:border-primary transition-colors"
            >
              <p className="font-bold text-lg text-black/90">
                {cleanCourseName(course.name)}
              </p>
              {weeks && (
                <p className="text-primary text-xs font-black uppercase tracking-widest mt-1">
                  {weeks}
                </p>
              )}
              <p className="text-black/60 text-sm mt-2 line-clamp-3">
                {course.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
