"use client";

import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { EASE, Eyebrow, Reveal, SplitReveal } from "@/components/ui/motion";

/** Start and end months (year, month 1–12) per role. `null` end means present. Matches the resumes. */
const SPANS: Record<string, { start: [number, number]; end: [number, number] | null }> = {
  rplanx: { start: [2016, 11], end: [2018, 5] },
  genius: { start: [2018, 8], end: [2021, 8] },
  mindtree: { start: [2021, 8], end: [2022, 7] },
  tcs: { start: [2022, 8], end: null },
};

const months = ([y, m]: [number, number]) => y * 12 + (m - 1);
const AXIS_START = months([2016, 1]);

export function Experience() {
  const { dict } = useLocale();
  const e = dict.experience;
  const jobs = e.jobs;
  const [activeId, setActiveId] = useState(jobs[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [now, setNow] = useState<[number, number]>([2026, 11]);

  useEffect(() => {
    const d = new Date();
    setNow([d.getFullYear(), d.getMonth() + 1]);
  }, []);

  const axisEnd = months(now) + 2;
  const total = axisEnd - AXIS_START;
  const years: number[] = [];
  for (let y = 2016; y <= now[0]; y++) years.push(y);

  const active = jobs.find((j) => j.id === activeId) ?? jobs[0];

  const onTabKey = (event: React.KeyboardEvent, index: number) => {
    const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % jobs.length;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + jobs.length) % jobs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = jobs.length - 1;
    setActiveId(jobs[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="experience" data-tone="light" aria-labelledby="experience-title" className="section-pad bg-mist text-ink">
      <div className="container-site">
        <Reveal>
          <Eyebrow className="mb-5 text-graphite">{e.label}</Eyebrow>
        </Reveal>
        <SplitReveal key={e.title} as="h2" id="experience-title" text={e.title} className="text-headline max-w-[18ch] text-balance" />
        <Reveal delay={0.15}>
          <p className="text-lead mt-6 max-w-[40ch] text-graphite">{e.sub}</p>
        </Reveal>

        {/* Time axis */}
        <Reveal className="mt-16 md:mt-24" delay={0.1}>
          <div aria-hidden="true" className="relative">
            <div className="relative h-14">
              {jobs.map((job) => {
                const span = SPANS[job.id];
                if (!span) return null;
                const left = ((months(span.start) - AXIS_START) / total) * 100;
                const width = (((span.end ? months(span.end) : months(now)) - months(span.start)) / total) * 100;
                const isActive = job.id === active.id;
                return (
                  <button
                    key={job.id}
                    type="button"
                    tabIndex={-1}
                    onClick={() => setActiveId(job.id)}
                    style={{ left: `${left}%`, width: `${width}%` }}
                    className="group absolute top-0 flex h-full flex-col justify-end"
                  >
                    <span
                      className={`mb-2 truncate px-0.5 text-left text-[0.7rem] font-medium transition-colors duration-300 ${
                        isActive ? "text-ink" : "text-graphite group-hover:text-ink"
                      }`}
                    >
                      {job.short}
                    </span>
                    <span className="relative block h-2 w-full overflow-hidden rounded-full bg-black/[0.08]">
                      <motion.span
                        initial={false}
                        animate={{ scaleX: isActive ? 1 : 0.0001 }}
                        transition={{ duration: 0.7, ease: EASE }}
                        className="absolute inset-0 origin-left rounded-full bg-ink"
                      />
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="relative mt-3 h-4 text-[0.68rem] tabular-nums text-graphite">
              {years.map((y) => {
                const left = ((months([y, 1]) - AXIS_START) / total) * 100;
                return (
                  <span
                    key={y}
                    style={{ left: `${left}%` }}
                    className={`absolute -translate-x-0 ${y % 2 === 1 ? "hidden sm:inline" : ""}`}
                  >
                    {y}
                  </span>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Roles + detail */}
        <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-[minmax(0,300px)_1fr] md:gap-12">
          <div
            role="tablist"
            aria-label={e.listLabel}
            aria-orientation="vertical"
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:flex-col md:gap-1 md:overflow-visible md:px-0 md:pb-0"
          >
            {jobs.map((job, i) => {
              const selected = job.id === active.id;
              return (
                <button
                  key={job.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${job.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${job.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveId(job.id)}
                  onKeyDown={(ev) => onTabKey(ev, i)}
                  className={`relative shrink-0 rounded-2xl px-4 py-3 text-left transition-colors duration-300 md:px-5 md:py-4 ${
                    selected ? "text-ink" : "text-graphite hover:text-ink"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="exp-tab"
                      className="absolute inset-0 rounded-2xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.15)]"
                      transition={{ duration: 0.45, ease: EASE }}
                    />
                  )}
                  <span className="relative block whitespace-nowrap text-[0.72rem] font-medium tabular-nums text-graphite">
                    {job.period}
                  </span>
                  <span className="relative mt-0.5 block whitespace-nowrap text-[0.98rem] font-semibold tracking-[-0.01em] md:whitespace-normal">
                    {job.company}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative min-h-[26rem] overflow-hidden rounded-[2rem] bg-white p-7 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_30px_60px_-30px_rgba(0,0,0,0.18)] md:p-12">
            {/* Every role is in the HTML (for search engines and screen readers); only the selected one is shown. */}
            {jobs.map((job, index) => {
              const selected = job.id === active.id;
              return (
                <div key={job.id} id={`panel-${job.id}`} role="tabpanel" aria-labelledby={`tab-${job.id}`} hidden={!selected}>
                  {selected && (
                    <motion.div
                      key={job.id + job.role}
                      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.55, ease: EASE }}
                    >
                      <JobDetail job={job} index={index} count={jobs.length} animated />
                    </motion.div>
                  )}
                  {!selected && <JobDetail job={job} index={index} count={jobs.length} />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

type Job = ReturnType<typeof useLocale>["dict"]["experience"]["jobs"][number];

function JobDetail({ job, index, count, animated = false }: { job: Job; index: number; count: number; animated?: boolean }) {
  return (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className="text-[0.8rem] font-medium tabular-nums text-graphite">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>
        <p className="flex items-center gap-1.5 text-[0.8rem] text-graphite">
          <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
          {job.location}
        </p>
      </div>
      <h3 className="text-title mt-6 text-balance">{job.role}</h3>
      <p className="mt-2 text-[1.05rem] font-medium text-ink-soft">
        {job.company} <span className="text-silver">·</span> <span className="tabular-nums text-graphite">{job.period}</span>
      </p>
      <p className="mt-6 max-w-[52ch] text-[1.05rem] leading-relaxed text-ink">{job.summary}</p>

      <ul className="mt-8 space-y-4 border-t border-black/[0.06] pt-8">
        {job.highlights.map((item, i) => (
          <motion.li
            key={item}
            initial={animated ? { opacity: 0, x: -8 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.12 + i * 0.06 }}
            className="flex gap-4 text-[0.98rem] leading-relaxed text-ink-soft"
          >
            <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-ink/40" />
            <span>{item}</span>
          </motion.li>
        ))}
      </ul>

      <ul className="mt-9 flex flex-wrap gap-2">
        {job.tags.map((tag) => (
          <li key={tag} className="rounded-full bg-mist px-3 py-1 text-[0.78rem] font-medium text-ink-soft">
            {tag}
          </li>
        ))}
      </ul>
    </>
  );
}
