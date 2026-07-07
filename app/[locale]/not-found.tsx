import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default async function NotFound() {
  const locale = await getLocale();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });

  const message = locale === "en" ? "Page not found" : "Nie znaleziono strony";

  return (
    <section className="container-page flex min-h-[50vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-6xl font-extrabold text-brand">404</p>
      <h1 className="mt-4 text-2xl font-bold text-foreground">{message}</h1>
      <Button asChild size="lg" variant="cta" className="mt-8">
        <Link href="/">{t("home")}</Link>
      </Button>
    </section>
  );
}
