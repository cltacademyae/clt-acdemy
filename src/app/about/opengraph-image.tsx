import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE } from "@/lib/ogImage";

export const alt = "About CLT Academy";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    ogImage({ title: "About CLT Academy", eyebrow: "About" }),
    size
  );
}
