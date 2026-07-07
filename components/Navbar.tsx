"use client";

import { useState } from "react";
import NextLink from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X, Phone } from "lucide-react";
import { ObfuscatedPhoneLink } from "@/components/ObfuscatedContact";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

const localizedLinks = [
  { href: "/oferta" as const, key: "offer" },
  { href: "/o-nas" as const, key: "about" },
  { href: "/kontakt" as const, key: "contact" },
];

const plOnlyLinks = [
  { href: "/sklep", key: "shop" },
  { href: "/blog", key: "blog" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const t = useTranslations("nav");

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="container-page flex h-16 items-center gap-4">
        <Logo size={40} onClick={() => setOpen(false)} />

        <nav className="ml-6 hidden items-center gap-1 md:flex">
          {localizedLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-foreground",
                isActive(link.href) ? "text-foreground" : "text-muted-foreground"
              )}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {t(link.key)}
            </Link>
          ))}
          {locale === "pl" &&
            plOnlyLinks.map((link) => (
              <NextLink
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-foreground",
                  isActive(link.href) ? "text-foreground" : "text-muted-foreground"
                )}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {t(link.key)}
              </NextLink>
            ))}
        </nav>

        <div className="ml-auto hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <ObfuscatedPhoneLink className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Phone className="h-4 w-4 text-cta" />
          </ObfuscatedPhoneLink>
          <Button asChild variant="cta">
            <Link href="/kontakt">{t("quote")}</Link>
          </Button>
        </div>

        <div className="ml-auto flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            className="cursor-pointer"
            onClick={() => setOpen((v) => !v)}
            aria-label={t("menu")}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border md:hidden">
          <div className="container-page flex flex-col gap-1 py-3">
            {localizedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium",
                  isActive(link.href) ? "font-semibold text-foreground" : "text-muted-foreground"
                )}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {t(link.key)}
              </Link>
            ))}
            {locale === "pl" &&
              plOnlyLinks.map((link) => (
                <NextLink
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium",
                    isActive(link.href) ? "font-semibold text-foreground" : "text-muted-foreground"
                  )}
                >
                  {t(link.key)}
                </NextLink>
              ))}
            <Button asChild variant="cta" className="mt-2">
              <Link href="/kontakt" onClick={() => setOpen(false)}>
                {t("quoteMobile")}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
