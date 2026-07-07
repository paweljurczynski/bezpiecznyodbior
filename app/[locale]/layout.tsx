import { notFound } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import { routing } from "@/i18n/routing";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "pl" | "en")) notFound();

  return <SiteShell locale={locale as "pl" | "en"}>{children}</SiteShell>;
}
