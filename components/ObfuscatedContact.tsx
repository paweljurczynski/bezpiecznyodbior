"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Mail, Phone } from "lucide-react";
import { getEmail, getPhone, getPhoneDisplay } from "@/lib/contact-obfuscation";
import { cn } from "@/lib/utils";

function useContactInfo() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return ready
    ? { phone: getPhone(), phoneDisplay: getPhoneDisplay(), email: getEmail() }
    : null;
}

type ObfuscatedPhoneLinkProps = {
  className?: string;
  children?: ReactNode;
};

export function ObfuscatedPhoneLink({ className, children }: ObfuscatedPhoneLinkProps) {
  const contact = useContactInfo();

  if (!contact) {
    return (
      <span className={className} aria-label="Numer telefonu">
        {children}
        502 ··· ···
      </span>
    );
  }

  return (
    <a href={`tel:${contact.phone}`} className={className}>
      {children}
      {contact.phoneDisplay}
    </a>
  );
}

type ObfuscatedEmailLinkProps = {
  className?: string;
  children?: ReactNode;
};

export function ObfuscatedEmailLink({ className, children }: ObfuscatedEmailLinkProps) {
  const contact = useContactInfo();

  if (!contact) {
    return (
      <span className={className} aria-label="Adres email">
        {children ?? "kontakt [at] bezpiecznyodbior.pl"}
      </span>
    );
  }

  return (
    <a href={`mailto:${contact.email}`} className={className}>
      {children ?? contact.email}
    </a>
  );
}

export function ContactPhoneCard({ className }: { className?: string }) {
  const contact = useContactInfo();

  return (
    <a
      href={contact ? `tel:${contact.phone}` : undefined}
      className={cn(
        "surface-panel flex items-center gap-4 bg-card p-5 transition-colors hover:border-brand",
        !contact && "pointer-events-none",
        className
      )}
    >
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-cta/15 text-cta">
        <Phone className="h-6 w-6" />
      </div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Telefon</div>
        <div className="text-lg font-bold">{contact?.phoneDisplay ?? "502 ··· ···"}</div>
      </div>
    </a>
  );
}

export function ContactEmailCard({ className }: { className?: string }) {
  const contact = useContactInfo();

  return (
    <a
      href={contact ? `mailto:${contact.email}` : undefined}
      className={cn(
        "surface-panel flex items-center gap-4 bg-card p-5 transition-colors hover:border-brand",
        !contact && "pointer-events-none",
        className
      )}
    >
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-cta/15 text-cta">
        <Mail className="h-6 w-6" />
      </div>
      <div className="min-w-0">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</div>
        <div className="truncate text-lg font-bold">
          {contact?.email ?? "kontakt [at] bezpiecznyodbior.pl"}
        </div>
      </div>
    </a>
  );
}
