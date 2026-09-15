"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { contact } from "@/content/contact";
import { strings } from "@/content/strings";
import { TextBox } from "../TextBox";

const STAGGER_S = 0.35;
const ITEMS = [
  { id: "contact-email", label: contact.email, href: `mailto:${contact.email}`, external: false },
  { id: "contact-github", label: "GitHub", href: contact.github, external: true },
  { id: "contact-linkedin", label: "LinkedIn", href: contact.linkedin, external: true },
];

interface ContactRevealProps {
  onBack: () => void;
}

export function ContactReveal({ onBack }: ContactRevealProps) {
  const reduced = useReducedMotion();
  const [typed, setTyped] = useState(false);
  const onDone = useCallback(() => setTyped(true), []);

  useEffect(() => {
    if (typed) document.getElementById(ITEMS[0].id)?.focus({ preventScroll: true });
  }, [typed]);

  return (
    <div className="flex h-full gap-[1.5cqw] @max-lg:flex-col">
      <div className="flex-[1.2] px-[1.5cqw] py-[1cqw] @max-lg:flex-none">
        <TextBox text={strings.contactLine} onDone={onDone} />
      </div>
      <div
        role="group"
        aria-label={strings.commands.CONTACT}
        className="grid flex-1 grid-cols-2 grid-rows-2 gap-x-[1cqw] border-l-2 border-border pl-[1cqw] @max-lg:border-l-0 @max-lg:border-t-2 @max-lg:pl-0 @max-lg:pt-[1cqw]"
      >
        {typed &&
          ITEMS.map((item, i) => (
            <motion.a
              key={item.id}
              id={item.id}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              className="pixel-button pixel-text"
              initial={reduced ? false : { opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: reduced ? 0 : i * STAGGER_S, ease: "easeOut" }}
            >
              {item.label}
              {item.external && " ↗"}
            </motion.a>
          ))}
        {typed && (
          <motion.button
            type="button"
            onClick={onBack}
            className="pixel-button pixel-text-sm text-muted"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, delay: reduced ? 0 : ITEMS.length * STAGGER_S }}
          >
            {strings.back}
          </motion.button>
        )}
      </div>
    </div>
  );
}
