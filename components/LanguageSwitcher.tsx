"use client";

import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { getServiceIdFromSlug, getServiceSlug } from "@/lib/service-slugs";
import { cn } from "@/lib/utils";
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

  const switchLocale = (nextLocale: Locale) => {
    if (nextLocale === locale) return;

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
    <div className="flex items-center gap-1 text-sm font-semibold">
      <button
        type="button"
        onClick={() => switchLocale("pl")}
        className={cn(
          "cursor-pointer rounded px-1.5 py-0.5 transition-colors",
          locale === "pl" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
        )}
      >
        PL
      </button>
      <span className="text-muted-foreground/50">|</span>
      <button
        type="button"
        onClick={() => switchLocale("en")}
        className={cn(
          "cursor-pointer rounded px-1.5 py-0.5 transition-colors",
          locale === "en" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
        )}
      >
        EN
      </button>
    </div>
  );
}
