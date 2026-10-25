import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import { PrivacyPage } from "@/components/privacy-page";
import { siteOrigin } from "@/lib/site";
export const dynamicParams = false;
export function generateStaticParams() { return [{ locale: "es", policy: "privacidad" }, { locale: "en", policy: "privacy" }]; }
export async function generateMetadata({ params }: { params: Promise<{ locale: string; policy: string }> }, parent: ResolvingMetadata): Promise<Metadata> {
  const { locale, policy } = await params;
  if (!((locale === "es" && policy === "privacidad") || (locale === "en" && policy === "privacy"))) notFound();
  const origin = siteOrigin();
  const inherited = await parent;
  const title = locale === "es" ? "Aviso de Privacidad Integral | Alejandro Vázquez" : "Comprehensive Privacy Notice | Alejandro Vázquez";
  const description = locale === "es"
    ? "Conoce cómo Alejandro Vázquez trata tus datos personales, utiliza cookies analíticas y permite ejercer tus derechos de privacidad."
    : "Learn how Alejandro Vázquez processes your personal data, uses analytics cookies and lets you exercise your privacy rights.";
  const path = locale === "es" ? "/es/privacidad" : "/en/privacy";
  return {
    title,
    description,
    ...(origin ? { alternates: { canonical: path, languages: { es: "/es/privacidad", en: "/en/privacy" } } } : {}),
    openGraph: { ...inherited.openGraph, title, description, ...(origin ? { url: `${origin}${path}` } : {}) },
    twitter: { ...inherited.twitter, title, description },
  };
}
export default async function Policy({ params }: { params: Promise<{ locale: string; policy: string }> }) {
  const { locale, policy } = await params;
  if (!((locale === "es" && policy === "privacidad") || (locale === "en" && policy === "privacy"))) notFound();
  return <PrivacyPage locale={locale}/>;
}
