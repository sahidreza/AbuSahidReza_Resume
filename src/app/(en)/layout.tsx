import type { ReactNode } from "react";
import "../globals.css";
import { inter } from "@/lib/fonts";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

export const metadata = buildMetadata("en");
export { viewport } from "@/lib/seo";

export default function EnglishRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}
        <JsonLd locale="en" />
      </body>
    </html>
  );
}
