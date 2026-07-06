import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, MapPin, Phone, Building2, Star, ArrowRight } from "lucide-react";
import { districts } from "@/lib/districts";
import { krakowFaq } from "@/lib/faq";
import { FaqAccordion } from "@/components/FaqAccordion";
import { LeadWizard } from "@/components/LeadWizard";
import { JsonLd, faqSchema, breadcrumbSchema } from "@/components/JsonLd";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Odbiór mieszkania Kraków — techniczny przegląd inżyniera",
  description:
    "Odbiór mieszkania Kraków — profesjonalny przegląd techniczny z kamerą termowizyjną w każdej dzielnicy: Prądnik, Krowodrza, Bronowice, Dębniki, Ruczaj, Podgórze i inne. Bezpłatna wycena w 24h.",
  alternates: { canonical: "/odbiory-mieszkan-krakow" },
  openGraph: {
    title: "Odbiór mieszkania Kraków — Bezpieczny Odbiór",
    description:
      "Techniczne odbiory mieszkań w Krakowie — wszystkie dzielnice, kamera termowizyjna, protokół PDF tego samego dnia.",
    url: `${site.url}/odbiory-mieszkan-krakow`,
  },
};

const localDevelopers = [
  "Buma Group", "Dom Development", "Atal", "Develia",
  "Robyg", "Murapol", "Novisa Development", "Wawel Service",
];

const highlights = [
  "Znajomość lokalnych deweloperów",
  "Odbiory w 2–5 dni roboczych",
  "Kamera termowizyjna FLIR",
  "Protokół PDF tego samego dnia",
];

export default function KrakowLandingPage() {
  return (
    <>
      <JsonLd
        data={[
          faqSchema(krakowFaq),
          breadcrumbSchema([
            { name: "Start", item: "/" },
            { name: "Odbiór mieszkania Kraków", item: "/odbiory-mieszkan-krakow" },
          ]),
        ]}
      />

      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-brand-soft/50 to-background">
        <div className="container-page grid gap-12 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-semibold text-brand">
              <MapPin className="h-3.5 w-3.5" /> Kraków i okolice
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-brand md:text-5xl">
              Odbiór mieszkania Kraków — techniczny przegląd inżyniera
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Realizujemy odbiory techniczne mieszkań i domów w każdej dzielnicy Krakowa — od Prądnika Białego, przez Krowodrzę i Bronowice, po Podgórze i Nową Hutę. Ponad 5 lat lokalnego doświadczenia i {site.reviews.count}+ opinii 5★ na Google.
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-cta" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="cta">
                <a href="#wycena">Bezpłatna wycena</a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={`tel:${site.phone}`}>
                  <Phone className="h-4 w-4" /> {site.phoneDisplay}
                </a>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-elegant">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="https://images.unsplash.com/photo-1573424659379-f5d699f4845a?auto=format&fit=crop&w=1400&q=80"
                  alt="Panorama Krakowa"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
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
                    {site.reviews.rating.toFixed(1)} / 5 · {site.reviews.count}+ opinii
                  </span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  „Odbiór mieszkania w Krakowie (Prądnik Biały) spełnił wszystkie oczekiwania. Profesjonalny raport."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-brand md:text-4xl">
            Wykonujemy odbiory w każdej dzielnicy Krakowa
          </h2>
          <p className="mt-4 text-muted-foreground">
            Znamy specyfikę lokalnych inwestycji, standard wykonawczy deweloperów oraz najczęstsze problemy techniczne w poszczególnych rejonach miasta.
          </p>
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
              <h2 className="text-3xl font-bold text-brand md:text-4xl">
                Znamy standardy pracy krakowskich deweloperów
              </h2>
              <p className="mt-4 text-muted-foreground">
                W ciągu ostatnich 5 lat wykonaliśmy odbiory w inwestycjach największych deweloperów w Krakowie. Wiemy, na co zwrócić szczególną uwagę u konkretnego wykonawcy — od jakości tynków, przez posadzki, po stolarkę okienną.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {localDevelopers.map((name) => (
                <div
                  key={name}
                  className="surface-panel flex items-center gap-3 bg-card p-4"
                >
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold">{name}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-8 text-xs text-muted-foreground">
            * Lista deweloperów ma charakter informacyjny — nie stanowi partnerstwa handlowego. Wykonujemy niezależne odbiory techniczne w interesie kupujących.
          </p>
        </div>
      </section>

      <section id="wycena" className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-3xl font-bold text-brand md:text-4xl">
              Zamów odbiór w Krakowie
            </h2>
            <p className="mt-4 text-muted-foreground">
              Wypełnij formularz — bezpłatną wycenę otrzymasz w ciągu 24 godzin.
            </p>
            <div className="mt-6">
              <LeadWizard />
            </div>
          </div>
          <div className="rounded-2xl border border-brand/20 bg-brand p-8 text-brand-foreground">
            <h3 className="text-xl font-bold">Dlaczego warto wybrać nas w Krakowie?</h3>
            <ul className="mt-5 space-y-3">
              {[
                "Ponad 5 lat obsługi krakowskiego rynku nieruchomości",
                `${site.reviews.count}+ pozytywnych opinii na Google`,
                "Znajomość specyfiki krakowskich inwestycji deweloperskich",
                "Protokół gotowy tego samego dnia w formacie PDF",
                "Wsparcie po odbiorze — pomoc przy kontakcie z deweloperem",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cta" />
                  {item}
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="btn-cta mt-6">
              <Link href="/oferta">
                Zobacz pełną ofertę <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-brand md:text-4xl">
              Najczęstsze pytania — odbiór mieszkania w Krakowie
            </h2>
            <p className="mt-4 text-muted-foreground">
              Odpowiedzi na pytania, które klienci zadają nam najczęściej przed odbiorem w Krakowie.
            </p>
          </div>
          <div className="mt-10">
            <FaqAccordion items={krakowFaq} />
          </div>
        </div>
      </section>
    </>
  );
}
