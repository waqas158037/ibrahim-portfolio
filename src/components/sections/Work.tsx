"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project } from "@/data/projects";
import { gsap } from "@/lib/gsap";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/TextReveal";
import { Plus } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

/**
 * Case studies. Desktop: pinned horizontal track scrubbed by scroll, cards swing in 3D as
 * they pass. Mobile/reduced-motion: a normal vertical stack.
 */
export function Work() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const el = track.current;
      const sec = section.current;
      if (!el || !sec) return;
      const distance = () => el.scrollWidth - window.innerWidth;
      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      gsap.utils.toArray<HTMLElement>("[data-work-card]", el).forEach((card) => {
        gsap.fromTo(
          card,
          { rotateY: -10, z: -60 },
          {
            rotateY: 8,
            z: 0,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={section} id="work" aria-labelledby="work-title" className="relative overflow-hidden lg:h-[100svh]">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/4 size-[40rem] rounded-full bg-accent/[0.06] blur-[120px]" />
      <div
        ref={track}
        className="flex flex-col gap-6 px-[var(--gutter)] py-24 lg:h-full lg:w-max lg:flex-row lg:items-center lg:gap-8 lg:py-0 lg:[perspective:1800px]"
      >
        <div className="shrink-0 lg:w-[34vw] lg:pr-10">
          <SectionLabel index="05">Selected work</SectionLabel>
          <h2 id="work-title" className="t-h2 mt-6">
            <TextReveal text="Real brands." className="block" />
            <TextReveal text="Real numbers." className="block" accent={[0, 1]} delay={0.12} />
          </h2>
          <p className="t-lead mt-6 max-w-md">
            Three engagements where I owned the paid strategy. Every figure is from my own campaign reporting.
          </p>
          <p className="t-micro mt-10 hidden items-center gap-3 lg:flex">
            <span className="h-px w-10 bg-accent" /> Keep scrolling
          </p>
        </div>

        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}

        <div className="hidden w-[18vw] shrink-0 lg:block" aria-hidden />
      </div>
    </section>
  );
}

function ProjectCard({ project: p, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const hero = p.stats[0];
  const rest = p.stats.slice(1);

  return (
    <div data-work-card className="shrink-0 lg:h-[78svh] lg:w-[min(64vw,980px)]">
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative h-full overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[linear-gradient(160deg,#111513,#070807_60%)] transition-[border-color,box-shadow] duration-700 hover:border-accent/25 hover:shadow-[0_40px_120px_-40px_rgba(57,229,140,0.35)]"
      aria-labelledby={`${p.id}-title`}
      data-cursor="hover"
    >
      {/* visual field */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -right-24 -top-24 size-[24rem] rounded-full opacity-[0.16] blur-[100px] transition-all duration-1000 group-hover:opacity-30"
          style={{ background: p.accent }}
        />
        <div className="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_65%)]" />
        <svg className="absolute bottom-0 right-0 h-2/3 w-2/3 opacity-60" viewBox="0 0 200 120" preserveAspectRatio="none">
          <motion.path
            d={["M0 110 C40 100 60 80 90 70 S150 30 200 10", "M0 105 C30 95 70 90 100 60 S160 25 200 5", "M0 100 C50 95 80 70 110 62 S170 40 200 30"][index % 3]}
            fill="none"
            stroke={p.accent}
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
      </div>

      <div className="relative flex h-full flex-col p-6 sm:p-10">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="t-micro">0{index + 1}</span>
            <span className="t-label rounded-full border border-white/10 bg-black/30 px-3 py-1.5 !text-[0.6rem] text-muted">{p.category}</span>
          </div>
          <span className="t-label !text-[0.62rem] text-accent">{p.channel}</span>
        </header>

        <div className="mt-8 grid gap-8 lg:mt-auto lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h3 id={`${p.id}-title`} className="font-display text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
              {p.name}
            </h3>
            <p className="mt-4 max-w-md text-lg leading-snug text-fg-soft">{p.summary}</p>
          </div>
          <div className="lg:text-right">
            <p className="t-micro">{hero.label}</p>
            <p className="whitespace-nowrap font-display text-5xl font-semibold leading-none tracking-[-0.05em] text-gradient sm:text-7xl">{hero.value}</p>
          </div>
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.06] sm:grid-flow-col sm:auto-cols-fr sm:grid-cols-none">
          {rest.map((s) => (
            <div key={s.label} className="bg-[#0a0c0b]/90 p-4">
              <dt className="t-micro">{s.label}</dt>
              <dd className="mt-1 font-display text-2xl font-medium tracking-tight">{s.value}</dd>
            </div>
          ))}
        </dl>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={`${p.id}-details`}
          className="mt-6 inline-flex items-center gap-3 self-start rounded-full border border-white/10 py-2 pl-4 pr-2 text-sm text-fg-soft transition-colors hover:border-accent/50"
        >
          {open ? "Hide case study" : "Read case study"}
          <span className={cn("grid size-7 place-items-center rounded-full bg-white/10 transition-transform duration-500", open && "rotate-45 bg-accent text-[#03130a]")}>
            <Plus className="size-3.5" />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id={`${p.id}-details`}
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            exit={{ clipPath: "inset(100% 0 0 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 z-10 overflow-y-auto bg-[#070908]/95 p-6 backdrop-blur-xl sm:p-10"
            data-lenis-prevent
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="t-micro">{p.category}</p>
                <p className="mt-1 font-display text-3xl font-semibold tracking-tight">{p.name}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-[#03130a]"
                aria-label="Close case study"
              >
                <Plus className="size-4 rotate-45" />
              </button>
            </div>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              <div>
                <p className="t-label !text-[0.65rem] text-accent">Brief</p>
                <p className="mt-3 leading-relaxed text-fg-soft">{p.brief}</p>
              </div>
              <div>
                <p className="t-label !text-[0.65rem] text-accent">Approach</p>
                <ul className="mt-3 space-y-2.5">
                  {p.approach.map((a) => (
                    <li key={a} className="flex gap-3 text-[0.95rem] leading-snug text-muted">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="t-label !text-[0.65rem] text-accent">Outcome</p>
                <p className="mt-3 leading-relaxed text-fg-soft">{p.outcome}</p>
                <p className="t-label mt-6 !text-[0.65rem] text-muted">Tools</p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {p.tools.map((t) => (
                    <li key={t} className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-muted">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
    </div>
  );
}
