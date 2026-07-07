"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type Props = {
  name?: string;
  required?: boolean;
};

export function RodoCheckbox({ name = "rodo", required = true }: Props) {
  const t = useTranslations("rodo");

  return (
    <label className="flex items-start gap-3 text-xs text-muted-foreground">
      <input
        type="checkbox"
        name={name}
        required={required}
        className="mt-0.5 h-4 w-4 rounded border-input text-brand accent-brand"
      />
      <span>
        {t("text")}{" "}
        <Link href="/polityka-prywatnosci" className="font-semibold text-brand hover:underline">
          {t("privacyLink")}
        </Link>
        .
      </span>
    </label>
  );
}
