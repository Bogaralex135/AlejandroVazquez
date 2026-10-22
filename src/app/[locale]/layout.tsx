import { ThemeInitializer } from "@/components/theme-initializer";
import { siteOrigin, isIndexable } from "@/lib/site";
import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { content, isLocale, locales } from "@/lib/content";
import "../globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { meta } = content[locale];
  // Set the final public origin at deployment time to emit absolute canonical URLs.
  const origin = siteOrigin();
  return {
    title: meta.title,
    description: meta.description,
    metadataBase: new URL(origin || "http://localhost:3000"),
    authors: [{ name: "Alejandro Vázquez" }],
    ...(origin
      ? {
          alternates: {
            canonical: `/${locale}`,
            languages: { es: "/es", en: "/en", "x-default": "/es" },
          },
        }
      : {}),
    openGraph: {
      title: meta.title,
      description: meta.description,
      siteName: "Alejandro Vázquez",
      locale: locale === "es" ? "es_MX" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_MX",
      type: "website",
      ...(origin ? { url: `/${locale}` } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [`/${locale}/opengraph-image`],
    },
    robots: { index: isIndexable(), follow: isIndexable() },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F0E8" },
    { media: "(prefers-color-scheme: dark)", color: "#191A20" },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim();
  return (
    <html
      suppressHydrationWarning
      lang={locale}
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        <ThemeInitializer locale={locale} />
      </head>
      <body>{children}</body>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}
