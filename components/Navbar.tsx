"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { navLinks } from "@/lib/nav";
import { site } from "@/lib/site";
import { Logo } from "./Logo";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Logo size={40} onClick={() => setOpen(false)} />

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`tel:${site.phone}`}
            className="flex items-center gap-2 text-sm font-semibold text-slate-900"
          >
            <Phone className="h-4 w-4 text-brand-500" />
            {site.phoneDisplay}
          </a>
          <Link href="/#wycena" className="btn-primary py-2 text-sm">
            Bezpłatna wycena
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden rounded-lg p-2 text-slate-700 hover:bg-slate-100"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white md:hidden">
          <nav className="container-page flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-100"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${site.phone}`}
              className="mt-2 flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-3 text-base font-semibold text-slate-900"
            >
              <Phone className="h-5 w-5 text-brand-500" />
              {site.phoneDisplay}
            </a>
            <Link
              href="/#wycena"
              className="btn-primary mt-2"
              onClick={() => setOpen(false)}
            >
              Bezpłatna wycena
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
