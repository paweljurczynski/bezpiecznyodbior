import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-brand-600">
        Błąd 404
      </p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
        Nie znaleziono strony
      </h1>
      <p className="mt-4 max-w-md text-slate-600">
        Wygląda na to, że szukana strona nie istnieje lub została przeniesiona. Wróć na stronę główną albo skontaktuj się z nami.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn-primary">
          <Home className="h-4 w-4" />
          Strona główna
        </Link>
        <Link href="/kontakt" className="btn-secondary">
          Kontakt
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
