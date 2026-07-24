export const COOKIE_CONSENT_KEY = "bo-cookie-consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackClickToCall(location: string) {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(COOKIE_CONSENT_KEY) !== "accepted") return;
  if (!process.env.NEXT_PUBLIC_GA_ID) return;
  window.gtag?.("event", "click_to_call", { location });
}
