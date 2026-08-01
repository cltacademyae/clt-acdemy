import { pageMetadata } from "@/const/seo";
import { getServiceBySlug, serviceSlugs } from "@/lib/catalog";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

export function generateStaticParams() {
  return serviceSlugs.map((id) => ({ id }));
}

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
