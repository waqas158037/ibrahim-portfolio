export type Milestone = {
  year: string;
  period: string;
  title: string;
  org: string;
  kind: "work" | "education" | "certification";
  description: string;
};

/** Chronological, straight from the resume. */
export const experience: Milestone[] = [
  {
    year: "2020",
    period: "Aug 2020 – Sept 2024",
    title: "Bachelor of Business Administration",
    org: "Superior University",
    kind: "education",
    description:
      "Marketing management, digital marketing, business statistics, brand and strategic management.",
  },
  {
    year: "2023",
    period: "June 2023 – June 2026",
    title: "Digital Marketer",
    org: "Potato Logics",
    kind: "work",
    description:
      "Ran Facebook and Google Ads strategy, managed a PKR 45M+ annual budget and raised ROAS from 3.5x to 4.2x.",
  },
  {
    year: "2025",
    period: "Sept 2025 – Present",
    title: "Freelance Performance Marketer",
    org: "Independent",
    kind: "work",
    description:
      "Scaling Meta campaigns for D2C brands including Sweet Rack and Vlinq.",
  },
  {
    year: "2026",
    period: "February 2026",
    title: "Advertising with Meta",
    org: "Meta certification",
    kind: "certification",
    description:
      "Campaign strategy, optimization, scaling, audience targeting and Meta Pixel conversion tracking.",
  },
];
