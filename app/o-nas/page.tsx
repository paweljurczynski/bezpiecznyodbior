import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Users, ShieldCheck, ThumbsUp, MapPin, ArrowRight, HardHat, Star,
} from "lucide-react";
import { JsonLd, breadcrumbSchema, organizationSchema } from "@/components/JsonLd";
import { GoogleReviewsBadge } from "@/components/GoogleReviewsBadge";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "O nas — Kim jesteśmy",
  description:
    "Bezpieczny Odbiór to zespół inżynierów i architektów z ponad 5-letnim doświadczeniem w odbiorach technicznych mieszkań i domów. Obsługujemy Małopolskę, Śląsk i Podkarpacie.",
  alternates: { canonical: "/o-nas" },
};

const stats = [
  { value: "5+", label: "lat doświadczenia" },
  { value: "1200+", label: "zrealizowanych odbiorów" },
  { value: "5.0/5", label: "ocena w Google" },
  { value: "3", label: "województwa" },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Rzetelność i zgodność z normami",
    desc: "Każdy odbiór prowadzimy zgodnie z Polskimi Normami budowlanymi, warunkami technicznymi i umową deweloperską. Nie pomijamy żadnego elementu.",
  },
  {
    icon: HardHat,
    title: "Doświadczony zespół",
    desc: "Zespół inżynierów i architektów z uprawnieniami budowlanymi. Dogłębna wiedza o materiałach budowlanych i technologiach sprawia, że wychwytujemy wady, które umykają niespecjalistom.",
  },
  {
    icon: ThumbsUp,
    title: "Pozytywne opinie klientów",
    desc: "Nasze zaangażowanie w jakość usług procentuje ponad 100 opiniami w Google ze średnią 5.0/5. To najlepszy dowód na naszą skuteczność.",
  },
  {
    icon: MapPin,
    title: "Trzy województwa",
    desc: "Realizujemy odbiory w województwach małopolskim, śląskim i podkarpackim. Dojeżdżamy do klienta — nie wymaga się od Ciebie żadnego przemieszczania.",
  },
];

export default function ONasPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Start", item: "/" },
        { name: "O nas", item: "/o-nas" },
      ])} />
      <JsonLd data={organizationSchema()} />

      <section className="relative overflow-hidden">
        <Image
          src="/hero-apartment.png"
          alt="Wnętrze nowego mieszkania — odbiór techniczny"
          fill
          priority
          fetchPriority="high"
          quality={70}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="container-page relative py-20 text-center md:py-28">
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold text-white md:text-5xl">
            Ponad 5 lat doświadczenia<br className="hidden sm:inline" /> w odbiorach technicznych
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80">
            {site.name} to zespół inżynierów i architektów pasjonujących się inspekcjami nieruchomości. Zapewniamy bezpieczeństwo Twojej inwestycji w województwach małopolskim, śląskim i podkarpackim.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="cta">
              <Link href="/kontakt">Zarezerwuj termin odbioru</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20">
              <Link href="/oferta">Sprawdź ofertę <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-brand py-12">
        <div className="container-page">
          <dl className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center text-white">
                <dt className="text-3xl font-extrabold md:text-4xl">{value}</dt>
                <dd className="mt-1 text-sm text-white/70">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold text-brand md:text-4xl">Kim jesteśmy</h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Firma powstała z pasji do nieruchomości oraz z potrzeby zapewnienia klientom pewności,
                że mieszkania, które kupują — zarówno te nowe od dewelopera, jak i z rynku wtórnego —
                są wolne od wad technicznych.
              </p>
              <p>
                Dbamy o to, aby każdy odbiór techniczny przebiegał sprawnie i bez stresu,
                a klienci mogli cieszyć się bezpiecznym i komfortowym mieszkaniem,
                w pełni odpowiadającym ich oczekiwaniom.
              </p>
              <p>
                Do tej pory służyliśmy setkom klientów, pomagając im w odbiorach mieszkań i domów
                z rynku pierwotnego i wtórnego w regionach małopolskim, śląskim i podkarpackim.
                Nasze zaangażowanie w jakość usług przynosi nam głównie pozytywne opinie,
                co napędza nas do dalszego działania.
              </p>
            </div>
            <div className="mt-8">
              <GoogleReviewsBadge />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="surface-panel bg-card p-6">
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-brand-soft text-brand">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-bold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-brand-soft text-brand">
              <Users className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold text-brand md:text-4xl">Nasz zespół</h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Zespół inżynierów i architektów pasjonujących się inspekcjami nieruchomości.
              Dzięki dogłębnej wiedzy o materiałach budowlanych i technologiach oferujemy
              rzetelne analizy stanu technicznego budynków, zapewniając bezpieczeństwo i pewność naszym klientom.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
              {["Uprawnienia budowlane", "Kamera termowizyjna", "Wilgotnościomierze", "Poziomice laserowe"].map((item) => (
                <span key={item} className="flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-1.5">
                  <Star className="h-3.5 w-3.5 fill-cta text-cta" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand py-16">
        <div className="container-page text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Nie zwlekaj — zadbaj o bezpieczeństwo swojej inwestycji
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Skontaktuj się z nami i zarezerwuj termin odbioru technicznego. Bezpłatna wycena w 24h.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="cta">
              <Link href="/kontakt">Zarezerwuj termin odbioru</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20">
              <a href={`tel:${site.phone}`}>Zadzwoń: {site.phoneDisplay}</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
