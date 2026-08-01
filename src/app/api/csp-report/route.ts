import { NextRequest, NextResponse } from "next/server";

/**
 * Collector for Content-Security-Policy-Report-Only violations.
 *
 * The enforcing policy is deliberately permissive because GTM can load tags
 * from origins that are not visible in the page source. The strict candidate
 * policy runs in report-only alongside it; anything logged here is an origin
 * that would break if it were enforced today.
 *
 * Reports are unauthenticated and trivially forgeable, so treat the output as
 * a hint about what to allowlist, never as a security signal.
 */
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const report = body["csp-report"] ?? body;

    console.warn(
      "[csp-report]",
      JSON.stringify({
        blocked: report["blocked-uri"] ?? report.blockedURL,
        directive: report["violated-directive"] ?? report.effectiveDirective,
        document: report["document-uri"] ?? report.documentURL,
      })
    );
  } catch {
    // A malformed report is not worth a 500 — the browser will not retry.
  }

  return new NextResponse(null, { status: 204 });
}
