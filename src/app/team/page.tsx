import PageTitleContainer from "@/components/global/pageTitleContainer";
import Breadcrumbs from "@/components/global/breadcrumbs";
import About from "@/components/page-sections/about/about";
import Qulites from "@/components/page-sections/about/qulites";
import Skills from "@/components/page-sections/about/Skills ";
import CourseListing from "@/components/page-sections/course/courseListing";
import Faq from "@/components/page-sections/home/faq";
import Testimonials from "@/components/page-sections/home/testimonials";
import TeamListing from "@/components/page-sections/team/teamListing";
import React from "react";
import tTitle from "@/../public/title/4.jpeg"

const page = () => {
  return (
    <>
      <PageTitleContainer
        imgSrc={tTitle}
        title="Our Team"
        description="Our team is a group of experts who are dedicated to helping you learn trading and investing."
      />
      <Breadcrumbs trail={[{ name: "Our Team", href: "/team" }]} />

      <TeamListing />
    </>
  );
};

export default page;
