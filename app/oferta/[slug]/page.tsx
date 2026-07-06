import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Phone, ArrowLeft, Wrench, ArrowRight } from "lucide-react";
import { services } from "@/lib/services";
import { LeadWizard } from "@/components/LeadWizard";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { BLUR_PLACEHOLDER } from "@/lib/image";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} — Bezpieczny Odbiór`,
    description: service.description,
    alternates: { canonical: `/oferta/${service.slug}` },
    openGraph: {
      title: `${service.title} | ${site.name}`,
      description: service.description,
      url: `${site.url}/oferta/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", item: "/" },
          { name: "Oferta", item: "/oferta" },
          { name: service.title, item: `/oferta/${service.slug}` },
        ])}
      />

      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-brand-soft/50 to-background">
        <div className="container-page grid gap-12 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
          <div>
            <Link
              href="/oferta"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-brand"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Wróć do oferty
            </Link>
            <div className="mt-4 flex items-center gap-2">
              <span className="rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-semibold text-brand">
                {service.tag}
              </span>
              {service.badge && (
                <span className="rounded-full bg-cta px-3 py-1 text-xs font-bold uppercase tracking-wider text-cta-foreground">
                  {service.badge}
                </span>
              )}
            </div>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-brand md:text-5xl">
              {service.title}
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">{service.description}</p>
            <p className="mt-3 text-2xl font-bold text-brand">{service.price}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="cta">
                <a href="#wycena">
                  Bezpłatna wycena <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={`tel:${site.phone}`}>
                  <Phone className="mr-2 h-4 w-4" /> {site.phoneDisplay}
                </a>
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-elegant">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-brand md:text-4xl">
            Co sprawdzamy podczas {service.slug === "badania-termowizyjne" ? "badania" : "odbioru"}?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Sprawdzenie zgodności wykonania zgodnie z Polskimi Normami oraz standardem przy użyciu specjalistycznych narzędzi.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {service.checklist.map((item, index) => (
            <div
              key={item.title}
              className="surface-panel flex gap-4 bg-card p-6"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-brand-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-semibold leading-tight">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-brand md:text-4xl">
                Narzędzia i metody
              </h2>
              <p className="mt-4 text-muted-foreground">
                Korzystamy z profesjonalnego sprzętu pomiarowego i diagnostycznego, aby zapewnić rzetelną ocenę stanu technicznego nieruchomości.
              </p>
              <ul className="mt-6 space-y-3">
                {service.tools.map((tool) => (
                  <li key={tool} className="flex items-start gap-3">
                    <div className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-brand-soft text-brand">
                      <Wrench className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-sm">{tool}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-brand/20 bg-brand p-8 text-brand-foreground">
              <h3 className="text-xl font-bold">Co otrzymujesz?</h3>
              <ul className="mt-5 space-y-3">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cta" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="wycena" className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-3xl font-bold text-brand md:text-4xl">Zamów {service.price}</h2>
            <p className="mt-4 text-muted-foreground">
              Wypełnij formularz — bezpłatną wycenę otrzymasz w ciągu 24 godzin.
            </p>
            <div className="mt-6">
              <LeadWizard />
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8 shadow-elegant">
            <h3 className="text-xl font-bold text-brand">Dlaczego Bezpieczny Odbiór?</h3>
            <ul className="mt-5 space-y-3">
              {[
                `Ponad ${site.reviews.count}+ pozytywnych opinii na Google`,
                "Certyfikowani inżynierowie z uprawnieniami budowlanymi",
                "Kamera termowizyjna FLIR w każdym odbiorze",
                "Protokół PDF gotowy tego samego dnia",
                "Wsparcie po odbiorze — pomoc przy reklamacjach",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cta" />
                  {item}
                </li>
              ))}
            </ul>
            <Button asChild size="lg" variant="cta" className="mt-6 w-full">
              <a href={`tel:${site.phone}`}>
                <Phone className="mr-2 h-4 w-4" /> Zadzwoń: {site.phoneDisplay}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
