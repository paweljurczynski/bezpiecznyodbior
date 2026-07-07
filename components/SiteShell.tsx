import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { Toaster } from "@/components/ui/sonner";
import { JsonLd, localBusinessSchema, organizationSchema } from "@/components/JsonLd";
import { SetHtmlLang } from "@/components/SetHtmlLang";
import type { Locale } from "@/i18n/routing";

type Props = {
  locale: Locale;
  children: React.ReactNode;
};

export async function SiteShell({ locale, children }: Props) {
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SetHtmlLang locale={locale} />
      <JsonLd data={[localBusinessSchema(locale), organizationSchema(locale)]} />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <CookieBanner />
      <Toaster />
    </NextIntlClientProvider>
  );
}
