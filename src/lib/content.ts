import { whatsappMessages, externalLabels } from "./contact";
export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

export const content = {
  es: {
    meta: { title: "Alejandro Vázquez | Desarrollo web y software a medida", description: "Sitios web y software a medida para emprendedores, microempresas y pymes. Conversemos sobre lo que tu negocio necesita." },
    nav: { services: "Servicios", projects: "Proyectos", about: "Sobre mí", contact: "Contacto", label: "Navegación principal", language: "Seleccionar idioma", open: "Abrir menú", close: "Cerrar menú", skip: "Ir al contenido" },
    hero: { label: "Desarrollo web & software a medida", title: "Tu negocio merece tecnología que crezca contigo", body: "Diseño y desarrollo sitios web y software a medida para emprendedores y negocios en crecimiento. Entiendo tus necesidades y construyo soluciones útiles, sin complicaciones innecesarias.", cta: "Hablemos por WhatsApp", secondary: "Ver proyectos", note: "De una buena conversación a una solución útil.", graphic: "Una idea que se convierte en una solución", idea: "Tu idea", code: "A medida", result: "Tu siguiente paso" },
    services: { label: "Servicios", title: "Lo que necesitas.\nHecho para ti.", intro: "Cada negocio tiene su propia forma de funcionar. La tecnología también debería adaptarse.", items: [
      { title: "Landing pages", text: "Una página enfocada en presentar tu idea, dar a conocer tu servicio y abrir la conversación con tus próximos clientes.", detail: "Una idea. Un objetivo claro.", icon: "landing" },
      { title: "Sitios web para negocios", text: "Un espacio propio para mostrar quién eres, qué ofreces y cómo encontrarte. Claro, accesible y pensado para cualquier pantalla.", detail: "Tu negocio, bien presentado.", icon: "website" },
      { title: "Software a medida", text: "Herramientas que responden a tu manera de trabajar: organiza información, simplifica tareas y da forma a tus procesos.", detail: "Menos fricción en tu día a día.", icon: "software" },
    ], extra: "¿Tienes algo que celebrar?", extraBody: "También creo invitaciones digitales para compartir momentos especiales.", extraLink: "Ver una invitación" },
    projects: { label: "Proyectos", title: "Ideas que toman forma.", intro: "Una mirada a lo que construyo: desde una primera presencia digital hasta herramientas para procesos más específicos.", featured: "Proyecto destacado", status: "En desarrollo", type: "Software a medida", description: "Un configurador de vehículos comerciales y un sistema de cotizaciones. TruckFlow reúne la selección de un vehículo y la preparación de su propuesta en una misma experiencia.", tags: ["Configurador", "Vehículos comerciales", "Cotizaciones"], flip: "Conocer el proyecto", back: "Volver a la captura", view: "Ver proyecto", demo: "Ver demo", image: "Captura de", placeholder: "Vista previa próximamente", items: [
      { name: "Barbería", type: "Sitio web", description: "Una presencia digital para presentar una barbería y acercar sus servicios a nuevos clientes.", image: "barberia.png", url: "https://barberia-henna-three.vercel.app" },
      { name: "Nail Beauty", type: "Sitio web", description: "Un escaparate digital para un estudio de belleza, con una presentación visual de sus servicios.", image: "nail-studio.png", url: "https://salonbelleza-94ui.vercel.app" },
      { name: "Un día especial", type: "Invitación digital", description: "Una invitación para compartir los detalles de una celebración de una forma personal y sencilla.", image: "invitacion.png", url: "https://invitacion-phi-ten.vercel.app" },
    ] },
    process: { label: "Cómo trabajo", title: "Primero, entender.\nDespués, construir.", intro: "Un proceso cercano, con claridad en cada paso.", steps: [
      { title: "Conversamos", text: "Me cuentas sobre tu negocio, tu idea y lo que necesitas mejorar." },
      { title: "Definimos", text: "Acordamos qué vamos a construir, el alcance y los siguientes pasos." },
      { title: "Construimos", text: "Doy forma a la solución y compartimos avances para afinar los detalles." },
      { title: "Ponemos en marcha", text: "Revisamos juntos, publicamos y te explico cómo utilizar tu nueva herramienta." },
    ] },
    about: { label: "Sobre mí", title: "Hola, soy Alejandro.", paragraphs: ["Soy desarrollador y me apasiona encontrar formas de hacer que las cosas funcionen mejor. Me gusta escuchar una idea, entender qué hay detrás de ella y descubrir cómo la tecnología puede convertirla en algo útil.", "Creo que los pequeños negocios también merecen soluciones bien pensadas."], quote: "Mi forma de trabajar empieza con una conversación, no con una línea de código.", role: "Desarrollador web & software a medida", portrait: "Retrato de Alejandro Vázquez", placeholder: "Un espacio para mi fotografía" },
    contact: { label: "Hagamos algo útil", title: "¿Qué podríamos mejorar en tu negocio?", text: "No necesitas tener todas las respuestas. Una idea, una necesidad o una pregunta son un buen comienzo.", cta: "Conversemos por WhatsApp", note: "Hablemos de tu idea, sin complicaciones." },
    footer: { note: "Tecnología con propósito. Trato de persona a persona.", top: "Volver arriba", rights: "Alejandro Vázquez" },
    whatsapp: whatsappMessages.es,
    external: externalLabels.es,
  },
  en: {
    meta: { title: "Alejandro Vázquez | Web development & custom software", description: "Websites and custom software for entrepreneurs and small businesses. Let's talk about what your business needs." },
    nav: { services: "Services", projects: "Projects", about: "About me", contact: "Contact", label: "Main navigation", language: "Select language", open: "Open menu", close: "Close menu", skip: "Skip to content" },
    hero: { label: "Web development & custom software", title: "Your business deserves technology that grows with you", body: "I design and develop websites and custom software for entrepreneurs and growing businesses. I listen to your needs and build useful solutions, without unnecessary complications.", cta: "Let's talk on WhatsApp", secondary: "View projects", note: "From a good conversation to a useful solution.", graphic: "An idea becoming a useful solution", idea: "Your idea", code: "Made for you", result: "Your next step" },
    services: { label: "Services", title: "What you need.\nMade for you.", intro: "Every business has its own way of working. Your technology should adapt to it, too.", items: [
      { title: "Landing pages", text: "A focused page to introduce your idea, showcase your service and start a conversation with your next customers.", detail: "One idea. One clear goal.", icon: "landing" },
      { title: "Business websites", text: "Your own space to show who you are, what you offer and how to find you. Clear, accessible and made for every screen.", detail: "Your business, well presented.", icon: "website" },
      { title: "Custom software", text: "Tools built around how you work: organize information, simplify tasks and bring structure to your processes.", detail: "Less friction in your day.", icon: "software" },
    ], extra: "Something to celebrate?", extraBody: "I also create digital invitations to share special moments.", extraLink: "View an invitation" },
    projects: { label: "Projects", title: "Ideas taking shape.", intro: "A look at what I build: from a first digital presence to tools for more specific business processes.", featured: "Featured project", status: "In development", type: "Custom software", description: "A commercial vehicle configurator and quotation system. TruckFlow brings vehicle selection and proposal preparation together in a single experience.", tags: ["Configurator", "Commercial vehicles", "Quotations"], flip: "Explore the project", back: "Back to preview", view: "View project", demo: "View demo", image: "Screenshot of", placeholder: "Preview coming soon", items: [
      { name: "Barbershop", type: "Website", description: "A digital presence to introduce a barbershop and bring its services closer to new customers.", image: "barberia.png", url: "https://barberia-henna-three.vercel.app" },
      { name: "Nail Beauty", type: "Website", description: "A digital showcase for a beauty studio, with a visual introduction to its services.", image: "nail-studio.png", url: "https://salonbelleza-94ui.vercel.app" },
      { name: "A special day", type: "Digital invitation", description: "An invitation that shares the details of a celebration in a personal, simple way.", image: "invitacion.png", url: "https://invitacion-phi-ten.vercel.app" },
    ] },
    process: { label: "How I work", title: "Understand first.\nThen build.", intro: "A collaborative process, with clarity at every step.", steps: [
      { title: "We talk", text: "Tell me about your business, your idea and what you would like to improve." },
      { title: "We define", text: "We agree on what to build, the scope and the next steps." },
      { title: "We build", text: "I bring the solution to life and share progress so we can refine the details together." },
      { title: "We launch", text: "We review together, go live and walk through how to use your new tool." },
    ] },
    about: { label: "About me", title: "Hi, I'm Alejandro.", paragraphs: ["I'm a developer who loves finding ways to make things work better. I enjoy listening to an idea, understanding what lies behind it and discovering how technology can turn it into something useful.", "I believe small businesses deserve thoughtfully built solutions, too."], quote: "The way I work starts with a conversation, not a line of code.", role: "Web developer & custom software", portrait: "Portrait of Alejandro Vázquez", placeholder: "A space for my photograph" },
    contact: { label: "Let's make something useful", title: "What could we improve in your business?", text: "You don't need to have all the answers. An idea, a need or a question is a good place to start.", cta: "Let's talk on WhatsApp", note: "Let's talk about your idea. Keep it simple." },
    footer: { note: "Technology with purpose. Person to person.", top: "Back to top", rights: "Alejandro Vázquez" },
    whatsapp: whatsappMessages.en,
    external: externalLabels.en,
  },
};

export type Dictionary = (typeof content)[Locale];
export { whatsappUrl } from "./contact";
