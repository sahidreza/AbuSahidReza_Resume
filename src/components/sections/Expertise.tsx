"use client";

import { motion } from "motion/react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { EASE, Eyebrow, Reveal, SplitReveal } from "@/components/ui/motion";

export function Expertise() {
  const { dict } = useLocale();
  const x = dict.expertise;
  const all = x.groups.flatMap((g) => g.items);
  const half = Math.ceil(all.length / 2);
  const rows = [all.slice(0, half), all.slice(half)];

  return (
    <section id="expertise" data-tone="light" aria-labelledby="expertise-title" className="section-pad overflow-hidden bg-paper text-ink">
      <div className="container-site">
        <Reveal>
          <Eyebrow className="mb-5 text-graphite">{x.label}</Eyebrow>
        </Reveal>
        <SplitReveal key={x.title} as="h2" id="expertise-title" text={x.title} className="text-headline max-w-[16ch] text-balance" />
      </div>

      {/* Kinetic type band */}
      <div aria-hidden="true" className="mt-16 space-y-2 select-none md:mt-24">
        {rows.map((row, r) => (
          <div key={r} className="flex w-max">
            <div className={`flex shrink-0 ${r === 0 ? "animate-marquee" : "animate-marquee-reverse"}`}>
              {[...row, ...row].map((item, i) => (
                <span
                  key={`${item}-${i}`}
                  className="whitespace-nowrap px-5 text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[1.15] tracking-[-0.045em] text-black/[0.07]"
                >
                  {item}
                  <span className="ml-10 text-black/[0.12]">·</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Groups */}
      <div className="container-site mt-16 grid gap-14 md:mt-24 md:grid-cols-3 md:gap-10">
        {x.groups.map((group, g) => (
          <div key={group.name}>
            <Reveal delay={g * 0.08}>
              <h3 className="flex items-center gap-3 border-b border-black/10 pb-4 text-[0.85rem] font-semibold text-graphite">
                <span className="tabular-nums">0{g + 1}</span>
                {group.name}
              </h3>
            </Reveal>
            <ul className="mt-6 space-y-1">
              {group.items.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: "60%" }}
                  whileInView={{ opacity: 1, y: "0%" }}
                  viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                  transition={{ duration: 0.8, ease: EASE, delay: g * 0.08 + i * 0.045 }}
                >
                  <span className="group inline-flex cursor-default items-center gap-3 py-1 text-[clamp(1.35rem,2.2vw,1.8rem)] font-semibold tracking-[-0.025em] text-ink transition-colors duration-300 hover:text-accent">
                    <span className="h-px w-0 bg-current transition-all duration-500 ease-out group-hover:w-6" aria-hidden="true" />
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
