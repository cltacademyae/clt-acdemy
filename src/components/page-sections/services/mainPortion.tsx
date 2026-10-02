import { whatsappLink } from "@/components/global/whatsapp";
import { FaArrowRight } from "react-icons/fa";
import { RiStockFill } from "react-icons/ri";

export function MainPortion({
  title,
  description,
  subtitle,
}: {
  title: string;
  description: string;
  subtitle: string;
}) {
  return (
    <section className="w-full gridAnim bg-background md:py-24 py-10 text-white relative overflow-hidden">
      {/* Heading */}
      <div className="text-center max-w-4xl mx-auto px-4">
        <div className="w-full flex items-center justify-center">
          <div className="px-5 mb-2 rounded-full w-fit font-semibold border border-primary text-primary text-center py-2">
            <p className="md:text-sm text-xs uppercase text-nowrap">service</p>
          </div>
        </div>  

        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight capitalize text-black mt-1">
          {title}
        </h2>
        <h3 className="md:text-lg text-md font-semibold text-black/70 mt-5 uppercase tracking-wide">
          {subtitle}
        </h3>

        <p className="text-black/80 max-w-2xl mx-auto mt-5 text-lg">
          {description}
        </p>
        <div className="flex w-full items-center justify-center">
          <a
            href={whatsappLink}
            className=" mt-3 cursor-pointer flex items-center justify-center gap-2 bg-primary text-white px-6 md:text-lg py-3 rounded-lg font-medium shadow wow fadeInUp w-fit"
            data-wow-delay="0.4s"
          >
            Enroll Now
            <FaArrowRight />
          </a>
        </div>
      </div>

      {/* Vision & Mission */}
    </section>
  );
}
