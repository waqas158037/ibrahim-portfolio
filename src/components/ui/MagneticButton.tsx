"use client";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "./Icons";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "ghost";
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  external?: boolean;
  icon?: ReactNode;
  size?: "md" | "lg";
};

/**
 * Physical-feeling CTA: drifts toward the cursor, label/arrow counter-drift for depth,
 * fill wipes in from the bottom, and the arrow slides out and back in.
 */
export function MagneticButton({ children, href, variant = "primary", onClick, className, external, icon, size = "md" }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 });
  const ix = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const iy = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(dx * 0.28);
    y.set(dy * 0.38);
    ix.set(dx * 0.12);
    iy.set(dy * 0.16);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
    ix.set(0);
    iy.set(0);
  };

  const primary = variant === "primary";

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={reset}
      data-cursor="cta"
      data-magnetic
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "group relative inline-flex items-center gap-3 overflow-hidden rounded-full font-medium transition-[box-shadow,border-color,color] duration-500",
        size === "lg" ? "h-16 pl-8 pr-2.5 text-base" : "h-13 pl-6 pr-2 text-[0.95rem]",
        primary
          ? "bg-accent text-[#03130a] shadow-[0_0_0_1px_rgba(57,229,140,0.4),0_10px_40px_-10px_rgba(57,229,140,0.6)] hover:shadow-[0_0_0_1px_rgba(124,245,184,0.9),0_18px_60px_-12px_rgba(57,229,140,0.85)]"
          : "border border-line-strong bg-white/[0.03] text-fg backdrop-blur-md hover:border-accent/60",
        className,
      )}
    >
      {/* Fill wipe */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 origin-bottom scale-y-0 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100",
          primary ? "bg-white" : "bg-accent/12",
        )}
      />
      <motion.span style={{ x: ix, y: iy }} className="relative z-10 whitespace-nowrap">
        {children}
      </motion.span>
      <motion.span
        style={{ x: ix, y: iy }}
        className={cn(
          "relative z-10 grid place-items-center overflow-hidden rounded-full transition-transform duration-500 group-hover:scale-105",
          size === "lg" ? "size-11" : "size-9",
          primary ? "bg-[#03130a] text-accent" : "bg-white/10 text-fg",
        )}
      >
        {icon ?? (
          <>
            <ArrowUpRight className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-5 group-hover:-translate-y-5" />
            <ArrowUpRight className="absolute size-4 -translate-x-5 translate-y-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0" />
          </>
        )}
      </motion.span>
    </motion.a>
  );
}
