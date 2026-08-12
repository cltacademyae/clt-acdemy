import Link from "next/link";
import type { Post } from "@/types";
import { categoryOf } from "@/lib/categories";
import { COURSE_SLUGS } from "@/lib/catalog.slugs";
import { cleanCourseName } from "@/lib/catalog";
import { courseData } from "@/const/data";

/**
 * One or two courses relevant to the article, server-rendered as real anchors.
 *
 * Articles were dead ends: a reader could finish a piece on risk management
 * with no path to the course that teaches it. This is the commercial half of
 * DEV-038 — the blog earns attention, and this is what converts it.
 *
 * The handover asks for an editor-chosen field with a sensible default. Courses
 * live in code rather than a CMS (see DEV-020), so the mapping is by category
 * here. A `relatedCourses` field on the post wins when present, so adding the
 * field to the CMS later needs no change in this component.
 */
const COURSE_BY_CATEGORY: Record<string, number[]> = {
  "forex-basics": [1, 2],
  "trading-psychology": [2, 4],
  "risk-management": [2, 3],
  "trading-strategies": [3, 4],
  "uae-markets-regulation": [1, 2],
  "crypto-trading": [2, 3],
  "stock-markets": [3, 4],
};

/** Beginner then intermediate: the safest default for an unmapped article. */
const DEFAULT_COURSE_IDS = [1, 2];

export default function RelatedCourses({ post }: { post: Post }) {
  const chosen = post.relatedCourses?.length
    ? post.relatedCourses
    : COURSE_BY_CATEGORY[categoryOf(post).slug] ?? DEFAULT_COURSE_IDS;

  const courses = chosen
    .map((id) => courseData.find((c) => c.id === id))
    .filter((c): c is (typeof courseData)[number] => Boolean(c))
    .slice(0, 2);

  if (!courses.length) return null;

  return (
    <section
      aria-labelledby="related-courses"
      className="px-4 sm:px-8 md:px-20 pb-16"
    >
      <h2
        id="related-courses"
        className="text-zinc-100 text-xl sm:text-2xl font-black uppercase tracking-tight mb-6"
      >
        Learn this properly
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {courses.map((course) => {
          const slug = COURSE_SLUGS[String(course.id)];
          const weeks = course.name.match(/\((\d+\s*weeks?)\)/i)?.[1];
          return (
            <Link
              key={course.id}
              href={`/courses/${slug}`}
              className="block rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 hover:border-primary transition-colors"
            >
              <p className="text-zinc-100 font-bold text-lg">
                {cleanCourseName(course.name)}
              </p>
              {weeks && (
                <p className="text-primary text-xs font-black uppercase tracking-widest mt-1">
                  {weeks}
                </p>
              )}
              <p className="text-zinc-400 text-sm mt-2 line-clamp-3">
                {course.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
