"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import test1 from "@/../public/test1.png";
import test2 from "@/../public/test2.png";
import test4 from "@/../public/test4.png";
import test3 from "@/../public/test3.png";
const Testimonials = () => {
  const testimonials = [
    {
      name: "Salma Shaikh  ",
      title: "",
      image: test1,
      link: "https://maps.app.goo.gl/7diMSetWDaxdznMp7",
      description:
        "I joined with zero knowledge about trading, but the academy made everything so easy to understand. The classes are interactive, and the mentors give real-time examples that make learning fun and practical. Highly recommend for anyone starting their trading journey!",
    },
    {
      name: "Nisham Nishu",
      title: "",
      image: test2,
      link: "https://maps.app.goo.gl/FnH6sKtQEbzFt9Ur7",
      description:
        "I am truly grateful for the learning experience at CLT Trading Academy. The course structure was clear, practical, and well-organized, making it easy to follow even for someone without a financial background. The instructors are highly knowledgeable, patient, and always willing to provide support whenever needed.",
    },
    {
      name: "YAHIYA M V",
      title: "",
      image: test3,
      link: "https://maps.app.goo.gl/JfWFCdDHv7SX54997",
      description:
        "CLT Academy is one of the best places for anyone who wants to build a strong career in the trading industry. The instructors are highly knowledgeable and explain even complex topics in a simple, practical way. The training sessions are very interactive, and real-time trading examples make learning much easier.",
    },
    {
      name: "Nidha Farzeen",
      title: "",
      link: "https://maps.app.goo.gl/Lmb26pVMazGsS41D6",
      description:
        "CLT was a life changer. Mentor's are so friendly and experienced . Sir: AMJAD took class for me his class was amazing and he teach from the basic level to profitable trader and he make sure every student understood the topic very clearly . I also appreciate the community support .",
      image: test4,
    },
  ];
  return (
    <div className="relative   bg-primary -mt-40 md:min-h-[70vh] w-full  gap-10">
      <div className="md:px-20 px-5 flex items-center justify-center  py-20">
        <div className="w-full mt-20 md:px-10 px-2">
          <div className="px-5 mb-4 rounded-full w-fit font-semibold border border-white text-white text-center py-2">
            <p className="md:text-sm text-xs uppercase text-nowrap">
              Our Testimonials
            </p>
          </div>
          <h2 className="text-white text-4xl font-bold">
            We’re Happy to get Our Happy Customer Feedback
          </h2>
          <p className="text-white text-lg font-semibold capitalize">from google reviews</p>
          <div className="mt-10">
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={15}
              slidesPerView={3}
              // pagination={{ clickable: true }}
              // navigation
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              loop
              breakpoints={{
                0: {
                  slidesPerView: 1.1,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="py-10"
            >
              {testimonials.map((card, index) => (
                <SwiperSlide
                onClick={() => window.open(card.link, "_blank")}
                  className="rounded-2xl bg-white w-full cursor-pointer min-h-[23rem] py-6 px-5  gap-4 overflow-hidden"
                  key={index}
                >
                  <div className="flex w-full items-start justify-start px-4 flex-col gap-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-10 h-10 fit-image rounded-full overflow-hidden">
                        {/* Stock avatar, not the named person — decorative. */}
                        <Image
                          src={card.image}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          sizes="40px"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h2 className="text-black text-xl font-bold">
                          {card.name}
                        </h2>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((item, index) => (
                            <FaStar
                              key={index}
                              className="text-yellow-500 text-lg"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="text-black/90 border-l-4 border-primary px-4 text-lg">
                      {card.description}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      <div className="absolute z-0 top-0 left-0 w-full h-full flex items-center justify-center">
        <img
          src="/awward.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={1200}
          height={800}
          className="w-full opacity-5 object-cover  h-full "
        />
      </div>
    </div>
  );
};

export default Testimonials;
