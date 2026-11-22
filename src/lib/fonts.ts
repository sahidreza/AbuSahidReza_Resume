import { Inter } from "next/font/google";

/** Fallback for platforms without the system UI font (Apple devices use SF Pro). */
export const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
});
