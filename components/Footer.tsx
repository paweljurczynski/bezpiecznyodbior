import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone, Star } from "lucide-react";
import { site } from "@/lib/site";
import { navLinks } from "@/lib/nav";
import { services } from "@/lib/services";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-slate-50">
      <div className="container-page grid gap-10 py-16 md:grid-cols-4">
        <div>
          <Logo size={44} href={null} />
          <p className="mt-4 text-sm text-slate-600">
            Inżynierskie odbiory techniczne mieszkań i domów w Krakowie i całej Małopolsce. Ponad {site.reviews.count} pozytywnych opinii na Google.
          </p>
          <div className="mt-4 flex items-center gap-1 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
            <span className="ml-2 text-sm font-semibold text-slate-900">
              {site.reviews.rating.toFixed(1)} / 5 ({site.reviews.count}+ opinii)
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900">
            Nawigacja
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-slate-600 transition hover:text-brand-600"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/polityka-prywatnosci"
                className="text-slate-600 transition hover:text-brand-600"
              >
                Polityka prywatności
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900">
            Usługi
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {services.slice(0, 6).map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/oferta#${service.slug}`}
                  className="text-slate-600 transition hover:text-brand-600"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900">
            Kontakt
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={`tel:${site.phone}`}
                className="flex items-start gap-2 text-slate-700 transition hover:text-brand-600"
              >
                <Phone className="mt-0.5 h-4 w-4 text-brand-500" />
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex items-start gap-2 text-slate-700 transition hover:text-brand-600"
              >
                <Mail className="mt-0.5 h-4 w-4 text-brand-500" />
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-2 text-slate-700">
              <MapPin className="mt-0.5 h-4 w-4 text-brand-500" />
              <span>
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.city}
              </span>
            </li>
          </ul>

          <div className="mt-6 flex items-center gap-3">
            <a
              href={site.socials.facebook}
              target="_blank"
              rel="noreferrer noopener"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-700 shadow-sm transition hover:bg-brand-500 hover:text-white"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-700 shadow-sm transition hover:bg-brand-500 hover:text-white"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 py-6">
        <div className="container-page flex flex-col items-start justify-between gap-2 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.legalName}. Wszystkie prawa zastrzeżone.
          </p>
          <p>NIP · REGON · KRS (uzupełnij w panelu klienta)</p>
        </div>
      </div>
    </footer>
  );
}
