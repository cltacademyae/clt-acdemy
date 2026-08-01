"use client";
import { usePathname } from "next/navigation";
import { whatsappLinkFor } from "@/components/global/whatsapp";
import { trackEvent } from "@/lib/analytics";

/**
 * WhatsApp CTA carrying attribution: the prefilled message embeds the
 * originating path and the click fires `whatsapp_click`. Outbound clicks are
 * otherwise invisible, and this is the site's primary conversion.
 */
export function useWhatsapp(linkPosition: string) {
  const pathname = usePathname();
  const href = whatsappLinkFor(pathname);

  const track = (extra: Record<string, string> = {}) =>
    trackEvent("whatsapp_click", { link_position: linkPosition, ...extra });

  return {
    href,
    onClick: () => track(),
    open: (extra?: Record<string, string>) => {
      track(extra);
      window.open(href, "_blank", "noopener");
    },
  };
}
