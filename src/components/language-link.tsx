"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import type { Locale } from "@/lib/content";

export function LanguageLink({ locale, current, children }: { locale: Locale; current?: boolean; children: ReactNode }) {
  const router = useRouter();
  return <Link href={`/${locale}`} lang={locale} hrefLang={locale} aria-label={locale === "es" ? "Español" : "English"} aria-current={current ? "page" : undefined} onClick={event => {
    if (window.location.hash && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      event.preventDefault();
      router.push(`/${locale}${window.location.hash}`);
    }
  }}>{children}</Link>;
}
