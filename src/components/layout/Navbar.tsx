"use client";
import { useEffect, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { navLinks, profile, socials } from "@/data/profile";
import { useActiveSection } from "@/hooks/useActiveSection";
import { scrollToId, getLenis } from "@/lib/lenis";
import { useAppReady } from "@/lib/ready";
import { cn } from "@/lib/cn";
import { ArrowUpRight, socialIcon } from "@/components/ui/Icons";

const sectionIds = ["about", "services", "work", "experience", "contact"] as const;
// "Work" and "About" each cover a couple of sections, so map them for the active pill.
const activeAlias: Record<string, string> = { skills: "services", process: "work", results: "experience", why: "experience" };

export function Navbar() {
  const ready = useAppReady();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const activeRaw = useActiveSection([...sectionIds, "skills", "process", "results", "why"]);
  const active = activeAlias[activeRaw] ?? activeRaw;

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setOpen(false);
    // Let the menu close before scrolling.
    setTimeout(() => scrollToId(id), open ? 450 : 0);
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[120] flex justify-center px-3 pt-3 sm:pt-4"
      >
        <nav
          aria-label="Primary"
          className={cn(
            "glass flex w-full items-center justify-between rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            scrolled
              ? "max-w-[920px] py-1.5 pl-4 pr-1.5 bg-[#070807]/80 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)]"
              : "max-w-[1240px] py-2.5 pl-5 pr-2.5 bg-white/[0.02]",
          )}
        >
          <a href="#top" onClick={go("top")} className="group flex items-center gap-2.5" aria-label={`${profile.name}, back to top`}>
            <span className="grid size-8 place-items-center rounded-lg border border-accent/40 bg-black/40 font-display text-sm font-semibold transition-transform duration-500 group-hover:rotate-[-8deg]">
              <span>M<span className="text-accent">I</span></span>
            </span>
            <span className={cn("font-display text-[0.95rem] font-medium tracking-tight transition-all duration-500", scrolled && "max-sm:hidden")}>
              {profile.name}
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => {
              const isActive = active === l.id;
              return (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={go(l.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative block rounded-full px-4 py-2 text-sm transition-colors duration-300",
                      isActive ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.06]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{l.label}</span>
                    {isActive && <span className="absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_8px_#39e58c]" />}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              onClick={go("contact")}
              data-cursor="cta"
              className="group relative hidden items-center gap-2 overflow-hidden rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-[#03130a] transition-shadow duration-500 hover:shadow-[0_0_30px_-4px_rgba(57,229,140,0.8)] sm:inline-flex"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 rounded-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
              <span className="relative">Let&apos;s Work Together</span>
              <ArrowUpRight className="relative size-4 transition-transform duration-500 group-hover:rotate-45" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative z-[130] grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] md:hidden"
            >
              <span className="relative block h-3 w-5">
                <span className={cn("absolute left-0 top-0 h-px w-5 bg-fg transition-all duration-500", open && "top-1.5 rotate-45")} />
                <span className={cn("absolute bottom-0 left-0 h-px w-5 bg-fg transition-all duration-500", open && "bottom-1.5 -rotate-45")} />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: "circle(0% at calc(100% - 2.6rem) 2.6rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.6rem) 2.6rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.6rem) 2.6rem)" }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[110] flex flex-col bg-ink-2 px-6 pb-8 pt-28 md:hidden"
          >
            <div className="pointer-events-none absolute -right-24 top-10 size-80 rounded-full bg-accent/15 blur-[90px]" />
            <div className="grid-bg pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
            <p className="t-micro relative mb-6">Navigate</p>
            <ul className="relative flex flex-col gap-1">
              {navLinks.map((l, i) => (
                <li key={l.id} className="overflow-hidden border-b border-white/[0.06]">
                  <motion.a
                    href={`#${l.id}`}
                    onClick={go(l.id)}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-baseline justify-between py-4"
                  >
                    <span className={cn("font-display text-[2.6rem] font-medium leading-none tracking-tight", active === l.id ? "text-accent" : "text-fg")}>
                      {l.label}
                    </span>
                    <span className="t-micro">0{i + 1}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="relative mt-auto space-y-5"
            >
              <a
                href="#contact"
                onClick={go("contact")}
                className="flex h-14 items-center justify-between rounded-full bg-accent pl-6 pr-2 font-medium text-[#03130a]"
              >
                Let&apos;s Work Together
                <span className="grid size-10 place-items-center rounded-full bg-[#03130a] text-accent">
                  <ArrowUpRight className="size-4" />
                </span>
              </a>
              <div className="flex items-center justify-between">
                <span className="t-micro">{profile.availability}</span>
                <div className="flex gap-2">
                  {socials.map((s) => {
                    const Icon = socialIcon[s.icon];
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        target={s.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="grid size-10 place-items-center rounded-full border border-white/10 text-muted"
                      >
                        <Icon className="size-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
