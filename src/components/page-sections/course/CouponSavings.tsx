"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import type { AppliedCoupon } from "./paymentPlans";

const fmtInt = (n: number) => n.toLocaleString("en-AE");
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/** Counts from `from` to `to` over `ms`. Remount (change `key`) to replay. */
function useCountUp(from: number, to: number, ms: number, delay: number, still: boolean) {
  const [value, setValue] = useState(still ? to : from);
  useEffect(() => {
    if (still) return;
    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, Math.max(0, (now - start - delay) / ms));
      setValue(from + (to - from) * easeOutCubic(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [from, to, ms, delay, still]);
  return value;
}

/**
 * The one place the old price is struck through. The new price counts down to
 * its value, the percentage seal stamps on, and the saving is spelled out —
 * in the site's own red, black and white.
 */
export function CouponSavings({
  listPrice,
  coupon,
  seed,
  onRemove,
}: {
  listPrice: number;
  coupon: AppliedCoupon;
  /** Changes on every successful apply so the sequence replays. */
  seed: number;
  onRemove: () => void;
}) {
  const reduce = !!useReducedMotion();
  const price = useCountUp(listPrice, coupon.finalPrice, 1000, 300, reduce);
  const percent = useCountUp(0, coupon.percent, 900, 250, reduce);
  const saved = listPrice - coupon.finalPrice;

  // Short buzz on phones; ignored where unsupported.
  useEffect(() => {
    if (!reduce) navigator.vibrate?.(14);
  }, [seed, reduce]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
      className="relative rounded-2xl border border-primary/25 bg-primary/[0.04] p-4"
    >
      <div className="flex items-center gap-3.5">
        <motion.span
          initial={{ scale: 0.4 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 420, damping: 15 }}
          className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-white"
        >
          {/* one soft ring that fades outward */}
          {!reduce && (
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full border-2 border-primary"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.7, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          )}
          <FaCheck className="size-4" />
        </motion.span>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] leading-tight font-medium text-black/60">
            Coupon <span className="font-bold tracking-wide text-primary">{coupon.code}</span> applied
          </p>
          <div className="mt-1 flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
            <span className="relative text-sm font-medium text-black/40 tabular-nums">
              AED {fmtInt(listPrice)}
              <motion.span
                aria-hidden
                className="absolute top-1/2 -right-1 -left-1 h-[2px] origin-left -rotate-[7deg] rounded bg-primary"
                initial={{ scaleX: reduce ? 1 : 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.25, duration: 0.3, ease: "easeOut" }}
              />
            </span>
            <span className="text-[1.7rem] leading-none font-bold text-black/90 tabular-nums">
              AED {fmtInt(Math.round(price))}
            </span>
          </div>
        </div>

        {/* Percentage seal: stamps on with a small overshoot. */}
        <motion.div
          initial={{ scale: 1.8, rotate: -14, opacity: 0 }}
          animate={{ scale: 1, rotate: -4, opacity: 1 }}
          transition={{ type: "spring", stiffness: 420, damping: 18, delay: 0.35 }}
          className="shrink-0 rounded-lg bg-primary px-3 py-2 text-center text-white"
        >
          <span className="block text-xl leading-none font-bold tabular-nums">
            {percent >= coupon.percent
              ? Number.isInteger(coupon.percent)
                ? coupon.percent
                : coupon.percent.toFixed(2)
              : percent.toFixed(1)}
            %
          </span>
          <span className="block text-[10px] font-semibold tracking-[0.2em]">OFF</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.3 }}
        className="mt-3 flex items-center justify-between gap-3 border-t border-primary/15 pt-2.5"
      >
        <span className="text-sm text-black/65">
          You save <span className="font-bold text-primary">AED {fmtInt(saved)}</span>
        </span>
        <button
          type="button"
          onClick={onRemove}
          className="cursor-pointer text-xs font-semibold text-black/45 underline-offset-2 transition-colors hover:text-primary hover:underline active:scale-95"
        >
          Remove
        </button>
      </motion.div>
    </motion.div>
  );
}
