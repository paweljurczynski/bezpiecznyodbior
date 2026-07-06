import { createFileRoute } from "@tanstack/react-router";
import { LeadWizard } from "@/components/site/LeadWizard";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt — Bezpieczny Odbiór" },
      { name: "description", content: "Zadzwoń: 502 298 030. Napisz: kontakt@bezpiecznyodbior.pl. Bezpłatna wycena odbioru technicznego w 24h. Małopolskie, Śląskie, Podkarpackie." },
      { property: "og:title", content: "Kontakt — Bezpieczny Odbiór" },
      { property: "og:description", content: "Skontaktuj się z inżynierami Bezpieczny Odbiór — bezpłatna wycena w 24h." },
      { property: "og:url", content: "/kontakt" },
    ],
    links: [{ rel: "canonical", href: "/kontakt" }],
  }),
  component: Kontakt,
});

function Kontakt() {
  return (
    <>
      <section className="border-b border-border bg-gradient-to-b from-brand-soft/50 to-background">
        <div className="container-page py-16 text-center md:py-20">
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold text-brand md:text-5xl">
            Skontaktuj się z nami
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Odpowiadamy w ciągu 24 godzin. Bezpłatna wycena bez zobowiązań.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            <a href="tel:+48502298030" className="surface-panel flex items-center gap-4 bg-card p-5 transition-colors hover:border-brand">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-cta/15 text-cta shrink-0">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Telefon</div>
                <div className="text-lg font-bold">502 298 030</div>
              </div>
            </a>
            <a href="mailto:kontakt@bezpiecznyodbior.pl" className="surface-panel flex items-center gap-4 bg-card p-5 transition-colors hover:border-brand">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-cta/15 text-cta shrink-0">
                <Mail className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</div>
                <div className="truncate text-lg font-bold">kontakt@bezpiecznyodbior.pl</div>
              </div>
            </a>
            <div className="surface-panel flex items-start gap-4 bg-card p-5">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-brand-soft text-brand shrink-0">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Obszar działania</div>
                <div className="text-base font-semibold">Województwo małopolskie, śląskie i podkarpackie</div>
              </div>
            </div>
            <div className="surface-panel flex items-start gap-4 bg-card p-5">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-brand-soft text-brand shrink-0">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Godziny pracy</div>
                <div className="text-sm">Pon–Pt: 8:00–18:00 · Sob: 9:00–14:00</div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-brand">Szybki formularz kontaktowy</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Wypełnij trzy proste kroki, oddzwaniamy w ciągu 24 godzin.
            </p>
            <div className="mt-6">
              <LeadWizard />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
