export type Testimonial = {
  author: string;
  rating: number;
  date: string;
  text: string;
  highlight: string;
};

export const testimonials: Testimonial[] = [
  {
    author: "Konrad Gawryał",
    rating: 5,
    date: "2 miesiące temu",
    highlight: "Powoływanie się na Polskie Normy",
    text: "Odbiór mieszkania przeprowadzony skrupulatnie, a przy tym w bardzo przyjaznej atmosferze. Pan Tomasz wszystko dokładnie wyjaśnia oraz chętnie odpowiada na pytania. Na próby zbagatelizowania pojedynczych usterek przez dewelopera ze spokojem powoływał się na konkretne zapisy w normach, dzięki czemu wszystkie zostały wpisane do protokołu. Zdecydowanie polecam!",
  },
  {
    author: "A. S.",
    rating: 5,
    date: "2 miesiące temu",
    highlight: "Kamera termowizyjna wykryła wilgoć",
    text: "Audyt został przeprowadzony z dużą dokładnością. Audytor wykazał usterki, których sami nie byliśmy w stanie zauważyć (np. wilgoć w ścianie przy prawidłowej wilgotności na powierzchni). Bardzo pomocne było użycie kamery termowizyjnej. Wszystkie zlokalizowane usterki zostały zatwierdzone i naprawione przez dewelopera.",
  },
  {
    author: "Karol Dziedzic",
    rating: 5,
    date: "5 miesięcy temu",
    highlight: "Mostki termiczne i doświadczenie",
    text: "Odbiór mieszkania przeprowadzony w pełni profesjonalnie, z dużą dokładnością i spokojnym podejściem. Ogromnym plusem były badania kamerką termowizyjną — dzięki nim można było wyraźnie zobaczyć mostki termiczne, niedoschnięte poprawki tynkarskie oraz przebieg instalacji pod-posadzkowych. Widać było duże doświadczenie i zaangażowanie, bez pośpiechu.",
  },
  {
    author: "Kamienna",
    rating: 5,
    date: "4 miesiące temu",
    highlight: "Koszt zwrócił się z nawiązką",
    text: "Bardzo polecamy współpracę! Chłopaki bardzo profesjonalnie i skrupulatnie podchodzą do tematu. Raport przygotowany we wzorowy sposób, pomoc na każdym kroku, a deweloper poinformowany o wszystkich niedociągnięciach w sposób kulturalny i stanowczy. Koszt usługi zwrócił się z nawiązką — sporą część usterek deweloper usunął, a my dostaliśmy dodatkowy rabat na nieruchomość.",
  },
  {
    author: "Krzysztof Gruszka",
    rating: 5,
    date: "6 miesięcy temu",
    highlight: "Raport w ten sam dzień",
    text: "Bardzo profesjonalna usługa. Punktualnie, sprawnie i dokładnie. Panowie niemal pedantycznie sprawdzili wszystko, co można było sprawdzić. Raport otrzymałem w ten sam dzień. Dobrze wydane pieniądze. Szczerze polecam.",
  },
  {
    author: "Dariusz Jackowski",
    rating: 5,
    date: "rok temu",
    highlight: "Ukryte zawilgocenia i wymuszone osuszanie",
    text: "Skorzystałem z usługi odbioru mieszkania w Krakowie, podczas której firma wykryła niewidoczne gołym okiem zawilgocenia w lokalu, zmuszając dewelopera do przeprowadzenia osuszania. Dodatkowo znaleźli inne usterki, które musiały zostać usunięte na koszt dewelopera. Polecam!",
  },
];
