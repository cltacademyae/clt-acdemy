"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import t18 from "@/../public/team/t18.jpeg";
import t19 from "@/../public/team/t19.png";
import t20 from "@/../public/team/t20.png";
import t20_1 from "@/../public/team/t20-1.png";
import t45 from "@/../public/team/t45.jpeg";
import t40 from "@/../public/team/t40.jpeg";
import t50 from "@/../public/team/t50.jpeg";
import kiran from "@/../public/team/Kiran-V-R.jpeg";
import amal from "@/../public/team/Amal.jpeg";
import adhil from "@/../public/team/Adhil.jpeg";
import t3 from "@/../public/team/t3.png";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function OurTeam() {
  //   [10:32 pm, 23/12/2025] Nubin Delta: Name : Ashwin.
  // BIO: Ashwin blends years of banking expertise with a passion for simplifying financial concepts. His continuous pursuit of certifications across forex, derivatives, and investor training reflects his dedication to being not just a mentor but a foundational force in CLT's education ecosystem.

  // Background: Former Banker | Bachelor of Commerce | Diploma in Hospitality
  // Strengths: Client education, foundational market understanding, structured growth for beginners.
  // Certifications: Certified Financial technician, Forex trading and analysis diploma, NISM Certified, CISI Certified, AFCM Certified.

  // Experience: 6+ years Into Trading and personalized Education.

  // Strengths:  Foundational excellence in financial education.
  // Empathy and student centric mentoring, Consistency and discipline, Adaptability to learner needs.
  // [11:05 pm, 23/12/2025] Nubin Delta: Name : Mathson Mathew
  // BIO: Mathson is a disciplined mentor with sharp technical insights. With a mechanical mind and trading edge in FX markets, he blends logic and strategy to help students master the psychology and patience required in trading.

  // Background: B.Tech in Mechanical Engineering

  // Certifications: NSE certified, Forex trading masterclass CISI Certified, AFCM Certified.

  // Experience: 4+ years Into Trading and personalized Education.

  // Strengths: Currency pairs, Swing trading, Balanced Approach of risk and psychology, Technically rooted with mechanical precision.
  // [11:05 pm, 23/12/2025] Nubin Delta: Name : Rafat
  // BIO: Rafat offers a deep-rooted understanding of the volatility and power of gold and crypto trading. His structured mentoring style and command of long-term charting give students a strong sense of direction.

  // Background: BBA, Master’s in Project Management

  // Certifications: NSE certified, Forex trading masterclass CISI Certified, AFCM Certified, CFA- Investments.

  // Experience: 7+ years Into Trading and personalized Education.

  // Strengths: Fast moving & Volatile instruments like gold and bitcoin, Analytical mind with strategical thinking, Price psychology, Entry and exit points strategy.
  // [11:05 pm, 23/12/2025] Nubin Delta: Name : EDWIN JOY.
  // BIO: A rare academic-trader blend, Edwin is the brain behind CLT’s academic curriculum. With deep research in trading instruments and a commitment to structured learning, his mentorship blends discipline and data.
  // Background: BTech, MTech, MBA, PGDIM, PGDHRM
  // Additional Credentials: Certified by NPTEL, IRADAI

  // Certifications: Certified Financial technician, Forex trading and analysis diploma, NISM Certified, CISI Certified, AFCM Certified. Bloomberg market concepts, Financial modeling, MITx Micromasters in Finance.

  // Markets: Gold, Oil, US30, NASDAQ

  // Experience: 11+ years Into Trading and personalized Education.

  // Strengths:  Academic leadership, Research oriented studies, Multi asset multi market technical mastery. curriculum architect, Quality controller. Forex Analyst
  const teamMembers = [
    {
      id: 1,
      name: "Edwin Joy",
      type: "Mentors",
      role: "Master Of Academics",

      bio: "A rare academic-trader blend, Edwin is the brain behind CLT’s academic curriculum. With deep research in trading instruments and a commitment to structured learning, his mentorship blends discipline and data.",
      background:
        "BTech, MTech, MBA, PGDIM, PGDHRM | Certified by NPTEL, IRADAI",
      imageUrl: t18,
      qualifications:
        "Certified Financial Technician, Forex Trading & Analysis Diploma, NISM Certified, CISI Certified, AFCM Certified, Bloomberg Market Concepts, Financial Modeling, MITx MicroMasters in Finance",
      comfortableAreaInTrading: "Gold, Oil, US30, NASDAQ",
      experience: "11+ years into trading and personalized education",
      achievements:
        "Academic leadership, research-oriented studies, multi-asset & multi-market technical mastery, curriculum architect, quality controller",
    },

    {
      id: 2,
      name: "Ashwin",
      type: "Mentors",
      role: "Senior Mentor",
      bio: "Ashwin blends years of banking expertise with a passion for simplifying financial concepts. His continuous pursuit of certifications across forex, derivatives, and investor training reflects his dedication to being not just a mentor but a foundational force in CLT's education ecosystem.",
      background:
        "Former Banker | Bachelor of Commerce | Diploma in Hospitality",
      imageUrl: t40,
      qualifications:
        "Certified Financial Technician, Forex Trading & Analysis Diploma, NISM Certified, CISI Certified, AFCM Certified",
      experience: "6+ years into trading and personalized education",
      achievements:
        "Client education, strong foundations for beginners, student-centric mentoring, consistency & discipline",
    },

    {
      id: 3,
      name: "Mathson Mathew",
      type: "Mentors",
      role: "Trading Mentor",
      bio: "Mathson is a disciplined mentor with sharp technical insights. With a mechanical mind and trading edge in FX markets, he blends logic and strategy to help students master the psychology and patience required in trading.",
      background: "B.Tech in Mechanical Engineering",
      imageUrl: t45,
      qualifications:
        "NSE Certified, Forex Trading Masterclass, CISI Certified, AFCM Certified",
      comfortableAreaInTrading: "Currency Pairs, Swing Trading",
      experience: "4+ years into trading and personalized education",
      achievements:
        "Balanced risk management & psychology with mechanical precision",
    },

    {
      id: 4,
      name: "Rahim",
      type: "Mentors",
      role: "Trading Mentor",
      bio: "Rahim offers a deep-rooted understanding of the volatility and power of gold and crypto trading. His structured mentoring style and command of long-term charting give students a strong sense of direction.",
      background: "BBA | Master’s in Project Management",
      imageUrl: t50,
      qualifications:
        "NSE Certified, Forex Trading Masterclass, CISI Certified, AFCM Certified, CFA – Investments",
      comfortableAreaInTrading: "Gold & Bitcoin",
      experience: "7+ years into trading and personalized education",
      achievements:
        "Expert in volatile instruments, price psychology, and precise entry-exit strategies",
    },
    {


          id: 28,
          name: "Nihal ",
          type: "Mentors", 
          role: "Trading mentor",
          bio: "Nihal brings a practical, hands-on approach to trading education, focusing on real-market application and consistency. With a strong emphasis on discipline and risk control, he helps learners transition from theory to confident execution. His mentorship style centers on clarity, patience, and long-term skill building within CLT’s learning ecosystem.",
          background: "Trader & Market Enthusiast | Bachelor’s Degree | Financial Markets Educator",
          qualifications: "NISM Certified, Technical & Price Action Trading Certification, Risk & Capital Management Training",
          experience: "5+ years in trading and personalized mentoring",
          achievements: "Practical market execution, beginner-to-intermediate trader development, disciplined trading habits, confidence building",
          imageUrl: t20_1,
        },
    {
      id: 3,
      name: "Rashida Pudhuveettil",
      type: "Mentors",
      role: "Trading Mentor",
      imageUrl: t3,
    },
    {
      id: 59,
      name: "Kiran V R",
      type: "Mentors",
      role: "Junior Mentor",
      imageUrl: kiran,
    },
    {
      id: 60,
      name: "Amal",
      type: "Mentors",
      role: "Junior Mentor",
      imageUrl: amal,
    },
    {
      id: 61,
      name: "Adhil",
      type: "Mentors",
      role: "Junior Mentor",
      imageUrl: adhil,
    },
  ];

  return (
    <div className="md:py-10 py-6 ">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-14 flex flex-col items-center justify-center ">
          <div className="px-5 rounded-full mb-2 border border-primary text-primary font-semibold w-fit text-center py-2">
            <p className="md:text-sm text-xs uppercase text-nowrap">
              CLT ACADEMY Mentors
            </p>
          </div>
          <h2 className="md:text-5xl text-4xl text-center md:text-start text-black/90 font-bold">
            Collaboration at the core of innovation
          </h2>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={25}
          slidesPerView={1}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}
          className="!pb-12"
        >
          {teamMembers.map((member, index) => (
            <SwiperSlide key={index}>
              <Sheet>
                <SheetTrigger className="block w-full text-left">
                  <div className="relative image-anime bg-transparent rounded-xl overflow-hidden group">
                    {/* Image Wrapper — aspect ratio here so the card keeps its
                        size before the lazy image loads */}
                    <div className="relative w-full aspect-[1/1.35] overflow-hidden rounded-2xl bg-[#DBE0E3]">
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10"></div>

                      <Image
                        src={member.imageUrl}
                        alt={`${member.name}, ${member.role} at CLT Academy`}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 90vw, (max-width: 1280px) 33vw, 400px"
                        className="object-cover rounded-2xl transform transition duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-10 left-6 right-6 text-center z-20 transform translate-y-6 transition-all duration-500 group-hover:-translate-y-6">
                      <h3 className="text-xl font-semibold text-white">
                        {member.name}
                      </h3>

                      {/* Description (hidden until hover) */}
                      <p className="text-white/70 text-sm mt-3 opacity-100 group-hover:opacity-100 transition-all duration-500">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </SheetTrigger>
                <SheetContent>
                  <ScrollArea className="h-[95vh]">
                    <SheetHeader>
                      <SheetTitle className="text-2xl font-bold text-black/90">
                        {member.name}
                      </SheetTitle>
                      <div className="flex flex-col gap-2">
                        <div className="relative overflow-hidden rounded-2xl bg-[#DBE0E3]">
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10"></div>

                          <Image
                            src={member.imageUrl}
                            alt={`${member.name}, ${member.role} at CLT Academy`}
                            width={500}
                            height={500}
                            loading="lazy"
                            sizes="(max-width: 768px) 90vw, 480px"
                            className="w-full aspect-[1/1] object-cover rounded-2xl transform transition duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <p className="text-black/90 font-semibold text-md">
                            <span className="font-bold text-primary">
                              Name:
                            </span>{" "}
                            {member.name}
                          </p>
                          <p className="text-black/90 font-semibold text-md">
                            <span className="font-bold text-primary">
                              Role:
                            </span>{" "}
                            {member.role}
                          </p>
                          {member.bio && (
                            <p className="text-black/90 font-semibold text-md">
                              <span className="font-bold text-primary">
                                Bio:
                              </span>{" "}
                              {member.bio}
                            </p>
                          )}
                          {member.background && (
                            <p className="text-black/90 font-semibold text-md">
                              <span className="font-bold text-primary">
                                Background:
                              </span>{" "}
                              {member.background}
                            </p>
                          )}


                          {member.qualifications && (
                            <p className="text-black/90 font-semibold text-md">
                              <span className="font-bold text-primary">
                                Qualifications:
                              </span>{" "}
                              {member.qualifications}
                            </p>
                          )}
                          {member.comfortableAreaInTrading && (
                            <p className="text-black/90 font-semibold text-md">
                              <span className="font-bold text-primary">
                                Comfortable Area in Trading:
                              </span>{" "}
                              {member.comfortableAreaInTrading}
                              {member.comfortableAreaInTrading}
                            </p>
                          )}
                          {member.experience && (
                            <p className="text-black/90 font-semibold text-md">
                              <span className="font-bold text-primary">
                                Experience:
                              </span>{" "}
                              {member.experience}
                            </p>
                          )}
                          {member.achievements && (
                            <p className="text-black/90 font-semibold text-md">
                              <span className="font-bold text-primary">
                                Achievements:
                              </span>{" "}
                              {member.achievements}
                            </p>
                          )}
                        </div>
                      </div>
                    </SheetHeader>
                  </ScrollArea>
                </SheetContent>
              </Sheet>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
