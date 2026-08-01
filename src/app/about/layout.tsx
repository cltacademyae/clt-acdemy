import { pageMetadata } from "@/const/seo";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = pageMetadata({
  title: "About CLT Academy — KHDA-Approved Trading Institute",
  description:
    "Learn about CLT Academy, a KHDA-approved trading institute in Dubai. Our mission, our mentors and our record training thousands of traders across the Emirates.",
  path: "/about",
});

const layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default layout;
