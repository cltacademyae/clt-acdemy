import Link from "next/link";
import { SERVICE_SLUGS } from "@/lib/catalog.slugs";
import React from "react";
import { FaChalkboardTeacher, FaChartPie, FaWhatsapp } from "react-icons/fa";
import { FaMoneyBillTransfer, FaSackDollar } from "react-icons/fa6";
import { IoLogoDiscord } from "react-icons/io5";
import { RiStockFill } from "react-icons/ri";

const addons = [
  {
    title: "Digital Trading Journal",
    link: `/services/${SERVICE_SLUGS["1"]}`,
    desc: "Track what works. Our Digital Trading Journal gives data-driven clarity to improve every trading decision.",
    icon: <FaChartPie className="size-20  text-primary" />
  },
  {
    title: "The Profit Block eBook",
    link: `/services/${SERVICE_SLUGS["5"]}`,
    desc: "Trading is psychological. The Profit Block reveals common mindset mistakes and how to overcome them effectively.",
    icon: <FaSackDollar className="size-20  text-primary" />
  },
  {
    title: "Discord Trade Channel",
    link: `/services/${SERVICE_SLUGS["2"]}`,
    desc: "CLT’s Discord gives trade calls with clear logic, risk, entry, exit, and real-time learning support.",
    icon: <IoLogoDiscord className="size-20  text-primary" />
  },
  {     
    title: "WhatsApp Community",
    link: `/services/${SERVICE_SLUGS["6"]}`,
    desc: "Get instant feedback, motivation, and support from mentors in the CLT WhatsApp group—anytime, anywhere.",
    icon: <FaWhatsapp className="size-20  text-primary" />
  },
  {
    title: "CLT Precision Indicator",
    link: `/services/${SERVICE_SLUGS["3"]}`,
    desc: "Cut through market noise. The CLT Precision Indicator reveals liquidity zones, imbalances, and institutional moves clearly.",
    icon: <RiStockFill className="size-20  text-primary" />
  },
  {
    title: "Lifetime Mentorship",
    link: `/services/${SERVICE_SLUGS["4"]}`,
    desc: "Short courses fade. Our lifetime mentorship gives ongoing calls, reviews, strategies, and full access—forever.",
    icon: <FaChalkboardTeacher className="size-20  text-primary" />
  },
];


// Digital Trading Journal

// Track what works. Our Digital Trading Journal gives data-driven clarity to improve every trading decision.

// The Profit Block eBook

// Trading is psychological. The Profit Block reveals common mindset mistakes and how to overcome them effectively.

// Discord Trade Channel

// CLT’s Discord gives trade calls with clear logic, risk, entry, exit, and real-time learning support.

// WhatsApp Community

// Get instant feedback, motivation, and support from mentors in the CLT WhatsApp group—anytime, anywhere.

// CLT Precision Indicator

// Cut through market noise. The CLT Precision Indicator reveals liquidity zones, imbalances, and institutional moves clearly.

// Lifetime Mentorship

// Short courses fade. Our lifetime mentorship gives ongoing calls, reviews, strategies, and full access—forever.

export default function TraderStackSection() {
  return (
    <div className="w-full px-4 flex items-center justify-center">
      <section className="w-full py-20 bg-primary rounded-xl bg-cover bg-center relative">
        {/* Top Section */}
        <div className="max-w-6xl mx-auto px-4 text-center mb-14">
          <p className="text-white text-sm tracking-widest uppercase flex items-center justify-center gap-2">
            <span className="h-[2px] w-8 bg-white"></span>
            Unlock the Full Power of Your Trading Journey
            <span className="h-[2px] w-8 bg-white"></span>
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
            Accelerate Your Growth with
          </h2>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            CLT Add-Ons
          </h2>

          <p className="text-gray-300 max-w-3xl mx-auto mt-4 text-lg">
            At CLT Academy, growth goes beyond the classroom. Our powerful
            add-ons — tools, strategies, and communities — help you apply what
            you learn, sharpen your edge, and stay connected with expert
            mentors.
          </p>
        </div>

        {/* Cards Section */}
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {addons.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              className="bg-white backdrop-blur-md rounded-2xl p-10 text-center shadow-xl "
            >
              <h3 className="text-2xl font-semibold text-black mb-6">
                {item.title}
              </h3>

              <div className="w-20 h-20 mx-auto mb-6">
                {item.icon}
              </div>

              <p className="text-black/70 leading-relaxed text-sm">
                {item.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
