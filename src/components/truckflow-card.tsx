"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/content";
import { Icon } from "./icon";
import { PortfolioImage } from "./portfolio-image";

export function TruckflowCard({
  labels,
  available,
  external,
}: {
  labels: Dictionary["projects"];
  available: boolean;
  external: string;
}) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const showingBack = flipped || hovered;

  return (
    <article className="featured-project">
      <div className="featured-meta">
        <span className="mono">{labels.featured}</span>
        <span className="project-status">
          <span />
          {labels.status}
        </span>
      </div>
      <div
        className="flip-scene"
        onPointerEnter={(event) => {
          if (
            event.pointerType === "mouse" &&
            window.matchMedia("(hover: hover)").matches
          )
            setHovered(true);
        }}
        onPointerLeave={() => setHovered(false)}
      >
        <div className={`flip-card ${showingBack ? "is-flipped" : ""}`}>
          <div className="flip-face flip-front" aria-hidden={showingBack}>
            <div className="featured-image-wrap">
              <PortfolioImage
                src="/images/truckflow.png"
                alt={`${labels.image} TruckFlow`}
                label={labels.placeholder}
                available={available}
                sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1280px) calc(100vw - 80px), 1160px"
              />
            </div>
            <div className="featured-front-title">
              <h3>
                TruckFlow<span aria-hidden="true">↗</span>
              </h3>
              <span className="mono">{labels.type}</span>
            </div>
          </div>
          <div
            className="flip-face flip-back"
            id="truckflow-details"
            aria-hidden={!showingBack}
          >
            <span className="mono">{labels.type}</span>
            <h3>TruckFlow</h3>
            <p>{labels.description}</p>
            <ul className="project-tags">
              {labels.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <span className="back-symbol" aria-hidden="true">
              <Icon name="software" />
            </span>
          </div>
        </div>
      </div>
      <div className="featured-actions">
        <button
          className="text-link flip-control"
          aria-controls="truckflow-details"
          aria-pressed={showingBack}
          onClick={() => {
            setFlipped(!showingBack);
            setHovered(false);
          }}
        >
          <Icon name="flip" />
          {showingBack ? labels.back : labels.flip}
        </button>
        <a
          href="https://truck-flow-jet.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link"
        >
          {labels.view}
          <Icon name="external" />
          <span className="sr-only"> ({external})</span>
        </a>
      </div>
    </article>
  );
}
