import { NextResponse } from "next/server";
import { callCoupons, couponsConfigured } from "@/lib/couponsApi";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body.code !== "string" || !couponsConfigured) {
    return NextResponse.json({ ok: false });
  }
  try {
    await callCoupons("wa-click", request, {
      code: body.code.slice(0, 40),
      courseId: Number(body.courseId),
    });
  } catch {
    // Counting is best-effort; never block the customer on it.
  }
  return NextResponse.json({ ok: true });
}
