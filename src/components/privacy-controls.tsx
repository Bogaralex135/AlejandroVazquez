"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Locale } from "@/lib/content";
import { disableAnalytics, loadAnalytics, readConsent, saveConsent, subscribeConsent } from "@/lib/analytics-consent";
import { privacyControls } from "@/lib/privacy-controls-content";

const serverConsent = () => "pending" as const;

export function PrivacyControls({ locale, gaId }: { locale: Locale; gaId: string }) {
  const consent = useSyncExternalStore(subscribeConsent, readConsent, serverConsent);
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const t = privacyControls[locale];
  const visible = open || (Boolean(gaId) && consent === null);

  useEffect(() => {
    const sync = () => {
      if (gaId && readConsent() === "accepted") loadAnalytics(gaId);
      else {
        disableAnalytics(gaId);
        // Unmounting a tag cannot stop its timers/listeners. Reset the document
        // after disabling it; the saved rejection prevents loading it again.
        if (document.getElementById("portfolio-analytics")) window.location.reload();
      }
    };
    sync();
    return subscribeConsent(sync);
  }, [gaId]);

  function choose(value: "accepted" | "rejected") {
    if (value === "rejected") disableAnalytics(gaId);
    setOpen(false);
    saveConsent(value);
    trigger.current?.focus({ preventScroll: true });
  }

  return <>
    <button ref={trigger} type="button" className="privacy-settings" aria-expanded={visible} aria-controls="privacy-preferences" onClick={() => setOpen(!open)}>{t.settings}</button>
    {visible && <aside className="privacy-preferences" id="privacy-preferences" aria-labelledby="privacy-preferences-title">
      <h2 id="privacy-preferences-title">{t.title}</h2>
      <p>{gaId ? t.description : t.unavailable} <Link href={locale === "es" ? "/es/privacidad" : "/en/privacy"}>{t.notice}</Link></p>
      {(consent === "accepted" || consent === "rejected") && <p>{t[consent]}</p>}
      <div className="privacy-preferences-actions">
        <button type="button" onClick={() => choose("accepted")}>{t.accept}</button>
        <button type="button" onClick={() => choose("rejected")}>{t.reject}</button>
        {open && <button type="button" onClick={() => { setOpen(false); trigger.current?.focus(); }}>{t.close}</button>}
      </div>
    </aside>}
  </>;
}
