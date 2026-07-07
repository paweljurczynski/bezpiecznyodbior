import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { site } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

type PageKey =
  | "/"
  | "/oferta"
  | "/kontakt"
  | "/o-nas"
  | "/odbiory-mieszkan-krakow"
  | "/polityka-prywatnosci";

export function buildAlternates(locale: Locale, page: PageKey) {
  const pathname = getPathname({ locale, href: page });
  return {
    canonical: `${site.url}${pathname}`,
    languages: {
      pl: `${site.url}${getPathname({ locale: "pl", href: page })}`,
      en: `${site.url}${getPathname({ locale: "en", href: page })}`,
    },
  };
}

export function buildServiceAlternates(locale: Locale, slug: string) {
  const pathname = getPathname({ locale, href: { pathname: "/oferta/[slug]", params: { slug } } });
  return {
    canonical: `${site.url}${pathname}`,
    languages: {
      pl: `${site.url}${getPathname({ locale: "pl", href: { pathname: "/oferta/[slug]", params: { slug } } })}`,
      en: `${site.url}${getPathname({ locale: "en", href: { pathname: "/oferta/[slug]", params: { slug } } })}`,
    },
  };
}

export function baseOpenGraph(
  locale: Locale,
  title: string,
  description: string,
  url: string
): Metadata["openGraph"] {
  return {
    title,
    description,
    url,
    locale: locale === "en" ? "en_GB" : "pl_PL",
  };
}
