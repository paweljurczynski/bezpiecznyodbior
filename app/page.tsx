import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck, Thermometer, FileCheck2, HardHat,
  CalendarCheck, FileText, ClipboardCheck,
  Star, Newspaper, ArrowRight, Sparkles,
} from "lucide-react";
import { LeadWizard } from "@/components/LeadWizard";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Button } from "@/components/ui/button";
import { faqItems } from "@/lib/faq";
import { testimonials } from "@/lib/testimonials";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.tagline} | ${site.name} Kraków`,
  description:
    "Bezpieczny Odbiór — profesjonalne odbiory techniczne mieszkań i domów w Krakowie i Małopolsce. Kamera termowizyjna, Polskie Normy, ponad 100 opinii 5★. Bezpłatna wycena w 24h.",
  alternates: { canonical: "/" },
};

const whyUs = [
  { icon: ShieldCheck, title: "Zgodność z Polskimi Normami", desc: "Weryfikujemy każdy element zgodnie z aktualnymi normami budowlanymi, warunkami technicznymi i umową deweloperską." },
  { icon: Thermometer, title: "Specjalistyczny sprzęt", desc: "Kamera termowizyjna, wilgotnościomierze, poziomice laserowe i mierniki wysokiej klasy." },
  { icon: FileCheck2, title: "Szczegółowy raport", desc: "Kompletny protokół z wykrytymi wadami, zdjęciami i podstawą prawną roszczeń — gotowy tego samego dnia." },
  { icon: HardHat, title: "Doświadczeni inżynierowie", desc: "Zespół z uprawnieniami budowlanymi i setkami zrealizowanych odbiorów w całej Małopolsce." },
];

const steps = [
  { icon: CalendarCheck, title: "1. Umów wizytę", desc: "Wypełnij prosty formularz — oddzwaniamy w 24h z bezpłatną wyceną." },
  { icon: FileText, title: "2. Przesłanie dokumentów", desc: "Przekazujesz umowę deweloperską i projekty. Analizujemy je przed wizytą." },
  { icon: ClipboardCheck, title: "3. Odbiór techniczny", desc: "Rzetelna kontrola na miejscu, protokół i wsparcie w kontakcie z deweloperem." },
];


export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-brand-soft/50 to-background">
        <div className="container-page grid gap-12 py-16 md:grid-cols-2 md:py-24">
          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-semibold text-brand">
              <Sparkles className="h-3.5 w-3.5" /> Małopolskie · Śląskie · Podkarpackie
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-brand md:text-5xl lg:text-6xl">
              Profesjonalne odbiory techniczne mieszkań i domów
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Kompleksowe kontrole inżynierskie nieruchomości zgodne z Polskimi Normami, umową deweloperską i projektami architektonicznymi. Kamera termowizyjna w standardzie.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="btn-cta">
                <a href="#formularz">Zamów bezpłatną wycenę</a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/oferta">Zobacz ofertę <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-6">
              <div><div className="text-2xl font-bold text-brand">1200+</div><div className="text-xs text-muted-foreground">Odbiorów</div></div>
              <div>
                <div className="text-2xl font-bold text-brand">{site.reviews.rating.toFixed(1)}/5</div>
                <div className="text-xs text-muted-foreground">Ocena klientów</div>
              </div>
              <div><div className="text-2xl font-bold text-brand">24h</div><div className="text-xs text-muted-foreground">Czas odpowiedzi</div></div>
            </div>
          </div>

          <div id="formularz" className="flex flex-col justify-center">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">Zamów odbiór w 3 krokach</h2>
              <p className="text-sm text-muted-foreground">Krótki formularz — odpowiadamy w 24 godziny.</p>
            </div>
            <LeadWizard />
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-brand md:text-4xl">Dlaczego my</h2>
          <p className="mt-3 text-muted-foreground">
            Łączymy inżynierską precyzję z doświadczeniem w setkach odbiorów w całej Polsce południowej.
          </p>
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
            <h2 className="text-3xl font-bold text-brand md:text-4xl">Jak to działa</h2>
            <p className="mt-3 text-muted-foreground">Prosty, przejrzysty proces w trzech krokach.</p>
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

      <section className="container-page py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-brand md:text-4xl">Opinie klientów</h2>
          <p className="mt-3 text-muted-foreground">Zaufali nam kupujący mieszkania w całej Polsce południowej.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.author} className="surface-panel bg-card p-6">
              <div className="flex gap-0.5 text-cta">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-1 text-xs font-semibold text-cta">{t.highlight}</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground">„{t.text}"</p>
              <div className="mt-5 flex items-center justify-between gap-2 text-sm">
                <span className="font-semibold">{t.author}</span>
                <span className="text-xs text-muted-foreground">{t.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-20">
        <div className="grid items-center gap-6 rounded-3xl bg-brand p-8 text-brand-foreground md:grid-cols-[auto_1fr_auto] md:p-10">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-cta text-cta-foreground">
            <Newspaper className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider opacity-80">Aktualność</div>
            <h3 className="mt-1 text-xl font-bold md:text-2xl">
              Nowość: Pakiet Premium — audyt prawny umowy + odbiór techniczny
            </h3>
            <p className="mt-1 text-sm opacity-80">Kompleksowe bezpieczeństwo Twojej inwestycji w jednej usłudze.</p>
          </div>
          <Button asChild size="lg" className="btn-cta">
            <Link href="/oferta">Zobacz szczegóły</Link>
          </Button>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-brand md:text-4xl">Najczęstsze pytania</h2>
            <p className="mt-3 text-muted-foreground">Odpowiedzi na pytania, które zadają nam klienci przed każdym odbiorem.</p>
          </div>
          <div className="mt-10">
            <FaqAccordion items={faqItems} />
          </div>
        </div>
      </section>
    </>
  );
}
