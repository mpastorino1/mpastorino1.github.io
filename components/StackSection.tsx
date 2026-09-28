"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { STACK } from "@/lib/content";

type Body = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
};

type DragState = {
  i: number;
  ox: number;
  oy: number;
  sx: number;
  sy: number;
  lt: number;
  vx: number;
  vy: number;
  moved: boolean;
};

const GRAVITY = 2200;
const RESTITUTION = 0.42;

// Chip "core" resi più grandi: gerarchia reale nel sandbox
const CORE = new Set(["Next.js", "React", "TypeScript", "Expo", "Node.js"]);

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

/**
 * "L'officina": i badge dello stack sono corpi fisici.
 * Trascinali, lanciali contro le pareti, cliccali per i dettagli.
 * AABB + gravità, zero dipendenze.
 */
export default function StackSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const bodies = useRef<Body[]>([]);
  const slots = useRef<Array<{ x: number; y: number }>>([]);
  const mode = useRef<"free" | "tidy">("free");
  const dragRef = useRef<DragState | null>(null);
  const visible = useRef(true);
  const reduceRef = useRef(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    reduceRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const layout = () => {
      const rect = wrap.getBoundingClientRect();
      const pad = 20;
      const gap = 12;
      const chips = chipRefs.current;
      const nextSlots: Array<{ x: number; y: number }> = [];
      let x = pad;
      let y = pad;
      let rowH = 0;

      chips.forEach((el, i) => {
        if (!el) return;
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        if (x + w + pad > rect.width) {
          x = pad;
          y += rowH + gap;
          rowH = 0;
        }
        nextSlots[i] = { x: x + w / 2, y: y + h / 2 };
        x += w + gap;
        rowH = Math.max(rowH, h);
      });
      slots.current = nextSlots;

      if (bodies.current.length !== chips.length) {
        bodies.current = nextSlots.map((s, i) => {
          const el = chipRefs.current[i];
          const w = el ? el.offsetWidth : 100;
          const h = el ? el.offsetHeight : 40;
          return {
            x: s.x,
            y: reduceRef.current ? s.y : -80 - i * 46,
            vx: 0,
            vy: 0,
            w,
            h,
          };
        });
        if (reduceRef.current) mode.current = "tidy";
        setReady(true);
      } else {
        bodies.current.forEach((b, i) => {
          const el = chipRefs.current[i];
          if (el) {
            b.w = el.offsetWidth;
            b.h = el.offsetHeight;
          }
          b.x = clamp(b.x, b.w / 2, rect.width - b.w / 2);
          b.y = clamp(b.y, b.h / 2, rect.height - b.h / 2);
        });
      }
    };

    const tick = (dt: number) => {
      const W = wrap.clientWidth;
      const H = wrap.clientHeight;
      const bs = bodies.current;
      const tidy = mode.current === "tidy";
      const dragI = dragRef.current ? dragRef.current.i : -1;

      for (let i = 0; i < bs.length; i++) {
        const b = bs[i];
        if (dragI === i) continue;

        if (tidy) {
          const s = slots.current[i];
          if (s) {
            b.x += (s.x - b.x) * Math.min(1, dt * 10);
            b.y += (s.y - b.y) * Math.min(1, dt * 10);
            b.vx = 0;
            b.vy = 0;
          }
          continue;
        }

        b.vy += GRAVITY * dt;
        b.x += b.vx * dt;
        b.y += b.vy * dt;

        if (b.x - b.w / 2 < 0) {
          b.x = b.w / 2;
          b.vx = Math.abs(b.vx) * RESTITUTION;
        } else if (b.x + b.w / 2 > W) {
          b.x = W - b.w / 2;
          b.vx = -Math.abs(b.vx) * RESTITUTION;
        }

        if (b.y + b.h / 2 > H) {
          b.y = H - b.h / 2;
          b.vy = -Math.abs(b.vy) * RESTITUTION;
          b.vx *= 0.9;
          if (Math.abs(b.vy) < 45) b.vy = 0;
          if (Math.abs(b.vx) < 6) b.vx = 0;
        } else if (b.y - b.h / 2 < -400) {
          b.y = -400 + b.h / 2;
          b.vy = Math.abs(b.vy) * 0.3;
        }
      }

      // collisioni AABB fra chip
      for (let i = 0; i < bs.length; i++) {
        for (let j = i + 1; j < bs.length; j++) {
          const a = bs[i];
          const c = bs[j];
          const dx = c.x - a.x;
          const dy = c.y - a.y;
          const ox = (a.w + c.w) / 2 - Math.abs(dx);
          const oy = (a.h + c.h) / 2 - Math.abs(dy);
          if (ox <= 0 || oy <= 0) continue;

          const aFixed = dragI === i;
          const cFixed = dragI === j;

          if (ox < oy) {
            const push = (ox / 2) * (dx < 0 ? -1 : 1);
            if (!aFixed) a.x -= push;
            if (!cFixed) c.x += push;
            const av = a.vx;
            const cv = c.vx;
            if (!aFixed) a.vx = cv * 0.4;
            if (!cFixed) c.vx = av * 0.4;
          } else {
            const push = (oy / 2) * (dy < 0 ? -1 : 1);
            if (!aFixed) a.y -= push;
            if (!cFixed) c.y += push;
            const av = a.vy;
            const cv = c.vy;
            if (!aFixed) a.vy = cv * 0.3;
            if (!cFixed) c.vy = av * 0.3;
          }
        }
      }

      for (let i = 0; i < bs.length; i++) {
        const el = chipRefs.current[i];
        const b = bs[i];
        if (el) {
          el.style.transform = `translate3d(${b.x - b.w / 2}px, ${b.y - b.h / 2}px, 0)`;
        }
      }
    };

    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(wrap);
    const io = new IntersectionObserver(
      (entries) => {
        visible.current = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 },
    );
    io.observe(wrap);

    let raf = 0;
    let last = performance.now();
    const step = (now: number) => {
      const dt = Math.min(0.034, (now - last) / 1000);
      last = now;
      if (visible.current) tick(dt);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  const pointerDown = (i: number) => (e: React.PointerEvent<HTMLButtonElement>) => {
    const wrap = wrapRef.current;
    const b = bodies.current[i];
    if (!wrap || !b) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const rect = wrap.getBoundingClientRect();
    dragRef.current = {
      i,
      ox: e.clientX - rect.left - b.x,
      oy: e.clientY - rect.top - b.y,
      sx: e.clientX,
      sy: e.clientY,
      lt: performance.now(),
      vx: 0,
      vy: 0,
      moved: false,
    };
    mode.current = "free";
  };

  const pointerMove = (i: number) => (e: React.PointerEvent<HTMLButtonElement>) => {
    const d = dragRef.current;
    const wrap = wrapRef.current;
    const b = bodies.current[i];
    if (!d || d.i !== i || !wrap || !b) return;
    const rect = wrap.getBoundingClientRect();
    const nx = e.clientX - rect.left - d.ox;
    const ny = e.clientY - rect.top - d.oy;
    const now = performance.now();
    const dt = Math.max(8, now - d.lt) / 1000;
    d.vx = (nx - b.x) / dt;
    d.vy = (ny - b.y) / dt;
    d.lt = now;
    if (Math.abs(e.clientX - d.sx) + Math.abs(e.clientY - d.sy) > 5) {
      d.moved = true;
    }
    b.x = nx;
    b.y = ny;
  };

  const pointerUp = (i: number) => () => {
    const d = dragRef.current;
    const b = bodies.current[i];
    if (!d || d.i !== i || !b) return;
    if (d.moved) {
      b.vx = clamp(d.vx, -1600, 1600);
      b.vy = clamp(d.vy, -1600, 1600);
      mode.current = "free";
    } else {
      b.vx = 0;
      b.vy = 0;
      setSelected((cur) => (cur === i ? null : i));
    }
    dragRef.current = null;
  };

  const shuffle = () => {
    mode.current = "free";
    setSelected(null);
    bodies.current.forEach((b) => {
      b.vx = (Math.random() - 0.5) * 1800;
      b.vy = -400 - Math.random() * 900;
    });
  };

  const tidyUp = () => {
    setSelected(null);
    mode.current = "tidy";
    window.setTimeout(() => {
      if (dragRef.current === null) mode.current = "free";
    }, 1600);
  };

  const note =
    selected !== null && STACK.chips[selected]
      ? STACK.chips[selected].note
      : STACK.philosophy;

  return (
    <section id="stack" className="relative border-t border-line py-28">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal>
          <div className="flex items-baseline justify-between gap-6 border-b border-line pb-5">
            <span className="label">03 / {STACK.label}</span>
            <span className="label">{STACK.hint}</span>
          </div>
          <h2 className="mt-12 text-[clamp(1.7rem,3.2vw,2.8rem)] font-medium tracking-[-0.02em]">
            {STACK.title}
          </h2>
          <p className="mt-4 max-w-[52ch] leading-relaxed text-muted">
            {STACK.tagline}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div
            ref={wrapRef}
            className="sandbox-grid relative mt-12 h-[420px] overflow-hidden border border-line bg-panel select-none sm:h-[460px]"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center justify-center whitespace-nowrap font-mono text-[clamp(2.5rem,9vw,6.5rem)] font-medium tracking-[0.3em] text-ink opacity-[0.05]"
            >
              L&apos;OFFICINA
            </span>
            <div className="pointer-events-none absolute left-4 top-4 z-10">
              <span className="label">
                {selected !== null ? "selezionato" : "sandbox"}
              </span>
            </div>
            <div className="absolute right-3 top-3 z-10 flex gap-2">
              <button
                type="button"
                onClick={shuffle}
                className="label border border-line bg-void px-3 py-2 transition-colors hover:border-spark hover:text-spark"
              >
                rimescola
              </button>
              <button
                type="button"
                onClick={tidyUp}
                className="label border border-line bg-void px-3 py-2 transition-colors hover:border-spark hover:text-spark"
              >
                riordina
              </button>
            </div>

            {STACK.chips.map((chip, i) => (
              <button
                key={chip.label}
                type="button"
                ref={(el) => {
                  chipRefs.current[i] = el;
                }}
                onPointerDown={pointerDown(i)}
                onPointerMove={pointerMove(i)}
                onPointerUp={pointerUp(i)}
                onPointerCancel={pointerUp(i)}
                aria-pressed={selected === i}
                className={`chip rounded-full border font-medium transition-colors ${
                  ready ? "opacity-100" : "opacity-0"
                } ${
                  CORE.has(chip.label)
                    ? "px-5 py-3 text-base"
                    : "px-3.5 py-2 text-xs"
                } ${
                  selected === i
                    ? "border-spark bg-spark text-void"
                    : "border-line-strong bg-void hover:border-spark hover:text-spark"
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </Reveal>

        <p
          aria-live="polite"
          className="mt-5 min-h-[1.5rem] font-mono text-sm text-muted"
        >
          <span className="label mr-3">
            {selected !== null ? STACK.chips[selected].label : "filosofia"}
          </span>
          {note}
        </p>
      </div>
    </section>
  );
}
