export type TocEntry = { id: string; text: string; level: 2 | 3 };

/**
 * Adds stable ids to the h2/h3 headings in guide HTML and returns the
 * table-of-contents entries in document order.
 *
 * The ids in the markup and the anchors in the contents list come out of this
 * one pass, so they cannot drift apart the way a hand-maintained TOC would.
 * Scoped to /learn on purpose — blog posts keep the untouched CMS HTML, and
 * the CMS stays the source of truth for the content itself.
 *
 * An id an author set by hand in the editor always wins.
 */

const slugifyHeading = (text: string): string =>
  text
    .toLowerCase()
    .trim()
    .replace(/&[a-z]+;/gi, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export function withHeadingIds(html: string): { html: string; toc: TocEntry[] } {
  const toc: TocEntry[] = [];
  if (!html) return { html, toc };

  // Two headings can legitimately share a title ("Summary" under two sections);
  // the suffix keeps the anchors unique without renaming the visible text.
  const used = new Map<string, number>();
  const unique = (base: string) => {
    const seen = used.get(base) || 0;
    used.set(base, seen + 1);
    return seen === 0 ? base : `${base}-${seen + 1}`;
  };

  const out = html.replace(
    /<h([23])\b([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (full: string, level: string, attrs: string, inner: string) => {
      const text = inner
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/gi, " ")
        .replace(/\s+/g, " ")
        .trim();
      if (!text) return full;

      const authored = attrs.match(/\bid="([^"]+)"/i)?.[1];
      const id = authored ? unique(authored) : unique(slugifyHeading(text));
      if (!id) return full;

      toc.push({ id, text, level: Number(level) as 2 | 3 });

      const withId = authored
        ? attrs.replace(/\bid="[^"]+"/i, `id="${id}"`)
        : `${attrs} id="${id}"`;

      // scroll-mt clears the fixed header when an anchor is followed. Merged
      // into an existing class rather than emitted as a second attribute,
      // which the editor can and does produce.
      const withClass = /\bclass="/i.test(withId)
        ? withId.replace(/\bclass="([^"]*)"/i, 'class="$1 scroll-mt-28"')
        : `${withId} class="scroll-mt-28"`;

      return `<h${level}${withClass}>${inner}</h${level}>`;
    }
  );

  return { html: out, toc };
}
