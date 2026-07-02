export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  bullets: string[];
  premium?: boolean;
  badge?: string;
  icon: "home" | "key" | "thermal" | "compass" | "shield" | "ruler" | "leaf";
};

export const services: Service[] = [
  {
    slug: "odbior-od-dewelopera",
    title: "Odbiór nieruchomości od dewelopera",
    short: "Rynek pierwotny — mieszkania i domy prosto od dewelopera.",
    description:
      "Kompleksowa inspekcja techniczna mieszkania lub domu przed podpisaniem protokołu zdawczo-odbiorczego. Sprawdzamy zgodność z Polskimi Normami, umową deweloperską i projektem architektonicznym.",
    bullets: [
      "Pomiar geometrii i powierzchni użytkowej wg PN-ISO 9836",
      "Kontrola instalacji: elektryka, hydraulika, wentylacja",
      "Badanie wilgotności tynków, wylewek i posadzek",
      "Termowizja — wykrywanie mostków termicznych",
      "Protokół usterek zgodny z ustawą deweloperską",
    ],
    icon: "key",
  },
  {
    slug: "odbior-rynek-wtorny",
    title: "Odbiór nieruchomości z rynku wtórnego",
    short: "Kupujesz używane mieszkanie lub dom? Sprawdzimy jego stan techniczny.",
    description:
      "Niezależna ocena stanu technicznego przed zakupem lub najmem. Wskazujemy realne koszty remontu i punkty negocjacyjne z sprzedającym.",
    bullets: [
      "Ocena stanu instalacji i konstrukcji",
      "Wykrywanie ukrytych wad (wilgoć, pęknięcia, korozja)",
      "Termowizja — audyt izolacji i strat ciepła",
      "Wycena szacunkowa kosztów remontu",
      "Raport w formacie PDF w 24 godziny",
    ],
    icon: "home",
  },
  {
    slug: "badania-termowizyjne",
    title: "Badania termowizyjne",
    short: "Kamera termowizyjna FLIR — wykrywanie strat ciepła i wilgoci.",
    description:
      "Profesjonalne badania termowizyjne wykrywają mostki termiczne, nieszczelności izolacji, przecieki w instalacjach ogrzewania podłogowego oraz miejsca zawilgocone niewidoczne gołym okiem.",
    bullets: [
      "Certyfikowana kamera FLIR (rozdzielczość 640×480)",
      "Wykrywanie mostków termicznych i nieszczelności okien",
      "Diagnostyka ogrzewania podłogowego",
      "Wykrywanie zawilgoceń i wycieków",
      "Raport z termogramami i zaleceniami",
    ],
    icon: "thermal",
  },
  {
    slug: "doradztwo-inwestycyjne",
    title: "Doradztwo inwestycyjne i nadzór wykończeń",
    short: "Wsparcie inżyniera na etapie remontu i wykończenia „pod klucz”.",
    description:
      "Nadzór nad ekipami wykończeniowymi, kontrola jakości prac, doradztwo materiałowe oraz technologiczne. Chronimy Twój budżet i harmonogram.",
    bullets: [
      "Weryfikacja kosztorysów i harmonogramu",
      "Cotygodniowa kontrola postępu prac",
      "Odbiory etapowe (instalacje, tynki, wylewki, wykończenie)",
      "Doradztwo materiałowe i technologiczne",
      "Reprezentacja klienta w kontakcie z wykonawcami",
    ],
    icon: "compass",
  },
  {
    slug: "pakiet-premium-prawnik",
    title: "Pakiet Premium: Prawnik + Odbiór techniczny",
    short: "Sprawdzenie umowy deweloperskiej przez prawnika + odbiór techniczny w jednym pakiecie.",
    description:
      "Kompleksowa ochrona inwestora — analiza umowy deweloperskiej przez radcę prawnego specjalizującego się w prawie budowlanym oraz pełny odbiór techniczny nieruchomości.",
    bullets: [
      "Analiza umowy deweloperskiej przez radcę prawnego",
      "Wskazanie klauzul niedozwolonych i ryzyk",
      "Pełny odbiór techniczny mieszkania lub domu",
      "Wsparcie prawne przy negocjacjach z deweloperem",
      "Pomoc przy protokole i późniejszych reklamacjach",
    ],
    premium: true,
    badge: "Nowość",
    icon: "shield",
  },
  {
    slug: "inwentaryzacje-architektoniczne",
    title: "Inwentaryzacje architektoniczne",
    short: "Profesjonalne pomiary powykonawcze i rysunki techniczne CAD.",
    description:
      "Wykonujemy dokładne inwentaryzacje architektoniczno-budowlane niezbędne przy remontach, adaptacjach, zmianach funkcji lokali oraz projektach wnętrz.",
    bullets: [
      "Pomiar dalmierzem laserowym z dokładnością ±2 mm",
      "Rysunki CAD (rzuty, przekroje, elewacje)",
      "Skanowanie 3D dla obiektów zabytkowych (opcja)",
      "Dokumentacja gotowa do złożenia w urzędzie",
      "Format DWG, DXF lub PDF",
    ],
    premium: true,
    badge: "Nowość",
    icon: "ruler",
  },
  {
    slug: "audyty-swiadectwa-energetyczne",
    title: "Audyty i świadectwa energetyczne",
    short: "Świadectwo charakterystyki energetycznej — wymagane przy sprzedaży i najmie.",
    description:
      "Sporządzamy świadectwa charakterystyki energetycznej oraz kompleksowe audyty energetyczne, w tym doradztwo w zakresie termomodernizacji i programu „Czyste Powietrze”.",
    bullets: [
      "Świadectwo energetyczne (mieszkania, domy, lokale)",
      "Audyt energetyczny pod termomodernizację",
      "Doradztwo pod program Czyste Powietrze",
      "Analiza źródła ciepła i izolacji",
      "Rejestracja w Centralnym Rejestrze Świadectw Energetycznych",
    ],
    premium: true,
    badge: "Nowość",
    icon: "leaf",
  },
];
