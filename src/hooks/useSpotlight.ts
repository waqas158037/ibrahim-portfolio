"use client";
import { useCallback } from "react";
import type { PointerEvent } from "react";

/** Writes pointer position into --mx/--my for the `.spot` glow border. */
export function useSpotlight() {
  return useCallback((e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);
}
