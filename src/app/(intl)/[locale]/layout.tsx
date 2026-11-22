import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import "../../globals.css";
import { inter } from "@/lib/fonts";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { defaultLocale, isLocale, localeTags, locales } from "@/i18n";

type Params = Promise<{ locale: string }>;

/** English is served from the root; every other language gets its own prefix. */
export function generateStaticParams() {
  return locales.filter((l) => l !== defaultLocale).map((locale) => ({ locale }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata(locale);
}
export { viewport } from "@/lib/seo";

export default async function LocalizedRootLayout({ children, params }: { children: ReactNode; params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === defaultLocale) notFound();
  return (
    <html lang={localeTags[locale]} className={inter.variable}>
      <body>
        {children}
        <JsonLd locale={locale} />
      </body>
    </html>
  );
}
