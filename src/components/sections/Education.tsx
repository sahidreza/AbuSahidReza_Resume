"use client";

import { GraduationCap, Languages, Sparkles } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Eyebrow, Reveal, SplitReveal } from "@/components/ui/motion";

export function Education() {
  const { dict } = useLocale();
  const e = dict.education;

  return (
    <section id="education" data-tone="light" aria-labelledby="education-title" className="section-pad bg-mist text-ink">
      <div className="container-site">
        <Reveal>
          <Eyebrow className="mb-5 text-graphite">{e.label}</Eyebrow>
        </Reveal>
        <SplitReveal key={e.title} as="h2" id="education-title" text={e.title} className="text-headline max-w-[16ch] text-balance" />

        <div className="mt-16 grid gap-5 md:mt-24 lg:grid-cols-2">
          {/* Degree */}
          <Reveal className="flex flex-col rounded-[2rem] bg-white p-8 md:p-12">
            <div className="flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-mist">
                <GraduationCap className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <span className="text-[0.85rem] font-medium tabular-nums text-graphite">{e.year}</span>
            </div>
            <p className="text-eyebrow mt-10 text-graphite">{e.degreeLabel}</p>
            <h3 className="text-title mt-3 text-balance">{e.degree}</h3>
            <p className="mt-4 text-[1.05rem] text-ink-soft">{e.school}</p>
            <p className="text-[0.95rem] text-graphite">{e.place}</p>
          </Reveal>

          {/* Certifications */}
          <Reveal delay={0.08} className="rounded-[2rem] bg-white p-8 md:p-12">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-mist">
              <Sparkles className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
            </span>
            <h3 className="text-eyebrow mt-10 text-graphite">{e.certsLabel}</h3>
            <ul className="mt-4 divide-y divide-black/[0.06]">
              {e.certs.map((c) => {
                const done = c.status === "completed";
                return (
                  <li key={c.name} className="flex items-start justify-between gap-4 py-4">
                    <div>
                      <p className="text-[1.08rem] font-semibold tracking-[-0.01em]">{c.name}</p>
                      <p className="text-[0.88rem] text-graphite">{c.issuer}</p>
                    </div>
                    <span
                      className={`mt-0.5 shrink-0 rounded-full px-2.5 py-1 text-[0.72rem] font-semibold ${
                        done ? "bg-emerald-50 text-emerald-700" : "bg-mist text-graphite"
                      }`}
                    >
                      {done ? e.completed : e.inProgress}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          {/* Continuous learning */}
          <Reveal delay={0.12} className="rounded-[2rem] bg-ink p-8 text-white md:p-12 lg:col-span-1">
            <p className="text-eyebrow text-white/50">{e.learningLabel}</p>
            <p className="mt-5 text-[clamp(1.3rem,2.2vw,1.75rem)] font-semibold leading-snug tracking-[-0.02em]">{e.learning}</p>
          </Reveal>

          {/* Languages */}
          <Reveal delay={0.16} className="rounded-[2rem] bg-white p-8 md:p-12">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-mist">
              <Languages className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
            </span>
            <h3 className="text-eyebrow mt-10 text-graphite">{e.languagesLabel}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {e.languages.map((lang) => (
                <li key={lang} className="rounded-full bg-mist px-4 py-2 text-[0.95rem] font-medium">
                  {lang}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
