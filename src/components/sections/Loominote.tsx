"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, AudioLines, BookOpen, Check, NotebookPen, Users } from "lucide-react";
import { useRef, useState } from "react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Counter, EASE, Eyebrow, ParallaxScale, Reveal } from "@/components/ui/motion";
import { asset, siteConfig } from "@/config/site";

const MODE_ICONS = { meeting: Users, lecture: BookOpen, journal: NotebookPen } as const;

export function Loominote() {
  const { dict, tag } = useLocale();
  const w = dict.work;
  const l = w.loominote;
  const [modeIndex, setModeIndex] = useState(0);
  const mode = l.modes[modeIndex] ?? l.modes[0];
  const titleRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: titleRef, offset: ["start end", "end start"] });
  const wordScale = useTransform(scrollYProgress, [0, 0.5], [1.18, 1]);
  const wordOpacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const pipeRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress: pipeProgress } = useScroll({ target: pipeRef, offset: ["start 0.85", "end 0.55"] });
  const pipeLine = useTransform(pipeProgress, [0, 1], [0, 1]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onModeKey = (event: React.KeyboardEvent, i: number) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next = event.key === "ArrowRight" ? (i + 1) % l.modes.length : (i - 1 + l.modes.length) % l.modes.length;
    setModeIndex(next);
    tabRefs.current[next]?.focus();
  };

  const screenshots = siteConfig.loominote.screenshots;

  return (
    <article aria-labelledby="loominote-title" data-tone="dark" className="relative overflow-hidden bg-night text-white">
      <div className="container-site section-pad">
        {/* Title */}
        <div ref={titleRef} className="text-center">
          <Reveal>
            <Eyebrow className="text-white/50">{l.eyebrow}</Eyebrow>
          </Reveal>
          <motion.h3
            id="loominote-title"
            style={{ scale: wordScale, opacity: wordOpacity }}
            className="text-gradient-dark mt-6 text-[clamp(3.6rem,14vw,11.5rem)] font-bold leading-[0.95] tracking-[-0.06em]"
          >
            {l.name}
          </motion.h3>
          <Reveal delay={0.1}>
            <p className="mt-5 text-[clamp(1.5rem,3.2vw,2.5rem)] font-semibold tracking-[-0.03em] text-white">{l.tagline}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lead mx-auto mt-6 max-w-[38ch] text-white/65">{l.description}</p>
          </Reveal>
          <Reveal delay={0.28}>
            <dl className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-4 text-[0.85rem]">
              <div className="flex items-center gap-2">
                <dt className="text-white/45">{w.role}</dt>
                <dd className="font-medium text-white/90">{l.role}</dd>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <dt className="text-white/45">{l.platformsLabel}</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {l.platforms.map((p) => (
                    <span key={p} className="rounded-full border border-white/15 px-2.5 py-0.5 text-[0.78rem] text-white/85">
                      {p}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>
          {siteConfig.loominote.appStoreUrl && (
            <Reveal delay={0.32}>
              <a
                href={siteConfig.loominote.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-1.5 text-[0.95rem] font-medium text-accent-bright hover:underline"
              >
                {l.appStore}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Reveal>
          )}
        </div>

        {/* Interactive stage */}
        <div className="mt-20 md:mt-28">
          <Reveal className="text-center">
            <h4 className="text-title">{l.modesTitle}</h4>
            <p className="mx-auto mt-3 max-w-[46ch] text-[1rem] text-white/60">{l.modesSub}</p>
          </Reveal>

          <Reveal delay={0.1} className="mt-8 flex justify-center">
            <div role="tablist" aria-label={l.modesTitle} className="inline-flex rounded-full bg-white/[0.08] p-1 backdrop-blur">
              {l.modes.map((m, i) => {
                const selected = i === modeIndex;
                const Icon = MODE_ICONS[m.id as keyof typeof MODE_ICONS] ?? AudioLines;
                return (
                  <button
                    key={m.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    role="tab"
                    id={`mode-tab-${m.id}`}
                    aria-selected={selected}
                    aria-controls="mode-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setModeIndex(i)}
                    onKeyDown={(e) => onModeKey(e, i)}
                    className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-[0.85rem] font-medium transition-colors duration-300 sm:px-5 ${
                      selected ? "text-ink" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {selected && (
                      <motion.span layoutId="mode-pill" className="absolute inset-0 rounded-full bg-white" transition={{ duration: 0.45, ease: EASE }} />
                    )}
                    <Icon className="relative h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                    <span className="relative">{m.name}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <div
            id="mode-panel"
            role="tabpanel"
            aria-labelledby={`mode-tab-${mode.id}`}
            className="mt-12 grid items-center gap-12 lg:grid-cols-[1fr_auto_1fr] lg:gap-16"
          >
            <div className="order-2 text-center lg:order-1 lg:text-right">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode.id + mode.name}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <p className="text-[clamp(1.8rem,3.2vw,2.6rem)] font-semibold tracking-[-0.03em]">{mode.name}</p>
                  <p className="mx-auto mt-3 max-w-[30ch] text-[1.05rem] leading-relaxed text-white/65 lg:mr-0">{mode.text}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <ParallaxScale from={0.86} y={60} className="order-1 mx-auto lg:order-2">
              <Phone mode={mode} labels={l} screenshot={screenshots[modeIndex] ?? screenshots[0]} />
              <p className="mt-5 text-center text-[0.72rem] text-white/40">{screenshots.length ? "" : l.mockLabel}</p>
            </ParallaxScale>

            <ul className="order-3 hidden space-y-5 lg:block">
              {l.modes.map((m, i) => (
                <li key={m.id}>
                  <button
                    type="button"
                    tabIndex={-1}
                    aria-hidden="true"
                    onClick={() => setModeIndex(i)}
                    className={`text-left transition-all duration-500 ${i === modeIndex ? "text-white" : "text-white/30 hover:text-white/60"}`}
                  >
                    <span className="block text-[0.72rem] font-medium tabular-nums text-white/40">0{i + 1}</span>
                    <span className="text-[1.35rem] font-semibold tracking-[-0.02em]">{m.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Results */}
        <div className="mt-24 grid gap-px overflow-hidden rounded-[2rem] bg-white/10 md:mt-32 md:grid-cols-3">
          {l.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="bg-carbon px-8 py-10 text-center md:py-14">
              <Counter
                value={s.value}
                prefix={s.prefix}
                suffix={s.suffix}
                locale={tag}
                className="block text-[clamp(3rem,6vw,4.75rem)] font-bold leading-none tracking-[-0.05em]"
              />
              <p className="mt-4 text-[0.95rem] text-white/60">{s.label}</p>
            </Reveal>
          ))}
        </div>

        {/* Pipeline */}
        <div className="mt-24 md:mt-32">
          <Reveal>
            <h4 className="text-eyebrow text-white/50">{l.pipelineTitle}</h4>
          </Reveal>
          <ol ref={pipeRef} className="relative mt-10 grid gap-10 md:grid-cols-4 md:gap-8">
            <div aria-hidden="true" className="absolute left-0 right-0 top-5 hidden h-px bg-white/10 md:block">
              <motion.div style={{ scaleX: pipeLine }} className="h-full origin-left bg-white/70" />
            </div>
            {l.pipeline.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 0.08} className="relative">
                <span className="relative grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-night text-[0.8rem] font-semibold tabular-nums">
                  {i + 1}
                </span>
                <p className="mt-6 text-[1.3rem] font-semibold tracking-[-0.02em]">{step.title}</p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-white/60">{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Narrative */}
        <dl className="mt-24 grid gap-px overflow-hidden rounded-[2rem] bg-white/10 md:mt-32 md:grid-cols-2">
          {(
            [
              [w.problem, l.problem],
              [w.approach, l.approach],
              [w.quality, l.quality],
              [w.result, l.result],
            ] as const
          ).map(([label, text], i) => (
            <Reveal key={label} delay={(i % 2) * 0.08} className={`p-8 md:p-12 ${i === 3 ? "bg-white text-ink" : "bg-carbon"}`}>
              <dt className={`text-eyebrow ${i === 3 ? "text-graphite" : "text-white/45"}`}>{label}</dt>
              <dd className={`mt-4 leading-relaxed ${i === 3 ? "text-[1.5rem] font-semibold tracking-[-0.02em]" : "text-[1.05rem] text-white/80"}`}>
                {text}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </article>
  );
}

type Loominote = ReturnType<typeof useLocale>["dict"]["work"]["loominote"];
type Mode = Loominote["modes"][number];

/** Illustrative phone interface (replaced by real screenshots when configured). */
function Phone({ mode, labels, screenshot }: { mode: Mode; labels: Loominote; screenshot?: string }) {
  const bars = [0.4, 0.7, 0.5, 0.9, 0.6, 1, 0.45, 0.8, 0.55, 0.95, 0.5, 0.75, 0.35, 0.85, 0.6, 0.9, 0.4, 0.7, 0.5, 0.8, 0.45, 0.65];
  return (
    <div
      className="relative h-[600px] w-[290px] rounded-[3.1rem] bg-[#2a2a2d] p-[10px] shadow-[0_60px_120px_-30px_rgba(64,110,255,0.35),0_0_0_1px_rgba(255,255,255,0.08)] sm:h-[640px] sm:w-[310px]"
      aria-hidden={screenshot ? undefined : "true"}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] bg-[#0b0b0d]">
        <div className="absolute left-1/2 top-3 z-20 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-black" />
        {screenshot ? (
          <img src={asset(screenshot)} alt={`Loominote — ${mode.name}`} className="h-full w-full object-cover" />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={mode.id + mode.sample.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="flex h-full flex-col px-5 pb-6 pt-12 text-left"
            >
              <div className="flex items-center justify-between text-[0.62rem] font-semibold text-white/70">
                <span>9:41</span>
                <span className="flex gap-1">
                  <span className="h-1.5 w-3 rounded-sm bg-white/70" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                </span>
              </div>

              <span className="mt-5 w-fit rounded-full bg-white/10 px-2.5 py-0.5 text-[0.62rem] font-semibold text-white/80">{mode.name}</span>
              <p className="mt-2 text-[1.15rem] font-semibold leading-tight tracking-[-0.02em] text-white">{mode.sample.title}</p>

              <div className="mt-4 rounded-2xl bg-white/[0.06] p-3.5">
                <div className="flex items-center justify-between text-[0.6rem] font-medium text-white/50">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                    {labels.mockRecording}
                  </span>
                  <span className="tabular-nums">12:48</span>
                </div>
                <div className="mt-3 flex h-8 items-center gap-[3px]">
                  {bars.map((b, i) => (
                    <span
                      key={i}
                      className="w-[3px] flex-1 animate-wave rounded-full bg-white/80"
                      style={{ height: `${b * 100}%`, animationDelay: `${(i % 7) * 0.12}s` }}
                    />
                  ))}
                </div>
              </div>

              <p className="mt-4 text-[0.6rem] font-semibold text-white/45">{labels.mockTranscript}</p>
              <div className="mt-2 space-y-1.5">
                <span className="block h-1.5 w-full rounded bg-white/15" />
                <span className="block h-1.5 w-[88%] rounded bg-white/15" />
                <span className="block h-1.5 w-[70%] rounded bg-white/15" />
              </div>

              <div className="mt-4 rounded-2xl bg-[linear-gradient(135deg,rgba(64,110,255,0.28),rgba(64,110,255,0.08))] p-3.5">
                <p className="text-[0.6rem] font-semibold text-white/60">{labels.mockSummary}</p>
                <p className="mt-1.5 text-[0.78rem] leading-snug text-white/90">{mode.sample.summary}</p>
              </div>

              <p className="mt-4 text-[0.6rem] font-semibold text-white/45">{labels.mockActions}</p>
              <ul className="mt-2 space-y-2">
                {mode.sample.items.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, ease: EASE, delay: 0.2 + i * 0.08 }}
                    className="flex items-center gap-2 text-[0.74rem] text-white/85"
                  >
                    <span
                      className={`grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full border ${
                        i === 0 ? "border-accent-bright bg-accent-bright" : "border-white/30"
                      }`}
                    >
                      {i === 0 && <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />}
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
