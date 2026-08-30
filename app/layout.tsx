import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { getConsentDefaultScript } from "@/lib/analytics";
import "./globals.css";

const gtmId = "GTM-NF5XRN4H";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://bezpiecznyodbior.pl"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${inter.variable} ${plusJakarta.variable}`} suppressHydrationWarning>
      <Script id="consent-defaults" strategy="beforeInteractive">
        {getConsentDefaultScript()}
      </Script>
      <GoogleTagManager gtmId={gtmId} />
      <body className="min-h-screen bg-background text-foreground">{children}</body>
    </html>
  );
}
