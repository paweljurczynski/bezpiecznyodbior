import type { Metadata } from "next";
import { Clock, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt — Bezpieczny Odbiór Kraków",
  description:
    "Skontaktuj się z Bezpiecznym Odbiorem: telefon 502 298 030, email kontakt@bezpiecznyodbior.pl. Odbiory techniczne mieszkań w Krakowie i całej Małopolsce.",
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

      <section className="bg-gradient-to-b from-slate-50 to-white py-16 sm:py-24">
        <div className="container-page max-w-3xl text-center">
          <p className="section-eyebrow">Kontakt</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Skontaktuj się z nami — odpowiadamy w godzinę
          </h1>
          <p className="mt-6 text-lg text-slate-600">
            Zadzwoń, napisz lub wypełnij formularz. Bezpłatną wycenę i propozycję terminu odbioru otrzymasz w ciągu godziny w dni robocze.
          </p>
        </div>
      </section>

      <section className="container-page grid gap-10 pb-24 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900">Dane kontaktowe</h2>
            <ul className="mt-6 space-y-5">
              <ContactItem
                icon={<Phone className="h-5 w-5" />}
                label="Telefon"
                value={
                  <a
                    href={`tel:${site.phone}`}
                    className="text-lg font-bold text-slate-900 hover:text-brand-600"
                  >
                    {site.phoneDisplay}
                  </a>
                }
              />
              <ContactItem
                icon={<Mail className="h-5 w-5" />}
                label="Email"
                value={
                  <a
                    href={`mailto:${site.email}`}
                    className="font-semibold text-slate-900 hover:text-brand-600"
                  >
                    {site.email}
                  </a>
                }
              />
              <ContactItem
                icon={<MapPin className="h-5 w-5" />}
                label="Adres"
                value={
                  <span>
                    {site.address.street}
                    <br />
                    {site.address.postalCode} {site.address.city}
                  </span>
                }
              />
              <ContactItem
                icon={<Clock className="h-5 w-5" />}
                label="Godziny pracy"
                value={
                  <ul className="space-y-1">
                    {site.hours.map((h) => (
                      <li key={h.day}>
                        <span className="font-semibold text-slate-900">
                          {h.day}:
                        </span>{" "}
                        <span className="text-slate-600">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                }
              />
            </ul>

            <div className="mt-8 border-t border-slate-100 pt-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
                Znajdziesz nas w mediach społecznościowych
              </p>
              <div className="mt-3 flex gap-3">
                <a
                  href={site.socials.facebook}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition hover:bg-brand-500 hover:text-white"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href={site.socials.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition hover:bg-brand-500 hover:text-white"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
            <iframe
              title="Mapa — Bezpieczny Odbiór Kraków"
              src="https://www.google.com/maps?q=W%C5%82adys%C5%82awa+%C5%81okietka+242G,+31-334+Krak%C3%B3w&output=embed"
              width="100%"
              height="280"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0"
            />
          </div>
        </div>

        <div className="lg:col-span-3">
          <ContactForm />
        </div>
      </section>
    </>
  );
}

function ContactItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-4">
      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          {label}
        </p>
        <div className="mt-1 text-sm text-slate-700">{value}</div>
      </div>
    </li>
  );
}
