import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE } from "@/lib/ogImage";

export const alt = "Contact CLT Academy, Dubai";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    ogImage({ title: "Contact CLT Academy, Dubai", eyebrow: "Contact" }),
    size
  );
}
