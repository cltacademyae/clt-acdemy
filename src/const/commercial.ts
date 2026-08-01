import { COURSE_SLUGS } from "@/lib/catalog.slugs";

/**
 * Content for the commercial landing pages (DEV-035).
 *
 * Copy is assembled from facts already published elsewhere on the site —
 * course names, durations, KHDA approval, the Hor Al Anz address. It contains
 * no prices, no performance claims and no superlatives, because none of those
 * are substantiated (see DEV-006, DEV-020).
 *
 * This is a dev deliverable pending a marketing rewrite. Routes stay out of the
 * sitemap until the copy is signed off — see `indexable` below.
 *
 * Four routes from the handover are deliberately absent:
 *
 * - /trading-course-fees-dubai      no prices are confirmed (DEV-020). A fees
 *                                   page without fees is a bounce.
 * - /clt-academy-reviews            no verifiable review source (DEV-016).
 * - /trading-academy-abu-dhabi      no premises in either emirate. Location
 * - /trading-academy-sharjah        pages for cities where the business does
 *                                   not operate are doorway pages, which
 *                                   Google penalises. Viable only if written
 *                                   as "serving students from X", which is a
 *                                   marketing call, not a dev one.
 */
export type CommercialPage = {
  slug: string;
  /** Matches the query the page targets. */
  h1: string;
  metaTitle: string;
  metaDescription: string;
  /** 40–60 words, above the fold. The block AI assistants extract. */
  quickAnswer: string;
  sections: { h2: string; body: string }[];
  comparison?: {
    caption: string;
    head: string[];
    rows: string[][];
  };
  faq: { question: string; answer: string }[];
  /** Flip to true per page once marketing has signed off the copy. */
  indexable: boolean;
};

const COURSE_TABLE = {
  caption: "CLT Academy course structure",
  head: ["Course", "Level", "Duration", "Format"],
  rows: [
    ["Trade Craft", "Beginner", "4 weeks", "In-person or online"],
    ["Profit Matrix", "Intermediate", "8 weeks", "In-person or online"],
    ["Market Code", "Advanced", "14 weeks", "In-person or online"],
    ["CLT Vantage", "Expert mentorship", "28 weeks", "In-person or online"],
  ],
};

const RISK_FAQ = {
  question: "Does CLT Academy provide trading signals or manage money?",
  answer:
    "No. CLT Academy is an education provider. We teach structure, risk management and execution so you can make your own decisions. We do not provide investment advice, manage client funds or sell signals.",
};

export const COMMERCIAL_PAGES: CommercialPage[] = [
  {
    slug: "best-forex-trading-academy-in-dubai",
    h1: "Choosing a Forex Trading Academy in Dubai",
    metaTitle: "Forex Trading Academy in Dubai — How to Choose | CLT Academy",
    metaDescription:
      "What to check before enrolling at a forex trading academy in Dubai: KHDA approval, course structure, mentor access and class format. CLT Academy is KHDA-approved.",
    quickAnswer:
      "A forex trading academy in Dubai should be KHDA-approved, teach a structured syllabus rather than signals, and give you direct mentor access. CLT Academy is KHDA-approved and runs four structured programmes from beginner to mentorship level, in-person in Hor Al Anz East or online.",
    sections: [
      {
        h2: "What does KHDA approval actually mean?",
        body: "The Knowledge and Human Development Authority regulates private education providers in Dubai. An approved institute has had its training operation reviewed and permitted by the regulator. It is a verifiable status, not a marketing phrase — ask any academy for their permit number, and be cautious if one is not published.",
      },
      {
        h2: "What should a structured syllabus cover?",
        body: "A complete programme moves through market structure and price action, risk and position sizing, trading psychology, and finally live execution. Beware of any course that leads with returns rather than curriculum — the skill is repeatable, the outcome is not.",
      },
      {
        h2: "How much mentor access do you get?",
        body: "Recorded content alone rarely changes how someone trades. Ask how many live sessions run each week, whether trades are reviewed individually, and whether mentor access continues after the course ends.",
      },
      {
        h2: "In-person or online?",
        body: "Both work, but they suit different people. In-person suits traders who want direct desk time and accountability. Online suits those outside Dubai or working around a job. CLT runs every programme in both formats from its Hor Al Anz East premises.",
      },
    ],
    comparison: COURSE_TABLE,
    faq: [
      {
        question: "Is CLT Academy KHDA approved?",
        answer:
          "Yes. CLT Academy is a KHDA-approved training institute operating from M09, Al Shaibani Building, Hor Al Anz East, Dubai.",
      },
      {
        question: "Do I need any experience to start?",
        answer:
          "No. Trade Craft is a four-week beginner programme that assumes no prior trading experience and starts from platform basics and market structure.",
      },
      RISK_FAQ,
    ],
    indexable: false,
  },
  {
    slug: "forex-trading-course-dubai",
    h1: "Forex Trading Courses in Dubai",
    metaTitle: "Forex Trading Course in Dubai — Beginner to Advanced | CLT Academy",
    metaDescription:
      "Structured forex trading courses in Dubai, from a four-week beginner programme to a 28-week mentorship. KHDA-approved, in-person or online, with live mentor sessions.",
    quickAnswer:
      "CLT Academy runs four forex trading courses in Dubai: Trade Craft (4 weeks, beginner), Profit Matrix (8 weeks, intermediate), Market Code (14 weeks, advanced) and CLT Vantage (28 weeks, mentorship). All are KHDA-approved and available in-person in Hor Al Anz East or online.",
    sections: [
      {
        h2: "Which course should you start with?",
        body: "If you have never placed a trade, start with Trade Craft. If you know the mechanics but your results are inconsistent, Profit Matrix addresses trade planning and execution. Market Code is for traders who already work to a system and want structural depth. CLT Vantage is a long-form mentorship rather than a course.",
      },
      {
        h2: "What does the beginner course cover?",
        body: "Trade Craft runs four weeks and covers platform basics, price patterns, support and resistance, risk control and trading mindset. It is designed so that someone with no background can finish able to read a chart and manage a position.",
      },
      {
        h2: "How are the courses delivered?",
        body: "Every programme runs in-person at the Hor Al Anz East premises or online, with live sessions rather than recordings alone. Class sizes are kept small enough that mentors review individual trades.",
      },
    ],
    comparison: COURSE_TABLE,
    faq: [
      {
        question: "How long is the beginner forex course?",
        answer:
          "Trade Craft runs for four weeks. It is the entry programme and assumes no prior trading experience.",
      },
      {
        question: "Can I take the course online from outside the UAE?",
        answer:
          "Yes. Every programme is delivered both in-person in Dubai and online, with the same live mentor sessions.",
      },
      RISK_FAQ,
    ],
    indexable: false,
  },
  {
    slug: "khda-approved-trading-institute-dubai",
    h1: "KHDA-Approved Trading Institute in Dubai",
    metaTitle: "KHDA-Approved Trading Institute in Dubai | CLT Academy",
    metaDescription:
      "CLT Academy is a KHDA-approved trading institute in Dubai offering structured forex, stock and crypto education with live mentorship, in-person or online.",
    quickAnswer:
      "CLT Academy is a KHDA-approved trading institute in Dubai, operating from Hor Al Anz East. KHDA approval means the Knowledge and Human Development Authority has reviewed and permitted the training operation — a verifiable regulatory status rather than a self-awarded claim.",
    sections: [
      {
        h2: "Why does KHDA approval matter for a trading course?",
        body: "Trading education is largely unregulated, so anyone can publish a course. KHDA approval puts the provider inside Dubai's education regulatory framework, which sets a baseline for how the institute operates and what it may advertise.",
      },
      {
        h2: "How do you verify an institute's approval?",
        body: "Ask for the permit number and the trade licence number, and check that the address on the licence matches where teaching actually happens. A provider unwilling to share either is worth avoiding.",
      },
      {
        h2: "What CLT Academy teaches",
        body: "Structured forex, stock and crypto programmes running from four weeks to twenty-eight, taught in-person in Dubai or online. Every programme is education — curriculum, mentorship and trade review — not signals or managed accounts.",
      },
    ],
    comparison: COURSE_TABLE,
    faq: [
      {
        question: "Where is CLT Academy located?",
        answer:
          "M09, Al Shaibani Building, Hor Al Anz East, Dubai, United Arab Emirates.",
      },
      {
        question: "Is trading education regulated in the UAE?",
        answer:
          "Training providers in Dubai are regulated by the KHDA. Financial services themselves are regulated separately by the Securities and Commodities Authority. CLT Academy is an education provider and does not offer financial services.",
      },
      RISK_FAQ,
    ],
    indexable: false,
  },
  {
    slug: "forex-trading-course-for-beginners-dubai",
    h1: "Forex Trading Course for Beginners in Dubai",
    metaTitle: "Forex Trading Course for Beginners in Dubai | CLT Academy",
    metaDescription:
      "A four-week beginner forex course in Dubai covering platform basics, price action, risk control and trading mindset. No prior experience needed. KHDA-approved.",
    quickAnswer:
      "Trade Craft is CLT Academy's beginner forex course in Dubai. It runs four weeks, assumes no prior trading experience, and covers platform basics, price patterns, support and resistance, risk control and trading mindset. Available in-person in Hor Al Anz East or online.",
    sections: [
      {
        h2: "Do you need any experience to start?",
        body: "No. Trade Craft starts from how a trading platform works and what a candle represents. If you have never opened a chart, this is the correct entry point.",
      },
      {
        h2: "What will you be able to do afterwards?",
        body: "Read a chart, identify market structure, size a position against a defined risk, and place and manage a trade to a plan. It is a foundation, not a finished skill — most traders continue into Profit Matrix.",
      },
      {
        h2: "How much time does it take each week?",
        body: "Four weeks of structured sessions, with live mentor time rather than recordings alone. Sessions run in-person in Dubai or online for students elsewhere.",
      },
      {
        h2: "What it deliberately does not teach",
        body: "No signals, no copy-trading, no promised returns. The course teaches you to make your own decisions, which is the only version of this skill that lasts.",
      },
    ],
    comparison: COURSE_TABLE,
    faq: [
      {
        question: "How long is the beginner course?",
        answer: "Trade Craft runs for four weeks.",
      },
      {
        question: "Do I need my own trading capital to take the course?",
        answer:
          "No. The course teaches on charts and demo execution. Whether and when to trade live capital is your decision, made after you understand risk.",
      },
      RISK_FAQ,
    ],
    indexable: false,
  },
  {
    slug: "crypto-trading-course-dubai",
    h1: "Crypto Trading Course in Dubai",
    metaTitle: "Crypto Trading Course in Dubai | CLT Academy",
    metaDescription:
      "Learn crypto trading in Dubai with a KHDA-approved academy. Structured market education covering volatility, risk and execution — in-person or online.",
    quickAnswer:
      "CLT Academy teaches crypto within its structured trading programmes rather than as a standalone speculation course. The same market structure, risk management and execution framework applies to crypto as to forex, with volatility and market hours as the main differences.",
    sections: [
      {
        h2: "How is crypto different from forex?",
        body: "Crypto trades continuously rather than in sessions, and moves further and faster than most currency pairs. That changes position sizing and stop placement, not the underlying method.",
      },
      {
        h2: "Where does crypto sit in the programmes?",
        body: "Market structure, liquidity and risk are taught as transferable skills across forex, stocks and crypto. Trade Craft builds the foundation; the later programmes apply it across instruments.",
      },
      {
        h2: "A note on risk",
        body: "Crypto volatility is frequently mistaken for opportunity. The larger the range, the smaller the position that survives it — which is exactly what the risk module exists to teach.",
      },
    ],
    comparison: COURSE_TABLE,
    faq: [
      {
        question: "Is there a crypto-only course?",
        answer:
          "Crypto is taught inside the structured programmes rather than as a separate course, because the method transfers across instruments.",
      },
      RISK_FAQ,
    ],
    indexable: false,
  },
  {
    slug: "stock-market-course-dubai",
    h1: "Stock Market Course in Dubai",
    metaTitle: "Stock Market Course in Dubai | CLT Academy",
    metaDescription:
      "Structured stock market education in Dubai from a KHDA-approved academy — market structure, risk and execution, taught in-person or online.",
    quickAnswer:
      "CLT Academy teaches stock market trading within its structured programmes. Equities behave differently from leveraged instruments — slower moves, different risk profile — but the market structure and risk framework taught in the courses applies directly.",
    sections: [
      {
        h2: "How do equities differ from forex?",
        body: "Stocks trade in defined sessions, respond to company-specific news, and are usually held longer. Leverage is lower, which changes the risk calculation but not the need for one.",
      },
      {
        h2: "What the programme covers",
        body: "Market structure, support and resistance, volume behaviour, position sizing and execution — taught so the same framework works whether you are looking at an index, a stock or a currency pair.",
      },
    ],
    comparison: COURSE_TABLE,
    faq: [
      {
        question: "Do you cover UAE and international markets?",
        answer:
          "The method taught is market-agnostic. Mentors work through examples across the instruments students actually trade.",
      },
      RISK_FAQ,
    ],
    indexable: false,
  },
  {
    slug: "indian-stock-market-course-dubai",
    h1: "Indian Stock Market Course in Dubai",
    metaTitle: "Indian Stock Market Course in Dubai | CLT Academy",
    metaDescription:
      "Indian markets education for traders based in Dubai and the UAE. Structured, KHDA-approved trading programmes delivered in-person or online.",
    quickAnswer:
      "CLT Academy runs an Indian markets programme for traders based in the UAE. It applies the same market structure and risk framework as the forex programmes to Indian equities and indices, delivered in-person in Dubai or online.",
    sections: [
      {
        h2: "Who is this for?",
        body: "Traders in the UAE with an interest in Indian equities and indices — commonly members of the Indian diaspora trading their home market from Dubai.",
      },
      {
        h2: "What is different about Indian markets?",
        body: "Different session hours, different regulatory environment and different liquidity behaviour. The analytical method carries across; the execution details do not.",
      },
      {
        h2: "How it is delivered",
        body: "In-person at the Hor Al Anz East premises or online, with live mentor sessions rather than recordings alone.",
      },
    ],
    comparison: COURSE_TABLE,
    faq: [
      {
        question: "Can I attend from outside the UAE?",
        answer: "Yes. Every programme runs online as well as in-person.",
      },
      RISK_FAQ,
    ],
    indexable: false,
  },
  {
    slug: "online-trading-course-uae",
    h1: "Online Trading Courses in the UAE",
    metaTitle: "Online Trading Course in the UAE | CLT Academy",
    metaDescription:
      "Every CLT Academy programme runs online as well as in-person in Dubai — live mentor sessions, structured syllabus, KHDA-approved.",
    quickAnswer:
      "All four CLT Academy programmes run online as well as in-person: Trade Craft (4 weeks), Profit Matrix (8 weeks), Market Code (14 weeks) and CLT Vantage (28 weeks). Online students attend the same live mentor sessions as in-person students rather than watching recordings.",
    sections: [
      {
        h2: "Is the online course the same as in-person?",
        body: "Same syllabus, same mentors, same live sessions. The difference is the room, not the content.",
      },
      {
        h2: "Who does online suit?",
        body: "Traders outside Dubai, and anyone fitting study around a job. Students who want direct desk time and accountability usually prefer in-person.",
      },
      {
        h2: "What you need",
        body: "A reliable connection and a machine that can run a charting platform. No paid tools are required to complete the syllabus.",
      },
    ],
    comparison: COURSE_TABLE,
    faq: [
      {
        question: "Are sessions live or recorded?",
        answer:
          "Live. Recordings support the live sessions rather than replacing them, because trade review has to be interactive to be useful.",
      },
      RISK_FAQ,
    ],
    indexable: false,
  },
];

export const commercialBySlug = (slug: string) =>
  COMMERCIAL_PAGES.find((p) => p.slug === slug);

export const commercialSlugs = COMMERCIAL_PAGES.map((p) => p.slug);

/** Course name as it appears in the comparison table -> its detail page. */
export const COURSE_HREF: Record<string, string> = {
  "Trade Craft": `/courses/${COURSE_SLUGS["1"]}`,
  "Profit Matrix": `/courses/${COURSE_SLUGS["2"]}`,
  "Market Code": `/courses/${COURSE_SLUGS["3"]}`,
  "CLT Vantage": `/courses/${COURSE_SLUGS["4"]}`,
};
