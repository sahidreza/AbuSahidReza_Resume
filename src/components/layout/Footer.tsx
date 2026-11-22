"use client";

import { ArrowUp } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { LinkedInIcon, Monogram } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";
import { LanguageSegmented } from "./LanguageSwitcher";

export function Footer() {
  const { dict } = useLocale();
  const n = dict.nav;
  const links = [
    ["about", n.about],
    ["experience", n.experience],
    ["work", n.work],
    ["expertise", n.expertise],
    ["contact", n.contact],
  ] as const;

  return (
    <footer data-tone="dark" className="border-t border-white/[0.08] bg-night text-white">
      <div className="container-site py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="flex items-center gap-2.5 text-[1rem] font-semibold">
              <Monogram />
              {siteConfig.name}
            </p>
            <p className="mt-2 text-[0.88rem] text-white/50">{dict.footer.tagline}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5 text-[0.88rem] sm:grid-cols-3">
              {links.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-white/60 transition-colors hover:text-white">
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-white/60 transition-colors hover:text-white"
                >
                  <LinkedInIcon className="h-3.5 w-3.5" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mt-12 flex flex-col-reverse gap-6 border-t border-white/[0.08] pt-8 text-[0.8rem] text-white/45 md:flex-row md:items-center md:justify-between">
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} {siteConfig.name}. {dict.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <LanguageSegmented tone="dark" />
            <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-white">
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
              {dict.footer.top}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
