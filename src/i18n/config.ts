export const locales = ["en", "de", "no"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** BCP 47 tag used for <html lang>, hreflang and number formatting. */
export const localeTags: Record<Locale, string> = {
  en: "en",
  de: "de",
  no: "nb",
};

export const ogLocales: Record<Locale, string> = {
  en: "en_US",
  de: "de_DE",
  no: "nb_NO",
};

export const localeNames: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  no: "Norsk",
};

export const localeShort: Record<Locale, string> = {
  en: "EN",
  de: "DE",
  no: "NO",
};

/** Path of each locale's page, relative to the base path. English is the default at the root. */
export function localePath(locale: Locale): string {
  return locale === defaultLocale ? "/" : `/${locale}/`;
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const LOCALE_STORAGE_KEY = "asr-locale";
