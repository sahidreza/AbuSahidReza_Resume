import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { getDictionary, localePath, locales, localeTags, ogLocales, type Locale } from "@/i18n";

export const absoluteUrl = (path: string) => `${siteConfig.url}${path}`;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function buildMetadata(locale: Locale): Metadata {
  const d = getDictionary(locale);
  const url = absoluteUrl(localePath(locale));
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l) => [localeTags[l], absoluteUrl(localePath(l))]),
  );
  languages["x-default"] = absoluteUrl(localePath("en"));

  return {
    metadataBase: new URL(`${siteConfig.url}/`),
    title: d.meta.title,
    description: d.meta.description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name, url: siteConfig.linkedin }],
    creator: siteConfig.name,
    keywords: [
      "Abu Sahid Reza",
      "AI Product Manager",
      "Technical Product Manager",
      "LLM",
      "Voice AI",
      "Product Leadership",
      "Loominote",
      "iOS",
    ],
    alternates: { canonical: url, languages },
    openGraph: {
      type: "profile",
      url,
      siteName: siteConfig.name,
      title: d.meta.title,
      description: d.meta.description,
      locale: ogLocales[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocales[l]),
      firstName: "Abu Sahid",
      lastName: "Reza",
      images: [{ url: absoluteUrl("/og.jpg"), width: 1200, height: 630, alt: d.meta.ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: d.meta.title,
      description: d.meta.description,
      images: [absoluteUrl("/og.jpg")],
    },
    robots: { index: true, follow: true },
    icons: {
      icon: [{ url: `${basePath}/icon.svg`, type: "image/svg+xml" }],
      apple: [{ url: `${basePath}/apple-touch-icon.png` }],
    },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/** schema.org Person, for rich results. Only facts from the resumes. */
export function personJsonLd(locale: Locale) {
  const d = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: "Technical AI Product Manager",
    description: d.meta.description,
    url: absoluteUrl(localePath(locale)),
    image: absoluteUrl(siteConfig.portrait.src),
    email: `mailto:${siteConfig.email}`,
    sameAs: [siteConfig.linkedin],
    worksFor: { "@type": "Organization", name: "Tata Consultancy Services" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Calcutta Institute of Engineering and Management" },
    knowsAbout: [
      "AI product strategy",
      "LLM integration and evaluation",
      "Prompt engineering",
      "Speech-to-text",
      "Product management",
      "Agile and Scrum",
      "iOS development",
      "Swift",
    ],
    knowsLanguage: ["en", "de"],
  };
}
