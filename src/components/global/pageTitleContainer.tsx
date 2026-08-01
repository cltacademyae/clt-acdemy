"use client";
import { Button } from "@/components/ui/button";
import { phoneNumber } from "@/const/data";
import Image, { StaticImageData } from "next/image";
import awward from "@/../public/awward.png";
import React from "react";
import { FaArrowRight, FaPhoneAlt } from "react-icons/fa";
import { IoCalculator } from "react-icons/io5";

import { LuNotebookPen } from "react-icons/lu";
import { TbTargetArrow } from "react-icons/tb";
import HeroVideo, { AboutHeroVideo } from "./heroVideo";
import TickerTape from "./tickerTape";
import { cn } from "@/lib/utils";

const PageTitleContainer = ({
  title,
  description,
  isVideo = false,
  imgSrc = awward,
}: {
  title: string;
  description: string;
  isVideo?: boolean;
  imgSrc?: StaticImageData;
}) => {
  return (
    <div className="w-screen relative bg-black flex  flex-col pb-18 justify-center  md:px-20 px-5 md:gap-14 gap-4  ">
      <div className="flex relative z-10 h-[80vh] pt-25 md:px-6 px-2 flex-col md:w-1/2 w-full md:items-start items-center justify-center gap-4">
        <h1 className="md:text-6xl text-5xl md:text-start text-center  text-white font-bold">
          {title}
        </h1>
        <p className="text-white/90 md:text-base text-sm md:text-start text-center">
          {description}
        </p>
      </div>

      <div className="absolute z-0 top-0 left-0 fit-image w-full h-full bg-linear-to-r to-primary/30 from-black">
        {!isVideo && (
          <Image
            src={imgSrc}
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            priority
            placeholder="blur"
            className={cn("object-cover w-full h-full ",
              imgSrc === awward ? "opacity-10" : "opacity-20"
            )}
          />
        )}
        {isVideo && <AboutHeroVideo />}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-10 bg-black">
        <TickerTape />
      </div>
    </div>
  );
};

export default PageTitleContainer;
