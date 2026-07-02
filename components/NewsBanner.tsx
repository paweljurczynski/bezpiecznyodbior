import Link from "next/link";
import { Newspaper, ArrowRight } from "lucide-react";

export function NewsBanner() {
  return (
    <section className="container-page py-12">
      <div className="flex flex-col items-start gap-6 rounded-3xl border border-brand-200 bg-gradient-to-r from-brand-50 via-white to-brand-50 p-8 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-white">
            <Newspaper className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
              Nowość w ofercie
            </p>
            <h3 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
              Pakiet Premium: Prawnik + Odbiór techniczny w jednym
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Analiza umowy deweloperskiej przez radcę prawnego + pełny odbiór techniczny. Kompleksowa ochrona przy zakupie mieszkania.
            </p>
          </div>
        </div>
        <Link href="/oferta#pakiet-premium-prawnik" className="btn-primary shrink-0">
          Dowiedz się więcej
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
