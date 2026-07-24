"use client";

import { useEffect, useState } from "react";
import { Gift, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitNetlifyForm } from "@/lib/netlify";
import { RodoCheckbox } from "./RodoCheckbox";

const STORAGE_KEY = "bo-exit-shown";

export function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const show = () => {
      if (shown) return;
      sessionStorage.setItem(STORAGE_KEY, "1");
      setShown(true);
      setOpen(true);
    };

    const timer = window.setTimeout(show, 15000);
    const onLeave = (e: MouseEvent) => { if (e.clientY < 10) show(); };
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [shown]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) {
      toast.error("Podaj numer telefonu lub email.");
      return;
    }
    setStatus("sending");
    try {
      await submitNetlifyForm(e.currentTarget);
      setStatus("success");
    } catch {
      setStatus("error");
      toast.error("Ups, coś poszło nie tak. Spróbuj ponownie.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        {status === "success" ? (
          <div className="py-6 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-cta/20 text-cta">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="mt-4 text-xl font-bold">Dziękujemy! Skontaktujemy się wkrótce.</h3>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-cta/20 text-cta">
                <Gift className="h-6 w-6" />
              </div>
              <DialogTitle className="text-center text-xl">
                Planujesz odbiór mieszkania?
              </DialogTitle>
              <DialogDescription className="text-center">
                Zamów szybki kontakt — bezpłatnie i bez zobowiązań. Zadzwonimy w ciągu godziny.
              </DialogDescription>
            </DialogHeader>
            <form name="exit-intent" onSubmit={submit} className="mt-2 space-y-3">
              <input type="hidden" name="form-name" value="exit-intent" />
              <p hidden><label>Nie wypełniaj: <input name="bot-field" /></label></p>
              <Input
                name="contact"
                required
                placeholder="Numer telefonu lub email"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <RodoCheckbox />
              <Button type="submit" variant="cta" className="w-full" disabled={status === "sending"}>
                {status === "sending" ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Wysyłanie…</>
                ) : (
                  "Zamawiam szybki kontakt"
                )}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Nie wysyłamy spamu. Możesz zrezygnować w każdej chwili.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
