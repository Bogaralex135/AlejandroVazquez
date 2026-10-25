"use client";

import { useId, useState } from "react";
import type { commerce, packagePresentation } from "@/lib/commerce";
import type { Locale } from "@/lib/content";
import { Disclosure } from "./disclosure";
import { WhatsappLink } from "./whatsapp-link";

type CardData = { locale: Locale; t: Pick<(typeof commerce)[Locale], "packages" | "included" | "exclusions" | "conditions" | "extras" | "extraNote" | "quote">; labels: (typeof packagePresentation)[Locale]; prices: string[]; quoteUrls: string[]; softwareUrl: string };

function VariantCard({ locale, service, t, labels, prices, quoteUrls }: CardData & { service: 0 | 1 }) {
  const [variant, setVariant] = useState(0);
  const id = useId();
  const index = service * 2 + variant;
  const pack = t.packages[index];
  return <article className={`package-card package-service ${variant ? "package-custom" : "package-essential"}`}>
    <h3>{labels.services[service]}</h3>
    <fieldset className="package-selector"><legend className="sr-only">{labels.variant}: {labels.services[service]}</legend>{labels.variants.map((label,i) => <label key={label}><input type="radio" name={id} value={i} checked={variant === i} onChange={() => setVariant(i)} /><span>{label}</span></label>)}</fieldset>
    <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{pack.name}: {prices[index]}. {pack.time}</p>
    <div className="package-variant-content" key={variant}>
      <p className="package-price">{prices[index]}</p><p className="package-time">{pack.time}</p>
      <ul className="package-features">{pack.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
    </div>
    <div className="package-details"><Disclosure key={`${variant}-details`} title={t.included}><ul>{pack.details.map(detail => <li key={detail}>{detail}</li>)}</ul><h4>{t.exclusions}</h4><p>{pack.exclusions}</p></Disclosure>
      <Disclosure title={t.conditions}><p>{labels.cardConditions[service]}</p></Disclosure>
      <Disclosure title={t.extras}><p>{t.extraNote}</p><ul>{labels.extras[service].map(extra => <li key={extra}>{extra}</li>)}</ul></Disclosure></div>
    <WhatsappLink locale={locale} href={quoteUrls[index]} ctaLocation="package_card" service={service === 0 ? "landing" : "invitation"} packageTier={variant === 0 ? "essential" : "custom"}>{t.quote}<span className="sr-only">: {pack.name}</span></WhatsappLink>
  </article>;
}

export function PackageCards(props: CardData) {
  const { locale, labels, t, softwareUrl } = props;
  return <div className="packages-grid packages-three"><VariantCard {...props} service={0}/><VariantCard {...props} service={1}/>
    <article className="package-card package-service package-custom package-software"><h3>{labels.services[2]}</h3><p className="software-intro">{labels.softwareIntro}</p><p className="package-price">{labels.softwarePrice}</p><p className="package-time">{labels.softwareNote}</p><ul className="package-features">{labels.softwareExamples.map(example => <li key={example}>{example}</li>)}</ul><div className="package-details"><Disclosure title={t.conditions}><p>{labels.softwareConditions}</p></Disclosure></div><WhatsappLink locale={locale} href={softwareUrl} ctaLocation="package_card" service="software">{labels.softwareCta}</WhatsappLink></article>
  </div>;
}
