import type { MetadataRoute } from "next";
import { siteOrigin, isIndexable } from "@/lib/site";
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const origin = siteOrigin();
  return { rules: isIndexable() ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" }, ...(isIndexable() && origin ? { sitemap: `${origin}/sitemap.xml` } : {}) };
}
