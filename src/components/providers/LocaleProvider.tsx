"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  defaultLocale,
  dictionaries,
  isLocale,
  localePath,
  localeTags,
  LOCALE_STORAGE_KEY,
  type Dictionary,
  type Locale,
} from "@/i18n";

type LocaleContextValue = {
  locale: Locale;
  dict: Dictionary;
  /** BCP 47 tag for Intl formatting. */
  tag: string;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function applyDocumentLocale(locale: Locale) {
  const dict = dictionaries[locale];
  document.documentElement.lang = localeTags[locale];
  document.title = dict.meta.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", dict.meta.description);
  const url = `${basePath}${localePath(locale)}${window.location.hash}`;
  // Swap the URL without a reload, so the address bar always points at the localised, indexable page.
  window.history.replaceState(window.history.state, "", url);
}

export function LocaleProvider({ initialLocale, children }: { initialLocale: Locale; children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // A visitor who lands on the default (English) URL gets their remembered language.
  // An explicit /de/ or /no/ URL always wins over the stored preference.
  useEffect(() => {
    if (initialLocale !== defaultLocale) return;
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    } catch {
      /* storage unavailable */
    }
    if (stored && isLocale(stored) && stored !== initialLocale) {
      setLocaleState(stored);
      applyDocumentLocale(stored);
    }
  }, [initialLocale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    applyDocumentLocale(next);
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, dict: dictionaries[locale], tag: localeTags[locale], setLocale }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside <LocaleProvider>");
  return ctx;
}
