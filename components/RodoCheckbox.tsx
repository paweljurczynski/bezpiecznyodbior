import Link from "next/link";

type Props = {
  name?: string;
  required?: boolean;
};

export function RodoCheckbox({ name = "rodo", required = true }: Props) {
  return (
    <label className="flex items-start gap-3 text-xs text-muted-foreground">
      <input
        type="checkbox"
        name={name}
        required={required}
        className="mt-0.5 h-4 w-4 rounded border-input text-brand accent-brand"
      />
      <span>
        Wyrażam zgodę na przetwarzanie moich danych osobowych przez Bezpieczny Odbiór w celu obsługi zapytania. Szczegóły w{" "}
        <Link href="/polityka-prywatnosci" className="font-semibold text-brand hover:underline">
          polityce prywatności
        </Link>
        .
      </span>
    </label>
  );
}
