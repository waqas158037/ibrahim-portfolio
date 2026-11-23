"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { dashboardTiles, positioningPillars } from "@/data/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/TextReveal";
import { cn } from "@/lib/cn";

/** Deterministic pseudo-random so SSR and client render the same sparkline. */
const seeded = (i: number) => {
  const x = Math.sin(i * 999) * 10000;
  return x - Math.floor(x);
};

function Sparkline({ seed, up = true }: { seed: number; up?: boolean }) {
  const pts = Array.from({ length: 12 }, (_, i) => {
    const trend = up ? i / 11 : 1 - i / 11;
    const y = 34 - (trend * 22 + seeded(seed * 13 + i) * 9);
    return `${(i / 11) * 100},${y.toFixed(1)}`;
  });
  const d = `M${pts.join(" L")}`;
  return (
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-10 w-full" aria-hidden>
      <defs>
        <linearGradient id={`sg-${seed}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#39e58c" stopOpacity="0.35" />
          <stop offset="1" stopColor="#39e58c" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L100,40 L0,40 Z`} fill={`url(#sg-${seed})`} />
      <motion.path
        d={d}
        fill="none"
        stroke="#39e58c"
        strokeWidth="1.4"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, delay: 0.2 + seed * 0.08, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}

const tileNotes: Record<(typeof dashboardTiles)[number], string> = {
  Traffic: "Qualified reach",
  Leads: "Tracked & followed up",
  Conversion: "Pixel-verified",
  Revenue: "The only finish line",
  ROAS: "Protected while scaling",
  CTR: "Creative signal",
  CPC: "Cost-efficient traffic",
  CPA: "Acquisition cost",
};

export function Positioning() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [38, 8]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.82, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const glow = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

  return (
    <section ref={ref} id="positioning" aria-labelledby="positioning-title" className="section-pad relative overflow-hidden">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
          <div>
            <SectionLabel index="01">Positioning</SectionLabel>
            <h2 id="positioning-title" className="t-h2 mt-6">
              <TextReveal text="Every click is a signal." className="block" />
              <TextReveal text="I build the system that reads it." className="block text-muted" delay={0.15} />
            </h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="t-lead max-w-md lg:justify-self-end"
          >
            Performance marketing isn&apos;t about running ads. It&apos;s about measuring the right things, testing fast and
            moving budget to whatever earns the most.
          </motion.p>
        </div>

        {/* Floating dashboard */}
        <div className="relative mt-16 [perspective:1600px] lg:mt-24">
          <motion.div
            aria-hidden
            style={{ opacity: glow }}
            className="pointer-events-none absolute inset-x-[10%] -bottom-10 top-1/3 rounded-full bg-accent/20 blur-[100px]"
          />
          <motion.div
            style={{ rotateX, scale, y, transformOrigin: "50% 100%" }}
            className="glass relative rounded-[1.75rem] bg-black/40 p-3 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9)] sm:p-5"
            role="img"
            aria-label="Conceptual performance dashboard showing the metrics I optimize: traffic, leads, conversion, revenue, ROAS, CTR, CPC and CPA."
          >
            {/* window chrome */}
            <div className="mb-4 flex items-center justify-between px-2">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-accent/70" />
              </div>
              <span className="t-micro">growth-system / live view</span>
              <span className="t-micro hidden sm:inline">Concept</span>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
              {dashboardTiles.map((t, i) => (
                <motion.div
                  key={t}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4",
                    (t === "ROAS" || t === "Revenue") && "border-accent/25 bg-accent/[0.05]",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="t-label !text-[0.65rem] text-fg">{t}</span>
                    <span className="size-1.5 rounded-full bg-accent/80" />
                  </div>
                  <p className="t-micro mt-1 !normal-case !tracking-normal">{tileNotes[t]}</p>
                  <div className="mt-3">
                    <Sparkline seed={i + 1} up={!(t === "CPC" || t === "CPA")} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Pillars marquee */}
      <div className="relative mt-20 border-y border-white/[0.06] py-6 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="animate-marquee flex w-max gap-12">
          {[...positioningPillars, ...positioningPillars, ...positioningPillars, ...positioningPillars].map((p, i) => (
            <div key={i} className="flex items-center gap-5 whitespace-nowrap" aria-hidden={i >= positioningPillars.length}>
              <span className="font-display text-3xl font-medium tracking-tight sm:text-5xl">{p.label}</span>
              <span className="t-micro max-w-[11rem] whitespace-normal">{p.note}</span>
              <span className="ml-6 size-2 rotate-45 bg-accent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
