import Link from "next/link";
import { Phone, Star } from "lucide-react";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span className="text-sm font-semibold text-slate-700">
              {site.reviews.rating.toFixed(1)} / 5 · ponad {site.reviews.count} opinii Google
            </span>
          </div>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Profesjonalne <span className="text-brand-500">odbiory techniczne</span> mieszkań i domów
          </h1>

          <p className="mt-4 max-w-lg text-lg text-slate-600">
            Kraków, Małopolska, Śląsk — kamera termowizyjna FLIR, znajomość Polskich Norm i protokół PDF tego samego dnia.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={`tel:${site.phone}`} className="btn-primary flex items-center gap-2">
              <Phone className="h-4 w-4" />
              {site.phoneDisplay}
            </a>
            <Link href="#wycena" className="btn-secondary">
              Bezpłatna wycena online
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-brand-100 via-brand-50 to-white blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
            <div
              className="aspect-[4/3] w-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('/hero-apartment.png')",
              }}
              role="img"
              aria-label="Puste mieszkanie w stanie deweloperskim gotowe do odbioru technicznego"
            />
            <div className="grid grid-cols-3 divide-x divide-slate-200 border-t border-slate-200 bg-slate-50">
              <Stat value="100+" label="Opinii 5★" />
              <Stat value="1500+" label="Odbiorów" />
              <Stat value="5 lat" label="Doświadczenia" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="py-4 text-center">
      <p className="text-xl font-bold text-slate-900">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}
