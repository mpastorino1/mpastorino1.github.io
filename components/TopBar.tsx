"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { SITE } from "@/lib/content";

const LINKS = [
  { href: "#approccio", label: "Approccio" },
  { href: "#stack", label: "Stack" },
  { href: "#playground", label: "Playground" },
  { href: "#contatti", label: "Contatti" },
];

export default function TopBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  });

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-void/85 backdrop-blur-md">
      <motion.div
        style={{ scaleX }}
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-spark"
        aria-hidden="true"
      />
      <div className="mx-auto flex h-14 max-w-[1240px] items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-3">
          <span className="font-mono text-sm font-medium tracking-widest text-ink">
            {SITE.shortName}
          </span>
          <span className="label hidden sm:block">{SITE.role}</span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="label transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href={`mailto:${SITE.email}`}
          className="label border border-line px-3 py-2 transition-colors hover:border-spark hover:text-spark"
        >
          Scrivimi
        </a>
      </div>
    </header>
  );
}
