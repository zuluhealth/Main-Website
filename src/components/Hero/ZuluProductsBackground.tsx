'use client';

import { useEffect, useRef } from 'react';

function createNoise() {
  const perm = new Uint8Array(512);
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

  function fade(t: number) { return t * t * t * (t * (t * 6 - 15) + 10); }
  function lerp(a: number, b: number, t: number) { return a + t * (b - a); }
  function grad(hash: number, x: number, y: number) {
    const h = hash & 3;
    const u = h < 2 ? x : y;
    const v = h < 2 ? y : x;
    return ((h & 1) ? -u : u) + ((h & 2) ? -v : v);
  }

  return function noise2D(x: number, y: number) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const u = fade(xf);
    const v = fade(yf);
    const a = perm[X] + Y;
    const b = perm[X + 1] + Y;
    return lerp(
      lerp(grad(perm[a], xf, yf), grad(perm[b], xf - 1, yf), u),
      lerp(grad(perm[a + 1], xf, yf - 1), grad(perm[b + 1], xf - 1, yf - 1), u),
      v
    );
  };
}

interface Color { r: number; g: number; b: number; }

// Warm brand palette — anchored to Zulu's $color-black (#0D0106) and $color-white (#FBF9FF)
const COLORS: Record<string, Color> = {
  deepBlack:   { r: 13,  g: 1,   b: 6   },
  warmBlack:   { r: 30,  g: 10,  b: 18  },
  maroon:      { r: 70,  g: 22,  b: 32  },
  rust:        { r: 130, g: 55,  b: 50  },
  amber:       { r: 200, g: 130, b: 95  },
  peach:       { r: 235, g: 195, b: 170 },
  cream:       { r: 248, g: 228, b: 218 },
  nearWhite:   { r: 251, g: 249, b: 255 },
};

function lerpColor(c1: Color, c2: Color, t: number): Color {
  return {
    r: c1.r + (c2.r - c1.r) * t,
    g: c1.g + (c2.g - c1.g) * t,
    b: c1.b + (c2.b - c1.b) * t,
  };
}

// Drifting orbs — each contributes a warm glow field.
// Positions are in normalized [0..1] space and animate over time.
interface Orb {
  baseX: number;
  baseY: number;
  ampX: number;
  ampY: number;
  speed: number;
  phase: number;
  radius: number;
  intensity: number;
  color: Color;
}

const ORBS: Orb[] = [
  { baseX: 0.22, baseY: 0.32, ampX: 0.10, ampY: 0.06, speed: 0.55, phase: 0.0, radius: 0.38, intensity: 1.0, color: COLORS.rust },
  { baseX: 0.78, baseY: 0.28, ampX: 0.08, ampY: 0.05, speed: 0.42, phase: 1.7, radius: 0.34, intensity: 0.9, color: COLORS.amber },
  { baseX: 0.50, baseY: 0.72, ampX: 0.12, ampY: 0.04, speed: 0.60, phase: 3.1, radius: 0.40, intensity: 1.0, color: COLORS.maroon },
  { baseX: 0.15, baseY: 0.82, ampX: 0.06, ampY: 0.05, speed: 0.48, phase: 4.5, radius: 0.30, intensity: 0.7, color: COLORS.peach },
  { baseX: 0.88, baseY: 0.78, ampX: 0.07, ampY: 0.06, speed: 0.50, phase: 2.3, radius: 0.32, intensity: 0.8, color: COLORS.rust },
];

export default function ZuluProductsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const grainCanvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseTarget = useRef({ x: 0.5, y: 0.5 });
  const mouseSmoothed = useRef({ x: 0.5, y: 0.5 });
  const mouseActive = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const grainCanvas = grainCanvasRef.current;
    if (!canvas || !grainCanvas) return;

    const ctx = canvas.getContext('2d');
    const grainCtx = grainCanvas.getContext('2d');
    if (!ctx || !grainCtx) return;

    const noise = createNoise();
    let width = 0;
    let height = 0;

    const parentEl = canvas.parentElement!;

    function onMouseMove(e: MouseEvent) {
      const rect = parentEl.getBoundingClientRect();
      mouseTarget.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
      mouseActive.current = true;
    }

    function onMouseLeave() {
      mouseActive.current = false;
      mouseTarget.current = { x: 0.5, y: 0.5 };
    }

    parentEl.addEventListener('mousemove', onMouseMove);
    parentEl.addEventListener('mouseleave', onMouseLeave);

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = parentEl.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = width + 'px';
      canvas!.style.height = height + 'px';
      ctx!.scale(dpr, dpr);

      grainCanvas!.width = width;
      grainCanvas!.height = height;
      grainCanvas!.style.width = width + 'px';
      grainCanvas!.style.height = height + 'px';
      generateGrain();
    }

    function generateGrain() {
      const imageData = grainCtx!.createImageData(width, height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 30;
      }
      grainCtx!.putImageData(imageData, 0, 0);
    }

    function render(time: number) {
      const t = time * 0.00008;
      const step = 6;

      // Smooth mouse interpolation
      const smoothing = 0.04;
      mouseSmoothed.current.x += (mouseTarget.current.x - mouseSmoothed.current.x) * smoothing;
      mouseSmoothed.current.y += (mouseTarget.current.y - mouseSmoothed.current.y) * smoothing;

      const mx = mouseSmoothed.current.x;
      const my = mouseSmoothed.current.y;

      // Compute current orb positions (drifting)
      const orbPositions = ORBS.map((orb) => {
        const phase = t * orb.speed + orb.phase;
        const ox = orb.baseX + Math.sin(phase) * orb.ampX;
        const oy = orb.baseY + Math.cos(phase * 0.85) * orb.ampY;
        return { x: ox, y: oy, orb };
      });

      for (let x = 0; x < width; x += step) {
        for (let y = 0; y < height; y += step) {
          const nx = x / width;
          const ny = y / height;

          // Base = deep warm black
          let mixed: Color = { ...COLORS.deepBlack };

          // Accumulate orb contributions (additive warm glows)
          for (const { x: ox, y: oy, orb } of orbPositions) {
            const dx = nx - ox;
            const dy = ny - oy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const falloff = Math.max(0, 1 - dist / orb.radius);
            const strength = falloff * falloff * (3 - 2 * falloff) * orb.intensity;
            mixed = lerpColor(mixed, orb.color, strength * 0.65);
          }

          // Central warm-black core to ensure legible contrast behind hero text
          const centerDx = nx - 0.5;
          const centerDy = ny - 0.5;
          const centerDist = Math.sqrt(centerDx * centerDx + centerDy * centerDy);
          const coreDarken = Math.max(0, 1 - centerDist / 0.55);
          const coreCurve = coreDarken * coreDarken * 0.35;
          mixed = lerpColor(mixed, COLORS.warmBlack, coreCurve);

          // Mouse cursor glow — warm bloom follows the cursor
          const mdx = nx - mx;
          const mdy = ny - my;
          const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);
          const mouseInfluence = Math.max(0, 1 - mouseDist / 0.3);
          const mouseGlow = mouseInfluence * mouseInfluence * (3 - 2 * mouseInfluence);
          mixed = lerpColor(mixed, COLORS.amber, mouseGlow * 0.35);

          // Organic noise texture
          const n1 = noise(nx * 3.0 + t * 0.5, ny * 3.0 + t * 0.35) * 0.16;
          const n2 = noise(nx * 1.8 - t * 0.3, ny * 1.8 + t * 0.4) * 0.10;
          const n3 = noise(nx * 5.0 + t * 0.7, ny * 5.0 - t * 0.5) * 0.05;
          const noiseShift = n1 + n2 + n3;

          // Warm-biased noise shift
          const r = Math.max(0, Math.min(255, mixed.r + noiseShift * 26));
          const g = Math.max(0, Math.min(255, mixed.g + noiseShift * 18));
          const b = Math.max(0, Math.min(255, mixed.b + noiseShift * 14));

          ctx!.fillStyle = `rgb(${r | 0},${g | 0},${b | 0})`;
          ctx!.fillRect(x, y, step, step);
        }
      }

      ctx!.filter = 'blur(4px)';
      ctx!.drawImage(canvas!, 0, 0, width, height);
      ctx!.filter = 'none';

      animRef.current = requestAnimationFrame(render);
    }

    resize();
    window.addEventListener('resize', resize);
    animRef.current = requestAnimationFrame(render);

    const grainInterval = setInterval(generateGrain, 100);

    return () => {
      window.removeEventListener('resize', resize);
      parentEl.removeEventListener('mousemove', onMouseMove);
      parentEl.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animRef.current);
      clearInterval(grainInterval);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
      <canvas
        ref={grainCanvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }}
      />
    </>
  );
}
