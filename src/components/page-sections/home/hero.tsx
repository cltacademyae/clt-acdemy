"use client";
import { Button } from "@/components/ui/button";
import { phoneNumber } from "@/const/data";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useLayoutEffect, useRef } from "react";
import { FaArrowRight, FaPhoneAlt } from "react-icons/fa";
import { IoCalculator } from "react-icons/io5";
import { LuNotebookPen } from "react-icons/lu";
import { TbTargetArrow } from "react-icons/tb";
import poster from "@/../public/poster.png";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useUIStore } from "@/store/uiStore";
import { whatsappLink } from "@/components/global/whatsapp";
import { useIsMobile } from "@/hooks/use-mobile";

const heroCta = [
  {
    title: "Goal planning",
    description: "Set goals. Build strategy. Trade with clear focus.",
    icon: (
      <TbTargetArrow className="md:text-4xl text-7xl text-white group-hover:text-primary duration-500 " />
    ),
  },
  {
    title: "Market Strategy",
    description: "Read charts. Spot trends. Create winning strategies.",
    icon: (
      <LuNotebookPen className="md:text-4xl text-7xl   text-white group-hover:text-primary duration-500 " />
    ),
  },
  {
    title: "Trade Execution",
    description: "Master timing. Use tools. Execute trades perfectly.",
    icon: (
      <IoCalculator className="md:text-4xl text-7xl   text-white group-hover:text-primary duration-500 " />
    ),
  },
];

const HeroVideo = dynamic(() => import("@/components/global/heroVideo"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <Image
        style={{
          // position:"relative",
          objectFit: "cover",
          width: "100%",
          height: "100%",
        }}
        fill
        src={poster}
        alt="Logo"
      />
    </div>
  ),
});

const HeroVideoMobile = dynamic(() => import("@/components/global/heroVideo").then((mod) => mod.HeroVideoMobile), {
  ssr: false,
  loading: () => (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <Image
        style={{
          // position:"relative",
          objectFit: "cover",
          width: "100%",
          height: "100%",
        }}
        fill
        src={poster}
        alt="Logo"
      />
    </div>
  ),
});

// Headline lines are justified: each one is sized so it spans the full column
// width, so all three sit flush on both edges. The cqw values are 100 / the
// line's width in ems (measured in Poppins 700), which is why they differ per
// line — the shorter the text, the larger it has to be set to fill the column.
const titleLines = [
  { text: "KHDA Approved", size: "text-[12.16cqw]" },
  { text: "Forex Trading Academy", size: "text-[8.11cqw]" },
  { text: "IN Dubai.", size: "text-[21.65cqw]" },
];

// Words are kept whole so any leftover slack lands in the word gaps rather than
// between letters, while chars stay individually animatable for the GSAP stagger.
const splitTitleLine = (text: string, size: string) => (
  <span
    key={text}
    className={`flex w-full justify-between whitespace-nowrap ${size}`}
  >
    {text.split(" ").map((word, wordIndex) => (
      <span key={wordIndex} className="inline-block whitespace-nowrap">
        {word.split("").map((char, charIndex) => (
          <span key={charIndex} className="char inline-block">
            {char}
          </span>
        ))}
      </span>
    ))}
  </span>
);

const splitWords = (text: string, className?: string) =>
  text.split(" ").map((word, index) => (
    <span
      key={index}
      className={`word inline-block whitespace-pre ${className}`}
    >
      {word}&nbsp;
    </span>
  ));

const Hero = () => {
  const { isLoading } = useUIStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isLoading) {
      gsap.set(".char", { y: 100, opacity: 0 });
      gsap.set(".word", { y: 100, opacity: 0 });
      gsap.set(".hero-pill", { opacity: 0, y: 100 });
      gsap.set(".hero-button", { opacity: 0, y: 100 });
      return;
    }
    const tl = gsap.timeline();
    tl.to(
      ".hero-pill",
      {
        opacity: 100,
        y: 0,
        duration: 1,
        ease: "back.out(1.7)",
      },
      "<"
    );
    tl.to(
      ".char",
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: "power4.out",
      },
      "<"
    );
    tl.to(
      ".word",
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: "power4.out",
      },
      "-0.5"
    );
    tl.to(
      ".hero-button",
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "ease.inOut(0.5)",
      },
      ""
    );
  }, [isLoading]);
  const isMobile = useIsMobile();
  return (
    <div
      ref={containerRef}
      className="w-screen relative flex  flex-col pb-18 justify-center  md:px-20 px-5 md:gap-14 gap-4 min-h-screen "
    >
      <div className="@container flex relative z-10 h-[90vh] pt-25 md:px-6 px-2 flex-col md:w-1/2 w-full md:items-start items-center justify-center gap-4">
        <div className="px-5   hero-pill rounded-full border border-white text-white text-center py-2">
          <p className="md:text-sm text-xs uppercase">
            Claim Yours Free Educational Account
          </p>
        </div>
        <h1 className="overflow-hidden hero-title-line w-full flex flex-col text-white font-bold leading-[1.05]">
          {titleLines.map((line) => splitTitleLine(line.text, line.size))}
        </h1>
        <p className="text-white/90 overflow-hidden hero-desc md:text-base text-sm md:text-start text-center">
          {splitWords("Last Few Days Remaining")}
        </p>
        <Button
          onClick={() => {
            window.location.href = whatsappLink;
          }}
          size={"lg"}
          className="md:text-[.8rem] hero-button font-bold group rounded-2xl"
        >
          Talk to Our Mentor{" "}
          <FaArrowRight className="group-hover:translate-x-1 duration-900" />
        </Button>
      </div>
      <div className="w-full relative z-10 py-2  flex flex-col items-center justify-between  gap-4">
        <div className="grid md:w-[80%] w-full  md:grid-cols-3 grid-cols-1 gap-4">
          {heroCta.map((item) => (
            <div key={item.title} className="bg-white/5 cursor-pointer hover:-translate-y-1 hover:scale-105 duration-500 group  flex items-center  justify-center gap-4  py-10 backdrop-blur-sm md:px-6 px-3 rounded-lg">
              {item.icon}
              <div className="flex flex-col ">
                <h2 className="text-2xl text-nowrap text-white font-bold">
                  {item.title}
                </h2>
                <p className="text-sm  text-white/90">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className=""></div>
        <div className="absolute md:bottom-[-80%] bottom-[-60%] shadow-2xl shadow-black/40  md:w-[86%] w-full  bg-white overflow-hidden rounded-lg px-5 md:flex-row flex-col flex justify-between">
          <div className="flex-1 md:py-10 py-5 relative z-10 flex-col flex md:px-5 px-2 gap-2  justify-center ">
            <h2 className="text-2xl text-black/90 font-bold capitalize ">
              Losing Trades or Missing Confidence?
            </h2>
            <p className="text-sm text-black/90 ">
              Whether you're stuck in a loop or scaling up, <br />
              CLT gives you the tools, systems and mentorship to trade like the
              pros.
            </p>
          </div>
          <div className="flex relative md:px-10 px-2 pt-4 z-10 mb-6 items-center gap-5">
            <FaPhoneAlt className="text-white md:flex hidden  md:text-4xl text-xl" />
            <div className="flex text-white flex-col gap-1">
              <h3 className="md:text-md text-xs uppercase">
                CLARITY STARTS HERE
              </h3>
              <h2
                onClick={() => {
                  window.location.href = `tel:${phoneNumber
                    .replace("+", "")
                    .replace(" ", "")}`;
                }}
                className="md:text-2xl cursor-pointer text-xl text-nowrap font-bold"
              >
                {phoneNumber}
              </h2>
            </div>
          </div>
          <div className="bg-primary z-0 w-[30rem] h-[20rem] absolute md:right-[-10%] right-[-5%] md:top-[-20%] top-[70%] rounded-full px-4 py-2"></div>
        </div>
      </div>

      <div className="absolute z-0 top-0 left-0 w-full h-full bg-black">
        {isMobile ? <HeroVideoMobile /> : <HeroVideo />}
      </div>
    </div>
  );
};

export default Hero;
