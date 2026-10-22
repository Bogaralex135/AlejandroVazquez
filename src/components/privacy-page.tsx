import Link from "next/link";
import { EditorialFooter } from "./editorial-footer";
import { ThemeToggle } from "./theme-toggle";
import type { Locale } from "@/lib/content";
import notices from "@/lib/privacy-content.json";

function InlineText({ text }: { text: string }) {
  return text.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s]+|[\w.+-]+@[\w.-]+\.[a-zA-Z]+)/g).map((part, index) => {
    if (part.startsWith("**")) {
      return <strong key={index}><InlineText text={part.slice(2, -2)} /></strong>;
    }
    if (part.startsWith("https://") || part.startsWith("http://")) {
      const url = part.replace(/[.,;]+$/, "");
      return <span key={index}><a href={url}>{url}</a>{part.slice(url.length)}</span>;
    }
    if (/^[\w.+-]+@[\w.-]+\.[a-zA-Z]+$/.test(part)) {
      return <a key={index} href={`mailto:${part}`}>{part}</a>;
    }
    return part;
  });
}

function NoticeBlocks({ text }: { text: string }) {
  return text.trim().split(/\n\s*\n/).map((block, index) =>
    block.startsWith("- ") ? (
      <ul key={index}>
        {block.split("\n").map((item) => <li key={item}><InlineText text={item.slice(2)} /></li>)}
      </ul>
    ) : <p key={index}><InlineText text={block} /></p>
  );
}

export function PrivacyPage({ locale }: { locale: Locale }) {
  const es = locale === "es";
  const [intro, ...sections] = notices[locale].replace(/\r\n/g, "\n").split("\n## ");
  const [title, ...introduction] = intro.split("\n");

  return (
    <>
      <header className="shell privacy-header">
        <Link href={`/${locale}`}>Alejandro Vázquez</Link>
        <div className="nav-actions">
          <Link href={es ? "/en/privacy" : "/es/privacidad"} hrefLang={es ? "en" : "es"}>{es ? "EN" : "ES"}</Link>
          <ThemeToggle locale={locale} />
        </div>
      </header>
      <main className="shell privacy-content" id="main">
        <h1>{title.replace(/^# /, "")}</h1>
        <div className="privacy-intro"><NoticeBlocks text={introduction.join("\n")} /></div>
        {sections.map((section) => {
          const [heading, ...body] = section.split("\n");
          return <section key={heading}><h2>{heading}</h2><NoticeBlocks text={body.join("\n")} /></section>;
        })}
        <Link className="text-link" href={`/${locale}`}>{es ? "Volver al portafolio" : "Back to portfolio"}</Link>
      </main>
      <EditorialFooter locale={locale} />
    </>
  );
}
