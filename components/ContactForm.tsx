"use client";

import { useState } from "react";
import { Check, Loader2, Send } from "lucide-react";
import { submitNetlifyForm } from "@/lib/netlify";
import { RodoCheckbox } from "./RodoCheckbox";
import { site } from "@/lib/site";

type ContactData = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

const initial: ContactData = {
  name: "",
  phone: "",
  email: "",
  message: "",
};

export function ContactForm() {
  const [data, setData] = useState<ContactData>(initial);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const update = <K extends keyof ContactData>(key: K, value: ContactData[K]) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    try {
      await submitNetlifyForm("contact", data);
      setStatus("success");
      setData(initial);
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
        <h3 className="mt-4 text-xl font-bold text-slate-900">
          Wiadomość wysłana!
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          Odpowiemy w ciągu jednego dnia roboczego. Jeśli sprawa jest pilna,
          zadzwoń pod{" "}
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
      name="contact"
      onSubmit={submit}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p hidden>
        <label>
          Nie wypełniaj: <input name="bot-field" />
        </label>
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Imię i nazwisko"
          name="name"
          value={data.name}
          onChange={(v) => update("name", v)}
          required
        />
        <Field
          label="Telefon"
          name="phone"
          type="tel"
          value={data.phone}
          onChange={(v) => update("phone", v)}
          required
        />
      </div>
      <div className="mt-4">
        <Field
          label="Email"
          name="email"
          type="email"
          value={data.email}
          onChange={(v) => update("email", v)}
          required
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="message"
          className="text-sm font-semibold text-slate-900"
        >
          Wiadomość
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={data.message}
          onChange={(e) => update("message", e.target.value)}
          className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-400"
          placeholder="Metraż, lokalizacja, planowana data odbioru…"
        />
      </div>
      <div className="mt-4">
        <RodoCheckbox />
      </div>

      {status === "error" && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          Ups, coś poszło nie tak. Zadzwoń pod {site.phoneDisplay} lub spróbuj ponownie.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary mt-6 w-full disabled:opacity-50"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Wysyłanie…
          </>
        ) : (
          <>
            Wyślij wiadomość
            <Send className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold text-slate-900">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-400"
      />
    </div>
  );
}
