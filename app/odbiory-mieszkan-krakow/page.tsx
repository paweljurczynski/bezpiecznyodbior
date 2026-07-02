import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MapPin, Phone, Building2, Star } from "lucide-react";
import { districts } from "@/lib/districts";
import { krakowFaq } from "@/lib/faq";
import { WizardSection } from "@/components/WizardSection";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd, faqSchema, breadcrumbSchema } from "@/components/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Odbiór mieszkania Kraków — techniczny przegląd inżyniera",
  description:
    "Odbiór mieszkania Kraków — profesjonalny przegląd techniczny z kamerą termowizyjną w każdej dzielnicy: Prądnik, Krowodrza, Bronowice, Dębniki, Ruczaj, Podgórze i inne. Bezpłatna wycena w 60 minut.",
  alternates: { canonical: "/odbiory-mieszkan-krakow" },
  openGraph: {
    title: "Odbiór mieszkania Kraków — Bezpieczny Odbiór",
    description:
      "Techniczne odbiory mieszkań w Krakowie — wszystkie dzielnice, kamera termowizyjna, protokół PDF tego samego dnia.",
    url: `${site.url}/odbiory-mieszkan-krakow`,
  },
};

const localDevelopersInfo = [
  "Buma Group",
  "Dom Development",
  "Atal",
  "Develia",
  "Robyg",
  "Murapol",
  "Novisa Development",
  "Wawel Service",
];

export default function KrakowLandingPage() {
  return (
    <>
      <JsonLd
        data={[
          faqSchema(krakowFaq),
          breadcrumbSchema([
            { name: "Start", item: "/" },
            {
              name: "Odbiór mieszkania Kraków",
              item: "/odbiory-mieszkan-krakow",
            },
          ]),
        ]}
      />

      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-16 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-700">
              <MapPin className="h-3 w-3" />
              Kraków i okolice
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Odbiór mieszkania Kraków — techniczny przegląd inżyniera
            </h1>
            <p className="mt-6 text-lg text-slate-600">
              Realizujemy odbiory techniczne mieszkań i domów w każdej dzielnicy Krakowa — od Prądnika Białego, przez Krowodrzę i Bronowice, po Podgórze i Nową Hutę. Ponad 5 lat lokalnego doświadczenia i {site.reviews.count}+ opinii 5★ na Google.
            </p>

            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {[
                "Znajomość lokalnych deweloperów",
                "Odbiory w 2–5 dni roboczych",
                "Kamera termowizyjna FLIR",
                "Protokół PDF tego samego dnia",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-slate-700"
                >
                  <CheckCircle2 className="h-5 w-5 text-brand-500" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="#wycena" className="btn-primary">
                Bezpłatna wycena
              </Link>
              <a href={`tel:${site.phone}`} className="btn-secondary">
                <Phone className="h-4 w-4 text-brand-500" />
                {site.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-brand-100 to-white blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
              <div
                className="aspect-[4/3] w-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1573424659379-f5d699f4845a?auto=format&fit=crop&w=1400&q=80')",
                }}
                role="img"
                aria-label="Panorama Krakowa"
              />
              <div className="border-t border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-slate-900">
                    {site.reviews.rating.toFixed(1)} / 5 · {site.reviews.count}+ opinii
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-600">
                  „Odbiór mieszkania w Krakowie (Prądnik Biały) spełnił oczekiwania. Świetnie ocenione przez klientów."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-eyebrow">Krakowskie dzielnice</p>
            <h2 className="mt-2 section-heading">
              Wykonujemy odbiory w każdej dzielnicy Krakowa
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Znamy specyfikę lokalnych inwestycji, standard wykonawczy deweloperów oraz najczęstsze problemy techniczne występujące w poszczególnych rejonach miasta.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {districts.map((district) => (
              <div
                key={district.slug}
                className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
              >
                <MapPin className="h-3.5 w-3.5 text-brand-500" />
                {district.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="section-eyebrow">Krakowscy deweloperzy</p>
              <h2 className="mt-2 section-heading">
                Znamy standardy pracy krakowskich deweloperów
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                W ciągu ostatnich 5 lat wykonaliśmy odbiory w inwestycjach największych deweloperów działających w Krakowie. Wiemy, na co zwrócić szczególną uwagę u konkretnego wykonawcy — od jakości tynków, przez posadzki, po stolarkę okienną.
              </p>
              <p className="mt-4 text-sm text-slate-500">
                Nasza wiedza dotyczy m.in. następujących deweloperów obecnych na krakowskim rynku:
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
              {localDevelopersInfo.map((name) => (
                <div
                  key={name}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold text-slate-900">{name}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-8 text-xs text-slate-500">
            * Lista deweloperów ma charakter informacyjny — nie stanowi partnerstwa handlowego. Wykonujemy niezależne odbiory techniczne w interesie kupujących.
          </p>
        </div>
      </section>

      <WizardSection />

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-eyebrow">FAQ</p>
            <h2 className="mt-2 section-heading">
              Najczęstsze pytania — odbiór mieszkania w Krakowie
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Zebraliśmy odpowiedzi na pytania, które klienci zadają nam najczęściej przed odbiorem technicznym mieszkania w Krakowie.
            </p>
          </div>

          <div className="mt-12">
            <FaqAccordion items={krakowFaq} />
          </div>
        </div>
      </section>
    </>
  );
}
