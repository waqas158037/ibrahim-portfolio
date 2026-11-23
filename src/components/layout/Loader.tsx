"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/data/profile";
import { setAppReady } from "@/lib/ready";

/**
 * Short intro (~1.3s): monogram, a progress counter tied to real font/image readiness,
 * then a curtain lift. Skipped almost instantly for reduced-motion users.
 */
export function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minTime = reduced ? 150 : 1250;
    const start = performance.now();
    let assetsReady = false;
    let raf = 0;

    const fontReady = document.fonts?.ready ?? Promise.resolve();
    const img = new Image();
    img.src = "/images/portrait-cutout.webp";
    const imgReady = img.decode ? img.decode().catch(() => undefined) : Promise.resolve();
    const timeout = new Promise((r) => setTimeout(r, 2500));
    Promise.race([Promise.all([fontReady, imgReady]), timeout]).then(() => {
      assetsReady = true;
    });

    const tick = () => {
      const t = Math.min(1, (performance.now() - start) / minTime);
      const eased = 1 - Math.pow(1 - t, 3);
      const p = assetsReady ? eased : Math.min(eased, 0.9);
      setProgress(Math.round(p * 100));
      if (p >= 1) {
        setTimeout(() => {
          setDone(true);
          setAppReady();
        }, reduced ? 0 : 180);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    document.documentElement.style.overflow = "hidden";
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (done) document.documentElement.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          role="status"
          aria-live="polite"
          aria-label={`Loading ${progress}%`}
          className="fixed inset-0 z-[250] flex flex-col items-center justify-center bg-ink"
          exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
          style={{ clipPath: "inset(0 0 0% 0)" }}
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 size-[40vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />
          <div className="relative flex items-center gap-4">
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: -12 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="grid size-16 place-items-center rounded-2xl border border-accent/40 bg-white/[0.03] font-display text-2xl font-semibold tracking-tight shadow-[0_0_40px_-8px_rgba(57,229,140,0.6)]"
            >
              <span>M<span className="text-accent">I</span></span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-xl font-medium tracking-tight"
              >
                {profile.brand}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="t-micro mt-1"
              >
                {profile.role}
              </motion.p>
            </div>
          </div>
          <div className="absolute bottom-10 left-[var(--gutter)] right-[var(--gutter)] flex items-end justify-between gap-6">
            <span className="t-micro">Loading experience</span>
            <div className="mb-1.5 h-px flex-1 bg-white/10">
              <div className="h-px bg-accent shadow-[0_0_10px_#39e58c]" style={{ width: `${progress}%` }} />
            </div>
            <span className="font-display text-4xl font-medium tabular-nums tracking-tight">
              {progress}
              <span className="text-accent">%</span>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
