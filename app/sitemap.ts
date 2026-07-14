import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { site } from "@/lib/site";
import { posts } from "@/lib/posts";
import { getAllServiceSlugs } from "@/lib/service-slugs";
import type { Locale } from "@/i18n/routing";

const localizedPages = [
  "/",
  "/oferta",
  "/kontakt",
  "/o-nas",
  "/odbiory-mieszkan-krakow",
  "/polityka-prywatnosci",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const locales: Locale[] = ["pl", "en"];

  const localizedRoutes: MetadataRoute.Sitemap = localizedPages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${site.url}${getPathname({ locale, href: page })}`,
      lastModified: now,
      changeFrequency: page === "/" ? "weekly" : page === "/polityka-prywatnosci" ? "yearly" : "monthly",
      priority: page === "/" ? 1 : page === "/oferta" ? 0.9 : page === "/polityka-prywatnosci" ? 0.3 : 0.8,
    }))
  );

  const plOnlyRoutes: MetadataRoute.Sitemap = [
    {
      url: `${site.url}${getPathname({ locale: "pl", href: "/sklep" })}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${site.url}${getPathname({ locale: "pl", href: "/blog" })}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getAllServiceSlugs(locale).map((slug) => ({
      url: `${site.url}${getPathname({ locale, href: { pathname: "/oferta/[slug]", params: { slug } } })}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))
  );

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${site.url}${getPathname({ locale: "pl", href: { pathname: "/blog/[slug]", params: { slug: p.slug } } })}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...localizedRoutes, ...plOnlyRoutes, ...serviceRoutes, ...blogRoutes];
}
