import React from "react";

// System fonts only — fetching a font file per image render is a round trip
// on a route that has to stay cacheable.
export const OG_SIZE = { width: 1200, height: 630 };

const BRAND_RED = "#e11d2a";

export function ogImage({
  title,
  eyebrow,
}: {
  title: string;
  eyebrow?: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0d0d0d",
        color: "#ffffff",
        padding: "72px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div
          style={{
            width: "14px",
            height: "56px",
            background: BRAND_RED,
            borderRadius: "4px",
          }}
        />
        <div
          style={{
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
          }}
        >
          {eyebrow ?? "CLT Academy"}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          fontSize: title.length > 60 ? 62 : 78,
          fontWeight: 800,
          lineHeight: 1.1,
          maxWidth: "1000px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 28,
          color: "#b9b9b9",
        }}
      >
        <div style={{ display: "flex" }}>clt-academy.com</div>
        <div
          style={{
            display: "flex",
            padding: "10px 22px",
            border: `2px solid ${BRAND_RED}`,
            borderRadius: "999px",
            color: "#ffffff",
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          KHDA-Approved
        </div>
      </div>
    </div>
  );
}
