"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitNetlifyForm } from "@/lib/netlify";

export function WaitlistForm({ title }: { title: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      toast.error("Podaj adres email.");
      return;
    }
    setStatus("sending");
    try {
      await submitNetlifyForm("waitlist", { title, name, email });
      setStatus("success");
      toast.success("Zapisano na listę oczekujących!");
    } catch {
      setStatus("error");
      toast.error("Ups, coś poszło nie tak. Spróbuj ponownie.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 rounded-xl bg-cta/10 px-4 py-3 text-sm font-semibold text-cta">
        <CheckCircle2 className="h-5 w-5 shrink-0" />
        Jesteś na liście! Powiadomimy Cię jako pierwszego.
      </div>
    );
  }

  return (
    <form name="waitlist" onSubmit={submit} className="space-y-3">
      <input type="hidden" name="form-name" value="waitlist" />
      <input type="hidden" name="title" value={title} />
      <p hidden><label>Nie wypełniaj: <input name="bot-field" /></label></p>
      <div>
        <Label htmlFor={`wl-name-${title}`}>Imię</Label>
        <Input
          id={`wl-name-${title}`}
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1.5"
        />
      </div>
      <div>
        <Label htmlFor={`wl-email-${title}`}>Email <span className="text-destructive">*</span></Label>
        <Input
          id={`wl-email-${title}`}
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1.5"
        />
      </div>
      <Button type="submit" variant="cta" className="w-full" disabled={status === "sending"}>
        {status === "sending" ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Wysyłanie…</>
        ) : (
          "Zapisz się na listę oczekujących"
        )}
      </Button>
    </form>
  );
}
