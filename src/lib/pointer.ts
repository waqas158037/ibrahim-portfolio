"use client";

/**
 * One shared, passive pointer tracker (normalized -1..1) read inside animation loops,
 * so WebGL scenes and DOM parallax don't each register their own listeners.
 */
export const pointer = { x: 0, y: 0, active: false };

let attached = false;
export function attachPointer() {
  if (attached || typeof window === "undefined") return;
  attached = true;
  window.addEventListener(
    "pointermove",
    (e) => {
      if (e.pointerType !== "mouse") return;
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
      pointer.active = true;
    },
    { passive: true },
  );
}
