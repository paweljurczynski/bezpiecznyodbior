import type { Metadata } from "next";
import { ObfuscatedEmailLink, ObfuscatedPhoneLink } from "@/components/ObfuscatedContact";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description:
    "Polityka prywatności serwisu Bezpieczny Odbiór — zasady przetwarzania danych osobowych, cookies i praw użytkowników zgodnie z RODO.",
  alternates: { canonical: "/polityka-prywatnosci" },
  robots: { index: true, follow: true },
};

export default function PolitykaPrywatnosciPage() {
  return (
    <section className="container-page py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <p className="section-eyebrow">Dokument prawny</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Polityka prywatności
        </h1>
        <p className="mt-4 text-sm text-slate-500">
          Data ostatniej aktualizacji: {new Date().toLocaleDateString("pl-PL")}
        </p>

        <div className="prose prose-slate mt-10 max-w-none space-y-8 text-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">1. Administrator danych</h2>
            <p className="mt-3">
              Administratorem Państwa danych osobowych jest firma{" "}
              <strong>{site.legalName}</strong> z siedzibą przy ul.{" "}
              {site.address.street}, {site.address.postalCode} {site.address.city}. Kontakt w sprawach ochrony danych: {" "}
              <ObfuscatedEmailLink className="font-semibold text-brand-600 hover:underline" />
              .
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              2. Cele i podstawy przetwarzania
            </h2>
            <p className="mt-3">Państwa dane osobowe przetwarzamy w następujących celach:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                obsługa zapytań ofertowych i przygotowanie wyceny (art. 6 ust. 1 lit. b RODO — czynności zmierzające do zawarcia umowy);
              </li>
              <li>
                realizacja umów o odbiór techniczny i pokrewne usługi (art. 6 ust. 1 lit. b RODO);
              </li>
              <li>
                dochodzenie ewentualnych roszczeń (art. 6 ust. 1 lit. f RODO);
              </li>
              <li>
                analiza ruchu na stronie za pomocą Google Analytics (art. 6 ust. 1 lit. a RODO — wyłącznie po Państwa zgodzie).
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">3. Odbiorcy danych</h2>
            <p className="mt-3">
              Państwa dane mogą być przekazywane naszym zaufanym podwykonawcom: dostawcom hostingu (Netlify), narzędzi analitycznych (Google Analytics — po zgodzie), obsługi księgowej oraz prawnej. Wszyscy odbiorcy zobowiązani są do zachowania poufności i ochrony danych zgodnie z RODO.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              4. Okres przechowywania
            </h2>
            <p className="mt-3">
              Dane kontaktowe przechowujemy przez okres niezbędny do udzielenia odpowiedzi (do 12 miesięcy), a w przypadku zawarcia umowy — przez okres jej realizacji oraz 5 lat od zakończenia (obowiązki księgowe i podatkowe).
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">5. Państwa prawa</h2>
            <p className="mt-3">Zgodnie z RODO przysługuje Państwu prawo do:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>dostępu do treści danych oraz otrzymania ich kopii;</li>
              <li>sprostowania, usunięcia lub ograniczenia przetwarzania;</li>
              <li>przenoszenia danych;</li>
              <li>wniesienia sprzeciwu wobec przetwarzania;</li>
              <li>cofnięcia zgody w dowolnym momencie (nie wpływa na zgodność z prawem przetwarzania dokonanego przed cofnięciem);</li>
              <li>wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">6. Pliki cookies</h2>
            <p className="mt-3">
              Serwis wykorzystuje pliki cookies niezbędne do prawidłowego działania oraz — po Państwa zgodzie — cookies analityczne Google Analytics (z anonimizacją IP). Zgodę można w każdej chwili wycofać, czyszcząc dane przeglądarki.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              7. Przekazywanie danych do państw trzecich
            </h2>
            <p className="mt-3">
              W związku z korzystaniem z Google Analytics dane mogą być przekazywane poza EOG na podstawie standardowych klauzul umownych zatwierdzonych przez Komisję Europejską.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              8. Zautomatyzowane podejmowanie decyzji
            </h2>
            <p className="mt-3">
              Nie stosujemy zautomatyzowanego podejmowania decyzji ani profilowania w rozumieniu art. 22 RODO.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">9. Kontakt</h2>
            <p className="mt-3">
              W sprawach związanych z ochroną danych osobowych prosimy o kontakt pod adresem{" "}
              <ObfuscatedEmailLink className="font-semibold text-brand-600 hover:underline" />{" "}
              lub telefonicznie:{" "}
              <ObfuscatedPhoneLink className="font-semibold text-brand-600 hover:underline" />
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
