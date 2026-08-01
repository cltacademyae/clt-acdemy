import Link from "next/link";
import { activeCategories } from "@/lib/categories";
import { getBlogPosts } from "@/lib/getBlogPosts";
import { COMMERCIAL_PAGES } from "@/const/commercial";

/**
 * Sitewide footer link block: category hubs, commercial pages and legal.
 *
 * Server-rendered so the hubs get real inbound links from every page rather
 * than only from the blog sidebar. Commercial pages appear once marketing has
 * signed off their copy — until then they are noindex and unlinked.
 */
export default async function FooterLinks() {
  const posts = await getBlogPosts();
  const categories = activeCategories(posts);
  const commercial = COMMERCIAL_PAGES.filter((p) => p.indexable);

  const columns = [
    {
      heading: "Trading Topics",
      links: categories.map((c) => ({
        name: c.name,
        href: `/blogs/category/${c.slug}`,
      })),
    },
    ...(commercial.length
      ? [
          {
            heading: "Courses in Dubai",
            links: commercial.map((p) => ({ name: p.h1, href: `/${p.slug}` })),
          },
        ]
      : []),
    {
      heading: "Legal",
      links: [
        { name: "Disclaimer", href: "/disclaimer" },
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms & Conditions", href: "/terms-and-conditions" },
      ],
    },
  ];

  return (
    <nav
      aria-label="Footer"
      className="w-full bg-[#1f1f1f] text-white border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 md:grid-cols-3 px-6 md:px-16 py-12">
        {columns.map((col) => (
          <div key={col.heading}>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/60 mb-4">
              {col.heading}
            </h3>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
