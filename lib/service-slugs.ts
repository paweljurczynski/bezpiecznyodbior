import type { Locale } from "@/i18n/routing";

export const SERVICE_IDS = [
  "odbior-od-dewelopera",
  "odbior-rynek-wtorny",
  "badania-termowizyjne",
  "doradztwo-inwestycyjne",
  "pakiet-premium-prawnik",
  "inwentaryzacje-architektoniczne",
  "audyty-swiadectwa-energetyczne",
] as const;

export type ServiceId = (typeof SERVICE_IDS)[number];

const slugMap: Record<ServiceId, Record<Locale, string>> = {
  "odbior-od-dewelopera": {
    pl: "odbior-od-dewelopera",
    en: "developer-handover",
  },
  "odbior-rynek-wtorny": {
    pl: "odbior-rynek-wtorny",
    en: "secondary-market-inspection",
  },
  "badania-termowizyjne": {
    pl: "badania-termowizyjne",
    en: "thermal-imaging",
  },
  "doradztwo-inwestycyjne": {
    pl: "doradztwo-inwestycyjne",
    en: "investment-advisory",
  },
  "pakiet-premium-prawnik": {
    pl: "pakiet-premium-prawnik",
    en: "premium-legal-package",
  },
  "inwentaryzacje-architektoniczne": {
    pl: "inwentaryzacje-architektoniczne",
    en: "architectural-surveys",
  },
  "audyty-swiadectwa-energetyczne": {
    pl: "audyty-swiadectwa-energetyczne",
    en: "energy-performance-certificates",
  },
};

const reverseSlugMap = Object.fromEntries(
  SERVICE_IDS.flatMap((id) =>
    (["pl", "en"] as Locale[]).map((locale) => [slugMap[id][locale], id])
  )
) as Record<string, ServiceId>;

export function getServiceSlug(id: ServiceId, locale: Locale) {
  return slugMap[id][locale];
}

export function getServiceIdFromSlug(slug: string): ServiceId | undefined {
  return reverseSlugMap[slug];
}

export function getAllServiceSlugs(locale: Locale) {
  return SERVICE_IDS.map((id) => slugMap[id][locale]);
}
