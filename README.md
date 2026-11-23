# Muhammad Ibrahim — Performance Marketing Portfolio

A single-page, 3D, motion-rich portfolio built with Next.js (App Router), TypeScript, Tailwind CSS v4,
Framer Motion, GSAP ScrollTrigger, Lenis and React Three Fiber.

All copy and numbers come from the resume and live in `src/data/` — edit those files to update the site.

## 1. Install

```bash
npm install
```

Requires Node.js 20.9+ (Node 22 recommended).

## 2. Development

```bash
npm run dev        # http://localhost:3000
```

## 3. Build

```bash
npm run typecheck  # TypeScript
npm run lint       # ESLint (next/core-web-vitals + typescript)
npm run build      # production build
npm start          # serve the production build locally
```

## 4. Environment variables

Copy `.env.example` to `.env.local` for local use.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Public URL of the deployed site, e.g. `https://muhammadibrahim.com`. Used for the canonical URL, sitemap, robots.txt, JSON-LD and Open Graph image URLs. Defaults to `https://example.vercel.app`. |

## 5. Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, click **Add New → Project** and import the repo. The Next.js preset is detected automatically
   (build command `next build`, no output directory needed).
3. Under **Settings → Environment Variables**, add `NEXT_PUBLIC_SITE_URL` with your production domain.
4. Deploy. Re-deploy after adding a custom domain so the canonical/OG URLs pick it up.

No server, database or paid API is required — the page is fully static.

## Project structure

```
src/
  app/            layout (fonts, metadata, JSON-LD), page, sitemap, robots, global styles
  data/           profile.ts, services.ts, skills.ts, projects.ts, experience.ts, content.ts
  components/
    layout/       Navbar, Loader, CustomCursor, SmoothScroll, Footer
    sections/     hero/ (Hero, HeroPortrait), Positioning, About, Services, Skills,
                  Work, Process, Timeline, Results, WhyMe, Contact
    three/        HeroScene, CtaScene, GLSL shaders (lazy-loaded, client-only)
    ui/           MagneticButton, TextReveal, TiltCard, Counter, Icons, ...
  hooks/ lib/     media queries, active section, pointer, gsap/lenis helpers
public/
  images/         portrait-cutout.webp (background removed locally), portrait.webp, og.jpg
```

## Performance & accessibility notes

- WebGL scenes are code-split with `next/dynamic` and only render while on screen (`frameloop="never"` off-screen).
- Mobile gets fewer particles, lower DPR and no light trails; `prefers-reduced-motion` disables WebGL, smooth
  scroll, parallax and pinned sequences while keeping all content visible.
- The custom cursor only runs on fine pointers (mouse/trackpad).
- Semantic sections and headings, skip link, visible focus states, alt text and keyboard-operable menus.

## Updating content

- **Name, bio, contact, SEO copy:** `src/data/profile.ts`
- **Case studies:** `src/data/projects.ts` (only add numbers you can stand behind)
- **Timeline:** `src/data/experience.ts`
- **Services / skills:** `src/data/services.ts`, `src/data/skills.ts`
- **Process, "why me", metrics:** `src/data/content.ts`
- **Photo:** replace `public/images/portrait-cutout.webp` (transparent background) and `public/images/portrait.webp`.
