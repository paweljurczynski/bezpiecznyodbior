# Bezpieczny Odbiór — strona firmowa

Nowoczesna, w pełni responsywna strona firmy Bezpieczny Odbiór (odbiory techniczne mieszkań i domów w Krakowie i całej Małopolsce).

## Stack

- Next.js 15 (App Router)
- Tailwind CSS v4
- TypeScript
- Netlify Forms (backend formularzy)
- next/font (Inter)
- lucide-react (ikony)

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000).

## Zmienne środowiskowe

Utwórz `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://bezpiecznyodbior.pl
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Deployment (Netlify)

Repo podłączone do Netlify — buildy automatyczne z gałęzi `main`. Formularze obsługiwane przez [Netlify Forms](https://docs.netlify.com/forms/setup/) — zgłoszenia w panelu Netlify → Forms.

## Struktura

```
app/
  layout.tsx            Global metadata, JsonLd, fonts, CookieBanner
  page.tsx              Strona główna
  oferta/               Oferta i usługi
  kontakt/              Kontakt
  odbiory-mieszkan-krakow/  Lokalna landing SEO
  polityka-prywatnosci/ Polityka prywatności / RODO
components/             Reużywalne komponenty React
public/                 Statyczne assety
```
