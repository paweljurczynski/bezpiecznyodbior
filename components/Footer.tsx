import { Facebook, Instagram, Mail, Phone, MapPin, Star } from "lucide-react";
import { getTranslations, getLocale } from "next-intl/server";
import { ObfuscatedEmailLink, ObfuscatedPhoneLink } from "@/components/ObfuscatedContact";
import { site } from "@/lib/site";
import { getServices, getSiteCopy } from "@/lib/content";
import { Logo } from "@/components/Logo";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export async function Footer() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const copy = getSiteCopy(locale);
  const services = getServices(locale);

  const navLinks = [
    { href: "/oferta" as const, label: tNav("offer") },
    { href: "/o-nas" as const, label: tNav("about") },
    { href: "/kontakt" as const, label: tNav("contact") },
  ];

  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div>
          <Logo size={44} href={null} />
          <p className="mt-4 text-sm text-muted-foreground">{t("tagline")}</p>
          <div className="mt-4 flex items-center gap-1 text-[#FBBC05]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-current" />
            ))}
            <span className="ml-1 text-xs font-semibold text-foreground">
              {t("reviews", {
                rating: site.reviews.rating.toFixed(1),
                count: site.reviews.count,
              })}
            </span>
          </div>
          <div className="mt-5 flex gap-2">
            <a
              href={site.socials.facebook}
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background transition-colors hover:bg-brand hover:text-brand-foreground"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background transition-colors hover:bg-brand hover:text-brand-foreground"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground">{t("navigation")}</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-brand">
                  {link.label}
                </Link>
              </li>
            ))}
            {locale === "pl" && (
              <>
                <li>
                  <Link href="/sklep" className="hover:text-brand">
                    {tNav("shop")}
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-brand">
                    {tNav("blog")}
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link href="/odbiory-mieszkan-krakow" className="hover:text-brand">
                {tNav("krakowLanding")}
              </Link>
            </li>
            <li>
              <Link href="/polityka-prywatnosci" className="hover:text-brand">
                {t("privacy")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground">{t("services")}</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {services.slice(0, 6).map((service) => (
              <li key={service.slug}>
                <Link href={{ pathname: "/oferta/[slug]", params: { slug: service.slug } }} className="hover:text-brand">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground">{t("contact")}</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-cta" />
              <ObfuscatedPhoneLink className="hover:text-brand" />
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-cta" />
              <ObfuscatedEmailLink className="hover:text-brand" />
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cta" />
              <span>
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.city}
              </span>
            </li>
          </ul>
          <div className="mt-5">
            <h5 className="text-xs font-semibold text-foreground">{t("workingHours")}</h5>
            <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
              {copy.hours.map((h) => (
                <li key={h.day}>
                  {h.day}: {h.time}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted-foreground md:flex-row">
          <p>{t("copyright", { year: new Date().getFullYear(), legalName: site.legalName })}</p>
          <p>{t("taglineShort")}</p>
        </div>
      </div>
    </footer>
  );
}
