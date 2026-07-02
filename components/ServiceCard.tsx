import Link from "next/link";
import {
  Home,
  Key,
  Thermometer,
  Compass,
  ShieldCheck,
  Ruler,
  Leaf,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import type { Service } from "@/lib/services";

const iconMap = {
  home: Home,
  key: Key,
  thermal: Thermometer,
  compass: Compass,
  shield: ShieldCheck,
  ruler: Ruler,
  leaf: Leaf,
} as const;

export function ServiceCard({ service }: { service: Service }) {
  const Icon = iconMap[service.icon];

  return (
    <article
      id={service.slug}
      className={`relative flex flex-col rounded-3xl border p-6 shadow-sm transition hover:shadow-lg sm:p-8 ${
        service.premium
          ? "border-brand-200 bg-gradient-to-br from-brand-50 to-white"
          : "border-slate-200 bg-white"
      }`}
    >
      {service.badge && (
        <span className="absolute right-6 top-6 inline-flex items-center gap-1 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
          <Sparkles className="h-3 w-3" />
          {service.badge}
        </span>
      )}

      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${
          service.premium ? "bg-brand-500 text-white" : "bg-brand-50 text-brand-600"
        }`}
      >
        <Icon className="h-6 w-6" />
      </div>

      <h3 className="mt-5 text-xl font-bold text-slate-900">{service.title}</h3>
      <p className="mt-2 text-sm font-medium text-brand-600">{service.short}</p>
      <p className="mt-4 text-sm text-slate-600">{service.description}</p>

      <ul className="mt-5 flex-1 space-y-2">
        {service.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2 text-sm text-slate-700">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/#wycena"
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
      >
        Zamów wycenę tej usługi
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
