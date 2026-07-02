"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, Check, Home, Building2, Store, Loader2 } from "lucide-react";
import { submitNetlifyForm } from "@/lib/netlify";
import { RodoCheckbox } from "./RodoCheckbox";
import { site } from "@/lib/site";

type PropertyType = "Mieszkanie" | "Dom" | "Lokal usługowy";

type LeadData = {
  type: PropertyType | "";
  area: string;
  location: string;
  date: string;
  name: string;
  phone: string;
  email: string;
};

const initial: LeadData = {
  type: "",
  area: "",
  location: "Kraków",
  date: "",
  name: "",
  phone: "",
  email: "",
};

const typeOptions: { value: PropertyType; icon: typeof Home; hint: string }[] = [
  { value: "Mieszkanie", icon: Building2, hint: "Rynek pierwotny lub wtórny" },
  { value: "Dom", icon: Home, hint: "Jednorodzinny, szeregówka, bliźniak" },
  { value: "Lokal usługowy", icon: Store, hint: "Biuro, gastronomia, handel" },
];

export function LeadWizard() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [data, setData] = useState<LeadData>(initial);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const update = <K extends keyof LeadData>(key: K, value: LeadData[K]) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const canGoNext =
    (step === 1 && data.type && data.area) ||
    (step === 2 && data.location && data.date) ||
    step === 3;

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    try {
      await submitNetlifyForm("lead", {
        type: data.type,
        area: data.area,
        location: data.location,
        date: data.date,
        name: data.name,
        phone: data.phone,
        email: data.email,
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white">
          <Check className="h-7 w-7" />
        </div>
        <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
          Dziękujemy! Odezwiemy się w ciągu godziny.
        </h3>
        <p className="mt-2 text-slate-600">
          Sprawdź telefon i skrzynkę mailową. Jeśli sprawa jest pilna, zadzwoń pod{" "}
          <a href={`tel:${site.phone}`} className="font-semibold text-brand-600">
            {site.phoneDisplay}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      name="lead"
      onSubmit={submit}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8"
    >
      <input type="hidden" name="form-name" value="lead" />
      <p hidden>
        <label>
          Nie wypełniaj: <input name="bot-field" />
        </label>
      </p>

      <Steps step={step} />

      {step === 1 && (
        <div className="mt-6 space-y-6">
          <div>
            <label className="text-sm font-semibold text-slate-900">
              Jaka nieruchomość?
            </label>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {typeOptions.map((option) => {
                const Icon = option.icon;
                const active = data.type === option.value;
                return (
                  <button
                    type="button"
                    key={option.value}
                    onClick={() => update("type", option.value)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      active
                        ? "border-brand-500 bg-brand-50 ring-2 ring-brand-400"
                        : "border-slate-200 hover:border-brand-300"
                    }`}
                  >
                    <Icon
                      className={`h-6 w-6 ${active ? "text-brand-500" : "text-slate-500"}`}
                    />
                    <p className="mt-2 text-sm font-semibold text-slate-900">
                      {option.value}
                    </p>
                    <p className="text-xs text-slate-500">{option.hint}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label htmlFor="area" className="text-sm font-semibold text-slate-900">
              Metraż (m²)
            </label>
            <input
              id="area"
              name="area"
              type="number"
              min={10}
              max={2000}
              value={data.area}
              onChange={(e) => update("area", e.target.value)}
              placeholder="np. 65"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="mt-6 space-y-6">
          <div>
            <label htmlFor="location" className="text-sm font-semibold text-slate-900">
              Lokalizacja nieruchomości
            </label>
            <input
              id="location"
              name="location"
              type="text"
              value={data.location}
              onChange={(e) => update("location", e.target.value)}
              placeholder="np. Kraków, Prądnik Biały"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </div>
          <div>
            <label htmlFor="date" className="text-sm font-semibold text-slate-900">
              Planowana data odbioru
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={data.date}
              onChange={(e) => update("date", e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-semibold text-slate-900">
              Imię
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={data.name}
              onChange={(e) => update("name", e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="phone" className="text-sm font-semibold text-slate-900">
                Telefon
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={data.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+48 500 000 000"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-400"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-semibold text-slate-900">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={data.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="ty@email.pl"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-400"
              />
            </div>
          </div>
          <RodoCheckbox />
        </div>
      )}

      {status === "error" && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          Ups, coś poszło nie tak. Zadzwoń pod {site.phoneDisplay} lub spróbuj ponownie.
        </p>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => (s === 3 ? 2 : 1))}
            className="btn-secondary py-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Wstecz
          </button>
        ) : (
          <span />
        )}

        {step < 3 && (
          <button
            type="button"
            onClick={() => canGoNext && setStep((s) => (s === 1 ? 2 : 3))}
            disabled={!canGoNext}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            Dalej
            <ArrowRight className="h-4 w-4" />
          </button>
        )}

        {step === 3 && (
          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "sending" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Wysyłanie…
              </>
            ) : (
              <>
                Zamów bezpłatną wycenę
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        )}
      </div>
    </form>
  );
}

function Steps({ step }: { step: 1 | 2 | 3 }) {
  const labels = ["Nieruchomość", "Termin", "Kontakt"];
  return (
    <div className="flex items-center gap-2">
      {labels.map((label, i) => {
        const num = (i + 1) as 1 | 2 | 3;
        const active = step === num;
        const done = step > num;
        return (
          <div key={label} className="flex flex-1 items-center gap-2">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                done
                  ? "bg-brand-500 text-white"
                  : active
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-500"
              }`}
            >
              {done ? <Check className="h-4 w-4" /> : num}
            </div>
            <span
              className={`hidden text-xs font-semibold sm:inline ${
                active ? "text-slate-900" : "text-slate-500"
              }`}
            >
              {label}
            </span>
            {i < labels.length - 1 && (
              <div className={`h-px flex-1 ${done ? "bg-brand-500" : "bg-slate-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
