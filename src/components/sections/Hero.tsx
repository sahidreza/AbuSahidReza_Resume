"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { EASE, SplitReveal } from "@/components/ui/motion";
import { asset, siteConfig } from "@/config/site";

/** Hero entrance starts as the CSS loader fades out. */
const INTRO = 1.05;

export function Hero() {
  const { dict } = useLocale();
  const h = dict.hero;
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const start = reduce ? 0 : INTRO;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.94]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  const portrait = siteConfig.portrait;

  return (
    <section
      id="top"
      ref={ref}
      data-tone="dark"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-night text-white"
    >
      {/* Ambient light — slow drift plus parallax */}
      <motion.div aria-hidden="true" style={{ y: glowY }} className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute -left-[20%] -top-[25%] h-[75vmax] w-[75vmax] animate-drift-a rounded-full bg-[radial-gradient(closest-side,rgba(64,110,255,0.22),transparent)] blur-2xl" />
        <div className="absolute -bottom-[35%] left-[10%] h-[70vmax] w-[70vmax] animate-drift-b rounded-full bg-[radial-gradient(closest-side,rgba(220,40,40,0.16),transparent)] blur-2xl" />
      </motion.div>

      {/* Portrait — bleeds in from the right and fades into the night */}
      <motion.div
        style={{ y: portraitY }}
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[64svh] lg:inset-x-auto lg:right-0 lg:h-full lg:w-[52vw] lg:max-w-[820px]"
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.12, filter: "blur(14px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.8, ease: EASE, delay: start - 0.15 }}
          className="hero-portrait-mask h-full w-full"
        >
          <motion.picture style={{ scale: portraitScale }} className="block h-full w-full">
            <source media="(max-width: 1023px)" srcSet={asset(portrait.srcSmall)} />
            <img
              src={asset(portrait.src)}
              width={portrait.width}
              height={portrait.height}
              alt={h.portraitAlt}
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover object-[50%_18%] lg:object-[50%_22%]"
            />
          </motion.picture>
        </motion.div>
      </motion.div>

      {/* Copy */}
      <motion.div
        style={{ opacity: contentOpacity, scale: contentScale, y: contentY }}
        className="container-site relative flex flex-1 flex-col justify-end pb-28 pt-[46svh] md:pt-[52svh] lg:justify-center lg:pb-24 lg:pt-28"
      >
        <div className="max-w-[44rem]">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: start }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[0.75rem] font-medium text-white/80 backdrop-blur-md"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            {h.availability}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: start + 0.08 }}
            className="text-eyebrow mb-5 text-white/60"
          >
            {h.eyebrow}
          </motion.p>

          <h1 id="hero-title" className="text-[clamp(2.6rem,6.4vw,5.4rem)] font-bold leading-[1.02] tracking-[-0.045em]">
            <SplitReveal key={`a-${h.titleA}`} as="span" text={h.titleA} onMount delay={start + 0.12} className="block" />
            <SplitReveal
              key={`b-${h.titleB}`}
              as="span"
              text={h.titleB}
              onMount
              delay={start + 0.32}
              className="block text-[#8e8e93]"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: start + 0.7 }}
            className="text-lead mt-7 max-w-[36rem] text-white/70"
          >
            {h.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: start + 0.85 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#work"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-[0.95rem] font-medium text-ink transition-all duration-300 hover:bg-white/90 active:scale-[0.98]"
            >
              {h.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2} aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="inline-flex h-12 items-center rounded-full border border-white/25 px-6 text-[0.95rem] font-medium text-white transition-all duration-300 hover:border-white/50 hover:bg-white/[0.06] active:scale-[0.98]"
            >
              {h.ctaSecondary}
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Caption */}
      <motion.p
        style={{ opacity: cueOpacity }}
        className="pointer-events-none absolute bottom-8 right-6 hidden text-right text-[0.72rem] leading-snug text-white/55 lg:right-10 lg:block"
      >
        <span className="block font-medium text-white/80">{h.caption}</span>
        {h.captionRole}
      </motion.p>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: start + 1.1 }}
        className="absolute inset-x-0 bottom-7 flex justify-center"
      >
        <motion.a
          href="#about"
          style={{ opacity: cueOpacity }}
          className="flex flex-col items-center gap-2 text-[0.68rem] font-medium tracking-[0.08em] text-white/55 transition-colors hover:text-white"
        >
          <span className="flex h-8 w-5 justify-center rounded-full border border-white/30 pt-1.5" aria-hidden="true">
            <span className="h-1.5 w-[3px] animate-scroll-dot rounded-full bg-white" />
          </span>
          {h.scroll}
        </motion.a>
      </motion.div>
    </section>
  );
}
