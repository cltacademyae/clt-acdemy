"use client";
import { Button } from "@/components/ui/button";
import { phoneNumber } from "@/const/data";
import Image from "next/image";
import React from "react";
import awward from "@/../public/awward.png";
import { FaArrowRight, FaPhoneAlt } from "react-icons/fa";
import { IoCalculator } from "react-icons/io5";

import { LuNotebookPen } from "react-icons/lu";
import { TbTargetArrow } from "react-icons/tb";

const CourseTitleCotainer = ({
  title,
  description,
  badge="Courses",
}: {
  title: string;
  description: string;
  badge?: string;
}) => {
  return (
    <div className="w-screen relative flex  flex-col pb-18 justify-center  md:px-20 px-5 md:gap-14 gap-4  ">
      <div className="flex relative z-10 h-[80vh] pt-25 md:px-6 px-2 flex-col md:w-3/4 w-full md:items-start items-center justify-center gap-4">
        <div className="px-5 rounded-full border border-primary text-primary text-center py-2">
          <p className="md:text-sm text-xs uppercase text-nowrap">{badge}</p>
        </div>
        <h1 className="md:text-6xl text-5xl md:text-start text-center  text-white font-bold">
          {title}
        </h1>
        <p className="text-white/90 md:text-base text-sm md:text-start text-center">
          {description}
        </p>
      </div>

      <div className="absolute z-0 top-0 left-0 fit-image w-full h-full bg-black">
        <Image
          src={awward}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          priority
          className="object-cover w-full h-full opacity-10"
        />
      </div>
    </div>
  );
};

export default CourseTitleCotainer;
