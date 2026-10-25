import { PackageCards } from "./package-cards";
import { commerce, packagePrice, packageWhatsapp, packagePresentation } from "@/lib/commerce";
import { type Locale } from "@/lib/content";
import { Disclosure } from "./disclosure";
import { WhatsappLink } from "./whatsapp-link";
import { FaqList } from "./faq-list";

export function PackagesSection({ locale }: { locale: Locale }) {
  const t = commerce[locale];
  return <section id="packages" className="section shell packages-section" aria-labelledby="packages-title">
    <div className="section-heading"><div><p className="eyebrow">{t.nav}</p><h2 id="packages-title">{t.title}</h2></div><p className="section-intro">{t.intro}</p></div>
    <PackageCards locale={locale} labels={packagePresentation[locale]} t={{ packages: t.packages, included: t.included, exclusions: t.exclusions, conditions: t.conditions, extras: t.extras, extraNote: t.extraNote, quote: t.quote }} prices={t.packages.map((_, i) => packagePrice(i,locale))} quoteUrls={t.packages.map(pack => packageWhatsapp(pack.name,locale))} softwareUrl={packageWhatsapp(packagePresentation[locale].services[2],locale)} />
    <p className="package-tax">{t.tax}</p>
    <div className="commercial-terms"><Disclosure title={t.conditions}><ul>{t.terms.map(term => <li key={term}>{term}</li>)}</ul><p>{t.tax}</p></Disclosure></div>
    <div className="package-custom-note"><p>{t.close}</p><WhatsappLink locale={locale} ctaLocation="packages_custom">{t.custom}</WhatsappLink></div>
  </section>;
}

export function FaqSection({ locale }: { locale: Locale }) {
  const t = commerce[locale];
  const faqs = t.faqs.map(([question, answer]) => ({ question, answer: answer === "prices" ? `${t.packages.map((pack,index) => `${pack.name}: ${packagePrice(index, locale)}`).join("; ")}. ${locale === "es" ? "Los sitios multipágina y el software a medida se cotizan individualmente." : "Multi-page websites and custom software are quoted individually."} ${t.tax}` : answer }));
  return <section className="section shell faq-section" id="faqs" aria-labelledby="faqs-title"><div className="section-heading"><div><p className="eyebrow">FAQs</p><h2 id="faqs-title">{t.faqTitle}</h2></div><p className="section-intro">{t.faqIntro}</p></div><FaqList items={faqs} more={t.more} less={t.less} /></section>;
}
