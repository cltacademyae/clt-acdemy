"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { FaPhoneAlt } from "react-icons/fa";
import { phoneNumber } from "@/const/data";

export default function Faq() {
  const faqItems = [
    {
      q: "Why should I choose CLT Academy over other trading institutions?",
      a: "CLT offers real trading strategies, lifetime mentorship, and a results-driven approach used by professionals and institutions.",
      delay: "",
      show: true,
      alwaysOpen: false,
    },
    {
      q: "What documents are needed to join?",
      a: "No documents are required. Simply tap “Enroll Now” or WhatsApp us for instant enrollment.",
      delay: "0.2s",
      show: false,
      alwaysOpen: false,

    },
    {
      q: "How do I upgrade or switch courses later?",
      a: "You can upgrade anytime. Your existing payment or course access will be adjusted accordingly.",
      delay: "0.4s",
      show: false,
      alwaysOpen: false,
    },
    {
      q: "Can I make a career in trading through CLT’s programs?",
      a: "Absolutely. Many students have gone from beginners to consistent traders with CLT’s structured roadmap.",
      delay: "0.6s",
      show: false,
      alwaysOpen: false,
    },
    {
      q: "What’s the fastest way to enroll and get started?",
      a: "Tap on “Enroll Now” or speak directly to our support on WhatsApp for instant onboarding and payment setup.",
      delay: "0.8s",
      show: false,
      alwaysOpen: false,
    },
    {
      q: "How does CLT support students after course completion?",
      a: "We provide ongoing trade reviews, access to mentorship calls, community groups, and continuous strategy updates.",
      delay: "0.8s",
      show: false,
      alwaysOpen: false,
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className="py-20 gridAnim relative md:px-20 px-5 w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="w-full">
        <div className="grid grid-cols-1 relative lg:grid-cols-2 gap-10">
          {/* LEFT SIDE */}
          <div className="top-12 space-y-5">
            <div className="px-5 mb-4 rounded-full w-fit font-semibold border border-primary text-primary text-center py-2">
              <p className="md:text-sm text-xs uppercase text-nowrap">
                Our FAQs
              </p>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-black/90 capitalize wow fadeInUp">
              Frequently Asked Questions
            </h2>

            <p className="wow fadeInUp" data-wow-delay="0.2s">
              We&apos;ve compiled answers to the most common questions about our
              trading programs, mentorship and enrollment process.
            </p>

            <a
              href={`https://wa.me/${phoneNumber}?text=Hello,%20I%20would%20like%20to%20know%20more%20about%20this.%20Could%20you%20please%20provide%20details?`}
              className="inline-block bg-primary text-white px-6 md:text-lg py-3 rounded-lg font-medium shadow wow fadeInUp"
              data-wow-delay="0.4s"
            >
              Enroll Now
            </a>
          </div>

          {/* RIGHT SIDE ACCORDION */}
          <div className="bg-primary rounded-2xl p-8 wow fadeInUp">
            <Accordion
              type="multiple"
              
              defaultValue={
                faqItems.filter((i) => i.show).map((i) => i.q)
                 
              }
            >
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}

                  value={item.q}
                  className="border-b border-white/20 md:py-4 py-2 wow fadeInUp"
                  data-wow-delay={item.delay}
                >
                  <AccordionTrigger  className="md:text-lg text-md font-semibold text-white ">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent  data-state={item.alwaysOpen ? "open" : ""} className="text-white/90 font-semibold ">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
      <div className="w-full mt-5 flex items-center justify-center ">
        <div className="relative shadow-2xl shadow-black/40  md:w-[86%] w-full z-10  bg-white overflow-hidden rounded-lg px-5 md:flex-row flex-col flex justify-between">
          <div className="flex-1 md:py-10 py-5 relative z-10 flex-col flex md:px-5 px-2 gap-2  justify-center ">
            <h2 className="text-2xl text-black/90 font-bold capitalize ">
              Need Expert Trading Guidance?
            </h2>
            <p className="text-sm text-black/90 ">
              Our advisors are here to help you plan, grow, and win — whether
              you're just starting or scaling up.
            </p>
          </div>
          <div
            onClick={() => {
              window.open(
                `https://wa.me/${phoneNumber}?text=Hello,%20I%20would%20like%20to%20know%20more%20about%20this.%20Could%20you%20please%20provide%20details?`,
                "_blank"
              );
            }}
            className="flex relative md:px-10 cursor-pointer px-2 pt-4 z-10 mb-6 items-center gap-5"
          >
            <FaPhoneAlt className="text-white md:flex hidden  md:text-4xl text-xl" />
            <div className="flex text-white flex-col gap-1">
              <h3 className="md:text-md text-xs uppercase">
                CLARITY STARTS HERE
              </h3>
              {/* Contact detail, not a section heading — it carried no
                  document structure and repeated as an <h2> on ten pages. */}
              <p className="md:text-2xl text-xl text-nowrap font-bold">
                {phoneNumber}
              </p>
            </div>
          </div>
          <div className="bg-primary z-0 w-[30rem] h-[20rem] absolute md:right-[-10%] right-[-5%] md:top-[-20%] top-[70%] rounded-full px-4 py-2"></div>
        </div>
      </div>
    </div>
  );
}
