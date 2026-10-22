import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/content";

export const alt = "Alejandro Vázquez — Web development & software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";
export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export default async function SocialImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return new ImageResponse(<div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#F4F0E8", color: "#202127", width: "100%", height: "100%", padding: 64, borderBottom: "18px solid #3455D1", fontFamily: "sans-serif" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 72, fontWeight: 700 }}>av.</span><span style={{ fontSize: 28 }}>Alejandro Vázquez</span></div>
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}><div style={{ fontSize: 62, lineHeight: 1.1, maxWidth: 960 }}>{locale === "es" ? "Tecnología que crece con tu negocio." : "Technology that grows with your business."}</div><div style={{ color: "#3455D1", fontSize: 28 }}>{locale === "es" ? "Desarrollo web y software a medida" : "Web development & custom software"}</div></div>
  </div>, size);
}
