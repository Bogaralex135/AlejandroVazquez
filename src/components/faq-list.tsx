"use client";
import { useId, useState } from "react";
import { Disclosure } from "./disclosure";

export function FaqList({ items, more, less }: { items: { question: string; answer: string }[]; more: string; less: string }) {
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  return <div className="faq-list"><div>{items.slice(0,8).map(item => <Disclosure title={item.question} key={item.question}><p>{item.answer}</p></Disclosure>)}</div><div id={id} hidden={!expanded}>{items.slice(8).map(item => <Disclosure title={item.question} key={item.question}><p>{item.answer}</p></Disclosure>)}</div><button type="button" className="faq-more text-link" aria-expanded={expanded} aria-controls={id} onClick={() => setExpanded(!expanded)}>{expanded ? less : more}<span aria-hidden="true">{expanded ? "−" : "+"}</span></button></div>;
}
