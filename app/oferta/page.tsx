import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { services } from "@/lib/services";
import { ServiceCard } from "@/components/ServiceCard";
import { WizardSection } from "@/components/WizardSection";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Oferta — odbiory techniczne, termowizja, świadectwa energetyczne",
  description:
    "Kompleksowa oferta Bezpiecznego Odbioru: odbiory od dewelopera i z rynku wtórnego, badania termowizyjne, nadzór wykończeń, pakiet z prawnikiem, inwentaryzacje architektoniczne, świadectwa energetyczne.",
  alternates: { canonical: "/oferta" },
};

const core = services.filter((s) => !s.premium);
const premium = services.filter((s) => s.premium);

export default function OfertaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", item: "/" },
          { name: "Oferta", item: "/oferta" },
        ])}
      />

      <section className="bg-gradient-to-b from-slate-50 to-white py-16 sm:py-24">
        <div className="container-page max-w-3xl text-center">
          <p className="section-eyebrow">Oferta i usługi</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Pełne wsparcie inżynierskie dla Twojej nieruchomości
          </h1>
          <p className="mt-6 text-lg text-slate-600">
            Od odbioru mieszkania od dewelopera, przez badania termowizyjne, po świadectwa energetyczne i nadzór wykończeń. Wszystko w jednym miejscu, wykonane przez zespół inżynierów z ponad 5-letnim doświadczeniem.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="#uslugi-podstawowe" className="btn-primary">
              Usługi podstawowe
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="#uslugi-premium" className="btn-secondary">
              <ShieldCheck className="h-4 w-4 text-brand-500" />
              Nowe pakiety premium
            </Link>
          </div>
        </div>
      </section>

      <section id="uslugi-podstawowe" className="py-16 sm:py-20">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="section-eyebrow">Usługi podstawowe</p>
            <h2 className="mt-2 section-heading">
              Cztery filary bezpiecznego odbioru
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Realizujemy je dla klientów z Krakowa, Małopolski, Śląska i Podkarpacia. Wszystkie w oparciu o Polskie Normy i przepisy techniczno-budowlane.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {core.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="uslugi-premium"
        className="bg-gradient-to-b from-brand-50 to-white py-16 sm:py-20"
      >
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="section-eyebrow">Pakiety premium</p>
            <h2 className="mt-2 section-heading">
              Trzy nowe usługi rozszerzające ofertę
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Kompleksowa ochrona prawna, precyzyjne pomiary architektoniczne i świadectwa energetyczne — wszystko w standardzie inżynierskim Bezpiecznego Odbioru.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {premium.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <WizardSection />

      <section className="container-page py-16">
        <div className="rounded-3xl border border-slate-200 bg-slate-900 p-10 text-center text-white sm:p-14">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Nie znalazłeś usługi, której szukasz?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-300">
            Zadzwoń — omówimy indywidualne rozwiązanie dla Twojej inwestycji. Realizujemy również zlecenia niestandardowe: opinie techniczne, odbiory lokali komercyjnych, ekspertyzy sądowe.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href={`tel:${site.phone}`} className="btn-primary">
              Zadzwoń: {site.phoneDisplay}
            </a>
            <Link href="/kontakt" className="btn-secondary text-slate-900">
              Formularz kontaktowy
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
