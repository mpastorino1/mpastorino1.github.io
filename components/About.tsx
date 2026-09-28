import Reveal from "./Reveal";
import { ABOUT } from "@/lib/content";

export default function About() {
  return (
    <section id="approccio" className="relative border-t border-line py-28">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal>
          <div className="flex items-baseline justify-between gap-6 border-b border-line pb-5">
            <span className="label">02 / {ABOUT.label}</span>
            <span className="label">dietro il codice</span>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="text-[clamp(1.7rem,3.2vw,2.8rem)] font-medium leading-[1.1] tracking-[-0.02em]">
              {ABOUT.title}
            </h2>
            <p className="mt-8 text-[clamp(1.4rem,2.4vw,2.1rem)] leading-[1.15] tracking-[-0.015em] text-ink">
              {ABOUT.pull}
            </p>
          </Reveal>

          <Reveal className="space-y-6 lg:col-span-5" delay={0.1}>
            {ABOUT.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </Reveal>
        </div>

        <div className="mt-20 border-y border-line">
          {ABOUT.pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.08}>
              <div className="group grid grid-cols-[3rem_1fr] items-baseline gap-x-6 gap-y-2 border-b border-line px-2 py-8 transition-colors last:border-b-0 hover:bg-panel md:grid-cols-[4rem_18ch_1fr] md:px-4">
                <span className="label transition-colors group-hover:text-spark">
                  0{i + 1}
                </span>
                <h3 className="text-xl font-medium tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                  {pillar.title}
                </h3>
                <p className="col-start-2 max-w-[62ch] leading-relaxed text-muted md:col-start-3">
                  {pillar.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
