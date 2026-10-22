import type { Locale } from "@/lib/content";
import { externalLabels, whatsappUrl } from "@/lib/contact";
import { Icon } from "./icon";

export function WhatsappLink({
  locale,
  children,
  light = false,
  href,
}: {
  locale: Locale;
  children: React.ReactNode;
  light?: boolean;
  href?: string;
}) {
  return (
    <a
      className={`button whatsapp-cta ${light ? "button-paper" : "button-primary"}`}
      href={href ?? whatsappUrl(locale)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon name="whatsapp" />
      <span>{children}</span>
      <Icon name="external" />
      <span className="sr-only"> ({externalLabels[locale]})</span>
    </a>
  );
}
