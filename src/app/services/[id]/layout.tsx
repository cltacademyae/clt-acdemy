import { pageMetadata } from "@/const/seo";
import { getServiceBySlug, serviceSlugs } from "@/lib/catalog";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

export function generateStaticParams() {
  return serviceSlugs.map((id) => ({ id }));
}

// Required for a real 404 on unknown slugs. Removing it makes the route answer
// 200 with a 404 body — a soft 404, which Google treats as a thin duplicate.
//
// The cost is an internal `NoFallbackError` logged on every miss. That is noise,
// not a failure: the visitor still gets a 404 status and the custom not-found
// page. Verified by removing the line — the errors stopped and the soft 404 came
// straight back, so do not "fix" the log by deleting this.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const resolved = getServiceBySlug(id);
  if (!resolved) {
    return pageMetadata({ title: "Service Not Found", path: "/addons" });
  }

  return pageMetadata({
    // /services has no intermediate layout title, so the root title template
    // still reaches this segment. Do not append the brand twice.
    title: resolved.service.name,
    description: resolved.service.desc.slice(0, 158),
    path: `/services/${id}`,
  });
}

const layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  if (!getServiceBySlug(id)) notFound();
  return <>{children}</>;
};

export default layout;
