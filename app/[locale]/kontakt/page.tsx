import type { Metadata } from "next";
import { Clock, Facebook, Instagram, MapPin } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { ContactEmailCard, ContactPhoneCard } from "@/components/ObfuscatedContact";
import { ContactFormTabs } from "@/components/ContactFormTabs";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";
import { buildAlternates, baseOpenGraph } from "@/lib/metadata-i18n";
import { site } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.contact" });
  const typedLocale = locale as Locale;
  const pathname = getPathname({ locale: typedLocale, href: "/kontakt" });
  const title = t("title");
  const description = t("description");
  const keywords = t("keywords");

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: buildAlternates(typedLocale, "/kontakt"),
    openGraph: baseOpenGraph(typedLocale, title, description, `${site.url}${pathname}`),
  };
}

export default async function KontaktPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "contact" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tHours = await getTranslations({ locale, namespace: "hours" });
  const typedLocale = locale as Locale;

  const hours = [
    { day: tHours("weekdays"), time: tHours("weekdaysTime") },
    { day: tHours("saturday"), time: tHours("saturdayTime") },
    { day: tHours("sunday"), time: tHours("sundayTime") },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: tCommon("home"), item: getPathname({ locale: typedLocale, href: "/" }) },
          { name: t("title"), item: getPathname({ locale: typedLocale, href: "/kontakt" }) },
        ])}
      />

      <section className="border-b border-border bg-gradient-to-b from-brand-soft/50 to-background">
        <div className="container-page py-16 text-center md:py-20">
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold text-brand md:text-5xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{t("subtitle")}</p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            <ContactPhoneCard />
            <ContactEmailCard />

            <div className="surface-panel flex items-start gap-4 bg-card p-5">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("serviceArea")}
                </div>
                <div className="text-base font-semibold">{t("serviceAreaValue")}</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {site.address.street}, {site.address.postalCode} {site.address.city}
                </div>
              </div>
            </div>

            <div className="surface-panel flex items-start gap-4 bg-card p-5">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("workingHours")}
                </div>
                <ul className="mt-1 space-y-0.5 text-sm">
                  {hours.map((h) => (
                    <li key={h.day}>
                      <span className="font-semibold">{h.day}:</span> {h.time}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="surface-panel flex items-start gap-4 bg-card p-5">
              <div>
                <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("socialMedia")}
                </div>
                <div className="flex gap-3">
                  <a
                    href={site.socials.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background transition-colors hover:bg-brand hover:text-brand-foreground"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a
                    href={site.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background transition-colors hover:bg-brand hover:text-brand-foreground"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-border">
              <iframe
                title={t("mapTitle")}
                src="https://www.google.com/maps?q=W%C5%82adys%C5%82awa+%C5%81okietka+242G,+31-334+Krak%C3%B3w&output=embed"
                width="100%"
                height="240"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0"
              />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-brand">{t("formTitle")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t("formSubtitle")}</p>
            <div className="mt-6">
              <ContactFormTabs />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
