"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { metricLiteracy, skillCore, skills, type Skill } from "@/data/skills";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/TextReveal";
import { useInViewport } from "@/hooks/useInViewport";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

const RINGS = [
  { rx: 27, ry: 21, speed: 0.045 },
  { rx: 45, ry: 38, speed: -0.03 },
];

/**
 * Skill constellation: nodes orbit the core on two tilted ellipses. Positions are written
 * straight to the DOM in one rAF loop (no React re-render per frame) and the loop only
 * runs while the section is on screen.
 */
export function Skills() {
  const wrap = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLLIElement | null)[]>([]);
  const lines = useRef<(SVGLineElement | null)[]>([]);
  const visible = useInViewport(wrap);
  const reduced = usePrefersReducedMotion();
  const [hovered, setHovered] = useState<Skill | null>(null);
  const hoverRef = useRef<Skill | null>(null);
  useEffect(() => {
    hoverRef.current = hovered;
  }, [hovered]);

  useEffect(() => {
    const perRing = [0, 1].map((r) => skills.filter((s) => s.ring === r).length);
    const idxInRing = skills.map((s, i) => skills.slice(0, i).filter((o) => o.ring === s.ring).length);
    let t = 0;
    let last = performance.now();
    let raf = 0;

    const place = () => {
      skills.forEach((s, i) => {
        const ring = RINGS[s.ring];
        const a = (idxInRing[i] / perRing[s.ring]) * Math.PI * 2 + t * ring.speed + (s.ring ? 0.3 : 0);
        const x = 50 + Math.cos(a) * ring.rx;
        const y = 50 + Math.sin(a) * ring.ry;
        const depth = (Math.sin(a) + 1) / 2; // 0 back .. 1 front
        const el = nodes.current[i];
        if (el) {
          el.style.left = `${x}%`;
          el.style.top = `${y}%`;
          el.style.setProperty("--depth", depth.toFixed(3));
          el.style.zIndex = String(Math.round(depth * 10) + 1);
        }
        const ln = lines.current[i];
        if (ln) {
          ln.setAttribute("x2", x.toFixed(2));
          ln.setAttribute("y2", y.toFixed(2));
        }
      });
    };

    place();
    if (!visible || reduced) return;
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!hoverRef.current) t += dt * 10;
      place();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [visible, reduced]);

  const isLit = (s: Skill) => !hovered || hovered === s || hovered.group === s.group;

  return (
    <section id="skills" aria-labelledby="skills-title" className="section-pad relative overflow-hidden">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <SectionLabel index="04">Expertise</SectionLabel>
            <h2 id="skills-title" className="t-h2 mt-6">
              <TextReveal text="One goal at the centre. Every skill orbits it." accent={[1]} />
            </h2>
            <p className="t-lead mt-6 max-w-md">
              Channels, data, testing and strategy all serve one number: profitable growth. Hover a skill to see what it
              connects to.
            </p>
            <div className="mt-8">
              <p className="t-micro">Metrics I optimize daily</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {metricLiteracy.map((m) => (
                  <li key={m} className="rounded-lg border border-accent/25 bg-accent/[0.06] px-3 py-1.5 font-mono text-sm text-accent-soft">
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div ref={wrap} className="relative mx-auto aspect-square w-full max-w-[680px]">
            {/* orbit guides */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
              <defs>
                <radialGradient id="core-g">
                  <stop offset="0" stopColor="#39e58c" stopOpacity=".35" />
                  <stop offset="1" stopColor="#39e58c" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="50" cy="50" r="30" fill="url(#core-g)" />
              {RINGS.map((r, i) => (
                <ellipse key={i} cx="50" cy="50" rx={r.rx} ry={r.ry} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth=".15" strokeDasharray=".6 .8" />
              ))}
              {skills.map((s, i) => (
                <line
                  key={s.label}
                  ref={(el) => {
                    lines.current[i] = el;
                  }}
                  x1="50"
                  y1="50"
                  x2="50"
                  y2="50"
                  stroke={hovered && isLit(s) ? "#39e58c" : "rgba(255,255,255,0.07)"}
                  strokeWidth={hovered === s ? 0.35 : 0.15}
                  strokeDasharray={hovered && isLit(s) ? "1 1" : undefined}
                  className={cn(hovered && isLit(s) && "[animation:dash_1s_linear_infinite]")}
                  style={{ transition: "stroke .3s" }}
                />
              ))}
            </svg>

            {/* core */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-1/2 top-1/2 z-[6] grid size-[24%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-accent/40 bg-[radial-gradient(circle_at_35%_30%,#1b3b2a,#060a08_70%)] shadow-[0_0_80px_-10px_rgba(57,229,140,0.7),inset_0_0_30px_rgba(57,229,140,0.25)]"
            >
              <span className="absolute inset-[-14%] rounded-full border border-white/[0.06] [animation:spin-slow_30s_linear_infinite]">
                <span className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_8px_#39e58c]" />
              </span>
              <span className="t-label !text-[0.55rem] text-accent sm:!text-[0.7rem]">{skillCore}</span>
            </motion.div>

            <ul aria-label="Skills">
              {skills.map((s, i) => (
                <li
                  key={s.label}
                  ref={(el) => {
                    nodes.current[i] = el;
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "50%", top: "50%" }}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setHovered(s)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(s)}
                    onBlur={() => setHovered(null)}
                    className={cn(
                      "whitespace-nowrap rounded-full border px-2.5 py-1 text-[0.62rem] transition-[color,background-color,border-color,opacity,transform,box-shadow] duration-300 sm:px-3.5 sm:py-1.5 sm:text-[0.8rem]",
                      "[transform:scale(calc(0.82+var(--depth,0.5)*0.24))] [opacity:calc(0.45+var(--depth,0.5)*0.55)]",
                      hovered === s
                        ? "!scale-110 border-accent bg-accent !opacity-100 text-[#03130a] shadow-[0_0_30px_rgba(57,229,140,0.6)]"
                        : hovered && isLit(s)
                          ? "border-accent/50 bg-accent/10 !opacity-100 text-accent-soft"
                          : "border-white/10 bg-black/60 text-fg-soft backdrop-blur-sm",
                      hovered && !isLit(s) && "!opacity-20",
                    )}
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
