import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, Phone, MapPin, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand text-brand-foreground">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold text-brand">
              Bezpieczny Odbiór
            </span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Profesjonalne odbiory techniczne mieszkań i domów w województwach
            małopolskim, śląskim i podkarpackim.
          </p>
          <div className="mt-5 flex gap-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background transition-colors hover:bg-brand hover:text-brand-foreground"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com"
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
            <li><Link to="/" className="hover:text-brand">Strona główna</Link></li>
            <li><Link to="/oferta" className="hover:text-brand">Oferta i usługi</Link></li>
            <li><Link to="/sklep" className="hover:text-brand">Sklep / Edukacja</Link></li>
            <li><Link to="/kontakt" className="hover:text-brand">Kontakt</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground">Kontakt</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 text-cta shrink-0" />
              <a href="tel:+48502298030" className="hover:text-brand">502 298 030</a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 text-cta shrink-0" />
              <a href="mailto:kontakt@bezpiecznyodbior.pl" className="hover:text-brand">
                kontakt@bezpiecznyodbior.pl
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-cta shrink-0" />
              <span>Małopolskie · Śląskie · Podkarpackie</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground">Godziny pracy</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Pon – Pt: 8:00 – 18:00</li>
            <li>Sobota: 9:00 – 14:00</li>
            <li>Niedziela: zamknięte</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Bezpieczny Odbiór. Wszelkie prawa zastrzeżone.</p>
          <p>Odbiory techniczne · Termowizja · Doradztwo inwestycyjne</p>
        </div>
      </div>
    </footer>
  );
}
