import "server-only";

/**
 * Server-to-server bridge to the coupons app (coupons.clt-academy.com). The
 * browser only ever talks to this site's own /api/coupon/* routes, so the CSP
 * `connect-src 'self'` stays as is and the backend key never reaches a client.
 */
const BASE = process.env.COUPONS_API_URL || "https://coupons.clt-academy.com";
const KEY = process.env.COUPONS_API_KEY || "";

export const couponsConfigured = KEY.length > 0;

export function visitorHeaders(req: Request): Record<string, string> {
  const ip =
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    "";
  return {
    "x-visitor-ip": ip,
    "x-visitor-ua": req.headers.get("user-agent") ?? "",
  };
}

export async function callCoupons(path: string, req: Request, body: unknown) {
  const res = await fetch(`${BASE}/api/public/${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": KEY,
      ...visitorHeaders(req),
    },
    body: JSON.stringify(body),
    cache: "no-store",
    // A slow coupons server must not hang the payment modal.
    signal: AbortSignal.timeout(5000),
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, data };
}
