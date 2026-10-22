"use client";
import { useEffect } from "react";

export function ScrollEffects() {
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const elements = Array.from(document.querySelectorAll<HTMLElement>("main h1, main h2, .service, .project, .featured-project, .about-photo, .section-intro, .contact-content, .package-card, .faq-list"));
    let observer: IntersectionObserver | undefined;
    let frame = 0;
    let displayedProgress = 0;
    let previousTime = 0;
    const steps = Array.from(document.querySelectorAll<HTMLElement>(".process-steps > li"));
    const section = document.querySelector<HTMLElement>("#process");
    const update = (time = performance.now()) => {
      frame = 0;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      // Spread the sequence across the viewport journey, then limit its speed
      // so a quick wheel gesture cannot activate several steps at once.
      const rawProgress = Math.max(0, Math.min(1, (innerHeight * .75 - rect.top) / (innerHeight * .75 + rect.height * .35)));
      const target = media.matches || rawProgress > .995 ? 1 : rawProgress;
      const elapsed = previousTime ? Math.min(time - previousTime, 64) : 16;
      previousTime = time;
      const difference = target - displayedProgress;
      const limit = elapsed * (difference >= 0 ? .0002 : .0005);
      displayedProgress = media.matches ? 1 : displayedProgress + Math.sign(difference) * Math.min(Math.abs(difference), limit);
      section.style.setProperty("--progress", String(displayedProgress));
      steps.forEach((step, i) => step.classList.toggle("step-active", media.matches || displayedProgress >= i / 3 - .0001));
      if (!media.matches && Math.abs(target - displayedProgress) > .00001) frame = requestAnimationFrame(update);
      else previousTime = 0;
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const setup = () => {
      observer?.disconnect();
      elements.forEach(el => el.classList.remove("reveal-pending"));
      if (!media.matches) {
        observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.remove("reveal-pending"); observer?.unobserve(entry.target); } }), { threshold: .12, rootMargin: "0px 0px -5% 0px" });
        elements.forEach((el, i) => { el.classList.add("reveal-item"); el.style.setProperty("--reveal-delay", `${i % 3 * 110}ms`); if (el.getBoundingClientRect().top > innerHeight) { el.classList.add("reveal-pending"); observer?.observe(el); } });
      }
      cancelAnimationFrame(frame);
      previousTime = 0;
      update();
    };
    setup(); media.addEventListener("change", setup); window.addEventListener("scroll", scroll, { passive: true }); window.addEventListener("resize", scroll);
    return () => { observer?.disconnect(); cancelAnimationFrame(frame); media.removeEventListener("change", setup); window.removeEventListener("scroll", scroll); window.removeEventListener("resize", scroll); elements.forEach(el => el.classList.remove("reveal-pending")); };
  }, []);
  return null;
}
