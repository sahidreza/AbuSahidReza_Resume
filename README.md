# Abu Sahid Reza — Personal Website

Personal site for Abu Sahid Reza, Technical AI Product Manager. English (default), German and Norwegian.

Built with Next.js (static export), TypeScript, Tailwind CSS, Motion and Lenis. Deployed to GitHub Pages by
`.github/workflows/static.yml` on every push to `main`.

## Everyday edits

| What | Where |
| --- | --- |
| Email, LinkedIn, App Store link, form endpoint | `src/config/site.ts` |
| Portrait | replace `public/images/portrait.jpg` and `public/images/portrait-720.jpg` |
| Resumes | replace the PDFs in `public/resume/` (keep the file names, or change them in `src/config/site.ts`) |
| Loominote screenshots | add images under `public/images/loominote/` and list them in `siteConfig.loominote.screenshots` |
| All text, in every language | `src/i18n/en.ts`, `src/i18n/de.ts`, `src/i18n/no.ts` |
| Social share image | `public/og.jpg` (1200 × 630) |

`en.ts` defines the shape of the text. TypeScript will refuse to build if `de.ts` or `no.ts` is missing a key.

## Contact form

With no endpoint configured, the form opens the visitor's email app with the message filled in. To receive
messages directly, create a form at a JSON form backend (for example Formspree) and either set
`contactFormEndpoint` in `src/config/site.ts` or add a repository variable named `CONTACT_ENDPOINT`
(Settings → Secrets and variables → Actions → Variables).

## Languages and URLs

- `/` English · `/de/` Deutsch · `/no/` Norsk (Bokmål)
- Switching language swaps the text and the address without reloading, and is remembered for the next visit.
- Each language is a separate pre-rendered page with its own `lang`, title, description, canonical and
  `hreflang` links, plus a sitemap.

## Run locally

Requires Node.js 22.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
```

## Motion and accessibility

Animations respect the operating system's "reduce motion" setting: smooth scrolling, parallax, counters and
the page loader are turned off. The loader is pure CSS and removes itself even if JavaScript fails.
