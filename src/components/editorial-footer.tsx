import { LanguageLink } from "./language-link";
import Link from "next/link";
import { content, whatsappUrl, type Locale } from "@/lib/content";
import { Icon } from "./icon";
import { PrivacyControls } from "./privacy-controls";

export function EditorialFooter({ locale }: { locale: Locale }) {
  const es = locale === "es";
  const t = content[locale];
  const configuredId = process.env.NEXT_PUBLIC_GA_ID?.trim() || "";
  const gaId = /^G-[A-Z0-9]+$/.test(configuredId) ? configuredId : "";
  return (
    <footer className="editorial-footer shell">
      <div className="footer-columns">
        <div>
          <Link className="footer-name" href={`/${locale}`}>
            Alejandro Vázquez<span>.</span>
          </Link>
          <p>
            {es
              ? "Desarrollo web y software a medida."
              : "Web development and custom software."}
          </p>
          <p>{es ? "CDMX, México" : "CDMX, Mexico"}</p>
        </div>
        <address>
          <a href="mailto:bogar.avm@gmail.com">bogar.avm@gmail.com</a>
          <a href="tel:+525583728183">+52 55 8372 8183</a>
          <a
            className="footer-whatsapp"
            href={whatsappUrl(locale)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="whatsapp" />
            WhatsApp<span className="sr-only"> ({t.external})</span>
          </a>
        </address>
        <nav aria-label={es ? "Navegación del pie" : "Footer navigation"}>
          {[
            ["services", t.nav.services],
            ["projects", t.nav.projects],
            ["process", es ? "Proceso" : "Process"],
            ["about", t.nav.about],
            ["contact", t.nav.contact],
          ].map(([id, label]) => (
            <Link key={id} href={`/${locale}#${id}`}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="footer-bottom">
        <small>© {new Date().getFullYear()} Alejandro Vázquez</small>
        <Link href={es ? "/es/privacidad" : "/en/privacy"}>
          {es ? "Política de privacidad" : "Privacy policy"}
        </Link>
        <PrivacyControls locale={locale} gaId={gaId} />
        <nav aria-label={t.nav.language}>
          <LanguageLink locale="es" current={locale === "es"}>ES</LanguageLink>
          <LanguageLink locale="en" current={locale === "en"}>EN</LanguageLink>
        </nav>
      </div>
    </footer>
  );
}
