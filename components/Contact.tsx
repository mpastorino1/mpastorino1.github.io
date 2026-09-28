"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";
import { CONTACT, HERO, SITE } from "@/lib/content";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = SITE.email;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contatti" className="relative border-t border-line py-28">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal>
          <div className="flex items-baseline justify-between gap-6 border-b border-line pb-5">
            <span className="label">05 / {CONTACT.label}</span>
            <span className="label">zero barriere</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-12 max-w-[18ch] text-[clamp(2rem,5.4vw,4.4rem)] font-medium leading-[1.02] tracking-[-0.03em]">
            {CONTACT.title}
          </h2>
          <p className="mt-7 max-w-[58ch] text-lg leading-relaxed text-muted">
            {CONTACT.subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <button
            type="button"
            onClick={copyEmail}
            className="group mt-12 flex w-full items-center justify-between gap-6 border border-line bg-panel px-6 py-6 text-left transition-colors hover:border-spark sm:px-8 sm:py-8"
          >
            <span className="flex items-center gap-4 overflow-hidden">
              <span aria-hidden="true" className="text-2xl">
                ✉
              </span>
              <span className="truncate font-mono text-base text-ink sm:text-xl">
                {SITE.email}
              </span>
            </span>
            <motion.span
              key={copied ? "copied" : "copy"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`label shrink-0 transition-colors ${
                copied ? "text-spark" : "group-hover:text-ink"
              }`}
            >
              {copied ? CONTACT.copiedLabel : CONTACT.copyLabel}
            </motion.span>
          </button>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-3 bg-spark px-8 py-4 text-sm font-medium tracking-wide text-void transition-transform duration-200 hover:scale-[1.02]"
              >
                {HERO.ctaPrimary}
              </a>
            </Magnetic>
            <a
              href={SITE.github}
              target="_blank"
              rel="noreferrer"
              className="label border border-line px-6 py-4 transition-colors hover:border-ink hover:text-ink"
            >
              GitHub
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="label border border-line px-6 py-4 transition-colors hover:border-ink hover:text-ink"
            >
              LinkedIn
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
