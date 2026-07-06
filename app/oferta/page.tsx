import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Home as HomeIcon, Thermometer, Compass, Scale, Ruler, Zap, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadWizard } from "@/components/LeadWizard";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Oferta i usługi — Bezpieczny Odbiór",
  description:
    "Odbiory od dewelopera i z rynku wtórnego, badania termowizyjne, doradztwo inwestycyjne, pakiet premium z audytem prawnym, inwentaryzacje architektoniczne i świadectwa energetyczne.",
  alternates: { canonical: "/oferta" },
};

const services = [
  {
    icon: Building2,
    tag: "Rynek pierwotny",
    title: "Odbiory nieruchomości od dewelopera",
    desc: "Rzetelna kontrola stanu deweloperskiego zgodnie z umową, projektem i normami budowlanymi. Sprawdzamy geometrię pomieszczeń, tynki, posadzki, stolarkę, instalacje i wentylację.",
    bullets: [
      "Weryfikacja zgodności z umową deweloperską i PN",
      "Kontrola pionów, poziomów, kątów i geometrii",
      "Sprawdzenie instalacji elektrycznej, hydraulicznej i wentylacji",
      "Kompletny protokół z fotografiami i podstawą prawną",
    ],
    id: "odbior-od-dewelopera",
  },
  {
    icon: HomeIcon,
    tag: "Rynek wtórny",
    title: "Odbiory nieruchomości z rynku wtórnego",
    desc: "Techniczna ocena stanu mieszkania używanego przed zakupem. Wykrywamy ukryte wady, oceniamy koszty ewentualnego remontu i ryzyka konstrukcyjne.",
    bullets: [
      "Ocena stanu instalacji i konstrukcji",
      "Wykrycie zawilgoceń i mostków termicznych",
      "Szacunkowe koszty koniecznych napraw",
      "Rekomendacje negocjacyjne przed zakupem",
    ],
    id: "odbior-rynek-wtorny",
  },
  {
    icon: Thermometer,
    tag: "Kamera termowizyjna",
    title: "Badania termowizyjne",
    desc: "Bezinwazyjna diagnostyka strat ciepła, mostków termicznych, zawilgoceń i błędów wykonawczych — z profesjonalnym raportem termograficznym.",
    bullets: [
      "Wykrywanie mostków termicznych i nieszczelności",
      "Lokalizacja zawilgoceń i wycieków",
      "Ocena jakości izolacji ścian i stropów",
      "Raport z termogramami i analizą",
    ],
    id: "badania-termowizyjne",
  },
  {
    icon: Compass,
    tag: "Doradztwo",
    title: "Doradztwo inwestycyjne i nadzór nad ekipami wykończeniowymi",
    desc: "Wsparcie na każdym etapie inwestycji — od wyboru nieruchomości po nadzór nad ekipami remontowymi. Chronimy Twój budżet i harmonogram.",
    bullets: [
      "Ocena inwestycji przed zakupem",
      "Nadzór inżynierski nad wykonawcami",
      "Kontrola jakości wykończenia",
      "Konsultacje techniczne i budżetowe",
    ],
    id: "doradztwo-inwestycyjne",
  },
];

const premiumServices = [
  {
    icon: Scale,
    badge: "PREMIUM",
    title: "Pakiet Premium: Sprawdzenie umowy przez prawnika + Odbiór techniczny",
    desc: "Kompletny pakiet bezpieczeństwa prawno-technicznego. Doświadczony prawnik analizuje umowę deweloperską pod kątem klauzul niedozwolonych, ryzyk i zapisów wymagających negocjacji.",
    bullets: [
      "Pełny audyt prawny umowy deweloperskiej",
      "Identyfikacja klauzul niedozwolonych i ryzyk",
      "Rekomendacje negocjacyjne przed podpisaniem",
      "Rygorystyczny odbiór techniczny nieruchomości",
      "Jednolity raport prawno-inżynierski",
    ],
    id: "pakiet-premium-prawnik",
  },
  {
    icon: Ruler,
    badge: "NOWOŚĆ",
    title: "Inwentaryzacje architektoniczne",
    desc: "Precyzyjne mapowanie układu konstrukcyjnego, pomiary i weryfikacja cyfrowych rzutów dla projektantów wnętrz i potrzeb remontowych.",
    bullets: [
      "Pomiary laserowe z dokładnością do milimetra",
      "Cyfrowe rzuty w formatach DWG i PDF",
      "Weryfikacja rzeczywistych wymiarów względem projektu",
      "Dokumentacja instalacji i elementów konstrukcyjnych",
    ],
    id: "inwentaryzacje-architektoniczne",
  },
  {
    icon: Zap,
    badge: "NOWOŚĆ",
    title: "Audyty i świadectwa energetyczne",
    desc: "Oficjalne świadectwa charakterystyki energetycznej oraz ocena termiczna nieruchomości — wymagane przy sprzedaży i wynajmie.",
    bullets: [
      "Certyfikat energetyczny zgodny z przepisami",
      "Ocena efektywności energetycznej budynku",
      "Rekomendacje modernizacyjne obniżające koszty",
      "Wsparcie przy sprzedaży i wynajmie",
    ],
    id: "audyty-swiadectwa-energetyczne",
  },
];

export default function OfertaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", item: "/" },
          { name: "Oferta", item: "/oferta" },
        ])}
      />

      <section className="border-b border-border bg-gradient-to-b from-brand-soft/50 to-background">
        <div className="container-page py-16 text-center md:py-20">
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold text-brand md:text-5xl">
            Oferta i usługi
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Cztery usługi bazowe i trzy premium — pełen katalog wsparcia inżynierskiego dla kupujących nieruchomości.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="text-2xl font-bold text-brand md:text-3xl">Usługi podstawowe</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {services.map(({ icon: Icon, tag, title, desc, bullets, id }) => (
            <article key={id} id={id} className="surface-panel bg-card p-8">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-brand-soft text-brand">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                  {tag}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{desc}</p>
              <ul className="mt-5 space-y-2">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-cta" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="container-page">
          <h2 className="text-2xl font-bold text-brand md:text-3xl">Nowe usługi premium</h2>
          <p className="mt-2 text-muted-foreground">Rozszerzony katalog dla wymagających klientów.</p>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {premiumServices.map(({ icon: Icon, badge, title, desc, bullets, id }) => (
              <article key={id} id={id} className="relative flex flex-col rounded-2xl border border-brand/20 bg-card p-8 shadow-elegant">
                <span className="absolute -top-3 left-6 rounded-full bg-cta px-3 py-1 text-xs font-bold uppercase tracking-wider text-cta-foreground">
                  {badge}
                </span>
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-brand text-brand-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold leading-tight">{title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{desc}</p>
                <ul className="mt-5 space-y-2">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-cta" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-brand">Zamów odbiór w 3 krokach</h2>
          <p className="mt-2 text-sm text-muted-foreground">Krótki formularz — odpowiadamy w 24 godziny.</p>
        </div>
        <div className="max-w-lg">
          <LeadWizard />
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="rounded-3xl bg-brand p-10 text-center text-brand-foreground">
          <h2 className="text-2xl font-bold md:text-3xl">Nie wiesz, którą usługę wybrać?</h2>
          <p className="mx-auto mt-3 max-w-xl opacity-90">
            Zadzwoń lub napisz — dobierzemy zakres dopasowany do Twojej nieruchomości i budżetu.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="btn-cta">
              <Link href="/kontakt">Zamów bezpłatną wycenę <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-brand-foreground/30 text-brand-foreground hover:bg-brand-foreground/10">
              <a href={`tel:${site.phone}`}>Zadzwoń: {site.phoneDisplay}</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
