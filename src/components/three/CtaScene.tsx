"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { pointer } from "@/lib/pointer";
import { Glow, Particles } from "./HeroScene";

function Drift() {
  const g = useRef<Group>(null);
  useFrame(({ camera }, dt) => {
    const k = 1 - Math.exp(-dt * 2);
    camera.position.x += (pointer.x * 0.5 - camera.position.x) * k;
    camera.position.y += (-pointer.y * 0.3 - camera.position.y) * k;
    camera.lookAt(0, 0, -3);
    if (g.current) g.current.rotation.z += dt * 0.03;
  });
  return (
    <group ref={g}>
      <mesh position={[0, 0, -2]} rotation={[0.2, 0, 0]}>
        <torusGeometry args={[3.2, 0.005, 8, 200]} />
        <meshBasicMaterial color="#39e58c" transparent opacity={0.45} />
      </mesh>
      <mesh position={[0, 0, -2.5]} rotation={[0.2, 0, 0]}>
        <torusGeometry args={[4.4, 0.004, 8, 200]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

/** Final-scene backdrop: a green light source, rings and drifting particles. */
export default function CtaScene({ active, quality }: { active: boolean; quality: "high" | "low" }) {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={quality === "high" ? [1, 1.5] : 1}
      gl={{ antialias: false, alpha: true }}
      frameloop={active ? "always" : "never"}
      aria-hidden
    >
      <Glow position={[0, -1.5, -5]} scale={14} intensity={0.45} />
      <Drift />
      <Particles count={quality === "high" ? 600 : 220} />
    </Canvas>
  );
}
