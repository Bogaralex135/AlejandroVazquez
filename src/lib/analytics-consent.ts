export const consentKey = "portfolio-analytics-consent-v1";
export type AnalyticsConsent = "accepted" | "rejected" | null;
let memoryConsent: AnalyticsConsent = null;
const changeEvent = "portfolio-analytics-consent-change";

export function readConsent(): AnalyticsConsent {
  if (memoryConsent !== null) return memoryConsent;
  try {
    const value = localStorage.getItem(consentKey);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch { return memoryConsent; }
}

export function saveConsent(value: Exclude<AnalyticsConsent, null>) {
  memoryConsent = value;
  try { localStorage.setItem(consentKey, value); } catch {}
  window.dispatchEvent(new Event(changeEvent));
}

export function subscribeConsent(callback: () => void) {
  const storage = (event: StorageEvent) => {
    if (event.key === consentKey || event.key === null) {
      memoryConsent = null;
      callback();
    }
  };
  window.addEventListener("storage", storage);
  window.addEventListener(changeEvent, callback);
  return () => {
    window.removeEventListener("storage", storage);
    window.removeEventListener(changeEvent, callback);
  };
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

export function disableAnalytics(gaId: string) {
  window[`ga-disable-${gaId}`] = true;
  // Remove existing first-party GA cookies, including those from an older build.
  const names = document.cookie.split(";").map(cookie => cookie.trim().split("=")[0])
    .filter(name => /^(_ga(?:_|$)|_gid$|_gat(?:_|$))/.test(name));
  const labels = location.hostname.split(".");
  const domains = ["", ...labels.map((_, i) => labels.slice(i).join("."))];
  const parts = location.pathname.split("/");
  const paths = new Set(["/", ...parts.map((_, i) => parts.slice(0, i + 1).join("/") || "/")]);
  for (const name of names) for (const domain of domains) for (const path of paths) {
    document.cookie = `${name}=; Max-Age=0; path=${path}${domain ? `; domain=${domain}` : ""}`;
    if (domain) document.cookie = `${name}=; Max-Age=0; path=${path}; domain=.${domain}`;
  }
}

export function loadAnalytics(gaId: string) {
  if (readConsent() !== "accepted" || document.getElementById("portfolio-analytics")) return;
  const target = window;
  target[`ga-disable-${gaId}`] = false;
  target.dataLayer = target.dataLayer || [];
  // Google's command queue uses Arguments objects rather than event arrays.
  // eslint-disable-next-line prefer-rest-params
  target.gtag = function () { target.dataLayer!.push(arguments); };
  // Basic consent mode: no Google script or requests exist before acceptance.
  target.gtag("consent", "default", {
    analytics_storage: "granted", ad_storage: "denied",
    ad_user_data: "denied", ad_personalization: "denied",
  });
  target.gtag("js", new Date());
  target.gtag("config", gaId, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  const script = document.createElement("script");
  script.id = "portfolio-analytics";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
  document.head.appendChild(script);
}
