import { site } from "@/lib/site";
import { getSiteCopy } from "@/lib/content";
import type { Locale } from "@/i18n/routing";

type Props = { data: Record<string, unknown> | Record<string, unknown>[] };

export function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function localBusinessSchema(locale: Locale = "pl") {
  const copy = getSiteCopy(locale);
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.legalName,
    image: `${site.url}/og.jpg`,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    priceRange: "700 - 3000 PLN",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 50.0916,
      longitude: 19.9459,
    },
    areaServed: copy.regions.map((r) => ({ "@type": "AdministrativeArea", name: r })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "14:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.reviews.rating.toFixed(1),
      reviewCount: site.reviews.count,
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [site.socials.facebook, site.socials.instagram, site.socials.google],
  };
}

export function organizationSchema(locale: Locale = "pl") {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/logo/logo-square.webp`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phone,
      contactType: "customer service",
      areaServed: "PL",
      availableLanguage: locale === "en" ? ["Polish", "English"] : ["Polish"],
    },
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function articleSchema(post: {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${site.url}/blog/${post.slug}`,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    url: `${site.url}/blog/${post.slug}`,
    image: `${site.url}/og.jpg`,
    inLanguage: "pl-PL",
    publisher: {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/logo/logo-square.webp`,
      },
    },
    author: {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${site.url}/blog/${post.slug}`,
    },
    isPartOf: {
      "@type": "Blog",
      "@id": `${site.url}/blog`,
      name: `${site.name} — Blog`,
    },
  };
}

export function breadcrumbSchema(
  crumbs: { name: string; item: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${site.url}${crumb.item}`,
    })),
  };
}
