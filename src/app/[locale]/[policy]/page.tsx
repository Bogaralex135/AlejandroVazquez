import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PrivacyPage } from "@/components/privacy-page";
export const dynamicParams = false;
export function generateStaticParams() { return [{ locale: "es", policy: "privacidad" }, { locale: "en", policy: "privacy" }]; }
export async function generateMetadata({ params }: { params: Promise<{ locale: string; policy: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const origin = process.env.NEXT_PUBLIC_SITE_URL;
  return { title: locale === "es" ? "Política de privacidad | Alejandro Vázquez" : "Privacy policy | Alejandro Vázquez", ...(origin ? { alternates: { canonical: locale === "es" ? "/es/privacidad" : "/en/privacy", languages: { es: "/es/privacidad", en: "/en/privacy" } } } : {}) };
}
export default async function Policy({ params }: { params: Promise<{ locale: string; policy: string }> }) {
  const { locale, policy } = await params;
  if (!((locale === "es" && policy === "privacidad") || (locale === "en" && policy === "privacy"))) notFound();
  return <PrivacyPage locale={locale}/>;
}
