"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { EASE, Eyebrow, Reveal, ScrollWords, SplitReveal } from "@/components/ui/motion";

export function About() {
  const { dict } = useLocale();
  const a = dict.about;
  const railRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: railRef, offset: ["start 0.8", "end 0.6"] });
  const line = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="about" data-tone="light" aria-labelledby="about-title" className="section-pad relative bg-paper text-ink">
      <div className="container-site">
        <Reveal>
          <Eyebrow className="mb-5 text-graphite">{a.label}</Eyebrow>
        </Reveal>
        <SplitReveal
          key={a.title}
          as="h2"
          id="about-title"
          text={a.title}
          className="text-headline max-w-[16ch] text-balance"
        />

        <ScrollWords
          key={a.lead}
          text={a.lead}
          className="mt-14 max-w-[34ch] text-[clamp(1.6rem,3.4vw,2.75rem)] font-semibold leading-[1.18] tracking-[-0.03em] md:mt-20"
        />

        {/* Chapters */}
        <div className="mt-24 md:mt-36">
          <Reveal>
            <h3 className="text-eyebrow mb-10 text-graphite">{a.chaptersTitle}</h3>
          </Reveal>
          <ol ref={railRef} className="relative grid gap-10 md:grid-cols-5 md:gap-6">
            {/* Progress rail */}
            <div aria-hidden="true" className="absolute left-0 right-0 top-[7px] hidden h-px bg-black/10 md:block">
              <motion.div style={{ scaleX: line }} className="h-full origin-left bg-ink" />
            </div>
            <div aria-hidden="true" className="absolute bottom-0 left-[7px] top-0 w-px bg-black/10 md:hidden">
              <motion.div style={{ scaleY: line }} className="h-full origin-top bg-ink" />
            </div>

            {a.chapters.map((c, i) => (
              <motion.li
                key={c.year}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
                className="relative pl-9 md:pl-0 md:pt-10"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0.5 h-[15px] w-[15px] rounded-full border-[3px] border-paper bg-ink shadow-[0_0_0_1px_rgba(0,0,0,0.12)] md:top-0"
                />
                <p className="text-[0.8rem] font-semibold tabular-nums text-graphite">{c.year}</p>
                <p className="mt-1 text-[1.6rem] font-semibold tracking-[-0.03em]">{c.title}</p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{c.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Pillars */}
        <div className="mt-24 grid gap-px overflow-hidden rounded-[1.75rem] bg-black/[0.07] md:mt-36 md:grid-cols-3">
          {a.pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1} className="bg-mist p-8 md:p-10">
              <p className="text-[0.8rem] font-semibold tabular-nums text-graphite">0{i + 1}</p>
              <h3 className="mt-6 text-[1.5rem] font-semibold tracking-[-0.025em]">{p.title}</h3>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-soft">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
