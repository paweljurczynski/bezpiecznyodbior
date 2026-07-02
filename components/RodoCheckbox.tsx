import Link from "next/link";

type Props = {
  name?: string;
  required?: boolean;
};

export function RodoCheckbox({ name = "rodo", required = true }: Props) {
  return (
    <label className="flex items-start gap-3 text-xs text-slate-600">
      <input
        type="checkbox"
        name={name}
        required={required}
        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-500 focus:ring-brand-400"
      />
      <span>
        Wyrażam zgodę na przetwarzanie moich danych osobowych przez Bezpieczny
        Odbiór w celu obsługi zapytania. Szczegóły znajdziesz w{" "}
        <Link
          href="/polityka-prywatnosci"
          className="font-semibold text-brand-600 hover:underline"
        >
          polityce prywatności
        </Link>
        .
      </span>
    </label>
  );
}
