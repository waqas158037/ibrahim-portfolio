"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "@/data/profile";
import { aboutStats } from "@/data/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/TextReveal";
import { Counter } from "@/components/ui/Counter";

export function About() {
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const clip = useTransform(scrollYProgress, [0, 0.35], ["inset(18% 12% 18% 12% round 2rem)", "inset(0% 0% 0% 0% round 1.5rem)"]);

  return (
    <section id="about" aria-labelledby="about-title" className="section-pad relative">
      <div className="container-x">
        <SectionLabel index="02">About</SectionLabel>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 id="about-title" className="t-h2 !text-[clamp(1.9rem,3.6vw,3.4rem)] !leading-[1.05]">
              <TextReveal text={profile.about.statement} mode="blur" accent={[13, 14, 15]} />
            </h2>

            <div className="mt-10 grid gap-6 text-[1.05rem] leading-relaxed text-muted sm:grid-cols-2">
              {profile.about.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  {p}
                </motion.p>
              ))}
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              <Credential
                label="Education"
                title={profile.education.degree}
                meta={`${profile.education.school} · ${profile.education.period}`}
              />
              <Credential
                label="Certification"
                title={profile.certification.name}
                meta={`Meta · ${profile.certification.date}`}
                accent
              />
            </div>
          </div>

          <div className="lg:col-span-5">
            <motion.div ref={imgRef} style={{ clipPath: clip }} className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <motion.div style={{ y: imgY }} className="absolute inset-[-12%]">
                <Image
                  src="/images/portrait.webp"
                  alt={`${profile.name} standing outdoors in a city at golden hour`}
                  fill
                  sizes="(min-width: 1024px) 480px, 92vw"
                  className="object-cover object-[50%_25%]"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 [border-radius:inherit]" />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6">
                <div>
                  <p className="font-display text-xl font-medium tracking-tight">{profile.name}</p>
                  <p className="t-micro mt-1">
                    {profile.role} · {profile.location}
                  </p>
                </div>
                <span className="t-label rounded-full border border-accent/30 bg-black/40 px-3 py-1.5 !text-[0.6rem] text-accent backdrop-blur">
                  {profile.specialty}
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        <dl className="mt-20 grid grid-cols-2 border-t border-white/[0.07] lg:grid-cols-4">
          {aboutStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col-reverse justify-end border-white/[0.07] px-4 py-8 odd:border-r lg:px-6 lg:[&:not(:last-child)]:border-r max-lg:[&:nth-child(-n+2)]:border-b"
            >
              <span className="absolute left-0 top-0 h-px w-0 bg-accent transition-all duration-700 group-hover:w-full" />
              <dt className="t-micro mt-3">{s.label}</dt>
              <dd className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
              </dd>
            </motion.div>
          ))}
        </dl>
        <p className="t-micro mt-3 !normal-case !tracking-normal">
          Purchases combine Sweet Rack (4,252+) and Vlinq (1,400+). Years counted from June 2023.
        </p>
      </div>
    </section>
  );
}

function Credential({ label, title, meta, accent }: { label: string; title: string; meta: string; accent?: boolean }) {
  return (
    <div className="glass rounded-2xl p-5">
      <p className={accent ? "t-micro !text-accent" : "t-micro"}>{label}</p>
      <p className="mt-2 font-display text-lg font-medium tracking-tight">{title}</p>
      <p className="mt-1 text-sm text-muted">{meta}</p>
    </div>
  );
}
