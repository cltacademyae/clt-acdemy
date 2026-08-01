import { courseData, courseDetails } from "@/const/data";
import { services } from "@/const/services";

// Numeric ids stay the data key; slugs are the URL. Old paths 301 (next.config.ts).
export { COURSE_SLUGS, SERVICE_SLUGS } from "./catalog.slugs";
import { COURSE_SLUGS, SERVICE_SLUGS } from "./catalog.slugs";

const invert = (map: Record<string, string>) =>
  Object.fromEntries(Object.entries(map).map(([id, slug]) => [slug, id]));

const COURSE_IDS_BY_SLUG = invert(COURSE_SLUGS);
const SERVICE_IDS_BY_SLUG = invert(SERVICE_SLUGS);

export type CourseDetail = (typeof courseDetails)[keyof typeof courseDetails];
export type Service = (typeof services)[number];

export function getCourseBySlug(slug: string) {
  const id = COURSE_IDS_BY_SLUG[slug];
  if (!id) return null;
  const detail = courseDetails[id as keyof typeof courseDetails];
  if (!detail) return null;
  return { id, slug, detail };
}

export function getServiceBySlug(slug: string) {
  const id = SERVICE_IDS_BY_SLUG[slug];
  if (!id) return null;
  const service = services.find((s) => String(s.id) === id);
  if (!service) return null;
  return { id, slug, service };
}

export const courseSlugs = Object.values(COURSE_SLUGS);
export const serviceSlugs = Object.values(SERVICE_SLUGS);

export const courseCards = courseData.map((c) => ({
  ...c,
  slug: COURSE_SLUGS[String(c.id)],
  href: `/courses/${COURSE_SLUGS[String(c.id)] ?? c.id}`,
}));

/** Ordered for prev/next navigation. */
export const orderedCourseSlugs = Object.keys(COURSE_SLUGS)
  .sort((a, b) => Number(a) - Number(b))
  .map((id) => COURSE_SLUGS[id]);

export const COURSE_LEVELS: Record<string, string> = {
  "1": "Beginner",
  "2": "Intermediate",
  "3": "Advanced",
  "4": "Expert",
};

/** "Trade Craft (4 weeks)" -> "Trade Craft" */
export function cleanCourseName(name: string) {
  return name.replace(/\s*\(\d+\s*weeks?\)\s*$/i, "").trim();
}
