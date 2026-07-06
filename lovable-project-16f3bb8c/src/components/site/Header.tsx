import { Link } from "@tanstack/react-router";
import { ShieldCheck, Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Strona główna" },
  { to: "/oferta", label: "Oferta" },
  { to: "/sklep", label: "Sklep / Edukacja" },
  { to: "/kontakt", label: "Kontakt" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="container-page flex h-16 items-center gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand text-brand-foreground">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-brand">
            Bezpieczny Odbiór
          </span>
        </Link>
        <nav className="ml-6 hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-brand data-[status=active]:bg-brand-soft"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto hidden items-center gap-3 md:flex">
          <a
            href="tel:+48502298030"
            className="flex items-center gap-2 text-sm font-semibold text-foreground"
          >
            <Phone className="h-4 w-4 text-cta" />
            502 298 030
          </a>
          <Button asChild className="btn-cta">
            <Link to="/kontakt">Zamów wycenę</Link>
          </Button>
        </div>
        <button
          className="ml-auto md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border md:hidden">
          <div className="container-page flex flex-col gap-1 py-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground data-[status=active]:bg-brand-soft data-[status=active]:text-brand"
              >
                {n.label}
              </Link>
            ))}
            <Button asChild className="btn-cta mt-2">
              <Link to="/kontakt" onClick={() => setOpen(false)}>
                Zamów bezpłatną wycenę
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
