import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gift } from "lucide-react";
import { toast } from "sonner";

export function ExitPopup() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("bo_popup_shown")) return;

    const timer = setTimeout(() => {
      if (!shown) {
        setOpen(true);
        setShown(true);
        sessionStorage.setItem("bo_popup_shown", "1");
      }
    }, 15000);

    const onLeave = (e: MouseEvent) => {
      if (e.clientY < 10 && !shown) {
        setOpen(true);
        setShown(true);
        sessionStorage.setItem("bo_popup_shown", "1");
      }
    };
    document.addEventListener("mouseleave", onLeave);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [shown]);

  const submit = () => {
    if (!value.trim()) {
      toast.error("Podaj numer telefonu lub email.");
      return;
    }
    console.log("Popup lead:", value);
    toast.success("Dziękujemy! Wysłaliśmy mini-poradnik i skontaktujemy się wkrótce.");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-cta/20 text-cta">
            <Gift className="h-6 w-6" />
          </div>
          <DialogTitle className="text-center text-xl">
            Planujesz odbiór mieszkania?
          </DialogTitle>
          <DialogDescription className="text-center">
            Pobierz darmowy mini-poradnik lub zamów szybki kontakt inżyniera —
            bezpłatnie i bez zobowiązań.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-3">
          <Input
            placeholder="Numer telefonu lub email"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button className="btn-cta w-full" onClick={submit}>
            Wyślij mi poradnik
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Nie wysyłamy spamu. Możesz zrezygnować w każdej chwili.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
