import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/lib/faq";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
      {items.map((item, index) => (
        <details key={item.question} open={index === 0} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-6 py-5 text-left">
            <span className="text-base font-semibold">{item.question}</span>
            <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition group-open:rotate-180" />
          </summary>
          <div className="px-6 pb-5 text-sm text-muted-foreground">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
