import PageTitleContainer from "@/components/global/pageTitleContainer";
import Breadcrumbs from "@/components/global/breadcrumbs";
import About from "@/components/page-sections/about/about";
import { VisionMissionSection } from "@/components/page-sections/about/missionAndVision";
import Qulites from "@/components/page-sections/about/qulites";
import Skills from "@/components/page-sections/about/Skills ";
import Faq from "@/components/page-sections/home/faq";
import Testimonials from "@/components/page-sections/home/testimonials";
import React from "react";
import { CEOMessage } from "@/components/page-sections/about/ceoMessage";
import AwardsSection from "@/components/page-sections/about/awwards";

const page = () => {
  return (
    <>
      <PageTitleContainer
        title="About Us"
        description="We are a team of traders and investors who are dedicated to helping you learn trading and investing."
      />
      <Breadcrumbs trail={[{ name: "About", href: "/about" }]} />
      <About />
      <Qulites />
      <AwardsSection />
      <VisionMissionSection />
      <CEOMessage />
      <div className="md:h-0 h-20"></div>
      <Skills />
      <Faq />
      <Testimonials />
    </>
  );
};

export default page;
