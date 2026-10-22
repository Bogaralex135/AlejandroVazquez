"use client";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/content";

export function ThemeToggle({ locale }: { locale: Locale }) {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const sync = () => setDark(document.documentElement.dataset.theme === "dark");
    const media = matchMedia("(prefers-color-scheme: dark)");
    const system = () => { try { if (localStorage.getItem("portfolio-theme")) return; } catch {} document.documentElement.dataset.theme = media.matches ? "dark" : "light"; sync(); };
    const storage = () => { system(); sync(); };
    sync(); media.addEventListener("change", system); window.addEventListener("storage", storage);
    return () => { media.removeEventListener("change", system); window.removeEventListener("storage", storage); };
  }, []);
  return <button className="theme-toggle" aria-label={locale === "es" ? "Modo oscuro" : "Dark mode"} aria-pressed={dark} onClick={() => { const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark"; document.documentElement.dataset.theme = next; setDark(next === "dark"); try { localStorage.setItem("portfolio-theme", next); } catch {} }}>
    <svg className="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/></svg>
    <svg className="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11Z"/></svg>
  </button>;
}
