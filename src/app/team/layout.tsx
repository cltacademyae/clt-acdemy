import { pageMetadata } from "@/const/seo";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = pageMetadata({
  title: "Meet Our Team — Expert Trading Mentors in Dubai",
  description:
    "Meet the CLT Academy team — professional traders and expert mentors in Dubai guiding students across the UAE to master forex, stock and crypto trading.",
  path: "/team",
});

const layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default layout;
