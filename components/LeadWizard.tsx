"use client";

import { useState } from "react";
import { Building2, Home, Warehouse, ChevronLeft, ChevronRight, CheckCircle2, Loader2, Paperclip, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitNetlifyForm } from "@/lib/netlify";
import { RodoCheckbox } from "./RodoCheckbox";
import { site } from "@/lib/site";

type PropertyType = "Mieszkanie" | "Dom" | "Lokal usługowy";

type LeadData = {
  propertyType: PropertyType | "";
  area: string;
  location: string;
  date: string;
  name: string;
  phone: string;
  email: string;
};

const propertyTypes: { value: PropertyType; icon: typeof Home; hint: string }[] = [
  { value: "Mieszkanie", icon: Building2, hint: "Rynek pierwotny lub wtórny" },
  { value: "Dom", icon: Home, hint: "Jednorodzinny, szeregówka, bliźniak" },
  { value: "Lokal usługowy", icon: Warehouse, hint: "Biuro, gastronomia, handel" },
];

const sizes = ["do 40 m²", "40–60 m²", "60–90 m²", "90–150 m²", "powyżej 150 m²"];

export function LeadWizard() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [files, setFiles] = useState<File[]>([]);
  const [data, setData] = useState<LeadData>({
    propertyType: "",
    area: "",
    location: "Kraków",
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
      toast.error("Uzupełnij dane kontaktowe.");
      return;
    }
    setStatus("sending");
    try {
      await submitNetlifyForm(e.currentTarget, files);
      setStatus("success");
      toast.success("Dziękujemy! Odezwiemy się w ciągu 24h.");
    } catch {
      setStatus("error");
      toast.error(`Ups, coś poszło nie tak. Zadzwoń pod ${site.phoneDisplay}.`);
    }
  };

  if (status === "success") {
    return (
      <div className="surface-panel p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-cta/20 text-cta">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="mt-4 text-2xl font-bold">Zgłoszenie przyjęte</h3>
        <p className="mt-2 text-muted-foreground">
          Nasz inżynier oddzwoni w ciągu 24 godzin z bezpłatną wyceną odbioru.
        </p>
      </div>
    );
  }

  return (
    <form name="lead" onSubmit={submit} className="surface-panel p-6 md:p-8">
      <input type="hidden" name="form-name" value="lead" />
      <input type="hidden" name="propertyType" value={data.propertyType} />
      <input type="hidden" name="area" value={data.area} />
      <p hidden>
        <label>Nie wypełniaj: <input name="bot-field" /></label>
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
            {s < 3 && (
              <div className={`h-px flex-1 ${step > s ? "bg-cta/50" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-5">
          <div>
            <Label className="mb-3 block">Rodzaj nieruchomości</Label>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {propertyTypes.map(({ value, icon: Icon, hint }) => {
                const active = data.propertyType === value;
                return (
                  <button
                    type="button"
                    key={value}
                    onClick={() => update("propertyType", value)}
                    className={`flex flex-col items-center justify-center gap-1.5 rounded-lg border p-2.5 sm:p-4 text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                      active
                        ? "border-cta/50 bg-cta/5 text-cta"
                        : "border-border hover:border-cta/30"
                    }`}
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" />
                    <span className="text-center leading-tight">{value}</span>
                    <span className="hidden sm:block text-xs font-normal text-muted-foreground text-center">{hint}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <Label className="mb-3 block">Metraż</Label>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => update("area", s)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors cursor-pointer ${
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
            <Label htmlFor="location">Lokalizacja (miasto)</Label>
            <Input
              id="location"
              name="location"
              placeholder="np. Kraków"
              value={data.location}
              onChange={(e) => update("location", e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="date">Planowana data odbioru <span className="text-muted-foreground font-normal">(opcjonalnie)</span></Label>
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
            <Label>Załączniki <span className="text-muted-foreground font-normal">(opcjonalnie — rzut, projekt, inne)</span></Label>
            <label
              htmlFor="files"
              className="mt-2 flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-border p-5 transition-colors hover:border-cta/30"
            >
              <Paperclip className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {files.length > 0
                  ? `${files.length} plik${files.length === 1 ? "" : files.length < 5 ? "i" : "ów"} wybranych`
                  : "Kliknij lub przeciągnij pliki"}
              </span>
              <span className="text-xs text-muted-foreground/70">PDF, JPG, PNG, DOC — maks. 10 MB każdy</span>
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
            <Label htmlFor="name">Imię <span className="text-muted-foreground font-normal">(opcjonalnie)</span></Label>
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
              <Label htmlFor="phone">Telefon</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="+48 500 000 000"
                value={data.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="jan.kowalski@firma.pl"
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
            <ChevronLeft className="mr-1 h-4 w-4" /> Wstecz
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
            Dalej <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        ) : (
          <Button type="submit" variant="cta" disabled={status === "sending"}>
            {status === "sending" ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Wysyłanie…</>
            ) : (
              "Zamów bezpłatną wycenę"
            )}
          </Button>
        )}
      </div>
    </form>
  );
}
