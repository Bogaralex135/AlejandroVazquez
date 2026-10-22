"use client";

import Image from "next/image";
import { useState } from "react";

export function PortfolioImage({
  src,
  alt,
  label,
  available,
  portrait = false,
  sizes,
}: {
  src: string;
  alt: string;
  label: string;
  available: boolean;
  portrait?: boolean;
  sizes: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className={`portfolio-image ${portrait ? "portrait-image" : "project-image"}`}
    >
      {available && !failed ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          className={`image-placeholder ${portrait ? "portrait-placeholder" : ""}`}
          role="img"
          aria-label={`${alt}. ${label}`}
        >
          {portrait ? (
            <span className="portrait-monogram" aria-hidden="true">
              av<span>.</span>
            </span>
          ) : (
            <div className="placeholder-window" aria-hidden="true">
              <div className="placeholder-toolbar">
                <i />
                <i />
                <i />
              </div>
              <div className="placeholder-content">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
          <span className="placeholder-label">{label}</span>
        </div>
      )}
    </div>
  );
}
