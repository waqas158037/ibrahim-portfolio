import { navLinks, profile, socials } from "@/data/profile";
import { socialIcon } from "@/components/ui/Icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-ink">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-accent/[0.06] to-transparent" />
      <div className="container-x relative py-14">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl border border-accent/40 font-display font-semibold">
                <span>M<span className="text-accent">I</span></span>
              </span>
              <div>
                <p className="font-display text-lg font-medium tracking-tight">{profile.name}</p>
                <p className="t-micro">Performance Marketing</p>
              </div>
            </div>
            <a href={`mailto:${profile.email}`} className="mt-6 inline-block text-muted transition-colors hover:text-accent">
              {profile.email}
            </a>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
            {navLinks.map((l) => (
              <a key={l.id} href={`#${l.id}`} className="text-muted transition-colors hover:text-fg">
                {l.label}
              </a>
            ))}
          </nav>

          <ul className="flex gap-2">
            {socials.map((s) => {
              const Icon = socialIcon[s.icon];
              const external = s.href.startsWith("http");
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="grid size-11 place-items-center rounded-full border border-white/10 text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <p
          aria-hidden
          className="pointer-events-none mt-14 select-none whitespace-nowrap text-center font-display text-[13.5vw] font-semibold leading-[0.8] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.07)]"
        >
          {profile.firstName.toUpperCase()}
          <span className="[-webkit-text-stroke:1px_rgba(57,229,140,0.35)]">.</span>
        </p>

        <div className="mt-8 flex flex-col justify-between gap-3 border-t border-white/[0.06] pt-6 text-xs text-dim sm:flex-row">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <p>Performance Marketing · Meta &amp; Google Ads</p>
        </div>
      </div>
    </footer>
  );
}
