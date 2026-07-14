import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { ObfuscatedEmailLink, ObfuscatedPhoneLink } from "@/components/ObfuscatedContact";
import { PageHero } from "@/components/PageHero";
import { buildAlternates, baseOpenGraph, baseTwitter } from "@/lib/metadata-i18n";
import { site } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

const EMAIL_MARKER = "__EMAIL__";
const PHONE_MARKER = "__PHONE__";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.privacy" });
  const typedLocale = locale as Locale;
  const pathname = getPathname({ locale: typedLocale, href: "/polityka-prywatnosci" });
  const title = t("title");
  const description = t("description");
  const keywords = t("keywords");

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: buildAlternates(typedLocale, "/polityka-prywatnosci"),
    openGraph: baseOpenGraph(typedLocale, title, description, `${site.url}${pathname}`),
    twitter: baseTwitter(title, description),
    robots: { index: true, follow: true },
  };
}

export default async function PolitykaPrywatnosciPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "privacy" });
  const tHome = await getTranslations({ locale, namespace: "home" });
  const typedLocale = locale as Locale;
  const dateLocale = typedLocale === "en" ? "en-GB" : "pl-PL";

  const section2Items = t.raw("sections.2.items") as string[];
  const section5Items = t.raw("sections.5.items") as string[];

  const section1Parts = t("sections.1.content", {
    legalName: site.legalName,
    street: site.address.street,
    postalCode: site.address.postalCode,
    city: site.address.city,
    email: EMAIL_MARKER,
  }).split(EMAIL_MARKER);

  const section9Text = t("sections.9.content", {
    email: EMAIL_MARKER,
    phone: PHONE_MARKER,
  });
  const [section9BeforeEmail, section9Rest] = section9Text.split(EMAIL_MARKER);
  const [section9Between, section9AfterPhone] = section9Rest.split(PHONE_MARKER);

  return (
    <>
      <PageHero imageAlt={tHome("hero.imageAlt")} contentClassName="py-16 text-center md:py-20">
        <p className="section-eyebrow text-white/70">{t("eyebrow")}</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-sm text-white/70">
          {t("lastUpdated")} {new Date().toLocaleDateString(dateLocale)}
        </p>
      </PageHero>

      <section className="container-page py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">
          {typedLocale === "en" && (
            <p className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              {t("disclaimer")}
            </p>
          )}

        <div className="prose prose-slate max-w-none space-y-8 text-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{t("sections.1.title")}</h2>
            <p className="mt-3">
              {section1Parts[0]}
              <ObfuscatedEmailLink className="font-semibold text-brand-600 hover:underline" />
              {section1Parts[1]}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">{t("sections.2.title")}</h2>
            <p className="mt-3">{t("sections.2.intro")}</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              {section2Items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">{t("sections.3.title")}</h2>
            <p className="mt-3">{t("sections.3.content")}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">{t("sections.4.title")}</h2>
            <p className="mt-3">{t("sections.4.content")}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">{t("sections.5.title")}</h2>
            <p className="mt-3">{t("sections.5.intro")}</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              {section5Items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">{t("sections.6.title")}</h2>
            <p className="mt-3">{t("sections.6.content")}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">{t("sections.7.title")}</h2>
            <p className="mt-3">{t("sections.7.content")}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">{t("sections.8.title")}</h2>
            <p className="mt-3">{t("sections.8.content")}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">{t("sections.9.title")}</h2>
            <p className="mt-3">
              {section9BeforeEmail}
              <ObfuscatedEmailLink className="font-semibold text-brand-600 hover:underline" />{" "}
              {section9Between}
              <ObfuscatedPhoneLink className="font-semibold text-brand-600 hover:underline" />
              {section9AfterPhone}
            </p>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
