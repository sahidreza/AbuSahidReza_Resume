"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Counter, EASE, Eyebrow, Reveal } from "@/components/ui/motion";

/** Greys from dark to light for the workstream breakdown. */
const SHADES = ["bg-ink", "bg-ink/55", "bg-ink/30", "bg-ink/15"];

export function Ultimatix() {
  const { dict, tag } = useLocale();
  const w = dict.work;
  const u = w.ultimatix;
  const total = u.workstreams.reduce((sum, s) => sum + s.count, 0);
  const [open, setOpen] = useState<number | null>(0);
  const fmt = new Intl.NumberFormat(tag);

  return (
    <article aria-labelledby="ultimatix-title" data-tone="light" className="bg-paper text-ink">
      <div className="container-site section-pad">
        {/* Intro */}
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <Reveal>
              <Eyebrow className="text-graphite">{u.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h3 id="ultimatix-title" className="text-headline mt-5 text-balance">
                {u.name}
              </h3>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-[clamp(1.35rem,2.6vw,2rem)] font-semibold tracking-[-0.025em] text-graphite">{u.tagline}</p>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="text-lead text-ink-soft">{u.description}</p>
            <p className="mt-5 text-[0.9rem]">
              <span className="text-graphite">{w.role} · </span>
              <span className="font-medium">{u.role}</span>
            </p>
          </Reveal>
        </div>

        {/* Total + breakdown */}
        <div className="mt-20 grid gap-12 rounded-[2rem] bg-mist p-8 md:mt-28 md:p-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <Counter
              value={total}
              locale={tag}
              className="block text-[clamp(5rem,13vw,9.5rem)] font-bold leading-[0.9] tracking-[-0.06em]"
            />
            <p className="mt-4 max-w-[22ch] text-[1.1rem] leading-snug text-ink-soft">{u.totalLabel}</p>
          </Reveal>

          <div className="flex flex-col justify-end">
            <Reveal>
              <p className="text-eyebrow text-graphite">{u.breakdownLabel}</p>
            </Reveal>
            <div
              className="mt-5 flex h-4 w-full gap-1 overflow-hidden rounded-full"
              role="img"
              aria-label={u.workstreams.map((s) => `${s.name}: ${fmt.format(s.count)}`).join(", ")}
            >
              {u.workstreams.map((s, i) => (
                <motion.span
                  key={s.name}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                  transition={{ duration: 1.2, ease: EASE, delay: 0.15 + i * 0.12 }}
                  style={{ flexGrow: s.count, flexBasis: 0, minWidth: 6 }}
                  className={`block h-full origin-left ${SHADES[i] ?? "bg-ink/10"}`}
                />
              ))}
            </div>
            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
              {u.workstreams.map((s, i) => (
                <Reveal as="li" key={s.name} delay={0.2 + i * 0.06}>
                  <span className={`mb-3 block h-1.5 w-6 rounded-full ${SHADES[i] ?? "bg-ink/10"}`} aria-hidden="true" />
                  <Counter value={s.count} locale={tag} className="block text-[2rem] font-semibold leading-none tracking-[-0.03em]" />
                  <span className="mt-2 block text-[0.85rem] leading-snug text-graphite">{s.name}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        {/* Stakeholders → one plan */}
        <div className="mt-20 md:mt-28">
          <Reveal>
            <p className="text-eyebrow text-center text-graphite">{u.stakeholdersLabel}</p>
          </Reveal>
          <div className="relative mx-auto mt-8 max-w-4xl">
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {u.stakeholders.map((s, i) => (
                <Reveal as="li" key={s} delay={i * 0.08} className="flex flex-col items-center">
                  <span className="w-full rounded-2xl border border-black/[0.08] bg-white px-3 py-4 text-center text-[0.92rem] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                    {s}
                  </span>
                  <motion.span
                    aria-hidden="true"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.4 + i * 0.08 }}
                    className="hidden h-8 w-px origin-top bg-black/20 sm:block"
                  />
                </Reveal>
              ))}
            </ul>
            <motion.div
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.8 }}
              className="mx-[12.5%] hidden h-px bg-black/20 sm:block"
            />
            <div className="flex justify-center">
              <motion.span
                aria-hidden="true"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE, delay: 1.1 }}
                className="hidden h-8 w-px origin-top bg-black/20 sm:block"
              />
            </div>
            <Reveal delay={0.3} className="mt-6 flex justify-center sm:mt-0">
              <span className="rounded-full bg-ink px-6 py-3 text-[0.95rem] font-semibold text-white">
                {u.planLabel}
              </span>
            </Reveal>
          </div>
        </div>

        {/* Workstreams */}
        <div className="mt-20 border-t border-black/[0.08] md:mt-28">
          {u.workstreams.map((s, i) => {
            const isOpen = open === i;
            const panelId = `ws-panel-${i}`;
            return (
              <Reveal key={s.name} delay={i * 0.05} className="border-b border-black/[0.08]">
                <h4>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center gap-5 py-7 text-left md:gap-10 md:py-9"
                  >
                    <span className="w-20 shrink-0 text-[clamp(1.8rem,3.5vw,2.75rem)] font-bold tabular-nums leading-none tracking-[-0.04em] md:w-32">
                      {fmt.format(s.count)}
                    </span>
                    <span className="flex-1 text-[clamp(1.15rem,2vw,1.6rem)] font-semibold tracking-[-0.02em] transition-colors group-hover:text-ink-soft">
                      {s.name}
                    </span>
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-black/10 transition-all duration-500 group-hover:bg-black/[0.04] ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden="true"
                    >
                      <Plus className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                  </button>
                </h4>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <dl className="grid gap-6 pb-9 md:grid-cols-2 md:gap-10 md:pl-42">
                        <div>
                          <dt className="text-eyebrow text-graphite">{w.problem}</dt>
                          <dd className="mt-2 text-[1rem] leading-relaxed text-ink-soft">{s.problem}</dd>
                        </div>
                        <div>
                          <dt className="text-eyebrow text-graphite">{w.approach}</dt>
                          <dd className="mt-2 text-[1rem] leading-relaxed text-ink-soft">{s.approach}</dd>
                        </div>
                      </dl>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>

        {/* MIC quality record */}
        <Reveal className="mt-20 md:mt-28">
          <div className="relative overflow-hidden rounded-[2rem] bg-night p-8 text-white md:p-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,rgba(52,211,153,0.18),transparent)]"
            />
            <div className="relative grid gap-10 md:grid-cols-[auto_1fr] md:items-center md:gap-16">
              <span className="text-[clamp(7rem,18vw,13rem)] font-bold leading-[0.8] tracking-[-0.07em]">0</span>
              <div>
                <p className="text-eyebrow text-white/50">{u.mic.eyebrow}</p>
                <h4 className="text-title mt-4">{u.mic.title}</h4>
                <p className="mt-4 text-[1.05rem] leading-relaxed text-white/80">{u.mic.statLabel}</p>
                <p className="mt-4 text-[0.92rem] leading-relaxed text-white/55">{u.mic.note}</p>
                <p className="mt-6 text-[0.85rem]">
                  <span className="text-white/45">{w.role} · </span>
                  <span className="font-medium">{u.mic.role}</span>
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
