"use client";

import { motion, useReducedMotion } from "framer-motion";
import Magnetic from "./Magnetic";
import SparkField from "./SparkField";
import { HEADLINE, HEADLINE_HIGHLIGHT, HERO, SITE } from "@/lib/content";

function Words({ text, offset, accent }: { text: string; offset: number; accent?: boolean }) {
  const reduce = useReducedMotion();
  const words = text.trim().split(/\s+/);
  return (
    <>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.06em] align-bottom"
        >
          <motion.span
            className={`inline-block whitespace-pre ${accent ? "text-spark" : ""}`}
            initial={reduce ? { opacity: 0 } : { y: "115%" }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            transition={{
              delay: 0.15 + (offset + i) * 0.045,
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}{" "}
          </motion.span>
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const hasHighlight =
    HEADLINE_HIGHLIGHT.length > 0 && HEADLINE.includes(HEADLINE_HIGHLIGHT);
  const before = hasHighlight
    ? HEADLINE.split(HEADLINE_HIGHLIGHT)[0]
    : HEADLINE;
  const beforeCount = before.trim().split(/\s+/).length;

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-20 pt-28"
    >
      <SparkField className="absolute inset-0 h-full w-full" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_95%_at_18%_25%,transparent_45%,#0b0b0c_100%)]"
        aria-hidden="true"
      />

      <span className="label pointer-events-none absolute right-4 top-1/2 hidden origin-right -translate-y-1/2 rotate-90 lg:block">
        {SITE.name} — frontend / builder
      </span>

      <div className="relative mx-auto w-full max-w-[1240px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-3 border border-line px-4 py-2"
        >
          <span className="pulse-dot" aria-hidden="true" />
          <span className="label text-ink">{HERO.status}</span>
        </motion.div>

        <h1 className="mt-9 max-w-[17ch] text-[clamp(2.5rem,7vw,6rem)] font-medium leading-[0.98] tracking-[-0.035em]">
          <Words text={before} offset={0} />
          {hasHighlight && (
            <Words
              text={HEADLINE_HIGHLIGHT}
              offset={beforeCount}
              accent
            />
          )}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
          className="mt-9 max-w-[56ch] text-lg leading-relaxed text-muted"
        >
          {HERO.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7, ease: "easeOut" }}
          className="mt-11 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-3 bg-spark px-8 py-4 text-sm font-medium tracking-wide text-void transition-transform duration-200 hover:scale-[1.02]"
            >
              <span aria-hidden="true">✉</span>
              {HERO.ctaPrimary}
            </a>
          </Magnetic>
          <a
            href="#playground"
            className="inline-flex items-center gap-3 border border-line px-8 py-4 text-sm font-medium tracking-wide transition-colors hover:border-ink hover:text-ink"
          >
            {HERO.ctaSecondary}
            <span aria-hidden="true">↓</span>
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-14 max-w-sm border border-dashed border-line-strong p-5 text-sm leading-relaxed text-muted"
        >
          <span className="label mb-2 block">💡 nota di laboratorio</span>
          {HERO.microcopy}
        </motion.p>
      </div>
    </section>
  );
}
