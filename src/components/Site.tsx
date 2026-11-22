"use client";

import { MotionConfig } from "motion/react";
import type { Locale } from "@/i18n";
import { LocaleProvider } from "./providers/LocaleProvider";
import { SmoothScroll } from "./providers/SmoothScroll";
import { Nav } from "./layout/Nav";
import { Footer } from "./layout/Footer";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Experience } from "./sections/Experience";
import { Work } from "./sections/Work";
import { Expertise } from "./sections/Expertise";
import { Achievements } from "./sections/Achievements";
import { Education } from "./sections/Education";
import { Contact } from "./sections/Contact";
import { siteConfig } from "@/config/site";

export function Site({ locale }: { locale: Locale }) {
  return (
    <LocaleProvider initialLocale={locale}>
      <MotionConfig reducedMotion="user">
        <SmoothScroll>
          {/* Page loader: pure CSS, fades itself out even if JavaScript fails. */}
          <div className="loader" aria-hidden="true">
            <div className="loader__mark">
              <span className="loader__name">{siteConfig.name}</span>
              <span className="loader__bar" />
            </div>
          </div>
          <Nav />
          <main id="main" tabIndex={-1} className="outline-none">
            <Hero />
            <About />
            <Experience />
            <Work />
            <Expertise />
            <Achievements />
            <Education />
            <Contact />
          </main>
          <Footer />
        </SmoothScroll>
      </MotionConfig>
    </LocaleProvider>
  );
}
