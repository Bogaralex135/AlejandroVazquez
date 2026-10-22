"use client";

import { useId, useState, type ReactNode } from "react";

export function Disclosure({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="commerce-disclosure">
      <button
        type="button"
        id={`${id}-button`}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
      >
        <span>{title}</span>
        <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      <div
        id={id}
        hidden={!open}
        className="disclosure-body"
        aria-labelledby={`${id}-button`}
      >
        {children}
      </div>
    </div>
  );
}
