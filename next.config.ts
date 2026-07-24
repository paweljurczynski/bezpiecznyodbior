import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/rezerwacja",
        destination: "/kontakt",
        permanent: true,
      },
      {
        source: "/pl/rezerwacja",
        destination: "/kontakt",
        permanent: true,
      },
      {
        source: "/en/rezerwacja",
        destination: "/en/contact",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
