/**
 * Central profile + site configuration.
 * Every factual claim on the site comes from the resume. Edit here to update the site.
 */

export type SocialLink = {
  label: string;
  href: string;
  icon: "linkedin" | "mail" | "phone" | "whatsapp";
};

export const profile = {
  name: "Muhammad Ibrahim",
  firstName: "Ibrahim",
  monogram: "MI",
  /** Wordmark shown in nav + loader. */
  brand: "Muhammad Ibrahim",
  role: "Performance Marketer",
  specialty: "Meta & Google Ads",
  location: "Pakistan",
  availability: "Open to freelance projects",

  hero: {
    eyebrow: "Performance Marketing · Meta & Google Ads",
    headline: ["Ad spend,", "engineered", "into growth."],
    accentWordIndex: 1,
    description:
      "I plan, test and scale paid campaigns that turn budget into revenue — from audience strategy and creative testing to tracking and ROAS-led scaling.",
    primaryCta: "Let's Work Together",
    secondaryCta: "Explore My Work",
  },

  about: {
    statement: "I treat every rupee of ad spend like an investment that has to earn its place.",
    paragraphs: [
      "I'm a performance marketer with a business degree and three years of hands-on campaign work. At Potato Logics I designed data-driven strategies across Facebook and Google Ads, managed a PKR 45M+ annual budget and lifted return on ad spend from 3.5x to 4.2x.",
      "Today I work freelance with D2C brands, scaling Meta campaigns through structured testing, sharper audiences and disciplined budget allocation — cutting what doesn't perform and doubling down on what does.",
    ],
  },

  email: "muhammad.ibrahim.5793@gmail.com",
  phone: "+92 322 4385793",
  /** Digits only, used to build a WhatsApp link. */
  whatsapp: "923224385793",
  linkedin: "https://www.linkedin.com/in/muhammad-ibrahim-b84280218/",

  education: {
    school: "Superior University",
    degree: "Bachelor of Business Administration",
    period: "Aug 2020 – Sept 2024",
    courses: [
      "Marketing Management",
      "Digital Marketing",
      "Business Statistics",
      "Brand Management",
      "Strategic Management",
      "Project Management",
    ],
  },

  certification: {
    name: "Advertising with Meta",
    date: "February 2026",
    points: [
      "Campaign strategy, optimization and scaling",
      "CTR, CPC, CPA and ROAS analysis",
      "Core, Custom and Lookalike audiences",
      "Meta Pixel setup and conversion tracking",
    ],
  },

  cta: {
    eyebrow: "Next campaign",
    headline: ["Ready to turn your", "ad spend into growth?"],
    description:
      "Tell me about your brand, your numbers and where you want to be. I'll reply with how I'd test, track and scale it.",
  },

  seo: {
    title: "Muhammad Ibrahim — Performance Marketer | Meta & Google Ads",
    description:
      "Muhammad Ibrahim is a performance marketer who plans, tests and scales Meta and Google Ads campaigns. PKR 45M+ annual budget managed, up to 8.63x campaign ROAS.",
    keywords: [
      "Performance Marketing",
      "Meta Ads",
      "Facebook Ads",
      "Google Ads",
      "Paid Advertising",
      "Conversion Rate Optimization",
      "Digital Marketing",
      "Lead Generation",
      "Pakistan",
    ],
  },
} as const;

export const socials: SocialLink[] = [
  { label: "LinkedIn", href: profile.linkedin, icon: "linkedin" },
  { label: "Email", href: `mailto:${profile.email}`, icon: "mail" },
  { label: "WhatsApp", href: `https://wa.me/${profile.whatsapp}`, icon: "whatsapp" },
];

export const navLinks = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://example.vercel.app").replace(/\/$/, "");
