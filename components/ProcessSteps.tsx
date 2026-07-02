import { CalendarCheck, FileText, Search } from "lucide-react";

const steps = [
  {
    icon: CalendarCheck,
    title: "Umów wizytę",
    text: "Wypełnij 3-krokowy formularz lub zadzwoń. Bezpłatną wycenę otrzymasz w ciągu godziny, termin ustalimy w 2–5 dni roboczych.",
  },
  {
    icon: FileText,
    title: "Prześlij dokumenty",
    text: "Wystarczy umowa deweloperska i rzut mieszkania. Nasz inżynier przygotuje się merytorycznie przed odbiorem.",
  },
  {
    icon: Search,
    title: "Odbiór techniczny",
    text: "2–4 h dokładnej inspekcji z kamerą termowizyjną. Tego samego dnia otrzymasz raport PDF z listą usterek gotową dla dewelopera.",
  },
];

export function ProcessSteps() {
  return (
    <section className="bg-slate-50 py-16 sm:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">Jak to działa</p>
          <h2 className="mt-2 section-heading">Trzy kroki do bezpiecznego odbioru</h2>
          <p className="mt-4 text-lg text-slate-600">
            Zajmiemy się wszystkim — od bezpłatnej wyceny po gotowy protokół w Twojej skrzynce.
          </p>
        </div>

        <ol className="mt-12 grid gap-6 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <span className="absolute -top-4 left-8 flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white">
                {index + 1}
              </span>
              <step.icon className="h-8 w-8 text-brand-500" />
              <h3 className="mt-4 text-xl font-bold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-slate-600">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
