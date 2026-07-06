"use client";

import { useState } from "react";
import { ContactForm } from "./ContactForm";
import { LeadWizard } from "./LeadWizard";

const tabs = [
  { id: "contact", label: "Napisz do nas" },
  { id: "quote", label: "Zamów wycenę odbioru" },
] as const;

type Tab = (typeof tabs)[number]["id"];

export function ContactFormTabs() {
  const [active, setActive] = useState<Tab>("contact");

  return (
    <div>
      <div className="flex gap-1 rounded-lg border border-border bg-muted p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={`flex-1 cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition-all ${
              active === tab.id
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:bg-background/60 hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {active === "contact" ? <ContactForm /> : <LeadWizard />}
      </div>
    </div>
  );
}
