"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowDownToLine, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { LanguageMenu, LanguageSegmented } from "./LanguageSwitcher";
import { Monogram } from "@/components/ui/icons";
import { EASE } from "@/components/ui/motion";
import { asset, siteConfig } from "@/config/site";

const SECTIONS = ["about", "experience", "work", "expertise", "contact"] as const;

export function Nav() {
  const { dict } = useLocale();
  const { stop, start, scrollTo } = useSmoothScroll();
  const [tone, setTone] = useState<"dark" | "light">("dark");
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Track the section under the bar (for colour), scroll direction (for hide/show) and the active link.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const probe = 24;
      const toned = document.querySelectorAll<HTMLElement>("[data-tone]");
      for (const el of toned) {
        const r = el.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) {
          setTone(el.dataset.tone === "light" ? "light" : "dark");
          break;
        }
      }
      setScrolled(y > 8);
      const delta = y - lastY.current;
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > window.innerHeight * 0.9);
        lastY.current = y;
      }
      let current = "";
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Lock scrolling and close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    stop();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      start();
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, stop, start]);

  const dark = tone === "dark" || open;
  const links = SECTIONS.map((id) => ({ id, label: dict.nav[id] }));

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[80] rounded-full bg-white px-4 py-2 text-sm font-medium text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-3"
      >
        {dict.nav.skip}
      </a>

      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: hidden && !open ? -64 : 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: EASE, delay: hidden ? 0 : 0.05 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`transition-[background-color,border-color,backdrop-filter] duration-500 ${
            open
              ? "bg-transparent"
              : scrolled
                ? dark
                  ? "border-b border-white/[0.08] bg-black/70 backdrop-blur-xl backdrop-saturate-150"
                  : "border-b border-black/[0.06] bg-white/75 backdrop-blur-xl backdrop-saturate-150"
                : "border-b border-transparent"
          }`}
        >
          <nav
            aria-label="Primary"
            className={`container-site flex h-12 items-center justify-between transition-colors duration-500 ${
              dark ? "text-white" : "text-ink"
            }`}
          >
            <a href="#top" aria-label={dict.nav.home} className="flex items-center gap-2.5 text-[0.9rem] font-semibold tracking-[-0.01em]">
              <Monogram />
              <span className="hidden whitespace-nowrap sm:inline">{siteConfig.name}</span>
            </a>

            <ul className="hidden items-center gap-1 lg:flex">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    aria-current={active === l.id ? "location" : undefined}
                    className={`relative whitespace-nowrap rounded-full px-3 py-1.5 text-[0.8rem] transition-colors duration-300 ${
                      active === l.id
                        ? dark
                          ? "text-white"
                          : "text-ink"
                        : dark
                          ? "text-white/65 hover:text-white"
                          : "text-ink/60 hover:text-ink"
                    }`}
                  >
                    {l.label}
                    {active === l.id && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute inset-x-3 -bottom-0.5 mx-auto h-px bg-current"
                        transition={{ duration: 0.4, ease: EASE }}
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-1.5">
              <div className={open ? "hidden" : ""}>
                <LanguageMenu tone={dark ? "dark" : "light"} />
              </div>
              <a
                href={asset(siteConfig.resumes.global)}
                download
                className={`hidden h-8 items-center gap-1.5 rounded-full px-3.5 text-[0.78rem] font-medium transition-colors duration-300 lg:inline-flex ${
                  dark ? "bg-white text-ink hover:bg-white/85" : "bg-ink text-white hover:bg-ink/85"
                }`}
              >
                <ArrowDownToLine className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                {dict.nav.resume}
              </a>
              <button
                ref={toggleRef}
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? dict.nav.close : dict.nav.menu}
                className="relative grid h-9 w-9 place-items-center rounded-full lg:hidden"
              >
                {open ? (
                  <X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                ) : (
                  <span aria-hidden="true" className="flex w-[18px] flex-col gap-[5px]">
                    <span className="h-[1.5px] w-full rounded bg-current" />
                    <span className="h-[1.5px] w-full rounded bg-current" />
                  </span>
                )}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={dict.nav.menu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.1 } }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex flex-col bg-black/95 px-6 pb-10 pt-24 text-white backdrop-blur-2xl lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.05 + i * 0.05 }}
                >
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => {
                      // Close first so scrolling is unlocked, then glide to the section.
                      e.preventDefault();
                      setOpen(false);
                      window.setTimeout(() => scrollTo(`#${l.id}`), 60);
                    }}
                    className="block py-2 text-[2rem] font-semibold tracking-[-0.03em] text-white/90 active:text-white"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
              className="mt-auto flex flex-col gap-6"
            >
              <a
                href={asset(siteConfig.resumes.global)}
                download
                className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[0.9rem] font-medium text-ink"
              >
                <ArrowDownToLine className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                {dict.nav.resume}
              </a>
              <LanguageSegmented tone="dark" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
