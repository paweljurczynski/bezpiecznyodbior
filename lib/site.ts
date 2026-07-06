export const site = {
  name: "Bezpieczny Odbiór",
  legalName: "Bezpieczny Odbiór — Odbiory mieszkań Kraków",
  tagline: "Profesjonalne odbiory techniczne mieszkań i domów",
  description:
    "Bezpieczny Odbiór — inżynierskie odbiory techniczne mieszkań i domów w Krakowie oraz Małopolsce. Kamera termowizyjna, sprawdzenie zgodności z Polskimi Normami, protokół gotowy tego samego dnia.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bezpiecznyodbior.pl",
  phone: "+48502298030",
  phoneDisplay: "502 298 030",
  email: "kontakt@bezpiecznyodbior.pl",
  address: {
    street: "Władysława Łokietka 242G",
    postalCode: "31-334",
    city: "Kraków",
    region: "małopolskie",
    country: "PL",
  },
  hours: [
    { day: "Poniedziałek – Piątek", time: "08:00 – 18:00" },
    { day: "Sobota", time: "09:00 – 14:00" },
    { day: "Niedziela", time: "kontakt telefoniczny" },
  ],
  socials: {
    facebook: "https://www.facebook.com/bezpiecznyodbior",
    instagram: "https://www.instagram.com/bezpiecznyodbior",
    google:
      "https://www.google.com/search?q=Bezpieczny+odbi%C3%B3r+-+Odbiory+mieszka%C5%84+Krak%C3%B3w",
  },
  reviews: {
    count: 103,
    rating: 5.0,
  },
  regions: ["Małopolska", "Śląsk", "Podkarpacie"],
};

export type Site = typeof site;
