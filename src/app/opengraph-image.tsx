import { ImageResponse } from "next/og";
import { SITE } from "@/const/seo";
import { ogImage, OG_SIZE } from "@/lib/ogImage";

export const alt = `${SITE.name} — KHDA-approved trading academy in Dubai`;
export const size = OG_SIZE;
export const contentType = "image/png";

/** Homepage share card. Every other route generates its own via `ogImage()`. */
export default function Image() {
  return new ImageResponse(
    ogImage({
      title: "KHDA-Approved Trading Academy in Dubai",
      eyebrow: "CLT Academy",
    }),
    size
  );
}
