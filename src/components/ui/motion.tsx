"use client";

import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, type ElementType, type ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Fade and rise into view once. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "p" | "span" | "section" | "article" | "header";
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

/** Headline whose words rise out of a mask, one after another. */
export function SplitReveal({
  text,
  as = "h2",
  className,
  delay = 0,
  stagger = 0.06,
  onMount = false,
  id,
}: {
  id?: string;
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Animate immediately instead of when scrolled into view. */
  onMount?: boolean;
}) {
  const Tag = as;
  const words = text.split(" ");
  const trigger = onMount
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, margin: "0px 0px -10% 0px" } };
  return (
    <Tag id={id} className={className}>
      <motion.span className="block" initial="hidden" {...trigger} transition={{ staggerChildren: stagger, delayChildren: delay }}>
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
            <motion.span
              className="inline-block will-change-transform"
              variants={{
                hidden: { y: "105%", opacity: 0 },
                show: { y: "0%", opacity: 1, transition: { duration: 1, ease: EASE } },
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 ? " " : null}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/** Paragraph whose words light up as the reader scrolls through it. */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");
  // Same markup on server and client (avoids hydration mismatches); reduced motion just shows every word.
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word
          key={`${word}-${i}`}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          still={!!reduce}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  still,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  still: boolean;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <>
      <motion.span style={{ opacity: still ? 1 : opacity }}>{children}</motion.span>{" "}
    </>
  );
}

/** Number that counts up the first time it is seen. Renders the final value on the server. */
export function Counter({
  value,
  locale,
  prefix = "",
  suffix = "",
  duration = 1.8,
  className,
}: {
  value: number;
  locale: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -4% 0px" });
  const reduce = useReducedMotion();
  const format = (n: number) => `${prefix}${new Intl.NumberFormat(locale).format(Math.round(n))}${suffix}`;

  // Start from zero on the client (only when the number is still off-screen).
  useEffect(() => {
    if (reduce || !ref.current || value === 0) return;
    const rect = ref.current.getBoundingClientRect();
    if (rect.top > window.innerHeight) ref.current.textContent = format(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    if (reduce || value === 0) {
      ref.current.textContent = format(value);
      return;
    }
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (n) => {
        if (ref.current) ref.current.textContent = format(n);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, locale, prefix, suffix]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {format(value)}
    </span>
  );
}

/** Image or block that gently scales and drifts while it crosses the viewport. */
export function ParallaxScale({
  children,
  className,
  from = 0.9,
  to = 1,
  y = 40,
}: {
  children: ReactNode;
  className?: string;
  from?: number;
  to?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [from, to]);
  const translateY = useTransform(scrollYProgress, [0, 1], [y, 0]);
  return (
    <motion.div ref={ref} className={className} style={{ scale, y: translateY }}>
      {children}
    </motion.div>
  );
}

/** Small uppercase-free section label. */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-eyebrow ${className}`}>{children}</p>;
}
