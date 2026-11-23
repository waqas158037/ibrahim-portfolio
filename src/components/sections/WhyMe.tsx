"use client";
import { motion } from "framer-motion";
import { whyPoints } from "@/data/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/TextReveal";

export function WhyMe() {
  return (
    <section id="why" aria-labelledby="why-title" className="section-pad relative">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionLabel index="09">Why work with me</SectionLabel>
            <h2 id="why-title" className="t-h2 mt-6">
              <TextReveal text="Less noise." className="block" />
              <TextReveal text="More revenue." className="block" accent={[0, 1]} delay={0.12} />
            </h2>
            <p className="t-lead mt-6 max-w-sm">
              Four things you can expect from day one, each backed by work I&apos;ve already done.
            </p>
          </div>

          <ol className="border-t border-white/[0.08]">
            {whyPoints.map((w, i) => (
              <motion.li
                key={w.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                className="group relative border-b border-white/[0.08] py-8 sm:py-10"
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)", y: 30 },
                    show: { opacity: 1, clipPath: "inset(0 0 0% 0)", y: 0, transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } },
                  }}
                >
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                />
                <div className="flex items-start gap-5 sm:gap-8">
                  <span className="mt-2 font-mono text-xs text-accent">0{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <h3 className="font-display text-3xl font-medium tracking-tight transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 sm:text-[2.6rem]">
                        {w.title}
                      </h3>
                      <span className="t-label rounded-full border border-accent/25 bg-accent/[0.06] px-3 py-1.5 !text-[0.6rem] text-accent-soft">
                        {w.proof}
                      </span>
                    </div>
                    <p className="mt-3 max-w-xl leading-relaxed text-muted">{w.body}</p>
                  </div>
                </div>
                </motion.div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
