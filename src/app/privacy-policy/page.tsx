"use client";
import PageTitleContainer from '@/components/global/pageTitleContainer';
import Breadcrumbs from "@/components/global/breadcrumbs";
import Disclaimer from '@/components/page-sections/terms/disclaimer';
import Privacypolicy from '@/components/page-sections/terms/privacypolicy';

import { Metadata } from 'next';
import React from 'react'



const page = () => {
  return (
    <>
        <PageTitleContainer
        title="Privacy Policy"
        description="This is the privacy policy page for the website."
      />
      <Breadcrumbs trail={[{ name: "Privacy Policy", href: "/privacy-policy" }]} />
      <Privacypolicy/>
    </>
  )
}

export default page
