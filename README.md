# portfoliooficial

## Privacidad y analítica

`NEXT_PUBLIC_GA_ID` es opcional y se lee al compilar. Sin un ID válido `G-...`,
Analytics permanece desactivado. Con un ID válido, el script solo se descarga
tras aceptar las cookies analíticas; rechazar no bloquea la navegación.
El footer permite cambiar la decisión en ES/EN. La revocación desactiva la
medición, elimina cookies de GA accesibles y recarga para detener sus listeners.
La decisión se guarda en `portfolio-analytics-consent-v1`; el tema usa
`portfolio-theme`. Si localStorage está bloqueado, la decisión solo dura durante
el documento actual. No se utiliza el modo de consentimiento avanzado con pings
sin cookies. Véase la [documentación de consentimiento de Google](https://developers.google.com/tag-platform/security/guides/consent).

Los datos legales del aviso proceden del responsable. Hay que confirmar fuera
del repositorio la configuración de la propiedad GA (conservación, medición
mejorada y etiquetas conectadas), los registros y servicios inyectados por
Cloudflare Pages (Web Analytics/Zaraz), y la conservación de correo y WhatsApp.
Las fuentes e imágenes se sirven localmente. Vercel solo aloja proyectos
externos enlazados, sin contenido incrustado en este portafolio.
