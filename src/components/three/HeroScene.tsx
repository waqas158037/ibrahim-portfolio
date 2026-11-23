"use client";
import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { pointer } from "@/lib/pointer";
import { createRandom } from "@/lib/random";
import {
  glowFrag,
  glowVert,
  gridFrag,
  gridVert,
  particleFrag,
  particleVert,
  trailFrag,
  trailVert,
} from "./shaders";

const GREEN = new THREE.Color("#39e58c");

type Props = {
  /** 0..1 scroll progress through the hero, read every frame. */
  progress: { current: number };
  quality: "high" | "low";
  active: boolean;
};

export function Particles({ count }: { count: number }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { gl } = useThree();
  const geo = useMemo(() => {
    const rand = createRandom(count);
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const scale = new Float32Array(count);
    const speed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (rand() - 0.5) * 18;
      pos[i * 3 + 1] = (rand() - 0.5) * 12;
      pos[i * 3 + 2] = -rand() * 10 + 2;
      scale[i] = rand();
      speed[i] = 0.05 + rand() * 0.18;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aScale", new THREE.BufferAttribute(scale, 1));
    g.setAttribute("aSpeed", new THREE.BufferAttribute(speed, 1));
    return g;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 26 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uColor: { value: GREEN },
    }),
    [gl],
  );

  useFrame((_, dt) => {
    if (mat.current) mat.current.uniforms.uTime.value += dt;
  });

  return (
    <points geometry={geo}>
      <shaderMaterial
        ref={mat}
        vertexShader={particleVert}
        fragmentShader={particleFrag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function Glow({ position, scale, intensity = 0.9 }: { position: [number, number, number]; scale: number; intensity?: number }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uColor: { value: GREEN }, uTime: { value: 0 }, uIntensity: { value: intensity } }), [intensity]);
  useFrame((_, dt) => {
    if (mat.current) mat.current.uniforms.uTime.value += dt;
  });
  return (
    <mesh position={position} scale={scale}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={mat}
        vertexShader={glowVert}
        fragmentShader={glowFrag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/** Thin orbital rings around the portrait — "metal + light" detail. */
function Rings({ position, platform = true }: { position: [number, number, number]; platform?: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (!group.current) return;
    group.current.children.forEach((c, i) => {
      c.rotation.z += dt * (i % 2 ? -0.05 : 0.07);
    });
  });
  return (
    <group ref={group} position={position}>
      <mesh rotation={[1.25, 0.15, 0]}>
        <torusGeometry args={[2.35, 0.006, 8, 180]} />
        <meshBasicMaterial color={GREEN} transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[1.35, -0.25, 0.4]}>
        <torusGeometry args={[2.9, 0.004, 8, 180]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.16} />
      </mesh>
      <mesh rotation={[1.45, 0.1, 1]}>
        <torusGeometry args={[3.6, 0.003, 8, 200, Math.PI * 1.2]} />
        <meshBasicMaterial color={GREEN} transparent opacity={0.25} />
      </mesh>
      {/* Platform disc */}
      {platform && (
      <>
      <mesh position={[0, -2.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.2, 1.24, 96]} />
        <meshBasicMaterial color={GREEN} transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -2.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.7, 1.71, 96]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.12} side={THREE.DoubleSide} />
      </mesh>
      </>
      )}
    </group>
  );
}

/** Data-stream light trails rising behind the portrait. */
function Trails({ origin }: { origin: [number, number, number] }) {
  const mats = useRef<THREE.ShaderMaterial[]>([]);
  const curves = useMemo(() => {
    const rand = createRandom(7);
    const rnd = (a: number, b: number) => a + rand() * (b - a);
    return Array.from({ length: 5 }, (_, i) => {
      const side = i % 2 ? 1 : -1;
      const pts = [
        new THREE.Vector3(side * rnd(1.8, 2.8), -3.2, rnd(-3, -1)),
        new THREE.Vector3(side * rnd(1.2, 2), rnd(-1.5, -0.5), rnd(-2.5, -1)),
        new THREE.Vector3(side * rnd(0.6, 1.4), rnd(0.5, 1.5), rnd(-2, -1)),
        new THREE.Vector3(side * rnd(0.2, 1.2), 3.2, rnd(-3, -1.5)),
      ];
      return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 90, 0.008, 6, false);
    });
  }, []);
  useFrame((_, dt) => {
    mats.current.forEach((m) => m && (m.uniforms.uTime.value += dt));
  });
  return (
    <group position={origin}>
      {curves.map((g, i) => (
        <mesh key={i} geometry={g}>
          <shaderMaterial
            ref={(m) => {
              if (m) mats.current[i] = m;
            }}
            vertexShader={trailVert}
            fragmentShader={trailFrag}
            uniforms={{ uColor: { value: GREEN }, uTime: { value: 0 }, uOffset: { value: i * 0.21 } }}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

function Floor() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uColor: { value: new THREE.Color("#7cf5b8") }, uTime: { value: 0 } }), []);
  useFrame((_, dt) => {
    if (mat.current) mat.current.uniforms.uTime.value += dt;
  });
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.2, -2]}>
      <planeGeometry args={[30, 24]} />
      <shaderMaterial ref={mat} vertexShader={gridVert} fragmentShader={gridFrag} uniforms={uniforms} transparent depthWrite={false} />
    </mesh>
  );
}

/** Abstract metallic geometry — a single slow-turning icosahedron wire. */
function Accent({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s, dt) => {
    if (!ref.current) return;
    ref.current.rotation.x += dt * 0.15;
    ref.current.rotation.y += dt * 0.2;
    ref.current.position.y = position[1] + Math.sin(s.clock.elapsedTime * 0.6) * 0.15;
  });
  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={[0.38, 0]} />
      <meshBasicMaterial color="#cfe9db" wireframe transparent opacity={0.35} />
    </mesh>
  );
}

function Rig({ progress, focusX }: { progress: Props["progress"]; focusX: number }) {
  const target = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ camera }, dt) => {
    const k = 1 - Math.exp(-dt * 3);
    const p = progress.current;
    // mouse X shifts camera, Y tilts; scroll pushes the camera deeper into the scene
    camera.position.x += (pointer.x * 0.6 - camera.position.x) * k;
    camera.position.y += (-pointer.y * 0.35 + 0.2 - p * 0.6 - camera.position.y) * k;
    camera.position.z += (8 - p * 3.5 - camera.position.z) * k;
    target.set(focusX * 0.15, -p * 0.4, -2);
    camera.lookAt(target);
  });
  return null;
}

function Scene({ progress, quality }: Omit<Props, "active">) {
  const { viewport, size } = useThree();
  const wide = size.width >= 1024;
  // Light source sits behind the portrait: right column on desktop, centered on mobile.
  const focusX = wide ? viewport.width * 0.27 : 0;
  const focusY = wide ? 0 : 1.6;
  const high = quality === "high";

  return (
    <>
      <fog attach="fog" args={["#050505", 6, 18]} />
      <Rig progress={progress} focusX={focusX} />
      <Glow position={[focusX, focusY + 0.6, -3]} scale={wide ? 10 : 7} intensity={0.75} />
      <Glow position={[focusX - 7, focusY + 3, -10]} scale={8} intensity={0.3} />
      <Rings position={[focusX, focusY, -1.6]} platform={wide} />
      {high && <Trails origin={[focusX, focusY, 0]} />}
      <Particles count={high ? 900 : 280} />
      <Floor />
      {high && <Accent position={[focusX - 2.6, 1.9, -2]} />}
      {high && <Accent position={[focusX + 2.9, -1.2, -2.5]} />}
    </>
  );
}

export default function HeroScene({ progress, quality, active }: Props) {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0.2, 8], fov: 45, near: 0.1, far: 40 }}
      dpr={quality === "high" ? [1, 1.75] : [1, 1.25]}
      gl={{ antialias: quality === "high", alpha: true, powerPreference: "high-performance" }}
      frameloop={active ? "always" : "never"}
      aria-hidden
    >
      <Scene progress={progress} quality={quality} />
    </Canvas>
  );
}
