import Link from "next/link";
import { EditorialFooter } from "./editorial-footer";
import { ThemeToggle } from "./theme-toggle";
import type { Locale } from "@/lib/content";

const sections = {
  es: [
    ["Alcance", "Esta página describe las funciones verificadas en el código de este portafolio de Alejandro Vázquez. Es información de transparencia y no constituye un aviso legal completo ni jurídicamente validado."],
    ["Contacto", "El sitio publica el correo bogar.avm@gmail.com y el teléfono +52 55 8372 8183. Los enlaces de correo y teléfono abren la aplicación que tengas configurada. Si decides contactar a Alejandro, los datos y mensajes que compartas se gestionarán en el canal que elijas para atender tu consulta."],
    ["WhatsApp y proyectos externos", "Los botones de WhatsApp abren wa.me con el número de contacto y un mensaje prellenado. Abrir el enlace no envía el mensaje automáticamente: puedes editarlo y decidir si lo envías. Al visitar WhatsApp o los proyectos enlazados, se aplican las condiciones y políticas de sus proveedores. Sus prácticas no se controlan desde este portafolio."],
    ["Preferencias locales", "El tema inicial sigue la preferencia de tu sistema. Si lo cambias manualmente, se guarda únicamente el valor light o dark en localStorage bajo la clave portfolio-theme, en tu navegador. No se envía desde este código a un servidor. Puedes eliminarlo borrando los datos del sitio en tu navegador. El idioma se elige mediante las rutas /es y /en y no se guarda como preferencia local."],
    ["Funciones verificadas", "En el código revisado no hay formularios de captura, integraciones de analítica ni código que escriba cookies. Las fuentes se sirven mediante Next.js y las imágenes de los proyectos están alojadas en este sitio. Esta revisión no permite afirmar qué registros técnicos, cookies o servicios puede añadir el proveedor de alojamiento o una configuración externa al código."],
    ["Información pendiente para un aviso completo", "Antes de considerar este texto un aviso legal completo, queda pendiente confirmar la identidad y los datos legales del responsable que resulten exigibles, las finalidades y condiciones del tratamiento de consultas recibidas, los proveedores y registros del alojamiento, los criterios de conservación y los procedimientos para ejercer derechos aplicables. No se han establecido aquí domicilios, plazos ni mecanismos sin confirmar. Para consultas sobre esta información puedes escribir a bogar.avm@gmail.com."],
  ],
  en: [
    ["Scope", "This page describes the functions verified in the code of Alejandro Vázquez’s portfolio. It provides transparency information and is not a complete or legally validated privacy notice."],
    ["Contact", "The site publishes bogar.avm@gmail.com and +52 55 8372 8183. Email and telephone links open your configured application. If you choose to contact Alejandro, the information and messages you share will be handled through your chosen channel to respond to your enquiry."],
    ["WhatsApp and external projects", "WhatsApp buttons open wa.me with the contact number and a prefilled message. Opening the link does not send the message automatically: you can edit it and decide whether to send it. WhatsApp and linked projects are subject to their providers’ terms and privacy policies. Their practices are outside this portfolio’s control."],
    ["Local preferences", "The initial theme follows your system preference. A manual change stores only light or dark in your browser’s localStorage under portfolio-theme. This code does not send that preference to a server. You can remove it by clearing this site’s browser data. Language is selected through /es and /en routes and is not saved as a local preference."],
    ["Verified functions", "The reviewed code has no data collection forms, analytics integrations or code that writes cookies. Fonts are served through Next.js and project images are hosted on this site. This review cannot determine which technical logs, cookies or services may be added by the hosting provider or configuration outside the code."],
    ["Information needed for a complete notice", "Before treating this text as a complete legal notice, the responsible party’s required legal identity and contact details, the purposes and conditions for handling enquiries, hosting providers and logs, retention criteria and procedures for exercising applicable rights must be confirmed. No unverified legal address, retention period or procedure is specified here. Questions about this information can be sent to bogar.avm@gmail.com."],
  ],
};
export function PrivacyPage({ locale }: { locale: Locale }) {
  const es = locale === "es";
  return <><header className="shell privacy-header"><Link href={`/${locale}`}>Alejandro Vázquez</Link><div className="nav-actions"><Link href={es ? "/en/privacy" : "/es/privacidad"} hrefLang={es ? "en" : "es"}>{es ? "EN" : "ES"}</Link><ThemeToggle locale={locale}/></div></header><main className="shell privacy-content" id="main"><h1>{es ? "Política de privacidad" : "Privacy policy"}</h1>{sections[locale].map(([title,text]) => <section key={title}><h2>{title}</h2><p>{text}</p></section>)}<Link className="text-link" href={`/${locale}`}>{es ? "Volver al portafolio" : "Back to portfolio"}</Link></main><EditorialFooter locale={locale}/></>;
}
