import { pageMetadata } from "@/const/seo";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = pageMetadata({
  title: "Trading Courses in Dubai — Forex, Stock & Crypto",
  description:
    "Explore CLT Academy's expert-led trading courses in Dubai & the UAE — forex, stock and crypto, from beginner to advanced, with live mentorship and certification.",
  path: "/courses",
});

const layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default layout;
