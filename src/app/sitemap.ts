import type { MetadataRoute } from "next";
import { SITE } from "@/const/seo";
import { getBlogPosts, postPath } from "@/lib/getBlogPosts";
import { courseSlugs, serviceSlugs } from "@/lib/catalog";
import { activeCategories } from "@/lib/categories";
import { COMMERCIAL_PAGES } from "@/const/commercial";

/** Served at /sitemap.xml. Static routes + dynamic blog posts. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/courses", priority: 0.9, changeFrequency: "weekly" },
    { path: "/team", priority: 0.7, changeFrequency: "monthly" },
    { path: "/addons", priority: 0.7, changeFrequency: "monthly" },
    { path: "/gallery", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
    { path: "/blogs", priority: 0.6, changeFrequency: "weekly" },
    { path: "/press", priority: 0.7, changeFrequency: "monthly" },
    { path: "/disclaimer", priority: 0.3, changeFrequency: "yearly" },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms-and-conditions", priority: 0.3, changeFrequency: "yearly" },
    ...courseSlugs.map((slug) => ({
      path: `/courses/${slug}`,
      priority: 0.9,
      changeFrequency: "monthly" as const,
    })),
    ...serviceSlugs.map((slug) => ({
      path: `/services/${slug}`,
      priority: 0.6,
      changeFrequency: "monthly" as const,
    })),
  ];

  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = routes.map((r) => ({
    url: `${SITE.url}${r.path === "/" ? "" : r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // Never advertise a URL we have told Google to ignore.
  const posts = (await getBlogPosts()).filter((p) => !p.seo?.noindex);

  // Only pages marketing has signed off; the rest are noindex meanwhile.
  const commercialEntries: MetadataRoute.Sitemap = COMMERCIAL_PAGES.filter(
    (p) => p.indexable
  ).map((p) => ({
    url: `${SITE.url}/${p.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const categoryEntries: MetadataRoute.Sitemap = activeCategories(posts).map((c) => ({
    url: `${SITE.url}/blogs/category/${c.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.6,
  }));
  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE.url}${postPath(p)}`,
    lastModified: p.updatedAt || p.createdAt || lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticEntries,
    ...commercialEntries,
    ...categoryEntries,
    ...postEntries,
  ];
}
