"use client";
import { useWhatsapp } from "@/hooks/useWhatsapp";
import { Button } from "@/components/ui/button";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Cta = () => {
  const whatsapp = useWhatsapp("cta");
  return (
    <div className="w-screen flex items-center  justify-center px-3">
      <div className="w-full min-h-[30vh] py-10 md:flex-row flex-col bg-primary rounded-lg md:px-25 flex items-center justify-between">
        <h2 className="text-white md:w-1/2 w-[90%] text-4xl font-bold">
          We build traders, not just strategies. Clarity, Confidence and
          Constant support whereever you need.
        </h2>
        <Button
          size={"lg"}
          className="md:text-[.8rem] md:mt-0 mt-10 scale-[1.3] bg-white hover:bg-white/90 text-primary font-bold group rounded-2xl"
          onClick={() => whatsapp.open()}
        >
          Start Your Journey{" "}
          <FaArrowRight className="group-hover:translate-x-1 duration-900" />
        </Button>
      </div>
    </div>
  );
};

export default Cta;
