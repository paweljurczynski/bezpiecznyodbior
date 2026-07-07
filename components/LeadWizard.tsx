"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  Building2,
  Home,
  Warehouse,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Loader2,
  Paperclip,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitNetlifyForm } from "@/lib/netlify";
import { RodoCheckbox } from "./RodoCheckbox";
import { getPhoneDisplay } from "@/lib/contact-obfuscation";
import type { Locale } from "@/i18n/routing";

type LeadData = {
  propertyType: string;
  area: string;
  location: string;
  date: string;
  name: string;
  phone: string;
  email: string;
};

export function LeadWizard() {
  const locale = useLocale() as Locale;
  const t = useTranslations("forms.leadWizard");
  const tCommon = useTranslations("common");
  const tForms = useTranslations("forms");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [files, setFiles] = useState<File[]>([]);

  const propertyTypes = useMemo(
    () => [
      { value: t("propertyTypes.apartment"), icon: Building2, hint: t("propertyHints.apartment") },
      { value: t("propertyTypes.house"), icon: Home, hint: t("propertyHints.house") },
      { value: t("propertyTypes.commercial"), icon: Warehouse, hint: t("propertyHints.commercial") },
    ],
    [t]
  );

  const sizes = useMemo(
    () => [
      t("areas.upTo40"),
      t("areas.40to60"),
      t("areas.60to90"),
      t("areas.90to150"),
      t("areas.over150"),
    ],
    [t]
  );

  const [data, setData] = useState<LeadData>({
    propertyType: "",
    area: "",
    location: locale === "en" ? "Kraków" : "Kraków",
    date: "",
    name: "",
    phone: "",
    email: "",
  });

  const update = <K extends keyof LeadData>(key: K, value: LeadData[K]) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const canNext =
    (step === 1 && Boolean(data.propertyType) && Boolean(data.area)) ||
    (step === 2 && Boolean(data.location)) ||
    step === 3;

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data.phone || !data.email) {
      toast.error(t("toastMissingContact"));
      return;
    }
    setStatus("sending");
    try {
      await submitNetlifyForm(e.currentTarget, files);
      setStatus("success");
      toast.success(t("toastSuccess"));
    } catch {
      setStatus("error");
      toast.error(t("toastError", { phone: getPhoneDisplay() }));
    }
  };

  const fileCountLabel =
    files.length === 0
      ? t("attachmentsDropzone")
      : files.length === 1
        ? t("filesSelectedOne", { count: files.length })
        : files.length < 5
          ? t("filesSelectedFew", { count: files.length })
          : t("filesSelectedMany", { count: files.length });

  if (status === "success") {
    return (
      <div className="surface-panel p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-cta/20 text-cta">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="mt-4 text-2xl font-bold">{t("successTitle")}</h3>
        <p className="mt-2 text-muted-foreground">{t("successMessage")}</p>
      </div>
    );
  }

  return (
    <form name="lead" onSubmit={submit} className="surface-panel p-6 md:p-8">
      <input type="hidden" name="form-name" value="lead" />
      <input type="hidden" name="propertyType" value={data.propertyType} />
      <input type="hidden" name="area" value={data.area} />
      <p hidden>
        <label>
          {tForms("botField")} <input name="bot-field" />
        </label>
      </p>

      <div className="mb-6 flex items-center">
        {([1, 2, 3] as const).map((s) => (
          <div key={s} className="contents">
            <div
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-semibold ${
                step > s
                  ? "border-2 border-cta/50 bg-cta/15 text-cta/70"
                  : step === s
                    ? "bg-cta text-cta-foreground"
                    : "border border-border text-muted-foreground"
              }`}
            >
              {s}
            </div>
            {s < 3 && <div className={`h-px flex-1 ${step > s ? "bg-cta/50" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-5">
          <div>
            <Label className="mb-3 block">{t("propertyType")}</Label>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {propertyTypes.map(({ value, icon: Icon, hint }) => {
                const active = data.propertyType === value;
                return (
                  <button
                    type="button"
                    key={value}
                    onClick={() => update("propertyType", value)}
                    className={`flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border p-2.5 text-xs font-medium transition-colors sm:p-4 sm:text-sm ${
                      active
                        ? "border-cta/50 bg-cta/5 text-cta"
                        : "border-border hover:border-cta/30"
                    }`}
                  >
                    <Icon className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
                    <span className="text-center leading-tight">{value}</span>
                    <span className="hidden text-center text-xs font-normal text-muted-foreground sm:block">
                      {hint}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <Label className="mb-3 block">{t("area")}</Label>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => update("area", s)}
                  className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors ${
                    data.area === s
                      ? "border-cta bg-cta text-cta-foreground"
                      : "border-border hover:border-cta/30"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="location">{t("location")}</Label>
            <Input
              id="location"
              name="location"
              placeholder={t("locationPlaceholder")}
              value={data.location}
              onChange={(e) => update("location", e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="date">
              {t("date")} <span className="font-normal text-muted-foreground">{tCommon("optional")}</span>
            </Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={data.date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => update("date", e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label>
              {t("attachments")}{" "}
              <span className="font-normal text-muted-foreground">{t("attachmentsHint")}</span>
            </Label>
            <label
              htmlFor="files"
              className="mt-2 flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-border p-5 transition-colors hover:border-cta/30"
            >
              <Paperclip className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{fileCountLabel}</span>
              <span className="text-xs text-muted-foreground/70">{t("attachmentsFormats")}</span>
              <input
                id="files"
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                className="sr-only"
                onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
              />
            </label>
            {files.length > 0 && (
              <ul className="mt-2 space-y-1">
                {files.map((f) => (
                  <li key={f.name} className="flex items-center justify-between rounded-md bg-muted px-3 py-1.5 text-sm">
                    <span className="truncate text-muted-foreground">{f.name}</span>
                    <button
                      type="button"
                      onClick={() => setFiles((prev) => prev.filter((x) => x.name !== f.name))}
                      className="ml-2 shrink-0 cursor-pointer text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">
              {t("name")} <span className="font-normal text-muted-foreground">{tCommon("optional")}</span>
            </Label>
            <Input
              id="name"
              name="name"
              value={data.name}
              onChange={(e) => update("name", e.target.value)}
              className="mt-2"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="phone">{t("phone")}</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder={t("phonePlaceholder")}
                value={data.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder={t("emailPlaceholder")}
                value={data.email}
                onChange={(e) => update("email", e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
          <RodoCheckbox />
        </div>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 1 ? (
          <Button
            type="button"
            variant="ghost"
            onClick={() => setStep((s) => Math.max(1, s - 1) as 1 | 2 | 3)}
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> {t("back")}
          </Button>
        ) : (
          <span />
        )}
        {step < 3 ? (
          <Button
            type="button"
            variant="cta"
            onClick={() => canNext && setStep((s) => Math.min(3, s + 1) as 1 | 2 | 3)}
            disabled={!canNext}
          >
            {t("next")} <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        ) : (
          <Button type="submit" variant="cta" disabled={status === "sending"}>
            {status === "sending" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> {t("sending")}
              </>
            ) : (
              t("submit")
            )}
          </Button>
        )}
      </div>
    </form>
  );
}
