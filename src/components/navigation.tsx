"use client";

import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";
import { LanguageLink } from "./language-link";
import { useRef, useState } from "react";
import type { Dictionary, Locale } from "@/lib/content";
import { Icon } from "./icon";

export function Navigation({ locale, labels, packagesLabel }: { locale: Locale; labels: Dictionary["nav"]; packagesLabel: string }) {
  const menuButton = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const links = [["services", labels.services], ["packages", packagesLabel], ["projects", labels.projects], ["about", labels.about], ["contact", labels.contact]];
  return (
    <header className="site-header" id="top" onKeyDown={event => { if (event.key === "Escape" && open) { setOpen(false); menuButton.current?.focus(); } }}>
      <div className="shell nav-shell">
        <Link className="wordmark" href={`/${locale}`} aria-label="Alejandro Vázquez">
          <span className="brand-symbol" aria-hidden="true">av<span>.</span></span>
          <span>Alejandro<br />Vázquez</span>
        </Link>
        <nav className="desktop-nav" aria-label={labels.label}>
          {links.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>
        <div className="nav-actions">
          <nav className="language-switch" aria-label={labels.language}>
            {(["es", "en"] as const).map((language) => (
              <LanguageLink key={language} locale={language} current={locale === language}>{language.toUpperCase()}</LanguageLink>
            ))}
          </nav>
          <ThemeToggle locale={locale} />
          <button ref={menuButton} className="menu-toggle" aria-label={open ? labels.close : labels.open} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}><Icon name={open ? "close" : "menu"} /></button>
        </div>
      </div>
      <nav id="mobile-nav" className="mobile-nav shell" aria-label={labels.label} hidden={!open}>
        {links.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}<Icon name="arrow" /></a>)}
      </nav>
    </header>
  );
}
