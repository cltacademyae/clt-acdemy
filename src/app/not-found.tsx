import Link from "next/link";
import type { Metadata } from "next";

/**
 * Sitewide 404.
 *
 * Routes with `dynamicParams = false` (courses, services) return a correct 404
 * to the visitor either way, but without this page Next also throws an internal
 * `NoFallbackError` on every miss — so any bot probing URLs fills the error log
 * with noise that hides real failures.
 *
 * Kept indexable-but-noindex and full of real links: a dead end that offers no
 * route onward wastes a visitor who was one mistyped character from a course.
 */
export const metadata: Metadata = {
  title: "Page Not Found | CLT Academy",
  robots: { index: false, follow: true },
};

const LINKS = [
  { href: "/courses", label: "Trading courses" },
  { href: "/blogs", label: "Trading blog" },
  { href: "/about", label: "About CLT Academy" },
  { href: "/team", label: "Our mentors" },
  { href: "/contact", label: "Contact us" },
];

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-24">
      <div className="max-w-xl text-center">
        <p className="text-primary font-black uppercase tracking-[0.3em] text-sm">
          404
        </p>
        <h1 className="mt-4 text-3xl md:text-5xl font-bold text-black/90">
          We can&apos;t find that page
        </h1>
        <p className="mt-4 text-black/60">
          The link may be out of date, or the page may have moved. Here is where
          most people are heading:
        </p>

        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-block rounded-full border border-black/15 px-5 py-2 text-sm font-semibold text-black/80 hover:border-primary hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
