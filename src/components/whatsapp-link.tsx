import type { Locale } from "@/lib/content";
import { externalLabels, whatsappUrl } from "@/lib/contact";
import { Icon } from "./icon";
import type { WhatsappEvent } from "@/lib/analytics-consent";

export function WhatsappLink({
  locale,
  children,
  light = false,
  href,
  ctaLocation,
  service = "general",
  packageTier = "not_applicable",
}: {
  locale: Locale;
  children: React.ReactNode;
  light?: boolean;
  href?: string;
  ctaLocation: WhatsappEvent["cta_location"];
  service?: WhatsappEvent["service"];
  packageTier?: WhatsappEvent["package_tier"];
}) {
  return (
    <a
      className={`button whatsapp-cta ${light ? "button-paper" : "button-primary"}`}
      href={href ?? whatsappUrl(locale)}
      target="_blank"
      rel="noopener noreferrer"
      data-whatsapp-cta=""
      data-cta-location={ctaLocation}
      data-service={service}
      data-package-tier={packageTier}
      data-language={locale}
    >
      <Icon name="whatsapp" />
      <span>{children}</span>
      <Icon name="external" />
      <span className="sr-only"> ({externalLabels[locale]})</span>
    </a>
  );
}
