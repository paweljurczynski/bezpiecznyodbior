import type { Metadata } from "next";
import {
  Users,
  ShieldCheck,
  ThumbsUp,
  MapPin,
  ArrowRight,
  HardHat,
  Star,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link, getPathname } from "@/i18n/navigation";
import { JsonLd, breadcrumbSchema, organizationSchema } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { GoogleReviewsBadge } from "@/components/GoogleReviewsBadge";
import { ObfuscatedPhoneLink } from "@/components/ObfuscatedContact";
import { Button } from "@/components/ui/button";
import { buildAlternates, baseOpenGraph, baseTwitter } from "@/lib/metadata-i18n";
import { site } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.about" });
  const typedLocale = locale as Locale;
  const pathname = getPathname({ locale: typedLocale, href: "/o-nas" });
  const title = t("title");
  const description = t("description");
  const keywords = t("keywords");

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: buildAlternates(typedLocale, "/o-nas"),
    openGraph: baseOpenGraph(typedLocale, title, description, `${site.url}${pathname}`),
    twitter: baseTwitter(title, description),
  };
}

export default async function ONasPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "about" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const typedLocale = locale as Locale;

  const stats = [
    { value: "5+", label: t("stats.experience") },
    { value: "1200+", label: t("stats.handovers") },
    { value: "5.0/5", label: t("stats.rating") },
    { value: "3", label: t("stats.regions") },
  ];

  const values = [
    { icon: ShieldCheck, title: t("values.reliabilityTitle"), desc: t("values.reliabilityDesc") },
    { icon: HardHat, title: t("values.teamTitle"), desc: t("values.teamDesc") },
    { icon: ThumbsUp, title: t("values.reviewsTitle"), desc: t("values.reviewsDesc") },
    { icon: MapPin, title: t("values.regionsTitle"), desc: t("values.regionsDesc") },
  ];

  const teamBadges = [
    t("team.badges.licence"),
    t("team.badges.thermal"),
    t("team.badges.moisture"),
    t("team.badges.laser"),
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: tCommon("home"), item: getPathname({ locale: typedLocale, href: "/" }) },
          { name: tNav("about"), item: getPathname({ locale: typedLocale, href: "/o-nas" }) },
        ])}
      />
      <JsonLd data={organizationSchema(typedLocale)} />

      <PageHero imageAlt={t("heroImageAlt")} contentClassName="py-20 text-center md:py-28">
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold text-white md:text-5xl">
            {t("heroTitle")}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80">
            {t("heroDescription", { siteName: site.name })}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="cta">
              <Link href="/kontakt">{tCommon("bookHandover")}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
            >
              <Link href="/oferta">
                {tCommon("checkOffer")} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
      </PageHero>

      <section className="bg-brand py-12">
        <div className="container-page">
          <dl className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center text-white">
                <dt className="text-3xl font-extrabold md:text-4xl">{value}</dt>
                <dd className="mt-1 text-sm text-white/70">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold text-brand md:text-4xl">{t("whoWeAre.title")}</h2>
            <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
              <p>{t("whoWeAre.paragraph1")}</p>
              <p>{t("whoWeAre.paragraph2")}</p>
              <p>{t("whoWeAre.paragraph3")}</p>
            </div>
            <div className="mt-8">
              <GoogleReviewsBadge />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="surface-panel bg-card p-6">
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-brand-soft text-brand">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-bold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-brand-soft text-brand">
              <Users className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold text-brand md:text-4xl">{t("team.title")}</h2>
            <p className="mt-5 text-lg text-muted-foreground">{t("team.description")}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
              {teamBadges.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-1.5"
                >
                  <Star className="h-3.5 w-3.5 fill-cta text-cta" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand py-16">
        <div className="container-page text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">{t("cta.title")}</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">{t("cta.description")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="cta">
              <Link href="/kontakt">{tCommon("bookHandover")}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
            >
              <ObfuscatedPhoneLink location="about_cta">{tCommon("callUs")} </ObfuscatedPhoneLink>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
