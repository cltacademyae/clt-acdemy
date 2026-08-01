import PageTitleContainer from "@/components/global/pageTitleContainer";
import Breadcrumbs from "@/components/global/breadcrumbs";
import About from "@/components/page-sections/about/about";
import Qulites from "@/components/page-sections/about/qulites";
import Skills from "@/components/page-sections/about/Skills ";
import CourseListing from "@/components/page-sections/course/courseListing";
import { Gallery } from "@/components/page-sections/gallery/galleryListing";
import Faq from "@/components/page-sections/home/faq";
import Testimonials from "@/components/page-sections/home/testimonials";
import TeamListing from "@/components/page-sections/team/teamListing";
import React from "react";
import tTitle from "@/../public/title/5.jpeg"

const page = () => {
  return (
    <>
      <PageTitleContainer
        imgSrc={tTitle}
        title="Gallery"
        description="Gallery of our events and activities."
      />
      <Breadcrumbs trail={[{ name: "Gallery", href: "/gallery" }]} />

      <Gallery />
      <div className="mb-20"></div>
    </>
  );
};

export default page;
