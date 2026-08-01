import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE } from "@/lib/ogImage";

export const alt = "Trading Blog — Forex, Stock & Market Insights";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    ogImage({ title: "Trading Blog — Forex, Stock & Market Insights", eyebrow: "Blog" }),
    size
  );
}
