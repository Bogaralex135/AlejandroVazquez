"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";

const subscribe = () => () => {};
const clientSnapshot = () => false;
const serverSnapshot = () => true;
const themeScript = `(function(){try{var t=localStorage.getItem('portfolio-theme');document.documentElement.dataset.theme=t==='dark'||t==='light'?t:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}catch(e){document.documentElement.dataset.theme=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}})()`;

export function ThemeInitializer({ locale }: { locale: string }) {
  // Emit the pre-paint script in the initial HTML only. Locale navigation is
  // already running in the browser and must preserve the active theme.
  const initialDocument = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  useLayoutEffect(() => {
    // React may reconcile <html> when its locale changes. Restore the theme
    // before paint without inserting or executing another script element.
    let preference: string | null = null;
    try { preference = localStorage.getItem("portfolio-theme"); } catch {}
    document.documentElement.dataset.theme = preference === "light" || preference === "dark"
      ? preference : matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }, [locale]);
  return initialDocument ? <script dangerouslySetInnerHTML={{ __html: themeScript }} /> : null;
}
