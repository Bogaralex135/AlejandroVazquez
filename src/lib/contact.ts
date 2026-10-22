import type { Locale } from "./content";

export const whatsappMessages = {
  es: "Hola, Alejandro. Vi tu portafolio y me gustaría platicarte sobre una idea o necesidad de mi negocio. ¿Podemos hablar?",
  en: "Hi, Alejandro. I saw your portfolio and would like to tell you about an idea or something my business needs. Can we talk?",
};
export const externalLabels = { es: "se abre en otra pestaña", en: "opens in a new tab" };
export function whatsappUrl(locale: Locale) {
  return `https://wa.me/525583728183?text=${encodeURIComponent(whatsappMessages[locale])}`;
}
