import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/site";
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteOrigin();
  if (!origin) return [];
  return ["es", "en"].map((locale) => ({ url: `${origin}/${locale}`, alternates: { languages: { es: `${origin}/es`, en: `${origin}/en`, "x-default": `${origin}/es` } } }));
}
