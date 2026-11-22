import { personJsonLd } from "@/lib/seo";
import type { Locale } from "@/i18n";

export function JsonLd({ locale }: { locale: Locale }) {
  return (
    <script
      type="application/ld+json"
      // Static, build-time data only; "<" is escaped so the JSON cannot close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(locale)).replace(/</g, "\\u003c") }}
    />
  );
}
