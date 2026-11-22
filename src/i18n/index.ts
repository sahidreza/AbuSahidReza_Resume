import { en, type Dictionary } from "./en";
import { de } from "./de";
import { no } from "./no";
import type { Locale } from "./config";

export const dictionaries: Record<Locale, Dictionary> = { en, de, no };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
export * from "./config";
