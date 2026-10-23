import Image from "next/image";
import BuyNow from "./BuyNow";
import { TabbyLogo, TAMARA_LOGO } from "./paymentLogos";
import { fmt, tabbyPlans, tamaraPlans } from "./paymentPlans";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

function formatPrice(price: number): string {
  return price.toLocaleString("en-AE");
}

export default function CourseFaq({
  faqItems,
  subtitle,
  title,
  description,
  price,
  courseName,
  courseId,
  duration,
}: {
  subtitle: string;
  title: string;
  description: string;
  price: number;
  courseName: string;
  courseId: string;
  duration?: string;
  faqItems: {
    question: string;
    answer: string;
  }[];
}) {
  const monthlyFrom = Math.min(
    ...[...tabbyPlans(price), ...tamaraPlans(price)].map((p) => p.perPayment),
  );
  return (
    <div className="py-20 gridAnim relative md:px-20 px-5 w-full">
      <div className="w-full">
        <div className="grid grid-cols-1 relative lg:grid-cols-2 gap-10">
          {/* LEFT SIDE */}
          <div className="top-12 space-y-6 lg:sticky lg:top-20 self-start">
            <div className="px-5 mb-4 rounded-full w-fit font-semibold border border-primary text-primary text-center py-2">
              <p className="md:text-sm text-xs uppercase text-nowrap">
                {title}
              </p>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-black/90 capitalize wow fadeInUp">
              {subtitle}
            </h2>

            <p className="wow fadeInUp text-black/60" data-wow-delay="0.2s">
              {description}
            </p>

            {/* Enrolment card */}
            <div
              className="font-[family-name:var(--font-outfit)] animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both delay-200 rounded-2xl bg-white border border-black/10 shadow-sm p-6 md:p-7 w-full"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-black/40">
                Course Fee
              </p>
              <p className="mt-1 text-4xl md:text-5xl font-bold text-black/90 tracking-tight font-[family-name:var(--font-poppins)]">
                <span className="text-lg font-semibold text-black/50 mr-1.5">
                  AED
                </span>
                {formatPrice(price)}
              </p>
              <p className="mt-2 text-sm text-black/55">
                or from{" "}
                <span className="font-semibold text-black/80">
                  AED {fmt(monthlyFrom)}/mo
                </span>{" "}
                with Tabby or Tamara
              </p>

              <ul className="mt-5 divide-y divide-black/[0.06] border-y border-black/[0.06] text-sm">
                {[
                  duration && ["Duration", duration],
                  ["Pay in", "Full or in instalments"],
                  ["Payment", "Card, Apple Pay, Google Pay"],
                ]
                  .filter((r): r is string[] => Boolean(r))
                  .map(([label, value]) => (
                    <li key={label} className="flex items-center justify-between gap-4 py-3">
                      <span className="text-black/50">{label}</span>
                      <span className="font-semibold text-black/85 text-right">{value}</span>
                    </li>
                  ))}
              </ul>

              <div className="mt-6">
                <BuyNow courseName={courseName} courseId={courseId} price={price} fullWidth />
              </div>

              <div className="mt-4 flex items-center justify-center gap-2">
                <Image src="/payment-logos/visa.svg" alt="Visa" width={38} height={24} className="h-5 w-[32px] rounded-[3px]" />
                <Image src="/payment-logos/mastercard.svg" alt="Mastercard" width={38} height={24} className="h-5 w-[32px] rounded-[3px]" />
                <Image src="/payment-logos/amex.svg" alt="American Express" width={38} height={24} className="h-5 w-[32px] rounded-[3px]" />
                <TabbyLogo className="h-5 w-[56px]" />
                <Image src={TAMARA_LOGO} alt="Tamara" width={68} height={24} className="h-5 w-[56px] rounded-[5px]" />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE ACCORDION */}
          <div className="bg-primary rounded-2xl md:p-8 wow fadeInUp">
            <Accordion
              type="single"
              className="flex flex-col gap-4"
              collapsible
            >
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={item.question}
                  className="border-b  px-2 rounded-xl border-white/20 md:py-4 py-2 wow fadeInUp"
                >
                  <AccordionTrigger className="md:text-lg text-md font-semibold text-white ">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/90 pt-3 border-white/20 font-semibold px-1">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
