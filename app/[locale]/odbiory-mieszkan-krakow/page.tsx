import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, MapPin, Phone, Building2, Star, ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link, getPathname } from "@/i18n/navigation";
import { getDistricts, getKrakowFaq } from "@/lib/content";
import { FaqAccordion } from "@/components/FaqAccordion";
import { LeadWizard } from "@/components/LeadWizard";
import { GoogleReviewsBadge } from "@/components/GoogleReviewsBadge";
import { JsonLd, faqSchema, breadcrumbSchema } from "@/components/JsonLd";
import { BLUR_PLACEHOLDER } from "@/lib/image";
import { ObfuscatedPhoneLink } from "@/components/ObfuscatedContact";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { buildAlternates, baseOpenGraph, baseTwitter } from "@/lib/metadata-i18n";
import { site } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

const localDevelopers = [
  "Buma Group",
  "Dom Development",
  "Atal",
  "Develia",
  "Robyg",
  "Murapol",
  "Novisa Development",
  "Wawel Service",
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.krakow" });
  const typedLocale = locale as Locale;
  const pathname = getPathname({ locale: typedLocale, href: "/odbiory-mieszkan-krakow" });
  const title = t("title");
  const description = t("description");
  const keywords = t("keywords");

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: buildAlternates(typedLocale, "/odbiory-mieszkan-krakow"),
    openGraph: baseOpenGraph(typedLocale, title, description, `${site.url}${pathname}`),
    twitter: baseTwitter(title, description),
  };
}

export default async function KrakowLandingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "krakow" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tHome = await getTranslations({ locale, namespace: "home" });
  const typedLocale = locale as Locale;
  const districts = getDistricts(typedLocale);
  const krakowFaq = getKrakowFaq(typedLocale);
  const highlights = t.raw("highlights") as string[];
  const whyUsItems = (t.raw("whyUs.items") as string[]).map((item) =>
    item.replace("{count}", String(site.reviews.count))
  );

  return (
    <>
      <JsonLd
        data={[
          faqSchema(krakowFaq),
          breadcrumbSchema([
            { name: tCommon("home"), item: getPathname({ locale: typedLocale, href: "/" }) },
            {
              name: tNav("krakowLanding"),
              item: getPathname({ locale: typedLocale, href: "/odbiory-mieszkan-krakow" }),
            },
          ]),
        ]}
      />

      <PageHero
        imageAlt={tHome("hero.imageAlt")}
        contentClassName="grid gap-12 py-16 lg:grid-cols-2 lg:items-center lg:py-24"
      >
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            <MapPin className="h-3.5 w-3.5" /> {t("badge")}
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-5 text-lg text-white/80">
            {t("description", { count: site.reviews.count })}
          </p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-white/90">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-cta" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="cta">
              <a href="#wycena">{tCommon("freeQuote")}</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
            >
              <ObfuscatedPhoneLink location="landing_cta">
                <Phone className="h-4 w-4" />
              </ObfuscatedPhoneLink>
            </Button>
          </div>
          <div className="mt-5">
            <GoogleReviewsBadge variant="compact" />
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-elegant">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="https://images.unsplash.com/photo-1573424659379-f5d699f4845a?auto=format&fit=crop&w=1400&q=80"
                alt={t("imageAlt")}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
                className="object-cover"
              />
            </div>
            <div className="border-t border-border bg-surface p-5">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5 text-cta">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-semibold">
                  {tCommon("ratingReviews", {
                    rating: site.reviews.rating.toFixed(1),
                    count: site.reviews.count,
                  })}
                </span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{t("reviewQuote")}</p>
            </div>
          </div>
        </div>
      </PageHero>

      <section className="container-page py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-brand md:text-4xl">{t("districts.title")}</h2>
          <p className="mt-4 text-muted-foreground">{t("districts.subtitle")}</p>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {districts.map((district) => (
            <div
              key={district.slug}
              className="flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium"
            >
              <MapPin className="h-3.5 w-3.5 text-cta" />
              {district.name}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-brand md:text-4xl">{t("developers.title")}</h2>
              <p className="mt-4 text-muted-foreground">{t("developers.description")}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {localDevelopers.map((name) => (
                <div key={name} className="surface-panel flex items-center gap-3 bg-card p-4">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold">{name}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-8 text-xs text-muted-foreground">{t("developers.disclaimer")}</p>
        </div>
      </section>

      <section id="wycena" className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-3xl font-bold text-brand md:text-4xl">{t("order.title")}</h2>
            <p className="mt-4 text-muted-foreground">{t("order.subtitle")}</p>
            <div className="mt-6">
              <LeadWizard />
            </div>
          </div>
          <div className="rounded-2xl border border-brand/20 bg-brand p-8 text-brand-foreground">
            <h3 className="text-xl font-bold">{t("whyUs.title")}</h3>
            <ul className="mt-5 space-y-3">
              {whyUsItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cta" />
                  {item}
                </li>
              ))}
            </ul>
            <Button asChild size="lg" variant="cta" className="mt-6">
              <Link href="/oferta">
                {tCommon("seeFullOffer")} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-brand md:text-4xl">{t("faq.title")}</h2>
            <p className="mt-4 text-muted-foreground">{t("faq.subtitle")}</p>
          </div>
          <div className="mt-10">
            <FaqAccordion items={krakowFaq} />
          </div>
        </div>
      </section>
    </>
  );
}
