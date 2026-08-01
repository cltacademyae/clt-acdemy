import { SITE } from "@/const/seo";

/**
 * Must stay real text in the initial HTML and outside any accordion — YMYL
 * disclosure has to be present on every indexable route, not just /disclaimer.
 *
 * TODO(DEV-007): standard-form wording, pending legal sign-off.
 */
const RiskDisclosure = () => (
  <section
    aria-label="Risk disclosure"
    className="risk-disclosure w-full bg-black text-gray-400 text-xs leading-relaxed px-6 md:px-32 py-6"
  >
    <p>
      <strong className="text-gray-200">Risk disclosure:</strong> Trading forex,
      stocks, crypto and other leveraged instruments carries a high level of
      risk and can result in the loss of some or all of your capital. Past
      performance is not an indication of future results, and no outcome
      described on this site should be taken as a promise or projection of
      profit. {SITE.name} provides education and training only — it does not
      provide investment advice, portfolio management or brokerage services, and
      does not accept client funds for trading. Consider your objectives and
      experience carefully, and seek independent licensed advice before trading.
    </p>
  </section>
);

export default RiskDisclosure;
