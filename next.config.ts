import type { NextConfig } from "next";

// On GitHub Pages project sites the app lives under /<repo>. The deploy workflow sets this.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
