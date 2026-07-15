import type { Locale } from "@/i18n/routing";
import { services } from "@/lib/services";
import { servicesEn } from "@/lib/content/services-en";
import { faqItems, krakowFaq } from "@/lib/faq";
import { faqItemsEn, krakowFaqEn } from "@/lib/content/faq-en";
import { districts } from "@/lib/districts";
import { districtsEn } from "@/lib/content/districts-en";
import { testimonials } from "@/lib/testimonials";
import { testimonialsEn } from "@/lib/content/testimonials-en";

export function getServices(locale: Locale) {
  return locale === "en" ? servicesEn : services;
}

export function getFaqItems(locale: Locale) {
  return locale === "en" ? faqItemsEn : faqItems;
}

export function getKrakowFaq(locale: Locale) {
  return locale === "en" ? krakowFaqEn : krakowFaq;
}

export function getDistricts(locale: Locale) {
  return locale === "en" ? districtsEn : districts;
}

export function getTestimonials(locale: Locale) {
  return locale === "en" ? testimonialsEn : testimonials;
}

export function getSiteCopy(locale: Locale) {
  if (locale === "en") {
    return {
      tagline: "Professional technical handovers of apartments and houses",
      description:
        "Technical apartment handovers in Kraków. Thermal imaging camera, Polish Standards, protocol ready within 48 hours.",
      hours: [
        { day: "Monday – Friday", time: "08:00 – 18:00" },
        { day: "Saturday", time: "09:00 – 14:00" },
        { day: "Sunday", time: "phone contact" },
      ],
      regions: ["Małopolska", "Silesia", "Subcarpathia"],
    };
  }
  return {
    tagline: "Profesjonalne odbiory techniczne mieszkań i domów",
    description:
      "Odbiory techniczne mieszkań w Krakowie. Kamera termowizyjna, Polskie Normy, protokół gotowy w 48h.",
    hours: [
      { day: "Poniedziałek – Piątek", time: "08:00 – 18:00" },
      { day: "Sobota", time: "09:00 – 14:00" },
      { day: "Niedziela", time: "kontakt telefoniczny" },
    ],
    regions: ["Małopolska", "Śląsk", "Podkarpacie"],
  };
}
