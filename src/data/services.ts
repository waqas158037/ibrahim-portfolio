export type ServiceIcon = "funnel" | "search" | "split" | "target" | "pulse" | "layout";

export type Service = {
  id: string;
  index: string;
  title: string;
  description: string;
  tags: string[];
  icon: ServiceIcon;
};

/** Only services backed by resume experience. */
export const services: Service[] = [
  {
    id: "meta-ads",
    index: "01",
    title: "Meta Ads Strategy & Scaling",
    description:
      "Full-funnel Facebook and Instagram campaigns structured to scale winners without giving back profitability.",
    tags: ["Prospecting", "Retargeting", "Scaling"],
    icon: "funnel",
  },
  {
    id: "google-ads",
    index: "02",
    title: "Google Ads",
    description:
      "Data-driven Google campaigns that capture demand and feed the same performance goals as your social spend.",
    tags: ["Search", "Budgeting", "Optimization"],
    icon: "search",
  },
  {
    id: "creative-testing",
    index: "03",
    title: "Creative & A/B Testing",
    description:
      "Structured tests on creatives, targeting and landing pages to find the combinations worth scaling.",
    tags: ["A/B tests", "Hooks", "CTR"],
    icon: "split",
  },
  {
    id: "audiences",
    index: "04",
    title: "Audience Segmentation",
    description:
      "Core, Custom and Lookalike audiences plus retargeting built around how your customers actually buy.",
    tags: ["Lookalike", "Custom", "Retargeting"],
    icon: "target",
  },
  {
    id: "tracking",
    index: "05",
    title: "Pixel & Conversion Tracking",
    description:
      "Meta Pixel setup and conversion tracking, so every decision is made on clean, trustworthy data.",
    tags: ["Meta Pixel", "Events", "Attribution"],
    icon: "pulse",
  },
  {
    id: "cro",
    index: "06",
    title: "Landing Pages & Lead Gen",
    description:
      "Landing page optimization with creative and product teams, and lead tracking that makes sure every lead is followed up.",
    tags: ["CRO", "Lead Generation", "Follow-up"],
    icon: "layout",
  },
];
