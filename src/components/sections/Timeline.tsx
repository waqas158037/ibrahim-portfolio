"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { experience } from "@/data/experience";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/TextReveal";
import { cn } from "@/lib/cn";

const kindLabel = { work: "Role", education: "Education", certification: "Certification" } as const;

export function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const headTop = useTransform(scaleY, (v) => `${v * 100}%`);

  return (
    <section id="experience" aria-labelledby="experience-title" className="section-pad relative overflow-hidden">
      <div className="container-x">
        <div className="text-center">
          <SectionLabel index="07" className="justify-center">
            Experience
          </SectionLabel>
          <h2 id="experience-title" className="t-h2 mx-auto mt-6 max-w-3xl">
            <TextReveal text="From business school to the ads manager." accent={[5, 6]} mode="blur" />
          </h2>
        </div>

        <ol ref={ref} className="relative mx-auto mt-20 max-w-5xl">
          {/* rail */}
          <span aria-hidden className="absolute bottom-0 left-4 top-0 w-px bg-white/10 md:left-1/2" />
          <motion.span
            aria-hidden
            style={{ scaleY }}
            className="absolute bottom-0 left-4 top-0 w-px origin-top bg-gradient-to-b from-accent via-accent to-accent-soft shadow-[0_0_12px_#39e58c] md:left-1/2"
          />
          <motion.span
            aria-hidden
            style={{ top: headTop }}
            className="absolute left-4 z-10 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_4px_rgba(57,229,140,0.25),0_0_24px_6px_rgba(57,229,140,0.6)] md:left-1/2"
          />

          {experience.map((m, i) => {
            const right = i % 2 === 1;
            return (
              <li key={m.title} className="relative grid pb-16 pl-12 last:pb-0 md:grid-cols-2 md:gap-16 md:pl-0">
                {/* node */}
                <motion.span
                  aria-hidden
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "0px 0px -35% 0px" }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="absolute left-4 top-2 z-[5] grid size-5 -translate-x-1/2 place-items-center rounded-full border border-accent/60 bg-ink md:left-1/2"
                >
                  <span className="size-1.5 rounded-full bg-accent" />
                </motion.span>

                <motion.div
                  initial={{ opacity: 0, x: right ? 60 : -60, rotateY: right ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  viewport={{ once: true, margin: "0px 0px -25% 0px" }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  className={cn("[perspective:1000px] md:col-start-1", right && "md:col-start-2")}
                >
                  <div className={cn("group", !right && "md:text-right")}>
                    <p className="font-display text-6xl font-semibold leading-none tracking-[-0.05em] text-white/[0.12] transition-colors duration-700 group-hover:text-accent/40 sm:text-7xl">
                      {m.year}
                    </p>
                    <div className="glass spot -mt-6 rounded-2xl bg-black/40 p-6 text-left">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span
                          className={cn(
                            "t-label rounded-full px-2.5 py-1 !text-[0.58rem]",
                            m.kind === "work" ? "bg-accent/15 text-accent" : "bg-white/[0.06] text-muted",
                          )}
                        >
                          {kindLabel[m.kind]}
                        </span>
                        <span className="t-micro">{m.period}</span>
                      </div>
                      <h3 className="mt-4 font-display text-2xl font-medium tracking-tight">{m.title}</h3>
                      <p className="mt-1 text-sm text-accent-soft">{m.org}</p>
                      <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{m.description}</p>
                    </div>
                  </div>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
