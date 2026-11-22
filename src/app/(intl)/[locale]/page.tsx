import { notFound } from "next/navigation";
import { Site } from "@/components/Site";
import { isLocale } from "@/i18n";

export default async function LocalizedHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <Site locale={locale} />;
}
