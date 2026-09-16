import type { TocEntry } from "@/lib/headingIds";

/**
 * Clickable contents list for a guide.
 *
 * Plain anchors, server-rendered: it works with JavaScript disabled, and the
 * links are real internal anchors a crawler can follow, which is the point of
 * having one on a reference page. Active-section highlighting would need a
 * scroll observer on the client — worth adding later, not needed for the link
 * structure to work.
 */
export default function TableOfContents({ toc }: { toc: TocEntry[] }) {
  // Two entries is a heading, not a table of contents.
  if (toc.length < 3) return null;

  return (
    <nav
      aria-labelledby="guide-contents"
      className="rounded-2xl border border-gray-200 bg-gray-50/70 p-5 lg:sticky lg:top-28"
    >
      <h2
        id="guide-contents"
        className="text-xs font-black uppercase tracking-[0.2em] text-black/50 mb-4"
      >
        On this page
      </h2>
      <ol className="space-y-2 text-sm">
        {toc.map((entry) => (
          <li key={entry.id} className={entry.level === 3 ? "ps-4" : ""}>
            <a
              href={`#${entry.id}`}
              className="text-black/70 hover:text-primary transition-colors"
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
