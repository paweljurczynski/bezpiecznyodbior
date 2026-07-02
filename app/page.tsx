import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { WizardSection } from "@/components/WizardSection";
import { Testimonials } from "@/components/Testimonials";
import { NewsBanner } from "@/components/NewsBanner";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.tagline} | Kraków, Małopolska`,
  description:
    "Bezpieczny Odbiór — profesjonalne odbiory techniczne mieszkań i domów w Krakowie. Kamera termowizyjna, znajomość Polskich Norm, ponad 100 opinii 5★ na Google. Bezpłatna wycena w 60 minut.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Testimonials />
      <NewsBanner />
      <WizardSection />
    </>
  );
}
