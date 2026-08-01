import Breadcrumbs from "@/components/global/breadcrumbs";
import CourseTitleCotainer from "@/components/global/courseTitleCotainer";
import Cta from "@/components/page-sections/home/cta";
import Faq from "@/components/page-sections/home/faq";
import Testimonials from "@/components/page-sections/home/testimonials";
import { MainPortion } from "@/components/page-sections/services/mainPortion";
import { getServiceBySlug } from "@/lib/catalog";
import { notFound } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: slug } = await params;
  const resolved = getServiceBySlug(slug);
  if (!resolved) notFound();

  const { service } = resolved;

  return (
    <>
      <CourseTitleCotainer
        badge="Services"
        title={service.name}
        description={service.desc}
      />
      <Breadcrumbs
        trail={[
          { name: "Add Ons", href: "/addons" },
          { name: service.name, href: `/services/${slug}` },
        ]}
      />
      <MainPortion
        title={service.mainTitle}
        description={service.desc}
        subtitle={service.q}
      />
      <Cta />
      <Faq />
      <Testimonials />
    </>
  );
};

export default Page;
