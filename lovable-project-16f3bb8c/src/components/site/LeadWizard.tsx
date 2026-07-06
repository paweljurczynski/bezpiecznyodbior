import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ChevronLeft, ChevronRight, Home, Building2, Warehouse } from "lucide-react";
import { toast } from "sonner";

type Data = {
  propertyType: string;
  size: string;
  city: string;
  date: string;
  name: string;
  phone: string;
  email: string;
};

const propertyTypes = [
  { id: "mieszkanie", label: "Mieszkanie", icon: Building2 },
  { id: "dom", label: "Dom", icon: Home },
  { id: "lokal", label: "Lokal użytkowy", icon: Warehouse },
];

const sizes = ["do 40 m²", "40–60 m²", "60–90 m²", "90–150 m²", "powyżej 150 m²"];

export function LeadWizard() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [data, setData] = useState<Data>({
    propertyType: "",
    size: "",
    city: "",
    date: "",
    name: "",
    phone: "",
    email: "",
  });

  const update = (k: keyof Data, v: string) => setData((d) => ({ ...d, [k]: v }));
  const canNext =
    (step === 1 && data.propertyType && data.size) ||
    (step === 2 && data.city && data.date) ||
    step === 3;

  const submit = () => {
    if (!data.name || !data.phone || !data.email) {
      toast.error("Uzupełnij wszystkie dane kontaktowe.");
      return;
    }
    console.log("Lead submitted:", data);
    setDone(true);
    toast.success("Dziękujemy! Skontaktujemy się w ciągu 24h.");
  };

  if (done) {
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
    <div className="surface-panel p-6 md:p-8">
      <div className="mb-6 flex items-center gap-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex flex-1 items-center gap-2">
            <div
              className={`grid h-8 w-8 place-items-center rounded-full text-sm font-semibold ${
                step >= s ? "bg-brand text-brand-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {s}
            </div>
            {s < 3 && (
              <div className={`h-1 flex-1 rounded ${step > s ? "bg-brand" : "bg-muted"}`} />
            )}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-5">
          <div>
            <Label className="mb-3 block">Rodzaj nieruchomości</Label>
            <div className="grid grid-cols-3 gap-2">
              {propertyTypes.map((p) => {
                const Icon = p.icon;
                const active = data.propertyType === p.id;
                return (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => update("propertyType", p.id)}
                    className={`flex flex-col items-center gap-2 rounded-lg border p-4 text-sm font-medium transition-colors ${
                      active
                        ? "border-brand bg-brand-soft text-brand"
                        : "border-border hover:border-brand/50"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                    {p.label}
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
                  onClick={() => update("size", s)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    data.size === s
                      ? "border-brand bg-brand text-brand-foreground"
                      : "border-border hover:border-brand/50"
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
            <Label htmlFor="city">Lokalizacja (miasto)</Label>
            <Input
              id="city"
              placeholder="np. Kraków"
              value={data.city}
              onChange={(e) => update("city", e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="date">Planowana data odbioru</Label>
            <Input
              id="date"
              type="date"
              value={data.date}
              onChange={(e) => update("date", e.target.value)}
              className="mt-2"
            />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Imię</Label>
            <Input id="name" value={data.name} onChange={(e) => update("name", e.target.value)} className="mt-2" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="phone">Telefon</Label>
              <Input id="phone" value={data.phone} onChange={(e) => update("phone", e.target.value)} className="mt-2" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={data.email} onChange={(e) => update("email", e.target.value)} className="mt-2" />
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="ghost"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
        >
          <ChevronLeft className="mr-1 h-4 w-4" /> Wstecz
        </Button>
        {step < 3 ? (
          <Button
            type="button"
            className="btn-cta"
            onClick={() => canNext && setStep((s) => s + 1)}
            disabled={!canNext}
          >
            Dalej <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        ) : (
          <Button type="button" className="btn-cta" onClick={submit}>
            Zamów bezpłatną wycenę
          </Button>
        )}
      </div>
    </div>
  );
}
