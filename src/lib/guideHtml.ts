/**
 * Strips theme colours out of editor-authored HTML before a guide renders.
 *
 * Blog posts are displayed in a dark modal, so the editor's colour picker has
 * been used to set light text: the first guide carries
 * `background-color: transparent; color: rgb(255, 255, 255)` on 111 elements,
 * and the archive holds 1,808 white declarations against 10 of anything else.
 * None of it is meaningful colour — it is all compensation for the dark
 * surface.
 *
 * A guide renders on a white page, where that inline white is invisible, and
 * an inline style beats any stylesheet rule we could add. So the colour
 * declarations come out here and the page's own typography applies. Scoped to
 * /learn on purpose: the blog modal still needs them.
 */

const DROP = new Set(["color", "background-color"]);

function cleanDeclarations(style: string): string {
  return style
    .split(";")
    .filter((decl) => {
      const name = decl.split(":")[0]?.trim().toLowerCase();
      return name ? !DROP.has(name) : false;
    })
    .map((decl) => decl.trim())
    .filter(Boolean)
    .join("; ");
}

export function stripThemeColors(html: string): string {
  if (!html) return html;

  return html.replace(
    /\sstyle="([^"]*)"/gi,
    (_full, style: string) => {
      const kept = cleanDeclarations(style);
      // An attribute emptied of everything is dropped rather than left behind.
      return kept ? ` style="${kept}"` : "";
    }
  );
}
