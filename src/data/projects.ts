export type ProjectStat = { label: string; value: string };

export type Project = {
  id: string;
  name: string;
  category: string;
  channel: string;
  summary: string;
  brief: string;
  approach: string[];
  outcome: string;
  stats: ProjectStat[];
  tools: string[];
  /** Hue tint used for the card's abstract visual. */
  accent: string;
};

/** Every number below is quoted directly from the resume. */
export const projects: Project[] = [
  {
    id: "sweet-rack",
    name: "Sweet Rack",
    category: "Premium desserts & baked goods",
    channel: "Meta Ads",
    summary: "Scaling a premium dessert brand to Rs. 1Cr+ in Meta-driven revenue.",
    brief:
      "Scale Meta campaigns for a multi-product dessert brand while keeping traffic cost-efficient and spend focused on what sells.",
    approach: [
      "Structured campaigns by product category (cookies, tiramisu and more) for clean tracking and scaling",
      "A/B tested creatives and targeting to find and scale winning combinations",
      "Reallocated budget from underperformers to high-ROAS campaigns",
    ],
    outcome:
      "Rs. 1Cr+ revenue and 4,252+ purchases at a 4.45x average ROAS, with a low average CPC of Rs. 34.",
    stats: [
      { label: "Revenue", value: "Rs. 1Cr+" },
      { label: "Avg. ROAS", value: "4.45x" },
      { label: "Top ROAS", value: "7.25x" },
      { label: "Purchases", value: "4,252+" },
      { label: "CTR", value: "1.2%+" },
      { label: "Avg. CPC", value: "Rs. 34" },
    ],
    tools: ["Meta Ads Manager", "Creative testing", "Category structure"],
    accent: "#39E58C",
  },
  {
    id: "vlinq",
    name: "Vlinq",
    category: "NFC digital business cards",
    channel: "Meta Ads",
    summary: "A 6.21x average ROAS for a smart-networking accessories brand.",
    brief:
      "Grow revenue across multiple Meta campaigns for an NFC business card brand without sacrificing spend efficiency.",
    approach: [
      "Ran creative tests and CTR-focused strategies across campaigns",
      "Shifted spend toward campaigns delivering 6x+ ROAS",
      "Followed a structured scaling plan and cut low performers",
    ],
    outcome: "Rs. 3.5M+ revenue and 1,400+ purchases at a 6.21x average ROAS.",
    stats: [
      { label: "Revenue", value: "Rs. 3.5M+" },
      { label: "Avg. ROAS", value: "6.21x" },
      { label: "Top ROAS", value: "8.63x" },
      { label: "Purchases", value: "1,400+" },
    ],
    tools: ["Meta Ads Manager", "Budget allocation", "Structured scaling"],
    accent: "#7CF5B8",
  },
  {
    id: "potato-logics",
    name: "Potato Logics",
    category: "In-house digital marketing",
    channel: "Meta & Google Ads",
    summary: "Managing a PKR 45M+ annual budget and lifting ROAS from 3.5x to 4.2x.",
    brief:
      "Own data-driven paid strategy across Facebook and Google Ads for a company-wide marketing budget.",
    approach: [
      "Market and competitor research to spot trends and opportunities",
      "Improved Meta audience segmentation and retargeting",
      "Worked with creative and product teams on ad creatives and landing pages",
      "Tracked every campaign lead to make sure it was followed up on time",
    ],
    outcome: "Scaled a PKR 45M+ annual budget while raising ROAS from 3.5x to 4.2x.",
    stats: [
      { label: "Annual budget", value: "PKR 45M+" },
      { label: "ROAS before", value: "3.5x" },
      { label: "ROAS after", value: "4.2x" },
    ],
    tools: ["Meta Ads", "Google Ads", "A/B testing", "Lead tracking"],
    accent: "#2BD47A",
  },
];
