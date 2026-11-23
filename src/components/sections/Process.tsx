"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { processSteps } from "@/data/content";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/TextReveal";
import { cn } from "@/lib/cn";

/** One abstract visual per stage — line geometry that "evolves" from research to scale. */
function StageVisual({ step }: { step: number }) {
  const stroke = { fill: "none", stroke: "#39e58c", strokeWidth: 0.6, vectorEffect: "non-scaling-stroke" as const };
  const soft = { ...stroke, stroke: "rgba(255,255,255,0.22)" };
  const visuals = [
    // Discover: scanning radar
    <g key="d">
      {[10, 20, 30, 40].map((r) => (
        <circle key={r} cx="50" cy="50" r={r} {...soft} />
      ))}
      <path d="M50 50 L50 10 A40 40 0 0 1 84 30 Z" fill="rgba(57,229,140,0.15)" className="origin-center [animation:spin-slow_6s_linear_infinite]" style={{ transformBox: "view-box" }} />
      {[[30, 34], [68, 40], [58, 70], [36, 64]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.6" fill="#39e58c" />
      ))}
    </g>,
    // Strategy: structured tree
    <g key="s">
      <rect x="40" y="12" width="20" height="10" rx="2" {...stroke} />
      {[18, 50, 82].map((x) => (
        <g key={x}>
          <path d={`M50 22 V34 H${x} V44`} {...soft} />
          <rect x={x - 10} y="44" width="20" height="10" rx="2" {...soft} />
          <path d={`M${x} 54 V64 M${x - 6} 64 H${x + 6} M${x - 6} 64 V72 M${x + 6} 64 V72`} {...soft} />
          <circle cx={x - 6} cy="76" r="2.5" {...stroke} />
          <circle cx={x + 6} cy="76" r="2.5" {...stroke} />
        </g>
      ))}
    </g>,
    // Execute: launch, signal pulses
    <g key="e">
      <path d="M10 70 H90" {...soft} />
      {[20, 35, 50, 65, 80].map((x, i) => (
        <rect key={x} x={x - 4} y={70 - (i + 2) * 7} width="8" height={(i + 2) * 7} rx="1.5" {...(i === 4 ? stroke : soft)} />
      ))}
      <circle cx="80" cy="22" r="3" fill="#39e58c" />
      <circle cx="80" cy="22" r="8" {...stroke} className="origin-center animate-pulse-ring" style={{ transformBox: "fill-box" }} />
    </g>,
    // Optimize: A/B split + convergence
    <g key="o">
      <path d="M10 50 C30 50 30 25 50 25 S70 50 90 50" {...soft} />
      <path d="M10 50 C30 50 30 75 50 75 S70 50 90 50" {...soft} />
      <path d="M10 50 C35 50 40 30 60 32 S80 45 90 50" {...stroke} />
      <circle cx="10" cy="50" r="2.5" fill="#fff" />
      <circle cx="90" cy="50" r="3" fill="#39e58c" />
      <text x="48" y="20" fontSize="5" fill="#a1a1a1" fontFamily="monospace">A</text>
      <text x="48" y="86" fontSize="5" fill="#a1a1a1" fontFamily="monospace">B</text>
    </g>,
    // Scale: rising staircase/curve
    <g key="g">
      <path d="M10 88 H90 M10 88 V12" {...soft} />
      <path d="M12 82 C40 80 55 60 65 42 S80 16 90 12" {...stroke} strokeWidth={1.2} />
      {[[30, 76], [50, 62], [65, 42], [80, 22]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="#39e58c" />
      ))}
      <path d="M84 12 H90 V18" {...stroke} />
    </g>,
  ];

  return (
    <AnimatePresence mode="popLayout">
      <motion.svg
        key={step}
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        initial={{ opacity: 0, rotateY: -40, scale: 0.85, filter: "blur(8px)" }}
        animate={{ opacity: 1, rotateY: 0, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, rotateY: 40, scale: 0.9, filter: "blur(8px)" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden
      >
        {visuals[step]}
      </motion.svg>
    </AnimatePresence>
  );
}

export function Process() {
  const section = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const count = processSteps.length;

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const st = ScrollTrigger.create({
        trigger: section.current,
        start: "top top",
        end: () => `+=${window.innerHeight * 2.5}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          setProgress(self.progress);
          setActive(Math.min(count - 1, Math.floor(self.progress * count)));
        },
      });
      return () => st.kill();
    });
    return () => mm.revert();
  }, [count]);

  const step = processSteps[active];

  return (
    <section ref={section} id="process" aria-labelledby="process-title" className="relative overflow-hidden lg:h-[100svh]">
      <div className="container-x flex h-full flex-col justify-center py-24 lg:py-16">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <SectionLabel index="06">Process</SectionLabel>
            <h2 id="process-title" className="t-h2 mt-6">
              <TextReveal text="Five stages. One loop." accent={[3]} />
            </h2>
          </div>
          <p className="t-lead max-w-sm">Growth isn&apos;t a launch. It&apos;s a loop that gets sharper with every round of data.</p>
        </div>

        {/* Desktop: pinned, scroll-driven */}
        <div className="mt-14 hidden gap-10 lg:grid lg:grid-cols-[0.9fr_1.1fr]">
          <ol className="relative space-y-1">
            <span aria-hidden className="absolute bottom-3 left-[1.15rem] top-3 w-px bg-white/10" />
            <span
              aria-hidden
              className="absolute left-[1.15rem] top-3 w-px bg-accent shadow-[0_0_10px_#39e58c]"
              style={{ height: `calc(${Math.min(1, progress * 1.05) * 100}% - 1.5rem)` }}
            />
            {processSteps.map((s, i) => (
              <li key={s.id} className="relative flex items-center gap-6 py-3">
                <span
                  className={cn(
                    "relative z-10 grid size-[2.3rem] place-items-center rounded-full border font-mono text-xs transition-all duration-500",
                    i <= active ? "border-accent bg-[#06140c] text-accent shadow-[0_0_20px_-2px_rgba(57,229,140,0.6)]" : "border-white/15 bg-ink text-dim",
                  )}
                >
                  0{i + 1}
                </span>
                <span
                  className={cn(
                    "font-display text-4xl font-medium tracking-tight transition-all duration-500 xl:text-5xl",
                    i === active ? "translate-x-2 text-fg" : i < active ? "text-white/35" : "text-white/15",
                  )}
                >
                  {s.title}
                </span>
              </li>
            ))}
          </ol>

          <div className="glass relative overflow-hidden rounded-[2rem] bg-black/30 p-10">
            <div className="grid-bg absolute inset-0 opacity-30" aria-hidden />
            <div className="relative grid h-full grid-cols-[1fr_0.9fr] gap-8">
              <div className="flex flex-col">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="flex h-full flex-col"
                    aria-live="polite"
                  >
                    <p className="t-label text-accent">
                      Stage 0{active + 1} · {step.kicker}
                    </p>
                    <h3 className="mt-4 font-display text-5xl font-semibold tracking-tight">{step.title}</h3>
                    <p className="mt-4 text-lg leading-relaxed text-muted">{step.description}</p>
                    <ul className="mt-auto space-y-2 pt-8">
                      {step.points.map((pt) => (
                        <li key={pt} className="flex items-center gap-3 border-t border-white/[0.07] pt-2 text-sm text-fg-soft">
                          <span className="size-1.5 rounded-full bg-accent" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="relative aspect-square self-center [perspective:800px]">
                <StageVisual step={active} />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile / tablet: stacked, each step activates as it enters */}
        <ol className="mt-12 space-y-3 lg:hidden">
          {processSteps.map((s, i) => (
            <motion.li
              key={s.id}
              initial={{ opacity: 0.35, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.7, margin: "-10% 0px -30% 0px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="glass relative overflow-hidden rounded-2xl p-5"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-3xl font-semibold tracking-tight">{s.title}</h3>
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
              </div>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{s.description}</p>
              <p className="t-micro mt-4">{s.points.join(" · ")}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
