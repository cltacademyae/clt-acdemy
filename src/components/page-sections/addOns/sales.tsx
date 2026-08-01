"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import { useWhatsapp } from "@/hooks/useWhatsapp";

export default function SalesSection() {
  const whatsapp = useWhatsapp("addons");
  return (
    <section className="w-full py-16 md:px-20 px-2 bg-background">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Text Section */}
        <div className="flex-1">
          <p className="text-primary md:text-start text-center font-semibold tracking-widest flex items-center gap-2 uppercase">
            <span className="h-[2px] w-8 bg-primary"></span>
            Transform Ideas into Sales
            <span className="h-[2px] w-8 bg-primary"></span>
          </p>

          <h2 className="text-4xl md:text-start text-center md:text-5xl font-bold mt-4 mb-3">
            Want the full trader stack?
          </h2>

          <p className="text-muted-foreground md:text-start text-center text-lg max-w-xl">
            Combine insights, strategies, and indication for your ultimate trading edge.
          </p>
        </div>

        {/* Right Buttons */}
        <div className="flex flex-col items-center gap-4">
          <button onClick={() => whatsapp.open({ cta: "upgrade" })} className="bg-primary text-white font-semibold px-8 py-4 rounded-md flex items-center gap-3 hover:opacity-90 transition">
            UPGRADE TO FULL ACCESS <ArrowRight size={18} />
          </button>

          <span className="font-bold">OR</span>

          <button onClick={() => whatsapp.open({ cta: "join" })} className="bg-primary text-white font-semibold px-8 py-4 rounded-md flex items-center gap-3 hover:opacity-90 transition">
            JOIN THE ACADEMY NOW <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
