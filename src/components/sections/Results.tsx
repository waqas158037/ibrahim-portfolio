"use client";
import { Fragment } from "react";
import { motion } from "framer-motion";
import { headlineMetrics, resultsFlow, roasBars } from "@/data/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/TextReveal";
import { Counter } from "@/components/ui/Counter";
import { ArrowRight } from "@/components/ui/Icons";

const MAX = 9; // ROAS axis maximum

export function Results() {
  return (
    <section id="results" aria-labelledby="results-title" className="section-pad relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/3 size-[36rem] rounded-full bg-accent/[0.07] blur-[140px]" />
      <div className="container-x">
        <SectionLabel index="08">Results</SectionLabel>
        <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:items-end">
          <h2 id="results-title" className="t-h2">
            <TextReveal text="The numbers I'm accountable for." accent={[1]} />
          </h2>
          <p className="t-lead max-w-md lg:justify-self-end">
            Straight from my campaigns. No rounding up, no borrowed case studies.
          </p>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {headlineMetrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="glass spot flex flex-col-reverse justify-end rounded-3xl p-6"
              onPointerMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
              }}
            >
              <dt className="t-micro mt-3 !normal-case !tracking-normal text-sm !text-muted">{m.label}</dt>
              <dd className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">
                <Counter value={m.value} prefix={m.prefix} suffix={m.suffix} decimals={m.decimals} />
              </dd>
            </motion.div>
          ))}
        </dl>

        <div className="mt-3 grid gap-3 lg:grid-cols-[1.25fr_0.75fr]">
          {/* ROAS chart */}
          <figure className="glass rounded-3xl p-6 sm:p-8">
            <figcaption className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-display text-xl font-medium tracking-tight">Return on ad spend</span>
              <span className="flex items-center gap-4 text-xs text-muted">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-4 rounded-sm bg-white/25" /> Baseline / average
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-4 rounded-sm bg-accent" /> Improved / top
                </span>
              </span>
            </figcaption>
            <div className="mt-8 space-y-7">
              {roasBars.map((b, i) => (
                <div key={b.label}>
                  <div className="mb-2 flex items-baseline justify-between gap-3">
                    <span className="text-fg">
                      {b.label} <span className="text-sm text-dim">· {b.sub}</span>
                    </span>
                    <span className="font-mono text-sm text-muted">
                      {b.from}x <span className="text-accent">→ {b.to}x</span>
                    </span>
                  </div>
                  <div className="relative h-3 overflow-hidden rounded-full bg-white/[0.05]" role="img" aria-label={`${b.label}: ${b.from}x to ${b.to}x ROAS`}>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                      style={{ width: `${(b.to / MAX) * 100}%` }}
                      className="absolute inset-y-0 left-0 origin-left rounded-full bg-gradient-to-r from-accent-deep to-accent shadow-[0_0_16px_rgba(57,229,140,0.5)]"
                    />
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                      style={{ width: `${(b.from / MAX) * 100}%` }}
                      className="absolute inset-y-0 left-0 origin-left rounded-full bg-white/30"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between font-mono text-[0.65rem] text-dim" aria-hidden>
              {[0, 3, 6, 9].map((t) => (
                <span key={t}>{t}x</span>
              ))}
            </div>
          </figure>

          {/* Approach flow */}
          <div className="glass flex flex-col rounded-3xl p-6 sm:p-8">
            <p className="font-display text-xl font-medium tracking-tight">How the numbers happen</p>
            <ol className="mt-6 flex flex-1 flex-col justify-between gap-2">
              {resultsFlow.map((f, i) => (
                <Fragment key={f}>
                  <motion.li
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
                  >
                    <span className="t-label text-fg">{f}</span>
                    <span className="font-mono text-xs text-accent">0{i + 1}</span>
                  </motion.li>
                  {i < resultsFlow.length - 1 && (
                    <li aria-hidden className="flex justify-center text-accent/60">
                      <ArrowRight className="size-3.5 rotate-90" />
                    </li>
                  )}
                </Fragment>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
