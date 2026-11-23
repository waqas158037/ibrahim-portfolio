"use client";
import { motion, type Variants } from "framer-motion";
import type { ElementType } from "react";
import { cn } from "@/lib/cn";

type Mode = "mask" | "blur" | "chars";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  mode?: Mode;
  delay?: number;
  /** Words (0-based) to render with the accent gradient. */
  accent?: number[];
  /** Animate on mount instead of on scroll into view. */
  immediate?: boolean;
  play?: boolean;
};

const container = (stagger: number, delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const piece: Record<Mode, Variants> = {
  mask: {
    hidden: { y: "110%", rotate: 4 },
    show: { y: "0%", rotate: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(12px)", y: 14 },
    show: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  },
  chars: {
    hidden: { y: "100%", opacity: 0 },
    show: { y: "0%", opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  },
};

/**
 * Split-text reveal. The full string is exposed to assistive tech once; the animated
 * pieces are aria-hidden.
 */
export function TextReveal({ text, as: Tag = "span", className, mode = "mask", delay = 0, accent = [], immediate, play = true }: Props) {
  const words = text.split(" ");
  const stagger = mode === "chars" ? 0.022 : mode === "blur" ? 0.045 : 0.07;
  const animateProps = immediate
    ? { initial: "hidden", animate: play ? "show" : "hidden" }
    : { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.5 } };

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span aria-hidden variants={container(stagger, delay)} {...animateProps} className="inline">
        {words.map((w, i) => {
          const isAccent = accent.includes(i);
          const inner =
            mode === "chars" ? (
              w.split("").map((c, j) => (
                <span key={j} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <motion.span variants={piece.chars} className="inline-block">
                    {c}
                  </motion.span>
                </span>
              ))
            ) : (
              <motion.span variants={piece[mode]} className={cn("inline-block", isAccent && "text-gradient")}>
                {w}
              </motion.span>
            );
          return (
            <span key={i} className={cn("inline-block", mode !== "blur" && "overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom", isAccent && mode === "chars" && "text-accent")}>
              {inner}
              {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}
