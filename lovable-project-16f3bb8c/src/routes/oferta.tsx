import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";

export const Route = createFileRoute("/oferta")({
  head: () => ({
    meta: [
      { title: "Oferta i usługi — Bezpieczny Odbiór" },
      { name: "description", content: "Odbiory od dewelopera i z rynku wtórnego, badania termowizyjne, doradztwo inwestycyjne, pakiet premium z audytem prawnym, inwentaryzacje architektoniczne i świadectwa energetyczne." },
      { property: "og:title", content: "Oferta i usługi — Bezpieczny Odbiór" },
      { property: "og:description", content: "Kompleksowy katalog usług inżynierskich dla kupujących nieruchomości." },
      { property: "og:url", content: "/oferta" },
    ],
    links: [{ rel: "canonical", href: "/oferta" }],
  }),
  component: Oferta,
});

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
  },
];

const premiumServices = [
  {
    icon: Scale,
    badge: "PREMIUM",
    title: "Pakiet Premium: Sprawdzenie umowy przez prawnika + Odbiór techniczny",
    desc: "Kompletny pakiet bezpieczeństwa prawno-technicznego. Doświadczony prawnik analizuje umowę deweloperską pod kątem klauzul niedozwolonych, ryzyk i zapisów wymagających negocjacji. Nasz inżynier przeprowadza rygorystyczną kontrolę techniczną na miejscu.",
    bullets: [
      "Pełny audyt prawny umowy deweloperskiej",
      "Identyfikacja klauzul niedozwolonych i ryzyk",
      "Rekomendacje negocjacyjne przed podpisaniem",
      "Rygorystyczny odbiór techniczny nieruchomości",
      "Jednolity raport prawno-inżynierski",
    ],
  },
  {
    icon: Ruler,
    badge: "NOWOŚĆ",
    title: "Inwentaryzacje architektoniczne",
    desc: "Precyzyjne mapowanie układu konstrukcyjnego, pomiary i weryfikacja cyfrowych rzutów dla projektantów wnętrz i potrzeb remontowych. Otrzymujesz dokładne pliki DWG/PDF gotowe do dalszej pracy.",
    bullets: [
      "Pomiary laserowe z dokładnością do milimetra",
      "Cyfrowe rzuty w formatach DWG i PDF",
      "Weryfikacja rzeczywistych wymiarów względem projektu",
      "Dokumentacja instalacji i elementów konstrukcyjnych",
    ],
  },
  {
    icon: Zap,
    badge: "NOWOŚĆ",
    title: "Audyty i świadectwa energetyczne",
    desc: "Oficjalne świadectwa charakterystyki energetycznej oraz ocena termiczna nieruchomości — wymagane przy nowoczesnej sprzedaży i wynajmie. Wykonujemy zgodnie z obowiązującymi przepisami.",
    bullets: [
      "Certyfikat energetyczny zgodny z przepisami",
      "Ocena efektywności energetycznej budynku",
      "Rekomendacje modernizacyjne obniżające koszty",
      "Wsparcie przy sprzedaży i wynajmie",
    ],
  },
];

function Oferta() {
  return (
    <>
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
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <article key={s.title} className="surface-panel bg-card p-8">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-lg bg-brand-soft text-brand">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                    {s.tag}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
                <ul className="mt-5 space-y-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 text-cta shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="container-page">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-brand md:text-3xl">Nowe usługi premium</h2>
              <p className="mt-2 text-muted-foreground">Rozszerzony katalog dla wymagających klientów.</p>
            </div>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {premiumServices.map((s) => {
              const Icon = s.icon;
              return (
                <article key={s.title} className="relative flex flex-col rounded-2xl border border-brand/20 bg-card p-8 shadow-elegant">
                  <span className="absolute -top-3 left-6 rounded-full bg-cta px-3 py-1 text-xs font-bold uppercase tracking-wider text-cta-foreground">
                    {s.badge}
                  </span>
                  <div className="grid h-12 w-12 place-items-center rounded-lg bg-brand text-brand-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold leading-tight">{s.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
                  <ul className="mt-5 space-y-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 text-cta shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="rounded-3xl bg-brand p-10 text-center text-brand-foreground">
          <h2 className="text-2xl font-bold md:text-3xl">Nie wiesz, którą usługę wybrać?</h2>
          <p className="mx-auto mt-3 max-w-xl opacity-90">
            Zadzwoń lub napisz — dobierzemy zakres dopasowany do Twojej nieruchomości i budżetu.
          </p>
          <Button asChild size="lg" className="btn-cta mt-6">
            <Link to="/kontakt">Zamów bezpłatną wycenę <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </>
  );
}
