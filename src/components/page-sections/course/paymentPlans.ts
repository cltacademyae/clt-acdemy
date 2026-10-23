export type MethodId = "card" | "apple-pay" | "google-pay" | "tabby" | "tamara";

export type Plan = {
  id: string;
  payments: number;
  /** Per-instalment amount, fee included. */
  perPayment: number;
  /** Fee inside each instalment (0 = none). */
  monthlyFee: number;
  total: number;
  note: string;
};

/**
 * Estimates modelled on the plans Tabby and Tamara show on live UAE stores
 * (e.g. rivolishop.com for AED 2,750):
 *   Tabby  — 4 payments interest-free; 6 / 8 / 12 add a monthly fee of
 *            5% / 9% / 17% of the base instalment.
 *   Tamara — 2 and 3 payments with no fees; 4 and 6 split evenly ("fees may
 *            apply"); 9 and 12 carry ~17% on the total.
 * These are indicative only: the provider confirms the exact amount at checkout.
 */
const TABBY_FEE_RATE: Record<number, number> = { 4: 0, 6: 0.05, 8: 0.09, 12: 0.17 };
const TAMARA_TOTAL_RATE: Record<number, number> = { 2: 0, 3: 0, 4: 0, 6: 0, 9: 0.17, 12: 0.17 };

const round2 = (n: number) => Math.round(n * 100) / 100;

export function tabbyPlans(price: number): Plan[] {
  return [4, 6, 8, 12].map((payments) => {
    const base = price / payments;
    const monthlyFee = round2(base * TABBY_FEE_RATE[payments]);
    const perPayment = round2(base + monthlyFee);
    return {
      id: `tabby-${payments}`,
      payments,
      perPayment,
      monthlyFee,
      total: round2(perPayment * payments),
      note: monthlyFee ? `Includes AED ${fmt(monthlyFee)} monthly fee` : "No interest. No fees.",
    };
  });
}

export function tamaraPlans(price: number): Plan[] {
  return [2, 3, 4, 6, 9, 12].map((payments) => {
    const total = round2(price * (1 + TAMARA_TOTAL_RATE[payments]));
    return {
      id: `tamara-${payments}`,
      payments,
      perPayment: round2(total / payments),
      monthlyFee: 0,
      total,
      note: payments <= 3 ? "No fees" : "Fees may apply",
    };
  });
}

export function fmt(n: number): string {
  return n.toLocaleString("en-AE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export const METHOD_LABELS: Record<MethodId, string> = {
  card: "Credit / Debit Card",
  "apple-pay": "Apple Pay",
  "google-pay": "Google Pay",
  tabby: "Tabby",
  tamara: "Tamara",
};

/** Dedicated enrolment number — separate from the site-wide WhatsApp switch. */
export const ENROLL_WHATSAPP = "971564464420";

export type AppliedCoupon = { code: string; finalPrice: number; percent: number };

export function buildEnrollMessage(opts: {
  courseName: string;
  /** List price. With a coupon, the discounted price is derived from `coupon`. */
  price: number;
  method: MethodId;
  plan?: Plan;
  coupon?: AppliedCoupon | null;
}): string {
  const { courseName, price, method, plan, coupon } = opts;
  // Plain "•" lines + a trailing blank line survive WhatsApp Web / app clients
  // and stay readable even if a client collapses the line breaks.
  const lines = [
    `Hello CLT Academy, I would like to enroll in the *${courseName}* course.`,
    "",
    `• Course fee: AED ${price.toLocaleString("en-AE")}`,
  ];
  if (coupon) {
    lines.push(
      `• Coupon: ${coupon.code} (${coupon.percent}% off)`,
      `• Discounted fee: AED ${coupon.finalPrice.toLocaleString("en-AE")}`,
    );
  }
  lines.push(`• Payment method: ${METHOD_LABELS[method]}`);
  if (plan) {
    lines.push(
      `• Payment plan: ${plan.payments} payments of AED ${fmt(plan.perPayment)}/month (estimated total AED ${fmt(plan.total)})`,
    );
  }
  lines.push("", "Please share the next steps. Thank you!");
  return lines.join("\n");
}

export function enrollWhatsappUrl(message: string): string {
  return `https://api.whatsapp.com/send?phone=${ENROLL_WHATSAPP}&text=${encodeURIComponent(message)}`;
}
