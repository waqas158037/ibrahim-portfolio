export type Skill = {
  label: string;
  /** 0 = inner orbit, 1 = outer orbit */
  ring: 0 | 1;
  group: "channels" | "growth" | "data" | "strategy";
};

export const skillCore = "Performance";

/** Taken from the resume's experience, certification and skills sections. */
export const skills: Skill[] = [
  { label: "Meta Ads", ring: 0, group: "channels" },
  { label: "Google Ads", ring: 0, group: "channels" },
  { label: "Campaign Scaling", ring: 0, group: "growth" },
  { label: "A/B Testing", ring: 0, group: "growth" },
  { label: "Conversion Rate Optimization", ring: 0, group: "growth" },
  { label: "Strategy & Planning", ring: 0, group: "strategy" },
  { label: "Lookalike Audiences", ring: 1, group: "channels" },
  { label: "Retargeting", ring: 1, group: "channels" },
  { label: "Meta Pixel", ring: 1, group: "data" },
  { label: "Conversion Tracking", ring: 1, group: "data" },
  { label: "Lead Generation", ring: 1, group: "growth" },
  { label: "Budget Allocation", ring: 1, group: "strategy" },
  { label: "Competitor Research", ring: 1, group: "strategy" },
  { label: "Social Media Management", ring: 1, group: "channels" },
];

export const metricLiteracy = ["CTR", "CPC", "CPA", "ROAS"];

export const tools = ["Meta Ads Manager", "Google Ads", "Meta Pixel", "MS Office"];
