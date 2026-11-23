export const particleVert = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  attribute float aScale;
  attribute float aSpeed;
  varying float vAlpha;
  varying float vTint;
  void main() {
    vec3 p = position;
    // slow upward drift with wrap, plus gentle sway
    p.y = mod(p.y + uTime * aSpeed + 6.0, 12.0) - 6.0;
    p.x += sin(uTime * 0.25 + position.z * 1.7) * 0.15;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -mv.z);
    // fade near wrap edges and by depth
    float edge = smoothstep(-6.0, -4.5, p.y) * (1.0 - smoothstep(4.5, 6.0, p.y));
    vAlpha = edge * clamp(1.4 - (-mv.z) * 0.08, 0.15, 1.0);
    vTint = aScale;
  }
`;

export const particleFrag = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;
  varying float vTint;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    a *= a;
    vec3 col = mix(vec3(1.0), uColor, step(0.55, vTint));
    gl_FragColor = vec4(col, a * vAlpha * 0.9);
  }
`;

export const glowVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const glowFrag = /* glsl */ `
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uIntensity;
  varying vec2 vUv;
  void main() {
    vec2 c = vUv - 0.5;
    float d = length(c);
    float breathe = 0.92 + 0.08 * sin(uTime * 0.8);
    float core = smoothstep(0.5, 0.0, d);
    float g = pow(core, 2.6) * breathe;
    float hot = pow(smoothstep(0.22, 0.0, d), 3.0) * 0.6;
    vec3 col = uColor * g + vec3(0.85, 1.0, 0.92) * hot;
    gl_FragColor = vec4(col * uIntensity, (g + hot) * uIntensity);
  }
`;

export const trailVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const trailFrag = /* glsl */ `
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uOffset;
  varying vec2 vUv;
  void main() {
    // a bright pulse travelling along the tube's length (uv.x)
    float t = fract(uTime * 0.12 + uOffset);
    float head = smoothstep(t - 0.18, t, vUv.x) * (1.0 - smoothstep(t, t + 0.015, vUv.x));
    float base = 0.06;
    float fade = smoothstep(0.0, 0.15, vUv.x) * (1.0 - smoothstep(0.85, 1.0, vUv.x));
    float a = (base + head * 0.9) * fade;
    gl_FragColor = vec4(uColor * (0.6 + head), a);
  }
`;

export const gridVert = /* glsl */ `
  varying vec3 vWorld;
  void main() {
    vec4 w = modelMatrix * vec4(position, 1.0);
    vWorld = w.xyz;
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`;

export const gridFrag = /* glsl */ `
  uniform vec3 uColor;
  uniform float uTime;
  varying vec3 vWorld;
  float line(float v, float w) {
    float f = abs(fract(v - 0.5) - 0.5) / fwidth(v);
    return 1.0 - min(f / w, 1.0);
  }
  void main() {
    vec2 p = vWorld.xz;
    p.y += uTime * 0.25;
    float g = max(line(p.x, 1.0), line(p.y, 1.0));
    float dist = length(vWorld.xz - vec2(0.0, -2.0));
    float fade = 1.0 - smoothstep(2.0, 11.0, dist);
    gl_FragColor = vec4(uColor, g * fade * 0.22);
  }
`;
