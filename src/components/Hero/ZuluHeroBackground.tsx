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

const COLORS: Record<string, Color> = {
  deepNavy:    { r: 10,  g: 18,  b: 50  },
  richNavy:    { r: 15,  g: 30,  b: 75  },
  royalBlue:   { r: 30,  g: 70,  b: 160 },
  vibrantBlue: { r: 50,  g: 110, b: 200 },
  skyBlue:     { r: 90,  g: 150, b: 220 },
  powderBlue:  { r: 160, g: 195, b: 230 },
  lightWash:   { r: 215, g: 228, b: 240 },
  nearWhite:   { r: 238, g: 243, b: 248 },
};

function lerpColor(c1: Color, c2: Color, t: number): Color {
  return {
    r: c1.r + (c2.r - c1.r) * t,
    g: c1.g + (c2.g - c1.g) * t,
    b: c1.b + (c2.b - c1.b) * t,
  };
}

// Static wave center — animated wave offset is added in render()
function getBaseColor(nx: number, ny: number, waveOffset: number): Color {
  // S/Z-wave curtain: the blue band snakes across the canvas
  // The "center line" of the wave undulates based on horizontal position
  const waveCenterY = 0.48
    + Math.sin(nx * Math.PI * 2.2 + waveOffset) * 0.15
    + Math.sin(nx * Math.PI * 1.1 + waveOffset * 0.6) * 0.08;

  // Distance from the wave center line (vertical only — creates a band/curtain)
  const dist = Math.abs(ny - waveCenterY);

  // Close to wave center = deep blue, far = white edges
  if (dist < 0.08) {
    return lerpColor(COLORS.royalBlue, COLORS.vibrantBlue, dist / 0.08);
  } else if (dist < 0.18) {
    return lerpColor(COLORS.vibrantBlue, COLORS.skyBlue, (dist - 0.08) / 0.1);
  } else if (dist < 0.3) {
    return lerpColor(COLORS.skyBlue, COLORS.powderBlue, (dist - 0.18) / 0.12);
  } else if (dist < 0.45) {
    return lerpColor(COLORS.powderBlue, COLORS.lightWash, (dist - 0.3) / 0.15);
  }
  return lerpColor(COLORS.lightWash, COLORS.nearWhite, Math.min((dist - 0.45) / 0.2, 1));
}

export default function ZuluHeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const grainCanvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  // Mouse position: target (raw) and smoothed (interpolated for fluid lag)
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
      // Drift back to neutral center
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

      // Smooth mouse interpolation — fluid lag (lerp ~4% per frame)
      const smoothing = 0.04;
      mouseSmoothed.current.x += (mouseTarget.current.x - mouseSmoothed.current.x) * smoothing;
      mouseSmoothed.current.y += (mouseTarget.current.y - mouseSmoothed.current.y) * smoothing;

      const mx = mouseSmoothed.current.x;
      const my = mouseSmoothed.current.y;

      // Mouse influence on wave: shifts the wave vertically and bends it
      const mouseWaveShift = (my - 0.5) * 0.12;  // vertical pull
      const mouseWaveBend = (mx - 0.5) * 0.3;    // horizontal phase shift

      // Animated wave offset — the curtain slowly drifts
      const waveOffset = t * 0.4 + mouseWaveBend;

      for (let x = 0; x < width; x += step) {
        for (let y = 0; y < height; y += step) {
          const nx = x / width;
          const ny = y / height;

          // Mouse proximity — creates a local displacement ripple
          const mdx = nx - mx;
          const mdy = ny - my;
          const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);
          const mouseInfluence = Math.max(0, 1 - mouseDist / 0.35);
          const mouseRipple = mouseInfluence * mouseInfluence * 0.08;

          const color = getBaseColor(nx, ny + mouseWaveShift, waveOffset);

          // Noise for organic texture along the wave
          const n1 = noise(nx * 3.0 + t * 0.5, ny * 3.0 + t * 0.35) * 0.16;
          const n2 = noise(nx * 1.8 - t * 0.3, ny * 1.8 + t * 0.4) * 0.10;
          const n3 = noise(nx * 5.0 + t * 0.7, ny * 5.0 - t * 0.5) * 0.05;

          // Compute wave center at this x for bloom placement
          const waveCenterY = 0.48 + mouseWaveShift
            + Math.sin(nx * Math.PI * 2.2 + waveOffset) * 0.15
            + Math.sin(nx * Math.PI * 1.1 + waveOffset * 0.6) * 0.08
            + mouseRipple * Math.sin((nx - mx) * Math.PI * 4.0); // local ripple

          // Blue intensity bloom that rides along the wave crest
          const waveDistFromCenter = Math.abs(ny - waveCenterY);
          const waveBloom = Math.max(0, 1 - waveDistFromCenter / 0.12);
          const waveBloomCurve = waveBloom * waveBloom * (3 - 2 * waveBloom);

          // Travelling bright spot along the wave
          const spotX = (Math.sin(t * 0.35) * 0.5 + 0.5);
          const spotDx = nx - spotX;
          const spotStrength = Math.max(0, 1 - Math.abs(spotDx) / 0.25);
          const spotCurve = spotStrength * spotStrength * waveBloomCurve;

          // Mouse cursor glow — bright blue bloom follows the cursor
          const mouseGlow = mouseInfluence * mouseInfluence * (3 - 2 * mouseInfluence);

          const noiseShift = n1 + n2 + n3;

          // Intensify blue along wave crest
          let mixed = lerpColor(color, COLORS.vibrantBlue, waveBloomCurve * 0.5);
          // Travelling bright spot adds extra vibrancy
          mixed = lerpColor(mixed, COLORS.skyBlue, spotCurve * 0.6);
          // Cursor glow — pulls nearby pixels toward bright blue
          mixed = lerpColor(mixed, COLORS.skyBlue, mouseGlow * 0.45);

          // Noise as subtle color shift — blue-biased
          const r = Math.max(0, Math.min(255, mixed.r + noiseShift * 18));
          const g = Math.max(0, Math.min(255, mixed.g + noiseShift * 20));
          const b = Math.max(0, Math.min(255, mixed.b + noiseShift * 26));

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
