"use client";

import { useLocale } from "@/components/providers/LocaleProvider";
import { Eyebrow, Reveal, SplitReveal } from "@/components/ui/motion";
import { Loominote } from "./Loominote";
import { Ultimatix } from "./Ultimatix";

export function Work() {
  const { dict } = useLocale();
  return (
    <section id="work" aria-labelledby="work-title">
      <div data-tone="dark" className="bg-night pt-28 text-white md:pt-40">
        <div className="container-site">
          <Reveal>
            <Eyebrow className="mb-5 text-white/50">{dict.work.label}</Eyebrow>
          </Reveal>
          <SplitReveal key={dict.work.title} as="h2" id="work-title" text={dict.work.title} className="text-headline max-w-[18ch] text-balance" />
          <div aria-hidden="true" className="mt-16 h-px w-full bg-white/10 md:mt-24" />
        </div>
      </div>
      <Loominote />
      <Ultimatix />
    </section>
  );
}
