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
/**
 * Above this, listing every sub-heading produces a list taller than the screen.
 * The smart money guide generated 60 entries at 2,415px against a 900px
 * viewport, which leaves the bottom of a sticky list unreachable.
 */
const MAX_ENTRIES = 15;

export default function TableOfContents({ toc }: { toc: TocEntry[] }) {
  // Two entries is a heading, not a table of contents.
  if (toc.length < 3) return null;

  // Long guides list their sections only; short ones can afford the detail.
  const entries =
    toc.length > MAX_ENTRIES ? toc.filter((e) => e.level === 2) : toc;
  if (entries.length < 3) return null;

  return (
    <nav
      aria-labelledby="guide-contents"
      className="rounded-2xl border border-gray-200 bg-gray-50/70 p-5 lg:sticky lg:top-28 lg:max-h-[calc(100vh-9rem)] lg:overflow-y-auto"
    >
      <h2
        id="guide-contents"
        className="text-xs font-black uppercase tracking-[0.2em] text-black/50 mb-4"
      >
        On this page
      </h2>
      <ol className="space-y-2 text-sm">
        {entries.map((entry) => (
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
