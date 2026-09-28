"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  life: number;
  maxLife: number;
  warm: boolean;
};

/**
 * Campo di scintille: braci che salgono, vento reagendo al puntatore.
 * Nessuna dipendenza — canvas 2D puro, rispetta prefers-reduced-motion.
 */
export default function SparkField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = performance.now();
    let particles: Particle[] = [];
    const pointer = { x: -10000, y: -10000, active: false };

    const make = (initial: boolean): Particle => {
      const maxLife = 2.5 + Math.random() * 4;
      return {
        x: Math.random() * Math.max(w, 1),
        y: initial ? Math.random() * Math.max(h, 1) : h + 20 + Math.random() * 60,
        vx: (Math.random() - 0.5) * 12,
        vy: -(12 + Math.random() * 30),
        r: 0.6 + Math.random() * 1.9,
        life: initial ? Math.random() * maxLife : 0,
        maxLife,
        warm: Math.random() > 0.25,
      };
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, w, h);

      if (pointer.active) {
        const glow = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          190,
        );
        glow.addColorStop(0, "rgba(255, 90, 31, 0.10)");
        glow.addColorStop(1, "rgba(255, 90, 31, 0)");
        ctx.fillStyle = glow;
        ctx.fillRect(pointer.x - 190, pointer.y - 190, 380, 380);
      }

      for (const p of particles) {
        if (dt > 0) {
          p.life += dt;
          p.vx += Math.sin((p.life + p.x) * 0.7) * 2 * dt;
          p.vy -= 2 * dt;

          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (pointer.active && d2 < 25600 && d2 > 1) {
            const d = Math.sqrt(d2);
            const force = (1 - d / 160) * 280;
            p.vx += (dx / d) * force * dt;
            p.vy += (dy / d) * force * dt;
          }

          p.x += p.vx * dt;
          p.y += p.vy * dt;

          if (p.life > p.maxLife || p.y < -40 || p.x < -60 || p.x > w + 60) {
            Object.assign(p, make(false));
          }
        }

        const t = Math.min(1, Math.max(0, p.life / p.maxLife));
        const flicker = 0.55 + 0.45 * Math.sin(p.life * 6 + p.r * 10);
        const alpha = Math.sin(t * Math.PI) * 0.9 * flicker;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.warm
          ? `rgba(255, 120, 50, ${alpha})`
          : `rgba(244, 241, 234, ${alpha * 0.5})`;
        ctx.fill();
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(rect.width, 1);
      h = Math.max(rect.height, 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(140, (w * h) / 13000));
      particles = Array.from({ length: count }, () => make(true));
      if (reduce) draw(0);
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      draw(dt);
      raf = requestAnimationFrame(loop);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    if (!reduce) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
