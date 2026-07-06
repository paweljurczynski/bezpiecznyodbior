import Link from "next/link";
import { Facebook, Instagram, Mail, Phone, MapPin, ShieldCheck, Star } from "lucide-react";
import { site } from "@/lib/site";
import { navLinks } from "@/lib/nav";
import { services } from "@/lib/services";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand text-brand-foreground">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold text-brand">{site.name}</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Profesjonalne odbiory techniczne mieszkań i domów w województwach małopolskim, śląskim i podkarpackim.
          </p>
          <div className="mt-4 flex items-center gap-1 text-cta">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-current" />
            ))}
            <span className="ml-1 text-xs font-semibold text-foreground">
              {site.reviews.rating.toFixed(1)} ({site.reviews.count}+ opinii)
            </span>
          </div>
          <div className="mt-5 flex gap-2">
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

        <div>
          <h4 className="text-sm font-semibold text-foreground">Nawigacja</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-brand">{link.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/polityka-prywatnosci" className="hover:text-brand">Polityka prywatności</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground">Usługi</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {services.slice(0, 6).map((service) => (
              <li key={service.slug}>
                <Link href={`/oferta#${service.slug}`} className="hover:text-brand">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground">Kontakt</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-cta" />
              <a href={`tel:${site.phone}`} className="hover:text-brand">{site.phoneDisplay}</a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-cta" />
              <a href={`mailto:${site.email}`} className="hover:text-brand">{site.email}</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cta" />
              <span>{site.address.street}<br />{site.address.postalCode} {site.address.city}</span>
            </li>
          </ul>
          <div className="mt-5">
            <h5 className="text-xs font-semibold text-foreground">Godziny pracy</h5>
            <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
              {site.hours.map((h) => (
                <li key={h.day}>{h.day}: {h.time}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} {site.legalName}. Wszelkie prawa zastrzeżone.</p>
          <p>Odbiory techniczne · Termowizja · Doradztwo inwestycyjne</p>
        </div>
      </div>
    </footer>
  );
}
