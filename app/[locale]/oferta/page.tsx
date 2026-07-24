import type { Metadata } from "next";
import Image from "next/image";
import {
  Building2,
  Home as HomeIcon,
  Thermometer,
  Compass,
  Scale,
  Ruler,
  Zap,
  Check,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link, getPathname } from "@/i18n/navigation";
import { ObfuscatedPhoneLink } from "@/components/ObfuscatedContact";
import { Button } from "@/components/ui/button";
import { LeadWizard } from "@/components/LeadWizard";
import { PageHero } from "@/components/PageHero";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";
import { BLUR_PLACEHOLDER } from "@/lib/image";
import { getServices } from "@/lib/content";
import { buildAlternates, baseOpenGraph, baseTwitter } from "@/lib/metadata-i18n";
import type { Service } from "@/lib/services";
import { site } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

const serviceIcons: Record<Service["icon"], LucideIcon> = {
  key: Building2,
  home: HomeIcon,
  thermal: Thermometer,
  compass: Compass,
  shield: Scale,
  ruler: Ruler,
  leaf: Zap,
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.offer" });
  const typedLocale = locale as Locale;
  const pathname = getPathname({ locale: typedLocale, href: "/oferta" });
  const title = t("title");
  const description = t("description");
  const keywords = t("keywords");

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: buildAlternates(typedLocale, "/oferta"),
    openGraph: baseOpenGraph(typedLocale, title, description, `${site.url}${pathname}`),
    twitter: baseTwitter(title, description),
  };
}

export default async function OfertaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "offer" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tForms = await getTranslations({ locale, namespace: "forms.leadWizard" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const typedLocale = locale as Locale;
  const services = getServices(typedLocale);
  const basicServices = services.filter((s) => !s.premium);
  const premiumServices = services.filter((s) => s.premium);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: tCommon("home"), item: getPathname({ locale: typedLocale, href: "/" }) },
          { name: tNav("offer"), item: getPathname({ locale: typedLocale, href: "/oferta" }) },
        ])}
      />

      <PageHero
        imageSrc="/oferta-hero.jpg"
        imageAlt={t("heroImageAlt")}
        contentClassName="py-16 text-center md:py-20"
      >
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold text-white md:text-5xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/80">{t("subtitle")}</p>
      </PageHero>

      <section className="container-page py-16">
        <h2 className="text-2xl font-bold text-brand md:text-3xl">{t("basicServices")}</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {basicServices.map((service) => {
            const Icon = serviceIcons[service.icon];
            return (
              <Link
                key={service.slug}
                href={{ pathname: "/oferta/[slug]", params: { slug: service.slug } }}
                className="group block"
              >
                <article id={service.slug} className="surface-panel overflow-hidden bg-card transition-shadow hover:shadow-elegant">
                  <div className="relative aspect-[16/7] w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      placeholder="blur"
                      blurDataURL={BLUR_PLACEHOLDER}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-3">
                      <div className="grid h-12 w-12 place-items-center rounded-lg bg-brand-soft text-brand">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                        {service.tag}
                      </span>
                    </div>
                    <h3 className="mt-5 text-xl font-bold">{service.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{service.description}</p>
                    <ul className="mt-5 space-y-2">
                      {service.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2 text-sm">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-cta" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-brand group-hover:underline">
                      {tCommon("learnMoreChecklist")} <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="container-page">
          <h2 className="text-2xl font-bold text-brand md:text-3xl">{t("newServices")}</h2>
          <p className="mt-2 text-muted-foreground">{t("newServicesSubtitle")}</p>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {premiumServices.map((service) => {
              const Icon = serviceIcons[service.icon];
              return (
                <Link
                  key={service.slug}
                  href={{ pathname: "/oferta/[slug]", params: { slug: service.slug } }}
                  className="group block"
                >
                  <article
                    id={service.slug}
                    className="relative flex h-full flex-col rounded-2xl border border-brand/20 bg-card p-8 shadow-elegant transition-shadow hover:shadow-lg"
                  >
                    <span className="absolute -top-3 left-6 rounded-full bg-cta px-3 py-1 text-xs font-bold uppercase tracking-wider text-cta-foreground">
                      {t("badgeNew")}
                    </span>
                    <div className="grid h-12 w-12 place-items-center rounded-lg bg-brand text-brand-foreground">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-bold leading-tight">{service.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{service.description}</p>
                    <ul className="mt-5 space-y-2">
                      {service.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2 text-sm">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-cta" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-semibold text-brand group-hover:underline">
                      {tCommon("learnMore")} <ArrowRight className="h-4 w-4" />
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-brand">{tForms("title")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{tForms("subtitle")}</p>
        </div>
        <div className="max-w-lg">
          <LeadWizard />
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="rounded-3xl bg-brand p-10 text-center text-brand-foreground">
          <h2 className="text-2xl font-bold md:text-3xl">{t("cta.title")}</h2>
          <p className="mx-auto mt-3 max-w-xl opacity-90">{t("cta.description")}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="cta">
              <Link href="/kontakt">
                {tCommon("freeQuoteOrder")} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-brand-foreground/30 bg-transparent text-brand-foreground hover:bg-brand-foreground/10"
            >
              <ObfuscatedPhoneLink location="offer_cta">{tCommon("callUs")} </ObfuscatedPhoneLink>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
