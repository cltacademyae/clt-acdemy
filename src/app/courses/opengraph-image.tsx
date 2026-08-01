import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE } from "@/lib/ogImage";

export const alt = "Trading Courses in Dubai";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    ogImage({ title: "Trading Courses in Dubai", eyebrow: "Courses" }),
    size
  );
}
