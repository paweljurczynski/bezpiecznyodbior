import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pl", "en"],
  defaultLocale: "pl",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/oferta": { pl: "/oferta", en: "/offer" },
    "/oferta/[slug]": { pl: "/oferta/[slug]", en: "/offer/[slug]" },
    "/kontakt": { pl: "/kontakt", en: "/contact" },
    "/o-nas": { pl: "/o-nas", en: "/about" },
    "/odbiory-mieszkan-krakow": {
      pl: "/odbiory-mieszkan-krakow",
      en: "/apartment-inspection-krakow",
    },
    "/polityka-prywatnosci": {
      pl: "/polityka-prywatnosci",
      en: "/privacy-policy",
    },
    "/sklep": "/sklep",
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
  },
});

export type Locale = (typeof routing.locales)[number];
export type Pathnames = keyof typeof routing.pathnames;
