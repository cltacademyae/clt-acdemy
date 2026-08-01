import { pageMetadata } from "@/const/seo";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions of Use",
  description:
    "CLT Academy terms and conditions — the rules and policies governing use of our trading academy website, courses and services in the UAE.",
  path: "/terms-and-conditions",
});

const layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default layout;
