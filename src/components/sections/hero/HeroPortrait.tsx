"use client";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect } from "react";
import { pointer, attachPointer } from "@/lib/pointer";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";

const chips = [
  { label: "Performance", className: "left-[-6%] top-[18%]", depth: 70, delay: 1.3 },
  { label: "Strategy", className: "right-[-2%] top-[8%]", depth: 40, delay: 1.4 },
  { label: "Creative", className: "left-[-10%] top-[52%]", depth: 55, delay: 1.5 },
  { label: "Conversion", className: "right-[-8%] top-[42%]", depth: 90, delay: 1.6 },
  { label: "Data", className: "right-[2%] bottom-[20%]", depth: 30, delay: 1.7 },
];

type Props = { ready: boolean; scroll: MotionValue<number>; reduced: boolean; desktop: boolean };

/**
 * The portrait card: a real cutout of the photo layered in CSS 3D space (crisper than a
 * WebGL texture), with glass panels and chips at different Z-depths for parallax.
 */
export function HeroPortrait({ ready, scroll, reduced, desktop }: Props) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 60, damping: 18 });
  const sry = useSpring(ry, { stiffness: 60, damping: 18 });

  // Scroll pushes the whole card "into" the scene.
  const scale = useTransform(scroll, [0, 1], [1, 0.86]);
  const y = useTransform(scroll, [0, 1], [0, 90]);
  const blur = useTransform(scroll, [0.3, 1], ["blur(0px)", "blur(6px)"]);

  useEffect(() => {
    if (reduced) return;
    attachPointer();
    let raf = 0;
    const loop = () => {
      ry.set(pointer.x * 7);
      rx.set(-pointer.y * 5);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced, rx, ry]);

  return (
    <motion.div
      style={desktop && !reduced ? { scale, y, filter: blur } : undefined}
      className="relative mx-auto w-full max-w-[min(520px,62svh)] [perspective:1400px]"
    >
      <motion.div style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }} className="relative aspect-[600/760]">
        {/* Back glass panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={ready ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ transform: "translateZ(-80px)" }}
          className="absolute inset-x-[10%] bottom-[4%] top-[12%]"
        >
          <div className="glass relative h-full w-full overflow-hidden rounded-[2rem]">
            <div className="grid-bg absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-accent/25 via-accent/5 to-transparent" />
          </div>
        </motion.div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
          animate={ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
          transition={{ duration: 1.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ transform: "translateZ(20px)" }}
          className="absolute inset-0"
        >
          <Image
            src="/images/portrait-cutout.webp"
            alt={`${profile.name}, ${profile.role}, in a navy suit and black turtleneck`}
            fill
            priority
            sizes="(min-width: 1024px) 520px, 88vw"
            className="object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)] [mask-image:linear-gradient(to_bottom,black_78%,transparent_99%)]"
          />
        </motion.div>

        {/* Real stat card (from resume) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={ready ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 1.2, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ transform: "translateZ(110px)" }}
          className="absolute bottom-[10%] left-[-14%] w-32 sm:left-[-8%] sm:w-52"
        >
          <div className="glass rounded-2xl bg-black/50 p-3 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] sm:p-4 sm:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]">
            <p className="t-micro">Top campaign ROAS</p>
            <p className="mt-1 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              8.63<span className="text-accent">x</span>
            </p>
            <div className="mt-3 flex h-8 items-end gap-1" aria-hidden>
              {[0.4, 0.5, 0.45, 0.62, 0.7, 0.66, 0.85, 1].map((h, i) => (
                <motion.span
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={ready ? { scaleY: 1 } : undefined}
                  transition={{ delay: 1.7 + i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  style={{ height: `${h * 100}%` }}
                  className={cn("flex-1 origin-bottom rounded-sm", i === 7 ? "bg-accent shadow-[0_0_10px_#39e58c]" : "bg-white/15")}
                />
              ))}
            </div>
            <p className="t-micro mt-2 !text-[0.6rem]">Vlinq · Meta Ads</p>
          </div>
        </motion.div>

        {/* Floating keyword chips */}
        {chips.map((c, i) => (
          <motion.span
            key={c.label}
            aria-hidden
            initial={{ opacity: 0, scale: 0.8 }}
            animate={ready ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.9, delay: c.delay, ease: [0.16, 1, 0.3, 1] }}
            style={{ transform: `translateZ(${c.depth}px)` }}
            className={cn("absolute hidden sm:block", c.className)}
          >
            <span
              className="glass t-label animate-float block rounded-full bg-black/30 px-3.5 py-2 !text-[0.62rem] text-fg-soft"
              style={{ animationDelay: `${i * -1.3}s` }}
            >
              <span className="mr-2 inline-block size-1.5 rounded-full bg-accent align-middle shadow-[0_0_8px_#39e58c]" />
              {c.label}
            </span>
          </motion.span>
        ))}
      </motion.div>

      {/* Platform glow */}
      <div className="pointer-events-none absolute -bottom-4 left-1/2 h-14 w-[80%] -translate-x-1/2 rounded-[100%] bg-accent/25 blur-2xl" />
    </motion.div>
  );
}
