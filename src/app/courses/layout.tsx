import { pageMetadata } from "@/const/seo";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = pageMetadata({
  title: "Trading Courses in Dubai — Forex & Crypto",
  description:
    "Explore CLT Academy's trading courses in Dubai and the UAE — forex, stock and crypto, from beginner to advanced, with mentorship included.",
  path: "/courses",
});

const layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default layout;
