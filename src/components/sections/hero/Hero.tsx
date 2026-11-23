"use client";
import dynamic from "next/dynamic";
import { useRef, type MouseEvent } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { profile } from "@/data/profile";
import { useAppReady } from "@/lib/ready";
import { scrollToId } from "@/lib/lenis";
import { useInViewport } from "@/hooks/useInViewport";
import { useIsDesktop, usePrefersReducedMotion } from "@/hooks/useReducedMotion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextReveal } from "@/components/ui/TextReveal";
import { ArrowDown } from "@/components/ui/Icons";
import { HeroPortrait } from "./HeroPortrait";

// WebGL is client-only and code-split out of the main bundle.
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ready = useAppReady();
  const reduced = usePrefersReducedMotion();
  const desktop = useIsDesktop();
  const ref = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const visible = useInViewport(ref, "0px");

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progress.current = v;
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const go = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToId(id);
  };

  const [l1, l2, l3] = profile.hero.headline;

  return (
    <section ref={ref} id="top" aria-label="Introduction" className="noise relative isolate min-h-[100svh] overflow-hidden">
      {/* Static fallback light (also what reduced-motion users see) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[-10%] top-[10%] size-[60vmax] rounded-full bg-[radial-gradient(circle,rgba(57,229,140,0.22),transparent_60%)] max-lg:left-1/2 max-lg:right-auto max-lg:top-[40%] max-lg:-translate-x-1/2" />
        <div className="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_60%_40%,black,transparent)]" />
      </div>

      {!reduced && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ duration: 2, delay: 0.2 }}
          className="absolute inset-0 -z-10"
        >
          <HeroScene progress={progress} quality={desktop ? "high" : "low"} active={visible} />
        </motion.div>
      )}

      <div className="container-x grid min-h-[100svh] items-center gap-6 pb-16 pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-4 lg:pb-10 lg:pt-24">
        <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 max-lg:text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="t-label mb-6 inline-flex items-center gap-3 rounded-full border border-accent/25 bg-accent/[0.06] px-4 py-2 text-accent-soft max-sm:mb-4 max-sm:!text-[0.56rem] max-sm:!tracking-[0.1em]"
          >
            <span className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_#39e58c]" />
            {profile.hero.eyebrow}
          </motion.p>

          <h1 className="t-hero">
            <span className="sr-only">
              {profile.name}, {profile.role}. {profile.hero.headline.join(" ")}
            </span>
            <span aria-hidden className="block">
              <TextReveal text={l1} immediate play={ready} delay={0.15} className="block" />
              <TextReveal text={l2} immediate play={ready} delay={0.3} accent={[0]} className="block" />
              <TextReveal text={l3} immediate play={ready} delay={0.45} className="block" />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
            transition={{ duration: 1.1, delay: 0.8, ease }}
            className="t-lead mt-7 max-w-[34rem] max-lg:mx-auto max-sm:mt-5 max-sm:text-[0.98rem]"
          >
            <span className="text-fg">I&apos;m {profile.name}</span> — {profile.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, delay: 1, ease }}
            className="mt-9 flex flex-wrap items-center gap-3 max-lg:justify-center max-sm:mt-7"
          >
            <MagneticButton href="#contact" onClick={go("contact")}>
              {profile.hero.primaryCta}
            </MagneticButton>
            <MagneticButton href="#work" onClick={go("work")} variant="ghost">
              {profile.hero.secondaryCta}
            </MagneticButton>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : undefined}
            transition={{ duration: 1, delay: 1.3 }}
            className="mt-12 grid grid-cols-3 gap-4 border-t border-white/[0.07] pt-6 max-lg:text-center sm:flex sm:flex-wrap sm:gap-x-10 max-lg:sm:justify-center"
          >
            {[
              ["PKR 45M+", "Annual budget managed"],
              ["3.5x → 4.2x", "ROAS lift, in-house"],
              ["Meta", "Certified, 2026"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="font-display text-base font-medium tracking-tight sm:text-xl">{v}</dd>
                <dd className="t-micro mt-1 max-sm:!text-[0.55rem] max-sm:!tracking-[0.06em]">{l}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <div className="relative z-0 max-lg:order-first max-lg:mx-auto max-lg:w-[min(300px,72vw)] lg:-mr-8">
          <HeroPortrait ready={ready} scroll={scrollYProgress} reduced={reduced} desktop={desktop} />
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#positioning"
        onClick={go("positioning")}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-[var(--gutter)] hidden items-center gap-3 lg:flex"
        aria-label="Scroll to the next section"
      >
        <span className="relative h-12 w-px overflow-hidden bg-white/10">
          <span className="absolute inset-x-0 top-0 h-1/2 bg-accent [animation:scroll-cue_1.8s_cubic-bezier(0.76,0,0.24,1)_infinite]" />
        </span>
        <span className="t-micro flex items-center gap-2">
          Scroll <ArrowDown className="size-3" />
        </span>
      </motion.a>
    </section>
  );
}
