"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { localeNames, localePath, locales, localeShort, localeTags, type Locale } from "@/i18n";
import { EASE } from "@/components/ui/motion";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Compact dropdown for the navigation bar. */
export function LanguageMenu({ tone }: { tone: "dark" | "light" }) {
  const { locale, setLocale, dict } = useLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (next: Locale) => {
    setLocale(next);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const onMenuKey = (e: React.KeyboardEvent<HTMLUListElement>) => {
    const items = Array.from(e.currentTarget.querySelectorAll<HTMLAnchorElement>("a"));
    const index = items.indexOf(document.activeElement as HTMLAnchorElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[(index + 1) % items.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      items[(index - 1 + items.length) % items.length]?.focus();
    }
  };

  const dark = tone === "dark";

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${dict.nav.language}: ${localeNames[locale]}`}
        onClick={() => setOpen((v) => !v)}
        className={`flex h-8 items-center gap-1.5 rounded-full px-2.5 text-[0.78rem] font-medium transition-colors duration-300 ${
          dark ? "text-white/80 hover:bg-white/10 hover:text-white" : "text-ink/75 hover:bg-black/5 hover:text-ink"
        }`}
      >
        <Globe className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
        <span>{localeShort[locale]}</span>
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          strokeWidth={2}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={menuId}
            role="list"
            onKeyDown={onMenuKey}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="absolute right-0 top-[calc(100%+10px)] min-w-[170px] origin-top-right overflow-hidden rounded-2xl border border-black/[0.06] bg-white/90 p-1.5 text-ink shadow-[0_18px_50px_-12px_rgba(0,0,0,0.28)] backdrop-blur-2xl"
          >
            {locales.map((l) => (
              <li key={l}>
                <a
                  href={`${basePath}${localePath(l)}`}
                  hrefLang={localeTags[l]}
                  lang={localeTags[l]}
                  aria-current={l === locale ? "true" : undefined}
                  autoFocus={l === locale}
                  onClick={(e) => {
                    e.preventDefault();
                    choose(l);
                  }}
                  className="flex items-center justify-between gap-6 rounded-xl px-3 py-2 text-[0.9rem] outline-none transition-colors hover:bg-black/5 focus-visible:bg-black/5"
                >
                  <span>{localeNames[l]}</span>
                  {l === locale ? (
                    <Check className="h-4 w-4 text-accent" strokeWidth={2.25} aria-hidden="true" />
                  ) : (
                    <span className="text-[0.7rem] font-medium text-graphite">{localeShort[l]}</span>
                  )}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Segmented control used in the mobile menu and the footer. */
export function LanguageSegmented({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const { locale, setLocale, dict } = useLocale();
  const dark = tone === "dark";
  return (
    <nav aria-label={dict.nav.language}>
      <ul className={`inline-flex rounded-full p-1 ${dark ? "bg-white/10" : "bg-black/[0.05]"}`}>
        {locales.map((l) => {
          const active = l === locale;
          return (
            <li key={l} className="relative">
              {active && (
                <motion.span
                  layoutId={`lang-pill-${tone}`}
                  className={`absolute inset-0 rounded-full ${dark ? "bg-white" : "bg-white shadow-sm"}`}
                  transition={{ duration: 0.35, ease: EASE }}
                />
              )}
              <a
                href={`${basePath}${localePath(l)}`}
                hrefLang={localeTags[l]}
                lang={localeTags[l]}
                aria-current={active ? "true" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  setLocale(l);
                }}
                className={`relative z-10 block rounded-full px-3.5 py-1.5 text-[0.8rem] font-medium transition-colors ${
                  active ? "text-ink" : dark ? "text-white/70 hover:text-white" : "text-graphite hover:text-ink"
                }`}
              >
                {localeNames[l]}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
