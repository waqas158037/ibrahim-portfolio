import type { ServiceIcon } from "@/data/services";

/**
 * Abstract, line-based "3D" glyphs (isometric strokes + glow) — consistent with the
 * thin-line metallic language of the hero, and far lighter than per-card WebGL.
 */
export function ServiceGlyph({ icon }: { icon: ServiceIcon }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    vectorEffect: "non-scaling-stroke" as const,
  };
  const g = {
    funnel: (
      <>
        <ellipse cx="40" cy="18" rx="26" ry="7" {...common} />
        <ellipse cx="40" cy="38" rx="15" ry="4.5" {...common} opacity=".6" />
        <ellipse cx="40" cy="56" rx="6" ry="2" {...common} className="text-accent" />
        <path d="M14 18 34 56M66 18 46 56" {...common} opacity=".5" />
        <circle cx="40" cy="66" r="2.2" fill="currentColor" className="text-accent" />
      </>
    ),
    search: (
      <>
        <path d="M14 52 40 66 66 52 40 38Z" {...common} opacity=".45" />
        <circle cx="36" cy="30" r="14" {...common} />
        <circle cx="36" cy="30" r="7" {...common} className="text-accent" />
        <path d="m46 40 12 12" {...common} strokeWidth={2} />
      </>
    ),
    split: (
      <>
        <rect x="12" y="16" width="24" height="30" rx="4" {...common} />
        <rect x="44" y="24" width="24" height="30" rx="4" {...common} className="text-accent" />
        <path d="M24 46v10h32v-2" {...common} opacity=".5" />
        <path d="M18 26h12M18 32h8M50 34h12M50 40h8" {...common} opacity=".6" />
      </>
    ),
    target: (
      <>
        <ellipse cx="40" cy="44" rx="28" ry="12" {...common} opacity=".4" />
        <ellipse cx="40" cy="44" rx="18" ry="7.5" {...common} opacity=".7" />
        <ellipse cx="40" cy="44" rx="7" ry="3" {...common} className="text-accent" />
        <path d="M40 44 56 14" {...common} />
        <path d="m52 14 4 0 0 4" {...common} />
      </>
    ),
    pulse: (
      <>
        <path d="M10 58h60" {...common} opacity=".35" />
        <path d="M10 42h12l6-16 8 30 8-22 6 8h20" {...common} className="text-accent" />
        <circle cx="64" cy="42" r="2.4" fill="currentColor" className="text-accent" />
        <path d="M10 22h20" {...common} opacity=".35" />
      </>
    ),
    layout: (
      <>
        <path d="M12 26 40 12 68 26 40 40Z" {...common} />
        <path d="M12 38 40 52 68 38" {...common} opacity=".6" />
        <path d="M12 50 40 64 68 50" {...common} className="text-accent" />
      </>
    ),
  }[icon];

  return (
    <svg viewBox="0 0 80 76" className="h-16 w-16 text-fg/80 drop-shadow-[0_0_14px_rgba(57,229,140,0.35)]" aria-hidden>
      {g}
    </svg>
  );
}
