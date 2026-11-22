"use client";

import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from "react";

type ScrollContextValue = {
  /** Smoothly scroll to a selector, element or pixel offset. */
  scrollTo: (target: string | HTMLElement | number) => void;
  stop: () => void;
  start: () => void;
};

const ScrollContext = createContext<ScrollContextValue>({
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback((target: string | HTMLElement | number) => {
    const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
    if (el === null) return;
    const lenis = lenisRef.current;
    const focusTarget = () => {
      if (typeof el === "number") return;
      if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
    };
    if (lenis) {
      lenis.scrollTo(el, { duration: 1.4, onComplete: focusTarget });
    } else if (typeof el === "number") {
      window.scrollTo({ top: el });
    } else {
      el.scrollIntoView();
      focusTarget();
    }
  }, []);

  const stop = useCallback(() => lenisRef.current?.stop(), []);
  const start = useCallback(() => lenisRef.current?.start(), []);

  // Route in-page anchor links through the smooth scroller.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const link = (event.target as HTMLElement | null)?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!link) return;
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;
      event.preventDefault();
      scrollTo(target);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [scrollTo]);

  return <ScrollContext.Provider value={{ scrollTo, stop, start }}>{children}</ScrollContext.Provider>;
}

export const useSmoothScroll = () => useContext(ScrollContext);
