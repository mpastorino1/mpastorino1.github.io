"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import Reveal from "./Reveal";
import { PLAYGROUND } from "@/lib/content";

function ProjectCard({
  index,
  tag,
  title,
  text,
  tall = false,
  className = "",
}: {
  index: number;
  tag: string;
  title: string;
  text: string;
  tall?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [3.5, -3.5]), {
    stiffness: 160,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-4.5, 4.5]), {
    stiffness: 160,
    damping: 18,
  });

  return (
    <motion.article
      ref={ref}
      style={
        reduce ? undefined : { rotateX, rotateY, transformPerspective: 1000 }
      }
      onPointerMove={(e) => {
        if (reduce || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        mx.set((e.clientX - rect.left) / rect.width - 0.5);
        my.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className={`group relative flex h-full flex-col justify-between border border-line bg-panel p-8 transition-colors hover:border-line-strong ${className}`}
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="label">{tag}</span>
        <span className="font-mono text-xs text-spark">0{index + 1}</span>
      </div>

      <div className={tall ? "mt-28" : "mt-14"}>
        <h3 className="text-[clamp(1.5rem,2.4vw,2.3rem)] font-medium leading-[1.05] tracking-[-0.02em]">
          {title}
        </h3>
        <span
          aria-hidden="true"
          className="mt-4 block h-px w-0 bg-spark transition-all duration-500 group-hover:w-24"
        />
        <p className="mt-5 max-w-[46ch] leading-relaxed text-muted">{text}</p>
      </div>

      <div className="mt-12 flex items-center justify-between">
        <span className="label">esperimento</span>
        <span
          aria-hidden="true"
          className="font-mono text-lg text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-spark"
        >
          →
        </span>
      </div>
    </motion.article>
  );
}

export default function Playground() {
  const [first, second, third] = PLAYGROUND.projects;

  return (
    <section id="playground" className="relative border-t border-line py-28">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal>
          <div className="flex items-baseline justify-between gap-6 border-b border-line pb-5">
            <span className="label">04 / {PLAYGROUND.label}</span>
            <span className="label">lab aperto</span>
          </div>
          <h2 className="mt-12 text-[clamp(1.7rem,3.2vw,2.8rem)] font-medium tracking-[-0.02em]">
            {PLAYGROUND.title}
          </h2>
          <p className="mt-4 max-w-[52ch] leading-relaxed text-muted">
            {PLAYGROUND.subtitle}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-12 lg:grid-rows-2">
          <Reveal className="lg:col-span-7 lg:row-span-2">
            <ProjectCard
              index={0}
              tag={first.tag}
              title={first.title}
              text={first.text}
              tall
            />
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.08}>
            <ProjectCard
              index={1}
              tag={second.tag}
              title={second.title}
              text={second.text}
            />
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.16}>
            <ProjectCard
              index={2}
              tag={third.tag}
              title={third.title}
              text={third.text}
            />
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 border border-dashed border-line-strong p-6 leading-relaxed text-muted">
            <span className="label mr-3">🚧 in cantiere</span>
            {PLAYGROUND.callout}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
