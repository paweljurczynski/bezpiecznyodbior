export const COOKIE_CONSENT_KEY = "bo-cookie-consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const consentFields = [
  "ad_storage",
  "ad_user_data",
  "ad_personalization",
  "analytics_storage",
  "functionality_storage",
  "personalization_storage",
] as const;

type ConsentState = "granted" | "denied";

function buildConsentUpdate(granted: boolean): Record<(typeof consentFields)[number], ConsentState> {
  const state: ConsentState = granted ? "granted" : "denied";
  return Object.fromEntries(consentFields.map((key) => [key, state])) as Record<
    (typeof consentFields)[number],
    ConsentState
  >;
}

export function getConsentDefaultScript() {
  const granted = consentFields
    .map((key) => `'${key}': 'granted'`)
    .join(",\n      ");

  return `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied',
  'functionality_storage': 'denied',
  'personalization_storage': 'denied',
  'security_storage': 'granted',
  'wait_for_update': 500
});
try {
  if (localStorage.getItem('${COOKIE_CONSENT_KEY}') === 'accepted') {
    gtag('consent', 'update', {
      ${granted}
    });
  }
} catch (e) {}
`.trim();
}

export function updateAnalyticsConsent(granted: boolean) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ??
    function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    };

  window.gtag("consent", "update", buildConsentUpdate(granted));
  window.dataLayer.push({
    event: "cookie_consent_update",
    cookie_consent: granted ? "accepted" : "rejected",
  });
}

export function trackClickToCall(location: string) {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(COOKIE_CONSENT_KEY) !== "accepted") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "click_to_call",
    click_location: location,
  });
}
