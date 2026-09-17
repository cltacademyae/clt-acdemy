"use client";
import Image from "next/image";
import Link from "next/link";
import { SERVICE_SLUGS } from "@/lib/catalog.slugs";
import { useRouter } from "next/navigation";
import React from "react";

const Gallery = () => {
  const data = [
    {
      title: "Digital Trading Journal",
      list: [
        "☆ Track What Works: Identify winning patterns in your trades",
        "☆ Data-Driven Clarity: Eliminate guesswork with performance metrics",
        "☆ Refine Your Strategy: Spot strengths and weaknesses in real time",
        "☆ Boost Discipline: Stay consistent with documented trade plans",
        "☆ Make Smarter Decisions: Use insights to improve every trade",
        "☆ See Your Growth: Monitor progress and evolve as a trader",
      ],
      image: "/l1.png",
      link: `/services/${SERVICE_SLUGS["1"]}`,
    },
    {
      title: "Discord Trading Channel",
      list: [
        "☆ Mind Over Market: Trading is 80% psychology",
        "☆ Spot Profit Blocks: Identify mental mistakes",
        "☆ Emotional Triggers: Control fear & greed",
        "☆ Clear the Noise: Overcome doubt & hesitation",
        "☆ Build Focus: Stay disciplined under pressure",
        "☆ Confident Execution: Trade with a clear mind",
      ],
      image: "/l2.png",
      link: `/services/${SERVICE_SLUGS["2"]}`,
    },
    {
      title: "CLT Precision Indicator",
      list: [
        "☆ Cut the Noise: Filter out distractions and false signals",
        "☆ CLT Precision Indicator: Built for clarity in volatile markets",
        "☆ Liquidity Zones: Spot high-probability price areas",
        "☆ Imbalance Detection: Identify key supply & demand gaps",
        "☆ Institutional Moves: Uncover smart money footprints",
        "☆ Trade Smarter: Use real data, not guesswork",
      ],
      image: "/l3.png",
      link: `/services/${SERVICE_SLUGS["3"]}`,
    },
    {
      title: "Life Time Mentorship",
      list: [
        "☆ No More Shortcuts: Courses fade, real support lasts",
        "☆ Lifetime Mentorship: One-time access, forever guidance",
        "☆ Live Market Calls: Stay updated in real time",
        "☆ Weekly Reviews: Learn from real trades, not theory",
        "☆ Proven Strategies: Battle-tested setups shared openly",
        "☆ All-In Access: Tools, updates, and community for life",
      ],
      image: "/l4.png",
      link: `/services/${SERVICE_SLUGS["4"]}`,
    },
  ];

  return (
    <div className="w-screen md:block hidden px-3 py-10">
      {" "}
      <div className=" rounded-lg overflow-hidden flex h-screen  items-center justify-center ">
        {data.map((item, index) => (
          <Link
            href={item.link}
            key={index}
            className="bg-black flex items-center justify-center relative group hover:w-[200%] transition-all duration-200 cursor-pointer w-full h-full"
          >
            <div className="absolute w-full h-full top- right-0">
              <Image
                src={item.image}
                alt={item.title}
                width={500}
                height={500}
                className="w-full h-full opacity-35 object-cover"
              />
            </div>
            <h2 className="text-2xl relative group-hover:hidden rotate-90 text-nowrap text-white font-bold">
              {item.title}
            </h2>
            <div className="group-hover:flex hidden transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex-col  gap-2">
              {item.list.map((listItem, index) => (
                <p key={index} className="text-white text-md">
                  {listItem}
                </p>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
