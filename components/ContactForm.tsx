"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitNetlifyForm } from "@/lib/netlify";
import { RodoCheckbox } from "./RodoCheckbox";
import { getPhoneDisplay } from "@/lib/contact-obfuscation";

type FormData = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

export function ContactForm() {
  const t = useTranslations("forms.contact");
  const tForms = useTranslations("forms");
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
      toast.success(t("toastSuccess"));
    } catch {
      setStatus("error");
      toast.error(t("toastError", { phone: getPhoneDisplay() }));
    }
  };

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
    <form name="contact" onSubmit={submit} className="surface-panel space-y-4 p-6 md:p-8">
      <input type="hidden" name="form-name" value="contact" />
      <p hidden>
        <label>
          {tForms("botField")} <input name="bot-field" />
        </label>
      </p>

      <div>
        <Label htmlFor="name">{t("name")}</Label>
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

      <div>
        <Label htmlFor="message">{t("message")}</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder={t("messagePlaceholder")}
          value={data.message}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => update("message", e.target.value)}
          className="mt-2 resize-none"
        />
      </div>

      <RodoCheckbox />

      <Button type="submit" variant="cta" className="w-full" disabled={status === "sending"}>
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> {t("sending")}
          </>
        ) : (
          t("submit")
        )}
      </Button>
    </form>
  );
}
