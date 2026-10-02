import { WHATSAPP_ENABLED, whatsappLink } from "@/components/global/whatsapp";
import Image from "next/image";
import React from "react";
import grImage from "@/../public/images/my/gr.webp";
import moneyImage from "@/../public/images/my/money.png";
import iffImage from "@/../public/images/my/iff.webp";
import profxImage from "@/../public/images/my/profx.jpg";
import g3Image from "@/../public/our/g3.png";
import g4Image from "@/../public/our/g4.png";

const awards = [
  {
    img: grImage,
    title: "Guines World Record Holder",
    desc: "Recognized for a record-breaking live session.",
    delay: "0s",
  },
  {
    img: moneyImage,
    title: "Money Conclave Awards",
    desc: "Best Crypto & Blockchain educator of the year 2024",
    delay: "0.2s",
  },
  {
    img: iffImage,
    title: "International Finance Forum",
    desc: "Outstanding Forex Education Provider 2024",
    delay: "0.4s",
  },
  {
    img: g4Image,
    title: "Forex Traders Summit Award",
    desc: "Best Forex Trading Academy 2024",
    delay: "0.6s",
  },
  {
    img: profxImage,
    title: "PROFX AWARDS DUBAI",
    desc: "Best Forex Trading Academy 2024",
    delay: "0.6s",
  },
  {
    img: g3Image,
    title: "Forex Traders Summit Award",
    desc: "Best Forex Trading Academy 2023",
    delay: "0.6s",
  },
];

const Awards = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 mb-16">
          <div>
            <h3 className="text-sm font-semibold tracking-widest text-gray-500 mb-2">
              AWARDS
            </h3>
            <h2 className="text-4xl font-semibold">Our Awards</h2>
          </div>

          <p className="text-gray-600">
            These honors reflect our students’ success stories and the trust
            placed in Delta as a leader in trading education.
          </p>
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
          {awards.map((award, index) => (
            <div key={index} className="group relative">
              <div
                className="relative bg-white rounded-2xl p-10 overflow-hidden
                aspect-[1/1.15] transition-all duration-500
                before:absolute before:inset-0 before:bg-white before:rounded-2xl
                before:transition-transform before:duration-500
                group-hover:before:translate-x-full group-hover:before:-translate-y-full"
                style={{ animationDelay: award.delay }}
              >
                {/* Image */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  <Image src={award.img} alt={award.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--primary-color)]" />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between text-gray-900 group-hover:text-white transition-colors duration-300">
                  {/* Arrow */}
                  <div
                    className="absolute top-1 right-0 transform -translate-x-full translate-y-full rotate-90
                    opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:rotate-0
                    transition-all duration-400"
                  >
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-[var(--primary-color)] flex items-center justify-center"
                    >
                      <img
                        src="/images/arrow-white.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="w-5 transition-transform duration-300 hover:rotate-45"
                      />
                    </a>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {award.title}
                    </h3>
                    <p className="text-sm">{award.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p>
            <span className="inline-block text-sm text-white bg-[var(--primary-color)] rounded px-3 py-1 mr-2">
              Start
            </span>
            Your Financial Freedom Journey –{" "}
            <a
              href={
                WHATSAPP_ENABLED
                  ? "https://wa.me/+971507528009?text=Hello,%20I%20would%20like%20to%20know%20more%20about%20this.%20Could%20you%20please%20provide%20details?"
                  : whatsappLink
              }
              className="font-semibold text-[var(--primary-color)] underline hover:text-white transition"
            >
              Start here!
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Awards;
