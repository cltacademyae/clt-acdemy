"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import awward from "@/../public/awward.png";
import { FaArrowRight } from "react-icons/fa";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useWhatsapp } from "@/hooks/useWhatsapp";

interface JourneyItem {
  number: number;
  description: string;
  class: string;
}

const jorneyData: JourneyItem[] = [
  {
    number: 3000,
    description: "Students Trained",
    class: "",
  },
  {
    number: 1000,
    description: "Active Courses",
    class: "",
  },
  {
    // Non-monetary by design: profit claims are unsubstantiated and a YMYL risk.
    number: 120,
    description: "Mentorship hours delivered weekly",
    class: "",
  },
  {
    number: 60000,
    description: "Live sessions conducted.",
    class: "col-span-[1.5]",
  },
  {
    number: 20000,
    description: "Add ons & resources downloaded",
    class: "col-span-2",
  },
];

/**
 * Counter Component
 * Uses physics-based springs for a "smooth" feel rather than linear duration.
 * Formats numbers with commas.
 */
const AnimatedCounter = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);

  // Only start when the individual number is in view
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Start from 0
  const motionValue = useMotionValue(0);

  // Use a spring for smooth, organic movement
  // mass/stiffness/damping control the "physics"
  const springValue = useSpring(motionValue, {
    mass: 1,
    stiffness: 22, // controls speed → lower = slower
    damping: 18,   // smooth finish
  });
  
  
  

  // Transform the raw number into a formatted string (e.g., 10,000)
  const displayValue = useTransform(springValue, (current) =>
    Math.round(current).toLocaleString()
  );

  // Once the counter has entered view we hand the text over to the animation.
  // Before that (and crucially in the server-rendered HTML that Google reads,
  // and for users with JS disabled) we render the REAL number — not "0".
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (isInView) {
      setAnimating(true);
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  return (
    <motion.span ref={ref}>
      {animating ? displayValue : value.toLocaleString()}
    </motion.span>
  );
};

const Journey = () => {
  const whatsapp = useWhatsapp("journey");
  // Ref for the container animation
  const containerRef = useRef(null);
  const isContainerInView = useInView(containerRef, {
    once: true,
    margin: "-100px",
  });

  return (
    <div className="w-full relative md:px-4 px-2 mt-10" ref={containerRef}>
      <div className="w-full md:min-h-[70vh] rounded-lg overflow-hidden relative bg-black">
        {/* Content Container */}
        <div className="relative py-15 z-10 w-full h-full flex items-center justify-center flex-col gap-4">
          <div className="flex-col flex gap-2 mt-10 md:mt-0">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-white md:text-start text-center md:text-5xl text-4xl uppercase font-bold"
            >
              Our Journey
            </motion.h2>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white/80 md:text-xl text-base text-center font-bold"
            >
              From Confused To Confident
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 grid-cols-2 md:w-[70%] w-full px-2 gap-2">
            {jorneyData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isContainerInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`bg-white/5 cursor-pointer hover:-translate-y-1 duration-500 group flex items-center justify-center gap-4 py-10 backdrop-blur-sm md:px-6 px-3 rounded-lg ${item.class}`}
              >
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                  <h2 className="md:text-4xl text-2xl text-nowrap text-white font-bold flex flex-row items-center">
                    <AnimatedCounter value={item.number} />
                    <span>+</span>
                  </h2>
                  <p className="text-sm text-white/90">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-10 md:mb-0"
          >
            <Button
              onClick={() => whatsapp.open()}
              size={"lg"}
              className="md:text-[.8rem] font-bold group rounded-2xl"
            >
              Start Your Journey{" "}
              <FaArrowRight className="ml-2 group-hover:translate-x-1 duration-500" />
            </Button>
          </motion.div>
        </div>

        {/* Background Image - Replaced Next/Image with standard img for compatibility */}
        <div className="absolute top-0 left-0 fit-image w-full h-full z-0 flex items-center justify-center pointer-events-none">
          <Image
            src={awward}
            alt="awward"
            width={1000}
            height={1000}
            className="w-full opacity-20 object-cover  h-full "
          />
        </div>
      </div>
    </div>
  );
};

export default Journey;
