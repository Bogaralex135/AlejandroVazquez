import { commerce } from "@/lib/commerce";
import { PackagesSection, FaqSection } from "@/components/commercial-sections";
import { ScrollEffects } from "@/components/scroll-effects";
import { EditorialFooter } from "@/components/editorial-footer";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Icon } from "@/components/icon";
import { PortfolioImage } from "@/components/portfolio-image";
import { TruckflowCard } from "@/components/truckflow-card";
import { WhatsappLink } from "@/components/whatsapp-link";
import { content, isLocale } from "@/lib/content";
import { imageExists } from "@/lib/assets";

export default async function Portfolio({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = content[locale];
  const files = [
    "alejandro-principal.webp",
    "alejandro-alternativa.webp",
    "truckflow.webp",
    ...t.projects.items.map((project) => project.image),
  ];
  const assets = Object.fromEntries(
    await Promise.all(
      files.map(async (file) => [file, await imageExists(file)] as const),
    ),
  );
  const portrait = assets["alejandro-principal.webp"]
    ? "alejandro-principal.webp"
    : "alejandro-alternativa.webp";

  return (
    <>
      <a className="skip-link" href="#main">
        {t.nav.skip}
      </a>
      <Navigation locale={locale} labels={t.nav} packagesLabel={commerce[locale].nav} />
      <ScrollEffects key={locale} />
      <main id="main">
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-content">
            <p className="eyebrow">
              <span className="small-cross" aria-hidden="true">
                +
              </span>
              {t.hero.label}
            </p>
            <h1 id="hero-title">
              {t.hero.title}
              <span className="title-period">.</span>
            </h1>
            <p className="hero-body">{t.hero.body}</p>
            <div className="hero-actions">
              <WhatsappLink locale={locale} ctaLocation="hero">{t.hero.cta}</WhatsappLink>
              <a className="text-link" href="#projects">
                {t.hero.secondary}
                <Icon name="arrow" />
              </a>
            </div>
          </div>
          <div className="hero-art" role="img" aria-label={t.hero.graphic}>
            <div className="art-cross art-cross-top" aria-hidden="true">
              +
            </div>
            <div className="idea-label mono">
              {t.hero.idea}
              <span aria-hidden="true">↘</span>
            </div>
            <div className="art-block art-peach" aria-hidden="true">
              <span>*</span>
            </div>
            <div className="art-block art-blue" aria-hidden="true">
              <Icon name="software" />
            </div>
            <div className="art-block art-paper" aria-hidden="true">
              <Icon name="external" />
            </div>
            <div className="art-caption mono">
              <span>{t.hero.code}</span>
              <span>{t.hero.result}</span>
            </div>
            <div className="art-cross art-cross-bottom" aria-hidden="true">
              +
            </div>
          </div>
          <div className="hero-baseline">
            <p>{t.hero.note}</p>
            <a href="#services" aria-label={t.nav.services}>
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <section
          className="section shell"
          id="services"
          aria-labelledby="services-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">{t.services.label}</p>
              <h2 id="services-title">{t.services.title}</h2>
            </div>
            <p className="section-intro">{t.services.intro}</p>
          </div>
          <div className="services-grid">
            {t.services.items.map((service) => (
              <article className="service" key={service.icon}>
                <div className={`service-icon service-icon-${service.icon}`}>
                  <Icon name={service.icon} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <span className="service-detail mono">{service.detail}</span>
              </article>
            ))}
          </div>
          <div className="invitation-note">
            <span className="invitation-star" aria-hidden="true">
              ✳
            </span>
            <p>
              <strong>{t.services.extra}</strong> {t.services.extraBody}
            </p>
            <a
              className="text-link"
              href="https://invitacion-phi-ten.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.services.extraLink}
              <Icon name="external" />
              <span className="sr-only"> ({t.external})</span>
            </a>
          </div>
        </section>

        <PackagesSection locale={locale} />

        <section
          className="projects-section section"
          id="projects"
          aria-labelledby="projects-title"
        >
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{t.projects.label}</p>
                <h2 id="projects-title">{t.projects.title}</h2>
              </div>
              <p className="section-intro">{t.projects.intro}</p>
            </div>
            <TruckflowCard
              labels={t.projects}
              available={assets["truckflow.webp"]}
              external={t.external}
            />
            <div className="projects-grid">
              {t.projects.items.map((project) => (
                <article className="project" key={project.image}>
                  <div className="demo-image">
                    <PortfolioImage
                      src={`/images/${project.image}`}
                      alt={`${t.projects.image} ${project.name}`}
                      label={t.projects.placeholder}
                      available={assets[project.image]}
                      sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 900px) 45vw, 380px"
                    />
                    <span className="demo-badge mono">Demo</span>
                  </div>
                  <div className="project-title">
                    <h3>{project.name}</h3>
                    <span className="mono">{project.type}</span>
                  </div>
                  <p>{project.description}</p>
                  <a
                    className="text-link project-link"
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.projects.demo}
                    <Icon name="external" />
                    <span className="sr-only">
                      : {project.name} ({t.external})
                    </span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="section shell process-section"
          id="process"
          aria-labelledby="process-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">{t.process.label}</p>
              <h2 id="process-title">{t.process.title}</h2>
            </div>
            <p className="section-intro">{t.process.intro}</p>
          </div>
          <ol className="process-steps">
            {t.process.steps.map((step, index) => (
              <li key={step.title}>
                <div className="step-track">
                  <span className="step-number mono">0{index + 1}</span>
                  {index < 3 && <Icon name="arrow" />}
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="about-section"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="shell about-grid">
            <div className="about-photo">
              <PortfolioImage
                src={`/images/${portrait}`}
                alt={t.about.portrait}
                label={t.about.placeholder}
                available={assets[portrait]}
                portrait
                sizes="(max-width: 760px) calc(100vw - 40px), 460px"
              />
              <div className="photo-caption">
                <span>Alejandro Vázquez</span>
                <span className="mono">{t.about.role}</span>
              </div>
            </div>
            <div className="about-copy">
              <p className="eyebrow">{t.about.label}</p>
              <h2 id="about-title">{t.about.title}</h2>
              {t.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <blockquote>{t.about.quote}</blockquote>
              <span className="signature" aria-hidden="true">
                Alejandro<span>.</span>
              </span>
            </div>
          </div>
        </section>

        <FaqSection locale={locale} />

        <section
          className="contact-section section"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="shell contact-grid">
            <div>
              <p className="eyebrow">{t.contact.label}</p>
              <h2 id="contact-title">{t.contact.title}</h2>
            </div>
            <div className="contact-content">
              <p>{t.contact.text}</p>
              <WhatsappLink locale={locale} light ctaLocation="contact">
                {t.contact.cta}
              </WhatsappLink>
              <span className="contact-note mono">{t.contact.note}</span>
            </div>
          </div>
        </section>
      </main>
      <EditorialFooter locale={locale} />
    </>
  );
}
