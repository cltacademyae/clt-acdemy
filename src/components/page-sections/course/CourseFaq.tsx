"use client";

import { whatsappLink } from "@/components/global/whatsapp";
import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { FaPhoneAlt } from "react-icons/fa";
import { TCourseDetails } from "@/const/data";

export default function CourseFaq({
  faqItems,
  subtitle,
  title,
  description,
}: {
  subtitle: string;
  title: string;
  description: string;
  faqItems: {
    question: string;
    answer: string;
  }[];
}) {
  return (
    <div className="py-20 gridAnim relative md:px-20 px-5 w-full">
      <div className="w-full">
        <div className="grid grid-cols-1 relative lg:grid-cols-2 gap-10">
          {/* LEFT SIDE */}
          <div className="top-12  space-y-5 lg:sticky lg:top-20 self-start">
            <div className="px-5 mb-4 rounded-full w-fit font-semibold border border-primary text-primary text-center py-2">
              <p className="md:text-sm text-xs uppercase text-nowrap">
                {title}
              </p>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-black/90 capitalize wow fadeInUp">
              {subtitle}
            </h2>

            <p className="wow fadeInUp" data-wow-delay="0.2s">
              {description}
            </p>

            <a
              href={whatsappLink}
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-medium shadow wow fadeInUp"
              data-wow-delay="0.4s"
            >
              Buy Now
            </a>
          </div>

          {/* RIGHT SIDE ACCORDION */}
          <div className="bg-primary rounded-2xl md:p-8 wow fadeInUp">
            <Accordion
              type="single"
              className="flex flex-col gap-4"
              collapsible
            >
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={item.question}
                  className="border-b  px-2 rounded-xl border-white/20 md:py-4 py-2 wow fadeInUp"
                >
                  <AccordionTrigger className="md:text-lg text-md font-semibold text-white ">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/90 pt-3 border-white/20 font-semibold px-1">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
     
    </div>
  );
}
