import { pageMetadata } from "@/const/seo";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = pageMetadata({
  title: "Press & Company Facts",
  description:
    "Canonical company facts for CLT Academy — legal name, address, leadership, courses and media contact.",
  path: "/press",
});

const layout = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export default layout;
