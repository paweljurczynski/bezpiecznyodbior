import type { Metadata } from "next";
import {
  ShieldCheck,
  Thermometer,
  FileCheck2,
  HardHat,
  CalendarCheck,
  FileText,
  ClipboardCheck,
  Star,
  Newspaper,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getPathname } from "@/i18n/navigation";
import { LeadWizard } from "@/components/LeadWizard";
import { PageHero } from "@/components/PageHero";
import { FaqAccordion } from "@/components/FaqAccordion";
import { GoogleReviewsBadge } from "@/components/GoogleReviewsBadge";
import { Button } from "@/components/ui/button";
import { getFaqItems, getTestimonials } from "@/lib/content";
import { JsonLd, faqSchema } from "@/components/JsonLd";
import { buildAlternates, baseOpenGraph, baseTwitter } from "@/lib/metadata-i18n";
import { site } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });
  const typedLocale = locale as Locale;
  const pathname = getPathname({ locale: typedLocale, href: "/" });
  const title = t("title");
  const description = t("description");
  const keywords = t("keywords");

  return {
    title: { absolute: title },
    description,
    ...(keywords ? { keywords } : {}),
    alternates: buildAlternates(typedLocale, "/"),
    openGraph: baseOpenGraph(typedLocale, title, description, `${site.url}${pathname}`),
    twitter: baseTwitter(title, description),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "home" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tForms = await getTranslations({ locale, namespace: "forms.leadWizard" });
  const typedLocale = locale as Locale;
  const faqItems = getFaqItems(typedLocale);
  const testimonials = getTestimonials(typedLocale);

  const whyUs = [
    { icon: ShieldCheck, title: t("whyUs.normsTitle"), desc: t("whyUs.normsDesc") },
    { icon: Thermometer, title: t("whyUs.equipmentTitle"), desc: t("whyUs.equipmentDesc") },
    { icon: FileCheck2, title: t("whyUs.reportTitle"), desc: t("whyUs.reportDesc") },
    { icon: HardHat, title: t("whyUs.engineersTitle"), desc: t("whyUs.engineersDesc") },
  ];

  const steps = [
    { icon: CalendarCheck, title: t("steps.step1Title"), desc: t("steps.step1Desc") },
    { icon: FileText, title: t("steps.step2Title"), desc: t("steps.step2Desc") },
    { icon: ClipboardCheck, title: t("steps.step3Title"), desc: t("steps.step3Desc") },
  ];

  return (
    <>
      <JsonLd data={faqSchema(faqItems)} />
      <PageHero imageAlt={t("hero.imageAlt")} contentClassName="grid gap-12 py-8 lg:grid-cols-2 lg:py-24">
          <div className="flex flex-col justify-center text-white">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" /> {t("hero.badge")}
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
              {t("hero.title")}{" "}
              <span className="text-cta">{t("hero.titleHighlight")}</span>
            </h1>
            <p className="mt-5 text-lg text-white/80">{t("hero.description")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="cta">
                <a href="#formularz">{tCommon("freeQuoteOrder")}</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              >
                <Link href="/oferta">
                  {tCommon("seeOffer")} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/20 pt-6">
              <div>
                <div className="text-2xl font-bold">1200+</div>
                <div className="text-xs text-white/70">{t("hero.statsHandovers")}</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{site.reviews.rating.toFixed(1)}/5</div>
                <div className="text-xs text-white/70">{t("hero.statsRating")}</div>
              </div>
              <div>
                <div className="text-2xl font-bold">24h</div>
                <div className="text-xs text-white/70">{t("hero.statsResponse")}</div>
              </div>
            </div>
          </div>

          <div id="formularz" className="flex flex-col justify-center">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-white">{tForms("title")}</h2>
              <p className="text-sm text-white/70">{tForms("subtitle")}</p>
            </div>
            <LeadWizard />
          </div>
      </PageHero>

      <section className="bg-surface py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-brand md:text-4xl">{t("steps.title")}</h2>
            <p className="mt-3 text-muted-foreground">{t("steps.subtitle")}</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="relative rounded-2xl border border-border bg-card p-8 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-cta/15 text-cta">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand py-16">
        <div className="container-page">
          <div className="grid items-center gap-6 md:grid-cols-[auto_1fr_auto]">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-cta text-cta-foreground">
              <Newspaper className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/60">
                {t("news.eyebrow")}
              </div>
              <h3 className="mt-1 text-xl font-bold text-white md:text-2xl">{t("news.title")}</h3>
              <p className="mt-1 text-sm text-white/70">{t("news.description")}</p>
            </div>
            <Button asChild size="lg" variant="cta" className="shrink-0">
              <Link href="/oferta">{tCommon("seeDetails")}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-brand md:text-4xl">{t("whyUs.title")}</h2>
          <p className="mt-3 text-muted-foreground">{t("whyUs.subtitle")}</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="surface-panel bg-card p-6 transition-shadow hover:shadow-elegant">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-brand-soft text-brand">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-brand md:text-4xl">{t("testimonials.title")}</h2>
            <p className="mt-3 text-muted-foreground">{t("testimonials.subtitle")}</p>
            <div className="mt-5 flex justify-center">
              <GoogleReviewsBadge />
            </div>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item) => (
              <div key={item.author} className="surface-panel bg-card p-6">
                <div className="flex gap-0.5 text-[#FBBC05]">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-1 text-xs font-semibold text-foreground">{item.highlight}</p>
                <p className="mt-3 text-sm leading-relaxed text-foreground">„{item.text}"</p>
                <div className="mt-5 flex items-center justify-between gap-2 text-sm">
                  <span className="font-semibold">{item.author}</span>
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-brand md:text-4xl">{t("faq.title")}</h2>
          <p className="mt-3 text-muted-foreground">{t("faq.subtitle")}</p>
        </div>
        <div className="mt-10">
          <FaqAccordion items={faqItems} />
        </div>
      </section>
    </>
  );
}
