"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Service = () => {
  // Canonical product names — these previously used a second, generic naming
  // system that split the brand entity across the site and the press release.
  const cards = [
    {
      title: "Trade Craft — Beginner Forex Trading Program",
      desc: "Perfect for new traders who want a strong foundation.",
      bgImage: "/s1.png",
      href: "/courses/trade-craft-beginner-forex",
    },
    {
      title: "Profit Matrix — Intermediate Trading",
      desc: "For traders who know the basics but lack execution clarity.",
      bgImage: "/s2.png",
      href: "/courses/profit-matrix-intermediate-trading",
    },
    {
      title: "Market Code — Advanced Trading",
      desc: "High-level chart analysis and real-time strategy execution.",
      bgImage: "/s3.png",
      href: "/courses/market-code-advanced-trading",
    },
    {
      title: "CLT Vantage — Pro-Level Mentorship",
      desc: "Six months of mentorship for traders thinking long term.",
      bgImage: "/s4.png",
      href: "/courses/clt-vantage-pro-mentorship",
    },
  ];

  return (
    <div className="w-screen flex justify-center md:px-20  md:py-25 py-10  ]">
      <div className="w-[90%] ">
        <div className="w-full flex items-center justify-center"></div>

        <div className="grid mt-3 justify-center items-center md:grid-cols-2 grid-cols-1 gap-6">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="px-5 rounded-full mb-2 border border-primary text-primary font-semibold w-fit text-center py-2">
              <p className="md:text-sm text-xs uppercase text-nowrap">
                CLT ACADEMY SERVICES
              </p>
            </div>
            <h2 className="md:text-5xl text-4xl text-center md:text-start text-black/90 font-bold">
              Our Signature Programs, Tailored for Every Trader’s Journey
            </h2>
          </div>
          <p className="text-black/60 md:mt-4 text-md">
            From complete beginners to seasoned traders, our training programs
            are designed to elevate your strategy, sharpen your skills, and
            position you for long-term trading success.
          </p>
        </div>

        {/* Swiper */}
        <div className="mt-10">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={3}
            // pagination={{ clickable: true }}
            // navigation
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            loop
            breakpoints={{
              0: {
                slidesPerView: 1.5,
              },
              768: {
                slidesPerView: 1.5,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="py-10"
          >
            {cards.map((card, index) => (
              <SwiperSlide className="rounded-2xl overflow-hidden" key={index}>
                <div className=" flex flex-col justify-center items-center rounded-2xl min-h-[20rem] border bg-primary relative overflow-hidden hover:scale-[1.03] duration-200 cursor-pointer">
                  <h2 className="text-white text-3xl text-center font-bold">
                    {card.title}
                  </h2>
                  <p className="text-white w-[80%] text-md text-center">
                    {card.desc}
                  </p>
                  {/* Only link path from the homepage into the course pages. */}
                  <Button
                    asChild
                    className="bg-white mt-3 md:px-6 md:py-1 rounded-full text-primary hover:bg-white/80"
                  >
                    <Link href={card.href}>Learn More</Link>
                  </Button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Service;
