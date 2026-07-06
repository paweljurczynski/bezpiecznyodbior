import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

export function WaitlistModal({ title, trigger }: { title: string; trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submit = () => {
    if (!email) {
      toast.error("Podaj adres email.");
      return;
    }
    console.log("Waitlist:", { title, name, email });
    setDone(true);
    toast.success("Zapisano na listę oczekujących!");
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { setDone(false); setName(""); setEmail(""); } }}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {done ? (
          <div className="py-6 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-cta/20 text-cta">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="mt-4 text-xl font-bold">Jesteś na liście!</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Powiadomimy Cię jako pierwszego, gdy e-book będzie dostępny.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Zapisz się na listę oczekujących</DialogTitle>
              <DialogDescription>{title}</DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <Label htmlFor="wl-name">Imię</Label>
                <Input id="wl-name" value={name} onChange={(e) => setName(e.target.value)} className="mt-2" />
              </div>
              <div>
                <Label htmlFor="wl-email">Email</Label>
                <Input id="wl-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2" />
              </div>
              <Button className="btn-cta w-full" onClick={submit}>Zapisz mnie</Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
