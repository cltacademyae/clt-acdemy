"use client";
import { phoneNumber } from "@/const/data";
import { useWhatsapp } from "@/hooks/useWhatsapp";
import { trackEvent } from "@/lib/analytics";

/** Sticky on mobile, where the CTA would otherwise scroll away entirely. */
export default function CommercialCta({ pageSlug }: { pageSlug: string }) {
  const whatsapp = useWhatsapp("commercial_page");

  return (
    <div className="sticky bottom-0 z-30 bg-black text-white border-t border-white/15">
      <div className="md:px-20 px-5 py-4 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm md:text-base font-semibold">
          Talk to a mentor about which programme fits you.
        </p>
        <div className="flex items-center gap-3">
          <a
            href={`tel:${phoneNumber.replace(/[\s+]/g, "")}`}
            onClick={() =>
              trackEvent("phone_click", {
                link_position: "commercial_page",
                page_slug: pageSlug,
              })
            }
            className="px-4 py-2 rounded-xl border border-white/30 text-sm font-bold hover:bg-white/10 transition-colors"
          >
            Call
          </a>
          <button
            onClick={() => whatsapp.open({ page_slug: pageSlug })}
            className="px-5 py-2 rounded-xl bg-primary text-white text-sm font-bold hover:opacity-90 transition-opacity"
          >
            WhatsApp us
          </button>
        </div>
      </div>
    </div>
  );
}
