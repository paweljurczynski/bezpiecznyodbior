import type { Metadata } from "next";
import { BookOpen, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { WaitlistForm } from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "Sklep i edukacja — E-booki",
  description:
    "Premium e-booki o odbiorach technicznych i umowach deweloperskich. Zapisz się na listę oczekujących i odbierz 20% zniżki w dniu premiery.",
  alternates: { canonical: "/sklep" },
};

const ebooks = [
  {
    tag: "E-BOOK 1",
    title: "Checklista przed odbiorem",
    subtitle: "Co musisz wiedzieć przed odbiorem technicznym mieszkania",
    features: [
      "150+ punktów do sprawdzenia krok po kroku",
      "Wzory pism reklamacyjnych do dewelopera",
      "Fotograficzne przykłady najczęstszych wad",
      "Podstawy prawne Twoich roszczeń",
    ],
  },
  {
    tag: "E-BOOK 2",
    title: "Od umowy deweloperskiej do własnych kluczy",
    subtitle: "Kompletny poradnik kupującego",
    features: [
      "Analiza klauzul niedozwolonych w umowach",
      "Harmonogram całego procesu zakupu",
      "Checklisty na każdy etap inwestycji",
      "Praktyczne wskazówki od inżynierów i prawników",
    ],
  },
];

export default function SklepPage() {
  return (
    <>
      <section className="border-b border-border bg-gradient-to-b from-brand-soft/50 to-background">
        <div className="container-page py-16 text-center md:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-brand">
            <Sparkles className="h-3.5 w-3.5" /> Wkrótce dostępne
          </span>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold text-brand md:text-5xl">
            Sklep i edukacja
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Przygotowujemy premium e-booki, w których dzielimy się wiedzą z setek odbiorów. Zapisz się na listę oczekujących i otrzymaj 20% zniżki w dniu premiery.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {ebooks.map((e) => (
            <article key={e.title} className="surface-panel overflow-hidden bg-card">
              <div className="relative bg-brand p-8">
                <div className="flex items-center gap-2 text-xs font-semibold text-white/70">
                  <BookOpen className="h-4 w-4" />
                  {e.tag}
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-white">
                  {e.title}
                </h3>
                <p className="mt-2 text-sm text-white/70">{e.subtitle}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-white/50">
                  <Clock className="h-3.5 w-3.5" />
                  Premiera wkrótce
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-2">
                  {e.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cta" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <WaitlistForm title={e.title} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
