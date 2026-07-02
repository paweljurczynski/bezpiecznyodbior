"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "bo-cookie-consent";
const gaId = process.env.NEXT_PUBLIC_GA_ID;

type Consent = "accepted" | "rejected" | null;

export function CookieBanner() {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(STORAGE_KEY) as Consent;
    setConsent(stored);
    setReady(true);
  }, []);

  const set = (value: Exclude<Consent, null>) => {
    localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
  };

  const analyticsEnabled = consent === "accepted" && Boolean(gaId);

  return (
    <>
      {analyticsEnabled && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {ready && !consent && (
        <div className="fixed inset-x-0 bottom-0 z-40 p-4 sm:p-6">
          <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Cookie className="h-5 w-5" />
              </div>
              <p className="flex-1 text-sm text-slate-600">
                Używamy plików cookie do analizy ruchu (Google Analytics) i poprawy jakości strony. Możesz zaakceptować lub odrzucić — szczegóły w{" "}
                <Link
                  href="/polityka-prywatnosci"
                  className="font-semibold text-brand-600 hover:underline"
                >
                  polityce prywatności
                </Link>
                .
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() => set("rejected")}
                  className="btn-secondary py-2 text-sm"
                >
                  Odrzuć
                </button>
                <button
                  type="button"
                  onClick={() => set("accepted")}
                  className="btn-primary py-2 text-sm"
                >
                  Akceptuję
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
