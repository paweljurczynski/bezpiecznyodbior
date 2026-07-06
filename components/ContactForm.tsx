"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitNetlifyForm } from "@/lib/netlify";
import { RodoCheckbox } from "./RodoCheckbox";
import { site } from "@/lib/site";

type FormData = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [data, setData] = useState<FormData>({ name: "", phone: "", email: "", message: "" });

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await submitNetlifyForm(e.currentTarget);
      setStatus("success");
      toast.success("Dziękujemy! Odezwiemy się wkrótce.");
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
        <h3 className="mt-4 text-2xl font-bold">Wiadomość wysłana</h3>
        <p className="mt-2 text-muted-foreground">
          Odezwiemy się najszybciej jak to możliwe.
        </p>
      </div>
    );
  }

  return (
    <form name="contact" onSubmit={submit} className="surface-panel space-y-4 p-6 md:p-8">
      <input type="hidden" name="form-name" value="contact" />
      <p hidden>
        <label>Nie wypełniaj: <input name="bot-field" /></label>
      </p>

      <div>
        <Label htmlFor="name">Imię i nazwisko</Label>
        <Input
          id="name"
          name="name"
          required
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

      <div>
        <Label htmlFor="message">Wiadomość</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Opisz czego potrzebujesz…"
          value={data.message}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => update("message", e.target.value)}
          className="mt-2 resize-none"
        />
      </div>

      <RodoCheckbox />

      <Button type="submit" variant="cta" className="w-full" disabled={status === "sending"}>
        {status === "sending" ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Wysyłanie…</>
        ) : (
          "Wyślij wiadomość"
        )}
      </Button>
    </form>
  );
}
