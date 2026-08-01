"use client";
import PageTitleContainer from '@/components/global/pageTitleContainer';
import Breadcrumbs from "@/components/global/breadcrumbs";
import Disclaimer from '@/components/page-sections/terms/disclaimer';

import { Metadata } from 'next';
import React from 'react'



const page = () => {
  return (
    <>
        <PageTitleContainer
        title="Disclaimer"
        description="This is the disclaimer page for the website."
      />
      <Breadcrumbs trail={[{ name: "Disclaimer", href: "/disclaimer" }]} />
      <Disclaimer/>
    </>
  )
}

export default page
