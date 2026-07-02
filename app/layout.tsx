import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { CookieBanner } from "@/components/CookieBanner";
import {
  JsonLd,
  localBusinessSchema,
  organizationSchema,
} from "@/components/JsonLd";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.tagline} | ${site.name} Kraków`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "odbiór mieszkania Kraków",
    "odbiór techniczny mieszkania",
    "odbiór mieszkania od dewelopera",
    "badania termowizyjne Kraków",
    "inspekcja techniczna nieruchomości",
    "protokół odbioru mieszkania",
    "Bezpieczny Odbiór",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: site.url,
    siteName: site.name,
    title: `${site.tagline} | ${site.name} Kraków`,
    description: site.description,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: site.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.tagline} | ${site.name}`,
    description: site.description,
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={inter.variable}>
      <body className="min-h-screen bg-white text-slate-900">
        <JsonLd data={[localBusinessSchema(), organizationSchema()]} />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ExitIntentPopup />
        <CookieBanner />
      </body>
    </html>
  );
}
