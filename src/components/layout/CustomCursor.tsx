"use client";
import { useEffect, useRef } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/useReducedMotion";

type CursorState = "default" | "hover" | "cta" | "view";

/**
 * Desktop-only cursor: a dot that tracks exactly and a ring that trails.
 * Elements opt in with data-cursor="hover" | "cta" | "view" (links/buttons default to hover).
 * Uses a single rAF loop and transforms only.
 */
export function CustomCursor() {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!fine) return;
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const pos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let state: CursorState = "default";
    let magnet: HTMLElement | null = null;
    let visible = false;
    let raf = 0;

    const setState = (next: CursorState, text = "") => {
      if (next === state) return;
      state = next;
      ring.current?.setAttribute("data-state", next);
      dot.current?.setAttribute("data-state", next);
      if (label.current) label.current.textContent = text;
    };

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!visible) {
        visible = true;
        ringPos.x = pos.x;
        ringPos.y = pos.y;
        ring.current?.style.setProperty("opacity", "1");
        dot.current?.style.setProperty("opacity", "1");
      }
    };

    const onOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button");
      if (!target) {
        magnet = null;
        setState("default");
        return;
      }
      const kind = (target.dataset.cursor as CursorState | undefined) ?? "hover";
      magnet = kind === "cta" || target.dataset.magnetic !== undefined ? target : null;
      setState(kind, target.dataset.cursorLabel ?? "");
    };

    const onLeave = () => {
      visible = false;
      ring.current?.style.setProperty("opacity", "0");
      dot.current?.style.setProperty("opacity", "0");
    };

    const loop = () => {
      let tx = pos.x;
      let ty = pos.y;
      if (magnet && state === "cta") {
        const r = magnet.getBoundingClientRect();
        tx = r.left + r.width / 2 + (pos.x - (r.left + r.width / 2)) * 0.25;
        ty = r.top + r.height / 2 + (pos.y - (r.top + r.height / 2)) * 0.25;
      }
      const k = reduced ? 1 : 0.18;
      ringPos.x += (tx - ringPos.x) * k;
      ringPos.y += (ty - ringPos.y) * k;
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      root.classList.remove("has-custom-cursor");
    };
  }, [fine, reduced]);

  if (!fine) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[300]">
      <div
        ref={ring}
        data-state="default"
        className="cursor-ring absolute left-0 top-0 opacity-0 transition-opacity duration-300"
      >
        <span className="cursor-ring-inner">
          <span ref={label} className="cursor-label" />
        </span>
      </div>
      <div ref={dot} data-state="default" className="cursor-dot absolute left-0 top-0 opacity-0" />
    </div>
  );
}
