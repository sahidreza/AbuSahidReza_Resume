/**
 * Site configuration — the single place to change personal details, links and files.
 *
 * Files referenced here live in /public. To replace one, drop the new file into
 * /public with the same name, or change the path below.
 */
export const siteConfig = {
  name: "Abu Sahid Reza",
  shortName: "ASR",

  /** Public URL of the deployed site (no trailing slash). Used for SEO, sitemap and social cards. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sahidreza.github.io/AbuSahidReza_Resume",

  email: "sahidcse15@gmail.com",
  linkedin: "https://www.linkedin.com/in/abusahid",
  linkedinLabel: "linkedin.com/in/abusahid",

  /** Portrait shown in the hero. Replace /public/images/portrait.jpg to change it. */
  portrait: {
    src: "/images/portrait.jpg",
    /** Smaller copy for phones. Replace it too, or set it to the same path as src. */
    srcSmall: "/images/portrait-720.jpg",
    width: 1199,
    height: 1574,
  },

  /** Downloadable resume, the same file for every country and language. Replace the PDF in /public/resume to update it. */
  resume: "/resume/Abu_Sahid_Reza_Resume.pdf",

  /**
   * Contact form delivery.
   * - Leave empty: the form opens the visitor's email app with the message pre-filled.
   * - Set to a form-backend endpoint that accepts JSON POSTs (for example
   *   "https://formspree.io/f/xxxxxxx") to receive messages without the email app.
   */
  contactFormEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "",

  /** Loominote links. Leave empty to hide the button. */
  loominote: {
    appStoreUrl: "",
    /**
     * Real screenshots for the Loominote case study, e.g. ["/images/loominote/1.png"].
     * Leave empty to show the built-in illustrative interface.
     */
    screenshots: [] as string[],
  },
} as const;

/** Prefix a /public path with the deployment base path (needed on GitHub Pages project sites). */
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}
