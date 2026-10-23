import { NextResponse } from "next/server";
import { callCoupons, couponsConfigured } from "@/lib/couponsApi";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body.code !== "string") {
    return NextResponse.json({ valid: false });
  }
  if (!couponsConfigured) {
    return NextResponse.json({ valid: false, error: "unavailable" }, { status: 503 });
  }
  try {
    const { status, data } = await callCoupons("validate", request, {
      code: body.code.slice(0, 40),
      courseId: Number(body.courseId),
      track: body.track !== false,
    });
    return NextResponse.json(data, { status: status === 429 ? 429 : 200 });
  } catch {
    return NextResponse.json({ valid: false, error: "unavailable" }, { status: 503 });
  }
}
