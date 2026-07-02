"use client";

import { useEffect, useState } from "react";
import { Check, Loader2, X, Zap } from "lucide-react";
import { submitNetlifyForm } from "@/lib/netlify";
import { RodoCheckbox } from "./RodoCheckbox";

const STORAGE_KEY = "bo-exit-shown";
const DELAY_MS = 15000;

export function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const show = () => {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
      sessionStorage.setItem(STORAGE_KEY, "1");
      setOpen(true);
    };

    const timer = window.setTimeout(show, DELAY_MS);
    const handleMouseLeave = (event: MouseEvent) => {
      if (event.clientY < 10) show();
    };
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.clearTimeout(timer);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (!open) return null;

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    try {
      await submitNetlifyForm("exit-intent", { contact });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          aria-label="Zamknij"
        >
          <X className="h-5 w-5" />
        </button>

        {status === "success" ? (
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white">
              <Check className="h-7 w-7" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-slate-900">
              Dziękujemy! Skontaktujemy się w ciągu godziny.
            </h3>
          </div>
        ) : (
          <>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500 text-white">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-slate-900">
              Planujesz odbiór mieszkania?
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Zamów szybki kontakt inżyniera. Zadzwonimy w ciągu godziny i przedstawimy bezpłatną wycenę.
            </p>

            <form
              name="exit-intent"
              onSubmit={submit}
              className="mt-5 space-y-3"
            >
              <input type="hidden" name="form-name" value="exit-intent" />
              <p hidden>
                <label>
                  Nie wypełniaj: <input name="bot-field" />
                </label>
              </p>
              <input
                type="text"
                name="contact"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Telefon lub email"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-400"
              />
              <RodoCheckbox />
              {status === "error" && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
                  Ups, coś poszło nie tak. Spróbuj ponownie.
                </p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary w-full disabled:opacity-50"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Wysyłanie…
                  </>
                ) : (
                  "Zamawiam szybki kontakt"
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
