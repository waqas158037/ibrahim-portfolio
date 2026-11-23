/** Section copy that isn't tied to one data type. */

export type ProcessStep = {
  id: string;
  title: string;
  kicker: string;
  description: string;
  points: string[];
};

export const processSteps: ProcessStep[] = [
  {
    id: "discover",
    title: "Discover",
    kicker: "Research",
    description: "Market, competitor and customer research to find where the real opportunity is.",
    points: ["Competitor research", "Offer & audience review", "Account audit"],
  },
  {
    id: "strategy",
    title: "Strategy",
    kicker: "Plan",
    description: "A full-funnel plan: campaign structure, audiences, budgets and the metrics that matter.",
    points: ["Campaign structure", "Audience map", "KPI targets"],
  },
  {
    id: "execute",
    title: "Execute",
    kicker: "Launch",
    description: "Pixel and tracking in place, creatives live, every lead and purchase measured.",
    points: ["Meta Pixel & events", "Creative launch", "Lead tracking"],
  },
  {
    id: "optimize",
    title: "Optimize",
    kicker: "Test",
    description: "A/B tests on creative, targeting and landing pages; underperformers cut fast.",
    points: ["A/B testing", "Budget reallocation", "CTR & CPC control"],
  },
  {
    id: "scale",
    title: "Scale",
    kicker: "Grow",
    description: "Structured scaling of proven winners while protecting ROAS and profitability.",
    points: ["Winner scaling", "Retargeting", "ROAS protection"],
  },
];

export const positioningPillars = [
  { label: "Data", note: "Decisions from CTR, CPC, CPA and ROAS" },
  { label: "Testing", note: "Creatives, audiences and pages" },
  { label: "Optimization", note: "Spend follows performance" },
  { label: "Conversion", note: "Pixel-tracked, lead-followed" },
  { label: "Scaling", note: "Grow without losing profit" },
];

/** Decorative dashboard tiles — conceptual, not results. */
export const dashboardTiles = [
  "Traffic",
  "Leads",
  "Conversion",
  "Revenue",
  "ROAS",
  "CTR",
  "CPC",
  "CPA",
] as const;

export type WhyPoint = { title: string; body: string; proof: string };

export const whyPoints: WhyPoint[] = [
  {
    title: "Budget discipline at scale",
    body: "I've managed a PKR 45M+ annual budget, so I know how to grow spend without losing control of it.",
    proof: "PKR 45M+ / year",
  },
  {
    title: "Profit over vanity metrics",
    body: "Spend moves to what earns. I cut weak campaigns early and shift budget to proven 6x+ ROAS winners.",
    proof: "Up to 8.63x ROAS",
  },
  {
    title: "Test-led creative",
    body: "Every creative, audience and landing page is a hypothesis. A/B tests decide what scales.",
    proof: "Structured A/B testing",
  },
  {
    title: "Tracking you can trust",
    body: "Meta Pixel, conversion events and lead follow-up so the numbers in your dashboard are real.",
    proof: "Meta certified, 2026",
  },
];

export const resultsFlow = ["Data", "Insight", "Test", "Optimize", "Grow"];

/** ROAS comparisons quoted from the resume. */
export const roasBars = [
  { label: "Potato Logics", sub: "ROAS before → after", from: 3.5, to: 4.2 },
  { label: "Sweet Rack", sub: "Average → top campaign", from: 4.45, to: 7.25 },
  { label: "Vlinq", sub: "Average → top campaign", from: 6.21, to: 8.63 },
];

export const headlineMetrics = [
  { value: 45, prefix: "PKR ", suffix: "M+", label: "Annual budget managed", decimals: 0 },
  { value: 8.63, prefix: "", suffix: "x", label: "Top campaign ROAS (Vlinq)", decimals: 2 },
  { value: 4252, prefix: "", suffix: "+", label: "Purchases driven for Sweet Rack", decimals: 0 },
  { value: 1, prefix: "Rs. ", suffix: "Cr+", label: "Revenue generated for Sweet Rack", decimals: 0 },
];

export const aboutStats = [
  { value: 3, prefix: "", suffix: "+", label: "Years in paid media", decimals: 0 },
  { value: 45, prefix: "PKR ", suffix: "M+", label: "Annual budget managed", decimals: 0 },
  { value: 4.2, prefix: "", suffix: "x", label: "ROAS, up from 3.5x", decimals: 1 },
  { value: 5600, prefix: "", suffix: "+", label: "Purchases across two brands", decimals: 0 },
];
