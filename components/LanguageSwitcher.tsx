"use client";

import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { getServiceIdFromSlug, getServiceSlug } from "@/lib/service-slugs";
import type { Locale } from "@/i18n/routing";

const staticPages = [
  "/",
  "/oferta",
  "/kontakt",
  "/o-nas",
  "/odbiory-mieszkan-krakow",
  "/polityka-prywatnosci",
] as const;

type StaticPage = (typeof staticPages)[number];

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams<{ slug?: string }>();
  const t = useTranslations("languageSwitcher");
  const nextLocale: Locale = locale === "pl" ? "en" : "pl";

  const switchLocale = () => {
    if (params.slug) {
      const serviceId = getServiceIdFromSlug(params.slug);
      if (serviceId) {
        router.replace(
          { pathname: "/oferta/[slug]", params: { slug: getServiceSlug(serviceId, nextLocale) } },
          { locale: nextLocale }
        );
        return;
      }
    }

    if (staticPages.includes(pathname as StaticPage)) {
      router.replace(pathname as StaticPage, { locale: nextLocale });
    }
  };

  const canSwitch = params.slug || staticPages.includes(pathname as StaticPage);
  if (!canSwitch) return null;

  return (
    <button
      type="button"
      onClick={switchLocale}
      className="cursor-pointer rounded px-1.5 py-0.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
      aria-label={t("switchTo", { locale: t(nextLocale) })}
    >
      {t(nextLocale)}
    </button>
  );
}
