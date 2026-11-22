"use client";

import { useLocale } from "@/components/providers/LocaleProvider";
import { Counter, Eyebrow, Reveal, SplitReveal } from "@/components/ui/motion";

export function Achievements() {
  const { dict, tag } = useLocale();
  const a = dict.achievements;
  const [lead, ...rest] = a.items;

  return (
    <section id="impact" data-tone="dark" aria-labelledby="impact-title" className="section-pad relative overflow-hidden bg-night text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(64,110,255,0.16),transparent)]"
      />
      <div className="container-site relative">
        <Reveal>
          <Eyebrow className="mb-5 text-white/50">{a.label}</Eyebrow>
        </Reveal>
        <SplitReveal key={a.title} as="h2" id="impact-title" text={a.title} className="text-headline max-w-[16ch] text-balance" />

        <dl className="mt-16 grid gap-px overflow-hidden rounded-[2rem] bg-white/10 md:mt-24 md:grid-cols-2 lg:grid-cols-4">
          {lead && (
            <Reveal className="flex flex-col justify-between bg-carbon p-8 md:col-span-2 md:p-12 lg:col-span-4 lg:flex-row lg:items-end">
              <dt className="order-2 mt-6 max-w-[24ch] text-[1.15rem] leading-snug text-white/65 lg:mt-0 lg:text-right">
                <span className="block text-eyebrow text-white/40">{lead.label}</span>
                {lead.detail}
              </dt>
              <dd className="order-1">
                <Counter
                  value={lead.value}
                  prefix={lead.prefix}
                  suffix={lead.suffix}
                  locale={tag}
                  className="text-gradient-dark block text-[clamp(6rem,20vw,15rem)] font-bold leading-[0.85] tracking-[-0.07em]"
                />
              </dd>
            </Reveal>
          )}
          {rest.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08} className="flex flex-col bg-carbon p-8 md:p-10">
              <dt className="order-2 mt-6">
                <span className="block text-eyebrow text-white/40">{item.label}</span>
                <span className="mt-1 block text-[1rem] leading-snug text-white/70">{item.detail}</span>
              </dt>
              <dd className="order-1">
                <Counter
                  value={item.value}
                  prefix={item.prefix}
                  suffix={item.suffix}
                  locale={tag}
                  className="block whitespace-nowrap text-[clamp(3rem,5.4vw,4.5rem)] font-bold leading-none tracking-[-0.05em]"
                />
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
