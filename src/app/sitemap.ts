import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { localePath, locales, localeTags } from "@/i18n";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [localeTags[l], absoluteUrl(localePath(l))]));
  return locales.map((l) => ({
    url: absoluteUrl(localePath(l)),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: l === "en" ? 1 : 0.9,
    alternates: { languages },
  }));
}
