"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Script from "next/script";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COOKIE_CONSENT_KEY } from "@/lib/analytics";

const gaId = process.env.NEXT_PUBLIC_GA_ID;

type Consent = "accepted" | "rejected" | null;

export function CookieBanner() {
  const t = useTranslations("cookie");
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setConsent(localStorage.getItem(COOKIE_CONSENT_KEY) as Consent);
    setReady(true);
  }, []);

  const set = (value: Exclude<Consent, null>) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, value);
    setConsent(value);
  };

  const analyticsEnabled = consent === "accepted" && Boolean(gaId);

  return (
    <>
      {analyticsEnabled && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="gtag-init" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', { anonymize_ip: true });
          `}</Script>
        </>
      )}

      {ready && !consent && (
        <div className="fixed inset-x-0 bottom-0 z-40 p-4 sm:p-6">
          <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-background p-5 shadow-xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
                <Cookie className="h-5 w-5" />
              </div>
              <p className="flex-1 text-sm text-muted-foreground">
                {t("text")}{" "}
                <Link href="/polityka-prywatnosci" className="font-semibold text-brand hover:underline">
                  {t("privacyLink")}
                </Link>
                .
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button type="button" variant="outline" size="sm" onClick={() => set("rejected")}>
                  {t("reject")}
                </Button>
                <Button type="button" size="sm" variant="cta" onClick={() => set("accepted")}>
                  {t("accept")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
