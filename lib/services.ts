export type ChecklistItem = {
  title: string;
  description: string;
};

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  bullets: string[];
  checklist: ChecklistItem[];
  tools: string[];
  image: string;
  imageAlt: string;
  tag: string;
  price: string;
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
    checklist: [
      { title: "Tynki", description: "Standard wykonania, płaszczyzny i kąty oraz wilgotność" },
      { title: "Posadzki", description: "Standard wykonania, płaszczyzny i kąty oraz wilgotność" },
      { title: "Stolarka okienna", description: "Poprawność montażu, uszkodzenia mechaniczne, stan oszklenia" },
      { title: "Stolarka drzwiowa", description: "Poprawność montażu, uszkodzenia mechaniczne, zgodność ze standardem" },
      { title: "Wymiary lokalu", description: "Zgodność z projektem wg PN-ISO 9836" },
      { title: "Parapety zewnętrzne i wewnętrzne", description: "Poprawność montażu, uszkodzenia mechaniczne, przedmuchy" },
      { title: "Instalacje elektryczne, wod-kan, ogrzewanie, wentylacja", description: "Zgodność z projektem, obecność prądu w punktach elektrycznych" },
      { title: "Balkon, taras, ogródek", description: "Jakość wykonania, balustrady i ogrodzenie, zgodność ze standardem" },
      { title: "Miejsce postojowe", description: "Zgodność z normą, jakość wykonania" },
      { title: "Komórka lokatorska", description: "Jakość wykonania, zamknięcie i zabezpieczenia" },
      { title: "Części wspólne graniczące z mieszkaniem", description: "Jakość wykonania klatki schodowej, korytarzy i wind" },
    ],
    tools: [
      "Kamera termowizyjna FLIR (rozdzielczość 640×480)",
      "Laser krzyżowy — wykrywanie odchyłek ścian i wylewek",
      "Wilgotnościomierz cyfrowy",
      "Dalmierz laserowy do pomiaru powierzchni",
      "Anemometr do kontroli wentylacji",
    ],
    image: "/oferta-deweloper-mieszkanie.jpg",
    imageAlt: "Pomiar wilgotności podczas odbioru technicznego mieszkania",
    tag: "Rynek pierwotny",
    price: "od 299 zł",
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
    checklist: [
      { title: "Stan konstrukcji", description: "Pęknięcia, ugięcia, uszkodzenia stropów i ścian nośnych" },
      { title: "Instalacja elektryczna", description: "Wiek instalacji, bezpieczniki, uziemienie, stan kabli" },
      { title: "Instalacja wod-kan", description: "Szczelność rur, stan pionów, ciśnienie wody, odpływy" },
      { title: "Ogrzewanie i wentylacja", description: "Sprawność pieca, grzejników, drożność kanałów wentylacyjnych" },
      { title: "Wilgoć i zawilgocenia", description: "Wykrywanie zawilgoceń ukrytych w ścianach, sufitach i podłogach" },
      { title: "Izolacja termiczna", description: "Mostki termiczne, nieszczelności okien i drzwi" },
      { title: "Dach i elewacja", description: "Stan pokrycia dachowego, rynien, obróbek blacharskich i elewacji" },
      { title: "Stolarka okienna i drzwiowa", description: "Uszkodzenia, przedmuchy, stan uszczelnień i okuć" },
      { title: "Podłogi i sufity", description: "Ugięcia, zarysowania, odstawanie warstw wykończeniowych" },
      { title: "Piwnica i garaż", description: "Zawilgocenia, stan posadzki i ścian, wentylacja" },
    ],
    tools: [
      "Kamera termowizyjna FLIR",
      "Wilgotnościomierz cyfrowy",
      "Laser krzyżowy",
      "Kamera inspekcyjna do rur i trudno dostępnych miejsc",
      "Dalmierz laserowy",
    ],
    image: "/oferta-deweloper-protokol.jpg",
    imageAlt: "Protokół odbioru technicznego nieruchomości",
    tag: "Rynek wtórny",
    price: "od 399 zł",
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
    checklist: [
      { title: "Mostki termiczne", description: "Wykrywanie miejsc ucieczki ciepła przez przegrody budowlane" },
      { title: "Nieszczelności okien i drzwi", description: "Lokalizacja przeciągów i nieszczelnych uszczelnień" },
      { title: "Izolacja ścian zewnętrznych", description: "Ocena skuteczności docieplenia i jakości jego wykonania" },
      { title: "Ogrzewanie podłogowe", description: "Diagnostyka układu rur — pęknięcia, zatory, nierównomierne grzanie" },
      { title: "Zawilgocenia i wycieki", description: "Lokalizacja aktywnych i historycznych zawilgoceń w przegrodach" },
      { title: "Instalacje ukryte", description: "Przebieg rur i przewodów elektrycznych w ścianach" },
      { title: "Dach i strop", description: "Straty ciepła przez połać dachową i strop ostatniej kondygnacji" },
    ],
    tools: [
      "Kamera termowizyjna FLIR E86 (rozdzielczość 640×480 IR)",
      "Oprogramowanie FLIR Tools do analizy termogramów",
      "Higrometr i termometr do kalibracji warunków pomiaru",
    ],
    image: "/oferta-termowizja.jpg",
    imageAlt: "Badanie termowizyjne kamerą FLIR",
    tag: "Kamera termowizyjna",
    price: "od 249 zł",
    icon: "thermal",
  },
  {
    slug: "doradztwo-inwestycyjne",
    title: "Doradztwo inwestycyjne i nadzór wykończeń",
    short: 'Wsparcie inżyniera na etapie remontu i wykończenia "pod klucz".',
    description:
      "Nadzór nad ekipami wykończeniowymi, kontrola jakości prac, doradztwo materiałowe oraz technologiczne. Chronimy Twój budżet i harmonogram.",
    bullets: [
      "Weryfikacja kosztorysów i harmonogramu",
      "Cotygodniowa kontrola postępu prac",
      "Odbiory etapowe (instalacje, tynki, wylewki, wykończenie)",
      "Doradztwo materiałowe i technologiczne",
      "Reprezentacja klienta w kontakcie z wykonawcami",
    ],
    checklist: [
      { title: "Weryfikacja kosztorysu", description: "Ocena rzetelności wycen i zgodności z cenami rynkowymi" },
      { title: "Harmonogram prac", description: "Analiza realności terminów i sekwencji robót" },
      { title: "Odbiór instalacji", description: "Kontrola elektryki, hydrauliki i wentylacji przed zamurowaniem" },
      { title: "Odbiór tynków i wylewek", description: "Płaszczyzny, kąty, wilgotność przed dalszymi pracami" },
      { title: "Kontrola wykończenia", description: "Jakość płytek, podłóg, malowania i stolarki" },
      { title: "Doradztwo materiałowe", description: "Dobór materiałów do wymagań technicznych i budżetu" },
      { title: "Rozliczenie końcowe", description: "Weryfikacja faktur i odbiór końcowy z ekipą wykonawczą" },
    ],
    tools: [
      "Laser krzyżowy do kontroli poziomów i pionów",
      "Wilgotnościomierz cyfrowy",
      "Dalmierz laserowy",
      "Kamera termowizyjna (opcjonalnie)",
    ],
    image: "/oferta-doradztwo.jpg",
    imageAlt: "Dwoje ludzi analizujących rzuty architektoniczne",
    tag: "Doradztwo",
    price: "od 199 zł / wizyta",
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
    checklist: [
      { title: "Analiza umowy deweloperskiej", description: "Ocena zapisów pod kątem klauzul niedozwolonych i ryzyk" },
      { title: "Prospekt informacyjny", description: "Weryfikacja zgodności prospektu z faktycznym stanem inwestycji" },
      { title: "Kary umowne i terminy", description: "Ocena realności terminów i proporcjonalności kar" },
      { title: "Zapisy dotyczące zmian", description: "Analiza klauzul umożliwiających deweloperowi zmiany w projekcie" },
      { title: "Rekomendacje negocjacyjne", description: "Konkretne zapisy do usunięcia lub zmiany przed podpisaniem" },
      { title: "Pełny odbiór techniczny", description: "Wszystkie punkty odbioru od dewelopera — tynki, posadzki, instalacje itd." },
      { title: "Jednolity raport prawno-inżynierski", description: "Jeden dokument łączący wnioski prawne i techniczne" },
    ],
    tools: [
      "Kamera termowizyjna FLIR",
      "Laser krzyżowy",
      "Wilgotnościomierz cyfrowy",
      "Analiza prawna przez radcę prawnego",
    ],
    image: "/oferta-deweloper-mieszkanie.jpg",
    imageAlt: "Pakiet Premium — analiza prawna i odbiór techniczny",
    tag: "Premium",
    price: "od 899 zł",
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
    checklist: [
      { title: "Pomiary gabarytowe", description: "Długości, szerokości, wysokości pomieszczeń z dokładnością ±2 mm" },
      { title: "Rzuty kondygnacji", description: "Dokładne rzuty z uwzględnieniem wnęk, słupów i przegród" },
      { title: "Przekroje i elewacje", description: "Rysunki przekrojowe i widoki elewacyjne budynku" },
      { title: "Inwentaryzacja otworów", description: "Lokalizacja i wymiary okien, drzwi i otworów technologicznych" },
      { title: "Instalacje widoczne", description: "Naniesienie trasy instalacji widocznych na rzutach" },
      { title: "Dokumentacja fotograficzna", description: "Zdjęcia każdego pomieszczenia jako uzupełnienie rysunków" },
      { title: "Eksport do wymaganych formatów", description: "Pliki DWG, DXF lub PDF gotowe do dalszego projektowania" },
    ],
    tools: [
      "Dalmierz laserowy Leica z dokładnością ±1 mm",
      "Laser krzyżowy do trasowania",
      "Skaner 3D (opcjonalnie dla obiektów zabytkowych)",
      "Oprogramowanie CAD (AutoCAD / ArchiCAD)",
    ],
    image: "/oferta-doradztwo.jpg",
    imageAlt: "Pomiary architektoniczne i dokumentacja techniczna",
    tag: "Premium",
    price: "od 499 zł",
    premium: true,
    badge: "Nowość",
    icon: "ruler",
  },
  {
    slug: "audyty-swiadectwa-energetyczne",
    title: "Audyty i świadectwa energetyczne",
    short: "Świadectwo charakterystyki energetycznej — wymagane przy sprzedaży i najmie.",
    description:
      'Sporządzamy świadectwa charakterystyki energetycznej oraz kompleksowe audyty energetyczne, w tym doradztwo w zakresie termomodernizacji i programu "Czyste Powietrze".',
    bullets: [
      "Świadectwo energetyczne (mieszkania, domy, lokale)",
      "Audyt energetyczny pod termomodernizację",
      "Doradztwo pod program Czyste Powietrze",
      "Analiza źródła ciepła i izolacji",
      "Rejestracja w Centralnym Rejestrze Świadectw Energetycznych",
    ],
    checklist: [
      { title: "Ocena przegród budowlanych", description: "Analiza współczynników przenikania ciepła ścian, dachów i podłóg" },
      { title: "Stolarka okienna i drzwiowa", description: "Klasa energetyczna okien i drzwi, mostki termiczne w ościeżnicach" },
      { title: "System ogrzewania", description: "Rodzaj, wiek i sprawność źródła ciepła oraz instalacji grzewczej" },
      { title: "Przygotowanie ciepłej wody", description: "Sprawność podgrzewacza i izolacja instalacji c.w.u." },
      { title: "Wentylacja i klimatyzacja", description: "Typ wentylacji i jej wpływ na bilans energetyczny" },
      { title: "Źródła odnawialne", description: "Obecność fotowoltaiki, kolektorów słonecznych lub pomp ciepła" },
      { title: "Obliczenie wskaźnika EP", description: "Wyznaczenie zapotrzebowania na energię pierwotną budynku" },
    ],
    tools: [
      "Oprogramowanie certyfikacyjne ArCADia-TERMO",
      "Kamera termowizyjna (opcjonalnie — audyt rozszerzony)",
      "Dalmierz laserowy do pomiarów kubaturowych",
    ],
    image: "/oferta-termowizja.jpg",
    imageAlt: "Audyt energetyczny i świadectwo charakterystyki energetycznej",
    tag: "Premium",
    price: "od 299 zł",
    premium: true,
    badge: "Nowość",
    icon: "leaf",
  },
];
