import PageTitleContainer from "@/components/global/pageTitleContainer";
import About from "@/components/page-sections/about/about";
import Qulites from "@/components/page-sections/about/qulites";
import Skills from "@/components/page-sections/about/Skills ";
import CourseListing from "@/components/page-sections/course/courseListing";
import Faq from "@/components/page-sections/home/faq";
import Testimonials from "@/components/page-sections/home/testimonials";
import React from "react";
import tTitle from "@/../public/title/1.jpeg"
import CourseSchema from "@/components/seo/CourseSchema";

const page = () => {
  return (
    <>
      <CourseSchema />
      <PageTitleContainer
        title="Our Courses"
        imgSrc={tTitle}
        description="We offer a range of courses to help you learn trading and investing."
      />
      <CourseListing />
      <Faq />
      <Testimonials />
    </>
  );
};

export default page;
