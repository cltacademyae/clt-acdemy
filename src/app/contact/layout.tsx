import { pageMetadata } from "@/const/seo";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = pageMetadata({
  title: "Contact CLT Academy — Trading Academy in Dubai",
  description:
    "Get in touch with CLT Academy in Dubai. Call (04) 547 0990 or email info@clt-academy.com to start your forex & stock trading journey in the UAE.",
  path: "/contact",
});

const layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default layout;
