"use client";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "@/data/profile";
import { useInViewport } from "@/hooks/useInViewport";
import { useIsDesktop, usePrefersReducedMotion } from "@/hooks/useReducedMotion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextReveal } from "@/components/ui/TextReveal";
import { LinkedIn, Mail, WhatsApp, ArrowUpRight } from "@/components/ui/Icons";

const CtaScene = dynamic(() => import("@/components/three/CtaScene"), { ssr: false });

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const near = useInViewport(ref, "300px");
  const reduced = usePrefersReducedMotion();
  const desktop = useIsDesktop();
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  if (near && !mounted) setMounted(true);

  // Cinematic entrance: the stage opens up from a rounded card to full bleed.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const inset = useTransform(scrollYProgress, [0, 1], ["inset(8% 6% 0% 6% round 3rem)", "inset(0% 0% 0% 0% round 0rem)"]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const channels = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}?subject=Let's%20work%20together`, Icon: Mail },
    { label: "LinkedIn", value: "Muhammad Ibrahim", href: profile.linkedin, Icon: LinkedIn, external: true },
    { label: "WhatsApp", value: profile.phone, href: `https://wa.me/${profile.whatsapp}`, Icon: WhatsApp, external: true },
  ];

  return (
    <section ref={ref} id="contact" aria-labelledby="contact-title" className="relative">
      <motion.div style={reduced ? undefined : { clipPath: inset }} className="relative isolate overflow-hidden bg-[#030604]">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[55%] size-[90vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(57,229,140,0.28),rgba(57,229,140,0.04)_40%,transparent_65%)]" />
          {/* light rays */}
          <div className="absolute left-1/2 top-[55%] size-[140vmax] -translate-x-1/2 -translate-y-1/2 opacity-40 [animation:spin-slow_90s_linear_infinite] [background:repeating-conic-gradient(from_0deg,rgba(57,229,140,0.10)_0deg_2deg,transparent_2deg_14deg)] [mask-image:radial-gradient(circle,black,transparent_55%)]" />
          {mounted && !reduced && <CtaScene active={near} quality={desktop ? "high" : "low"} />}
          <div className="grid-bg absolute inset-0 opacity-30 [mask-image:linear-gradient(to_top,black,transparent_60%)]" />
        </div>

        <motion.div style={reduced ? undefined : { scale }} className="container-x flex min-h-[100svh] flex-col items-center justify-center py-32 text-center">
          <p className="t-label inline-flex items-center gap-3 text-accent-soft">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent" />
              <span className="relative size-2 rounded-full bg-accent" />
            </span>
            {profile.availability}
          </p>

          <h2 id="contact-title" className="t-hero mt-8 max-w-[16ch] !text-[clamp(2.4rem,6vw,5.8rem)]">
            <TextReveal text={profile.cta.headline[0]} className="block" />
            <TextReveal text={profile.cta.headline[1]} className="block" accent={[2, 3]} delay={0.15} />
          </h2>

          <p className="t-lead mt-8 max-w-xl">{profile.cta.description}</p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <MagneticButton href={`mailto:${profile.email}?subject=Let's%20work%20together`} size="lg">
              Let&apos;s Work Together
            </MagneticButton>
            <button
              type="button"
              onClick={copy}
              className="h-16 rounded-full border border-white/15 bg-white/[0.03] px-6 text-sm text-fg-soft backdrop-blur-md transition-colors hover:border-accent/60"
              aria-live="polite"
            >
              {copied ? "Email copied ✓" : "Copy email"}
            </button>
          </div>

          <ul className="mt-16 grid w-full max-w-5xl gap-3 md:grid-cols-[1.4fr_1fr_1fr]">
            {channels.map(({ label, value, href, Icon, external }, i) => (
              <motion.li
                key={label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
              >
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="glass group flex items-center gap-4 rounded-2xl bg-black/40 p-4 text-left transition-colors duration-500 hover:border-accent/40"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent transition-colors duration-500 group-hover:bg-accent group-hover:text-[#03130a]">
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="t-micro block">{label}</span>
                    <span className="mt-0.5 block truncate text-sm text-fg">{value}</span>
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-muted transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}
