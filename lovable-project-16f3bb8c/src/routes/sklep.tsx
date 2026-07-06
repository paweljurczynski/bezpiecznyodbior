import { createFileRoute } from "@tanstack/react-router";
import { WaitlistModal } from "@/components/site/WaitlistModal";
import { Button } from "@/components/ui/button";
import { BookOpen, CheckCircle2, Clock, Sparkles } from "lucide-react";

export const Route = createFileRoute("/sklep")({
  head: () => ({
    meta: [
      { title: "Sklep i edukacja — E-booki Bezpieczny Odbiór" },
      { name: "description", content: "Premium e-booki o odbiorach technicznych i umowach deweloperskich. Zapisz się na listę oczekujących i odbierz 20% zniżki w dniu premiery." },
      { property: "og:title", content: "Sklep i edukacja — E-booki Bezpieczny Odbiór" },
      { property: "og:description", content: "Praktyczna wiedza od inżynierów w formie e-booków." },
      { property: "og:url", content: "/sklep" },
    ],
    links: [{ rel: "canonical", href: "/sklep" }],
  }),
  component: Sklep,
});

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
    color: "from-brand to-brand/70",
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
    color: "from-cta to-cta/70",
  },
];

function Sklep() {
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
            Przygotowujemy premium e-booki, w których dzielimy się wiedzą z setek odbiorów.
            Zapisz się na listę oczekujących i otrzymaj 20% zniżki w dniu premiery.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {ebooks.map((e) => (
            <article key={e.title} className="surface-panel overflow-hidden bg-card">
              <div className={`relative aspect-[4/3] bg-gradient-to-br ${e.color} p-8`}>
                <div className="absolute inset-6 flex flex-col rounded-xl bg-background/95 p-6 shadow-xl">
                  <div className="flex items-center gap-2 text-xs font-semibold text-cta">
                    <BookOpen className="h-4 w-4" />
                    {e.tag}
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-bold text-brand leading-tight">
                    {e.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{e.subtitle}</p>
                  <div className="mt-auto flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    Premiera wkrótce
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-bold">{e.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{e.subtitle}</p>
                <ul className="mt-5 space-y-2">
                  {e.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-cta shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <WaitlistModal
                  title={e.title}
                  trigger={
                    <Button className="btn-cta mt-6 w-full">
                      Zapisz się na listę oczekujących
                    </Button>
                  }
                />
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
