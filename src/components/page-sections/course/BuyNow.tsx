"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowRight, FaCheck } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa6";
import { Loader2, TicketPercent, XIcon } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { CouponSavings } from "./CouponSavings";
import {
  ApplePayIcon,
  CARD_LOGOS,
  GOOGLE_PAY_LOGO,
  TAMARA_LOGO,
  TabbyLogo,
} from "./paymentLogos";
import {
  buildEnrollMessage,
  enrollWhatsappUrl,
  fmt,
  METHOD_LABELS,
  type AppliedCoupon,
  tabbyPlans,
  tamaraPlans,
  type MethodId,
  type Plan,
} from "./paymentPlans";

const METHODS: { id: MethodId; hint: string }[] = [
  { id: "card", hint: "Visa, Mastercard, American Express" },
  { id: "apple-pay", hint: "Pay with Face ID or Touch ID" },
  { id: "google-pay", hint: "Fast checkout with Google" },
  { id: "tabby", hint: "Split in up to 12 payments" },
  { id: "tamara", hint: "Split in up to 12 payments" },
];

function MethodLogo({ id }: { id: MethodId }) {
  switch (id) {
    case "card":
      return (
        <div className="flex items-center gap-1">
          {CARD_LOGOS.map((l) => (
            <Image
              key={l.name}
              src={l.src}
              alt={l.name}
              width={38}
              height={24}
              className="h-5 w-[32px] rounded-[3px]"
            />
          ))}
        </div>
      );
    case "apple-pay":
      return <ApplePayIcon role="img" aria-label="Apple Pay" className="h-6 w-[38px] text-black" />;
    case "google-pay":
      return (
        <div className="flex h-6 w-[38px] items-center justify-center rounded-[3px] border border-black bg-white">
          <Image src={GOOGLE_PAY_LOGO} alt="Google Pay" width={28} height={11} className="h-[11px] w-auto" />
        </div>
      );
    case "tabby":
      return <TabbyLogo className="h-6 w-[68px]" />;
    case "tamara":
      return (
        <Image src={TAMARA_LOGO} alt="Tamara" width={68} height={24} className="h-6 w-[68px] rounded-[5px]" />
      );
  }
}

type CouponStatus = "idle" | "loading" | "applied" | "error";

async function checkCoupon(code: string, courseId: string, track: boolean) {
  const res = await fetch("/api/coupon/validate", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ code, courseId: Number(courseId), track }),
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, data };
}

export default function BuyNow({
  courseName,
  courseId,
  price: listPrice,
  fullWidth = false,
}: {
  courseName: string;
  courseId: string;
  price: number;
  fullWidth?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [method, setMethod] = useState<MethodId | null>(null);
  const [planId, setPlanId] = useState<string | null>(null);

  // Coupon: `coupon` only holds a code the server has accepted. Every price
  // below is derived from it, so removing the coupon restores the list price.
  const [hasCoupon, setHasCoupon] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [couponStatus, setCouponStatus] = useState<CouponStatus>("idle");
  const [couponError, setCouponError] = useState("");
  const [coupon, setCoupon] = useState<AppliedCoupon | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const [popKey, setPopKey] = useState(0);
  const checking = useRef(false);

  const price = coupon ? coupon.finalPrice : listPrice;

  const plans = useMemo<Record<"tabby" | "tamara", Plan[]>>(
    () => ({ tabby: tabbyPlans(price), tamara: tamaraPlans(price) }),
    [price],
  );

  const fail = (message: string) => {
    setCoupon(null);
    setCouponStatus("error");
    setCouponError(message);
    setShakeKey((k) => k + 1);
  };

  const applyCoupon = async () => {
    const code = codeInput.trim().toUpperCase();
    if (!code || checking.current) return;
    checking.current = true;
    setCouponStatus("loading");
    setCouponError("");
    try {
      const { status, data } = await checkCoupon(code, courseId, true);
      if (data?.valid) {
        setCoupon({ code: data.code, finalPrice: data.finalPrice, percent: data.percent });
        setCouponStatus("applied");
        setPopKey((k) => k + 1);
        trackEvent("coupon_applied", { course_name: courseName, coupon_code: data.code });
      } else if (status === 429) {
        fail("Too many attempts. Please try again in a few minutes.");
      } else if (data?.error === "unavailable") {
        fail("Coupons are unavailable right now. Please try again shortly.");
      } else {
        fail("Coupon not found");
      }
    } catch {
      fail("Could not check the coupon. Check your connection.");
    } finally {
      checking.current = false;
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    setCouponStatus("idle");
    setCouponError("");
    setCodeInput("");
  };

  const isBnpl = method === "tabby" || method === "tamara";
  const activePlan = isBnpl ? plans[method].find((p) => p.id === planId) : undefined;
  const ready = method !== null && (!isBnpl || !!activePlan);

  const pickMethod = (id: MethodId) => {
    setMethod(id);
    // 4 payments is the standard Tabby / Tamara default; other methods have no plan.
    setPlanId(id === "tabby" || id === "tamara" ? plans[id].find((p) => p.payments === 4)!.id : null);
  };

  const confirm = async () => {
    if (!ready || !method || confirming) return;
    setConfirming(true);

    const message = buildEnrollMessage({ courseName, price: listPrice, method, plan: activePlan, coupon });
    const url = enrollWhatsappUrl(message);
    trackEvent("whatsapp_click", {
      link_position: "course_buy_now",
      course_name: courseName,
      payment_method: method,
      plan_payments: activePlan?.payments,
      coupon_code: coupon?.code,
    });

    if (!coupon) {
      window.open(url, "_blank", "noopener");
      setConfirming(false);
      setOpen(false);
      return;
    }

    // Re-check the coupon at the moment of purchase: it may have been paused or
    // deleted since it was applied, and the message must not promise that price.
    // The tab is opened first, inside the click, because browsers block a
    // window.open that happens after an await.
    const tab = window.open("about:blank", "_blank");
    try {
      const { data } = await checkCoupon(coupon.code, courseId, false);
      if (!data?.valid || data.finalPrice !== coupon.finalPrice) {
        tab?.close();
        fail("This coupon is no longer valid");
        return;
      }
    } catch {
      tab?.close();
      fail("Could not confirm the coupon. Please try again.");
      return;
    } finally {
      setConfirming(false);
    }

    fetch("/api/coupon/wa-click", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ code: coupon.code, courseId: Number(courseId) }),
      keepalive: true,
    }).catch(() => {});

    if (tab) {
      tab.opener = null;
      tab.location.href = url;
    } else {
      window.open(url, "_blank", "noopener");
    }
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button
          size="lg"
          className={`group bg-primary text-white hover:bg-primary/90 font-bold md:text-base text-base rounded-lg shadow duration-150 active:scale-[0.97] ${
            fullWidth ? "w-full h-12" : "px-8 h-12"
          }`}
        >
          Buy Now
          <FaArrowRight className="group-hover:translate-x-1 duration-300" />
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[101] font-[family-name:var(--font-outfit)] flex max-h-[92dvh] w-[calc(100%-1.5rem)] max-w-[480px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-3xl bg-white shadow-2xl outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95">
          {/* Header */}
          <div className="relative border-b border-black/[0.06] px-6 pb-5 pt-6">
            <Dialog.Close
              aria-label="Close"
              className="absolute right-4 top-4 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/[0.05] text-black/60 transition-colors hover:bg-black/10"
            >
              <XIcon className="size-4" />
            </Dialog.Close>
            <p className="text-xs font-medium uppercase tracking-wider text-primary">
              Secure your seat
            </p>
            <Dialog.Title className="mt-1 pr-8 text-xl font-bold text-black/90 font-[family-name:var(--font-poppins)]">
              {courseName}
            </Dialog.Title>
            <Dialog.Description className="mt-1 text-sm text-black/55">
              Course fee{" "}
              <span className="font-semibold text-black/85">
                AED {price.toLocaleString("en-AE")}
              </span>
              . Choose how you&apos;d like to pay.
            </Dialog.Description>
          </div>

          {/* Methods */}
          <div className="flex-1 space-y-2.5 overflow-y-auto px-4 py-4 sm:px-5" role="radiogroup" aria-label="Payment method">
            <div className="pb-1">
              <label className="flex w-fit cursor-pointer items-center gap-2 text-sm font-medium text-black/70">
                <input
                  type="checkbox"
                  checked={hasCoupon}
                  onChange={(e) => {
                    setHasCoupon(e.target.checked);
                    if (!e.target.checked) removeCoupon();
                  }}
                  className="size-4 cursor-pointer accent-[var(--color-primary,#e11d2e)]"
                />
                <TicketPercent className="size-4 text-primary" />
                I have a coupon code
              </label>

              <AnimatePresence initial={false}>
                {hasCoupon && (
                  <motion.div
                    key="coupon"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2.5">
                      {coupon ? (
                        <CouponSavings
                          key={popKey}
                          listPrice={listPrice}
                          coupon={coupon}
                          seed={popKey}
                          onRemove={removeCoupon}
                        />
                      ) : (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            applyCoupon();
                          }}
                        >
                          <motion.div
                            key={shakeKey}
                            animate={shakeKey ? { x: [0, -9, 9, -7, 7, -4, 4, 0] } : undefined}
                            transition={{ duration: 0.45 }}
                            className="flex gap-2"
                          >
                            <input
                              value={codeInput}
                              onChange={(e) => {
                                setCodeInput(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 20));
                                if (couponStatus === "error") {
                                  setCouponStatus("idle");
                                  setCouponError("");
                                }
                              }}
                              placeholder="Enter coupon code"
                              aria-label="Coupon code"
                              aria-invalid={couponStatus === "error"}
                              autoComplete="off"
                              spellCheck={false}
                              className={`min-w-0 flex-1 rounded-xl border bg-white px-3.5 py-2.5 font-mono text-sm uppercase tracking-wider text-black/85 outline-none transition-colors placeholder:font-[family-name:var(--font-outfit)] placeholder:normal-case placeholder:tracking-normal ${
                                couponStatus === "error"
                                  ? "border-red-500 bg-red-50 ring-1 ring-red-500"
                                  : "border-black/15 focus:border-primary focus:ring-1 focus:ring-primary"
                              }`}
                            />
                            <button
                              type="submit"
                              disabled={!codeInput || couponStatus === "loading"}
                              className="flex min-w-[84px] cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-black px-4 text-sm font-bold text-white transition-all hover:bg-black/85 active:scale-[.97] disabled:cursor-not-allowed disabled:bg-black/15 disabled:text-black/35"
                            >
                              {couponStatus === "loading" ? <Loader2 className="size-4 animate-spin" /> : "Apply"}
                            </button>
                          </motion.div>
                          {couponStatus === "error" && (
                            <p role="alert" className="px-1 pt-1.5 text-xs font-medium text-red-600">
                              {couponError}
                            </p>
                          )}
                        </form>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {METHODS.map(({ id, hint }) => {
              const selected = method === id;
              const bnpl = id === "tabby" || id === "tamara";
              return (
                <div
                  key={id}
                  className={`rounded-2xl border transition-colors ${
                    selected ? "border-primary bg-primary/[0.03] ring-1 ring-primary" : "border-black/10 bg-white hover:border-black/25"
                  }`}
                >
                  <button
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => pickMethod(id)}
                    className="flex w-full cursor-pointer items-center gap-3 rounded-2xl px-4 py-3.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  >
                    <span
                      className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                        selected ? "border-primary bg-primary text-white" : "border-black/25"
                      }`}
                    >
                      {selected && <FaCheck className="size-2.5" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-black/85">{METHOD_LABELS[id]}</span>
                      <span className="block truncate text-xs text-black/50">
                        {bnpl ? `From AED ${fmt(plans[id].at(-1)!.perPayment)}/mo · ${hint}` : hint}
                      </span>
                    </span>
                    <MethodLogo id={id} />
                  </button>

                  <AnimatePresence initial={false}>
                    {selected && bnpl && (
                      <motion.div
                        key="plans"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-3 pb-3">
                          <p className="px-1 pb-2 pt-1 text-xs font-medium uppercase tracking-wider text-black/40">
                            Choose a payment plan
                          </p>
                          <div className="space-y-1.5" role="radiogroup" aria-label={`${METHOD_LABELS[id]} payment plan`}>
                            {plans[id].map((plan) => {
                              const on = planId === plan.id;
                              return (
                                <button
                                  key={plan.id}
                                  type="button"
                                  role="radio"
                                  aria-checked={on}
                                  onClick={() => setPlanId(plan.id)}
                                  className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/50 ${
                                    on ? "border-primary bg-white" : "border-black/[0.08] bg-white hover:border-black/25"
                                  }`}
                                >
                                  <span>
                                    <span className="block text-sm font-semibold text-black/85">
                                      {plan.payments} payments
                                    </span>
                                    <span
                                      className={`block text-xs ${
                                        plan.note.startsWith("No") ? "text-emerald-600" : "text-black/50"
                                      }`}
                                    >
                                      {plan.note}
                                    </span>
                                  </span>
                                  <span className="text-right">
                                    <span className="block text-sm font-bold text-black/90">
                                      AED {fmt(plan.perPayment)}
                                    </span>
                                    <span className="block text-xs text-black/45">per month</span>
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                          <p className="px-1 pt-2 text-[11px] leading-snug text-black/40">
                            Estimated amounts. Your final plan and any fees are confirmed by{" "}
                            {METHOD_LABELS[id]} at checkout.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="border-t border-black/[0.06] bg-white px-5 pb-5 pt-4">
            <div className="mb-3 flex items-baseline justify-between text-sm">
              <span className="text-black/55">
                {activePlan
                  ? `${activePlan.payments} × AED ${fmt(activePlan.perPayment)}`
                  : method
                    ? METHOD_LABELS[method]
                    : "No method selected"}
              </span>
              <span className="font-bold text-black/90">
                AED {fmt(activePlan ? activePlan.total : price)}
              </span>
            </div>
            <button
              type="button"
              disabled={!ready || confirming}
              onClick={confirm}
              className="flex w-full cursor-pointer items-center justify-center gap-2 font-[inherit] rounded-xl bg-primary px-6 py-3.5 text-base font-bold text-white shadow transition-all hover:bg-primary/90 active:scale-[.98] disabled:cursor-not-allowed disabled:bg-black/15 disabled:text-black/35 disabled:shadow-none disabled:active:scale-100"
            >
              {confirming ? <Loader2 className="size-5 animate-spin" /> : <FaWhatsapp className="size-5" />}
              Buy Now
            </button>
            <p className="mt-2.5 text-center text-xs text-black/45">
              You&apos;ll continue on WhatsApp with your details filled in.
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
