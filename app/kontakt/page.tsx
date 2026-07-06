import type { Metadata } from "next";
import { Clock, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { LeadWizard } from "@/components/LeadWizard";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt — Bezpieczny Odbiór",
  description:
    "Zadzwoń: 502 298 030. Napisz: kontakt@bezpiecznyodbior.pl. Bezpłatna wycena odbioru technicznego w 24h. Małopolskie, Śląskie, Podkarpackie.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", item: "/" },
          { name: "Kontakt", item: "/kontakt" },
        ])}
      />

      <section className="border-b border-border bg-gradient-to-b from-brand-soft/50 to-background">
        <div className="container-page py-16 text-center md:py-20">
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold text-brand md:text-5xl">
            Skontaktuj się z nami
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Oferujemy szybkie odpowiedzi na Twoje zapytania. Bezpłatna wycena bez zobowiązań.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            <a
              href={`tel:${site.phone}`}
              className="surface-panel flex items-center gap-4 bg-card p-5 transition-colors hover:border-brand"
            >
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-cta/15 text-cta">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Telefon</div>
                <div className="text-lg font-bold">{site.phoneDisplay}</div>
              </div>
            </a>

            <a
              href={`mailto:${site.email}`}
              className="surface-panel flex items-center gap-4 bg-card p-5 transition-colors hover:border-brand"
            >
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-cta/15 text-cta">
                <Mail className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</div>
                <div className="truncate text-lg font-bold">{site.email}</div>
              </div>
            </a>

            <div className="surface-panel flex items-start gap-4 bg-card p-5">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Obszar działania</div>
                <div className="text-base font-semibold">Województwo małopolskie, śląskie i podkarpackie</div>
                <div className="mt-1 text-sm text-muted-foreground">{site.address.street}, {site.address.postalCode} {site.address.city}</div>
              </div>
            </div>

            <div className="surface-panel flex items-start gap-4 bg-card p-5">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Godziny pracy</div>
                <ul className="mt-1 space-y-0.5 text-sm">
                  {site.hours.map((h) => (
                    <li key={h.day}><span className="font-semibold">{h.day}:</span> {h.time}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="surface-panel flex items-start gap-4 bg-card p-5">
              <div>
                <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Media społecznościowe</div>
                <div className="flex gap-3">
                  <a
                    href={site.socials.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background transition-colors hover:bg-brand hover:text-brand-foreground"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a
                    href={site.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background transition-colors hover:bg-brand hover:text-brand-foreground"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-border">
              <iframe
                title="Mapa — Bezpieczny Odbiór Kraków"
                src="https://www.google.com/maps?q=W%C5%82adys%C5%82awa+%C5%81okietka+242G,+31-334+Krak%C3%B3w&output=embed"
                width="100%"
                height="240"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0"
              />
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
