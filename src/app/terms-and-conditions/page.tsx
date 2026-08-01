"use client";
import PageTitleContainer from '@/components/global/pageTitleContainer';
import Breadcrumbs from "@/components/global/breadcrumbs";
import Disclaimer from '@/components/page-sections/terms/disclaimer';
import Privacypolicy from '@/components/page-sections/terms/privacypolicy';
import TermsAndCondition from '@/components/page-sections/terms/terms&condition';

import { Metadata } from 'next';
import React from 'react'



const page = () => {
  return (
    <>
        <PageTitleContainer
        title="Terms and Conditions"
        description="This is the terms and conditions page for the website."
      />
      <Breadcrumbs trail={[{ name: "Terms & Conditions", href: "/terms-and-conditions" }]} />
      <TermsAndCondition/>
    </>
  )
}

export default page
