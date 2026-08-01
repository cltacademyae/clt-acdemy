import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE } from "@/lib/ogImage";

export const alt = "Meet Our Trading Mentors";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    ogImage({ title: "Meet Our Trading Mentors", eyebrow: "Our Team" }),
    size
  );
}
