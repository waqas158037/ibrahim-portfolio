"use client";
import { motion } from "framer-motion";
import { services } from "@/data/services";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/TextReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { ServiceGlyph } from "@/components/ui/ServiceGlyph";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section-pad relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 hairline" />
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <SectionLabel index="03">Services</SectionLabel>
            <h2 id="services-title" className="t-h2 mt-6 max-w-3xl">
              <TextReveal text="What I do for brands that want growth, not guesswork." accent={[7]} />
            </h2>
          </div>
          <p className="t-lead max-w-sm">
            Six ways I help brands grow, all of them things I&apos;ve done on real budgets.
          </p>
        </div>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 [perspective:1400px]">
          {services.map((s, i) => (
            <motion.li
              key={s.id}
              initial={{ opacity: 0, rotateX: 50, y: 80, z: -120 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0, z: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.2, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "50% 100%" }}
            >
              <TiltCard className="overflow-hidden rounded-3xl border border-transparent bg-gradient-to-b from-white/[0.05] to-white/[0.01]">
                {/* moving background */}
                <div
                  aria-hidden
                  className="absolute -right-24 -top-24 size-64 rounded-full bg-accent/0 blur-3xl transition-all duration-700 group-hover:-right-10 group-hover:-top-10 group-hover:bg-accent/15"
                />
                <div aria-hidden className="grid-bg absolute inset-0 opacity-0 transition-opacity duration-700 [mask-image:radial-gradient(circle_at_80%_0%,black,transparent_60%)] group-hover:opacity-60" />
                <article className="relative flex h-full min-h-[22rem] flex-col p-7 [transform-style:preserve-3d]">
                  <div className="flex items-start justify-between">
                    <div className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [transform:translateZ(40px)] group-hover:[transform:translateZ(60px)_rotate(-6deg)_scale(1.08)]">
                      <ServiceGlyph icon={s.icon} />
                    </div>
                    <span className="t-micro">{s.index}</span>
                  </div>
                  <h3 className="t-h3 mt-auto pt-10 [transform:translateZ(30px)]">{s.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{s.description}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <li key={t} className="t-label rounded-full border border-white/10 px-2.5 py-1 !text-[0.58rem] text-muted transition-colors duration-500 group-hover:border-accent/30 group-hover:text-accent-soft">
                        {t}
                      </li>
                    ))}
                  </ul>
                </article>
              </TiltCard>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
