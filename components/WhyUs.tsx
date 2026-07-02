import {
  ShieldCheck,
  Ruler,
  Thermometer,
  ClipboardCheck,
  Award,
  Clock,
} from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Znajomość Polskich Norm",
    text: "Każdą usterkę uzasadniamy konkretnym zapisem w normie lub warunkach technicznych. Deweloperzy nie mają pola do dyskusji.",
  },
  {
    icon: Thermometer,
    title: "Kamera termowizyjna FLIR",
    text: "Wykrywamy mostki termiczne, nieszczelności izolacji i zawilgocenia niewidoczne gołym okiem — nawet w ciepłe dni.",
  },
  {
    icon: Ruler,
    title: "Precyzyjne pomiary",
    text: "Dalmierz laserowy, wilgotnościomierz, poziomica laserowa, luksomierz — pełen zestaw profesjonalnych narzędzi.",
  },
  {
    icon: ClipboardCheck,
    title: "Protokół gotowy tego samego dnia",
    text: "Otrzymasz raport PDF ze zdjęciami, opisami i wskazaniem norm — gotowy do wręczenia deweloperowi.",
  },
  {
    icon: Award,
    title: "Ponad 100 opinii 5★",
    text: "Setki zadowolonych klientów w Krakowie i Małopolsce potwierdzają jakość naszej pracy na Google Reviews.",
  },
  {
    icon: Clock,
    title: "Szybki termin realizacji",
    text: "Odbiory umawiamy najczęściej w 2–5 dni roboczych. Bezpłatną wycenę otrzymasz w ciągu godziny.",
  },
];

export function WhyUs() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">Dlaczego my</p>
          <h2 className="mt-2 section-heading">
            Zabezpieczamy Twoją inwestycję na każdym etapie
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Łączymy wiedzę inżynierską, profesjonalny sprzęt i doświadczenie z ponad 1500 odbiorów w Krakowie i Małopolsce.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <reason.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{reason.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
