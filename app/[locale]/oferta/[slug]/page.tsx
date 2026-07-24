import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle2, Phone, ArrowLeft, Wrench, ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link, getPathname } from "@/i18n/navigation";
import { getServices } from "@/lib/content";
import { LeadWizard } from "@/components/LeadWizard";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";
import { ObfuscatedPhoneLink } from "@/components/ObfuscatedContact";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { buildServiceAlternates, baseOpenGraph, baseTwitter } from "@/lib/metadata-i18n";
import { getAllServiceSlugs } from "@/lib/service-slugs";
import { site } from "@/lib/site";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import { BLUR_PLACEHOLDER } from "@/lib/image";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllServiceSlugs(locale).map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;
  const service = getServices(typedLocale).find((s) => s.slug === slug);
  if (!service) return {};

  const pathname = getPathname({
    locale: typedLocale,
    href: { pathname: "/oferta/[slug]", params: { slug } },
  });
  const title = `${service.title} | ${site.name}`;

  return {
    title,
    description: service.description,
    alternates: buildServiceAlternates(typedLocale, slug),
    openGraph: baseOpenGraph(typedLocale, title, service.description, `${site.url}${pathname}`),
    twitter: baseTwitter(title, service.description),
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const typedLocale = locale as Locale;
  const service = getServices(typedLocale).find((s) => s.slug === slug);
  if (!service) notFound();

  const t = await getTranslations({ locale, namespace: "offerDetail" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tHome = await getTranslations({ locale, namespace: "home" });

  const checklistTitle =
    service.icon === "thermal" ? t("checklistTitleSurvey") : t("checklistTitleHandover");

  const whyUsItems = (t.raw("whyUsItems") as string[]).map((item) =>
    item.replace("{count}", String(site.reviews.count))
  );

  const servicePath = getPathname({
    locale: typedLocale,
    href: { pathname: "/oferta/[slug]", params: { slug: service.slug } },
  });

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: tCommon("home"), item: getPathname({ locale: typedLocale, href: "/" }) },
          { name: tNav("offer"), item: getPathname({ locale: typedLocale, href: "/oferta" }) },
          { name: service.title, item: servicePath },
        ])}
      />

      <PageHero
        imageAlt={tHome("hero.imageAlt")}
        contentClassName="grid gap-12 py-16 lg:grid-cols-2 lg:items-center lg:py-24"
      >
        <div>
          <Link
            href="/oferta"
            className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> {tCommon("backToOffer")}
          </Link>
          <div className="mt-4 flex items-center gap-2">
            <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              {service.tag}
            </span>
            {service.badge && (
              <span className="rounded-full bg-cta px-3 py-1 text-xs font-bold uppercase tracking-wider text-cta-foreground">
                {service.badge}
              </span>
            )}
          </div>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-white md:text-5xl">
            {service.title}
          </h1>
          <p className="mt-5 text-lg text-white/80">{service.description}</p>
          <p className="mt-3 text-2xl font-bold text-white">{service.price}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="cta">
              <a href="#wycena">
                {tCommon("freeQuote")} <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
            >
              <ObfuscatedPhoneLink location="service_hero">
                <Phone className="mr-2 h-4 w-4" />
              </ObfuscatedPhoneLink>
            </Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-elegant">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
              className="object-cover"
            />
          </div>
        </div>
      </PageHero>

      <section className="container-page py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-brand md:text-4xl">{checklistTitle}</h2>
          <p className="mt-4 text-muted-foreground">{t("checklistSubtitle")}</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {service.checklist.map((item, index) => (
            <div key={item.title} className="surface-panel flex gap-4 bg-card p-6">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-brand-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-semibold leading-tight">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-brand md:text-4xl">{t("toolsTitle")}</h2>
              <p className="mt-4 text-muted-foreground">{t("toolsSubtitle")}</p>
              <ul className="mt-6 space-y-3">
                {service.tools.map((tool) => (
                  <li key={tool} className="flex items-start gap-3">
                    <div className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-brand-soft text-brand">
                      <Wrench className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-sm">{tool}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-brand/20 bg-brand p-8 text-brand-foreground">
              <h3 className="text-xl font-bold">{t("deliverablesTitle")}</h3>
              <ul className="mt-5 space-y-3">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cta" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="wycena" className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-3xl font-bold text-brand md:text-4xl">
              {t("orderTitle", { price: service.price })}
            </h2>
            <p className="mt-4 text-muted-foreground">{t("orderSubtitle")}</p>
            <div className="mt-6">
              <LeadWizard />
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8 shadow-elegant">
            <h3 className="text-xl font-bold text-brand">{t("whyUsTitle")}</h3>
            <ul className="mt-5 space-y-3">
              {whyUsItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cta" />
                  {item}
                </li>
              ))}
            </ul>
            <Button asChild size="lg" variant="cta" className="mt-6 w-full">
              <ObfuscatedPhoneLink location="service_sidebar">
                <Phone className="mr-2 h-4 w-4" /> {tCommon("callUs")}{" "}
              </ObfuscatedPhoneLink>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
