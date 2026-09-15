"use client";

import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { strings } from "@/content/strings";
import { TextBox } from "../TextBox";

const SCROLL_DELAY_MS = 400;

interface ContactExitProps {
  onComplete: () => void;
}

export function ContactExit({ onComplete }: ContactExitProps) {
  const reduced = useReducedMotion();
  const [typed, setTyped] = useState(false);
  const onDone = useCallback(() => setTyped(true), []);

  useEffect(() => {
    if (!typed) return;
    const id = window.setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      document.getElementById("contact-heading")?.focus({ preventScroll: true });
      onComplete();
    }, SCROLL_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [typed, reduced, onComplete]);

  return (
    <div className="flex h-full items-start px-[1.5cqw] py-[1cqw]">
      <TextBox text={strings.contactLine} onDone={onDone} />
    </div>
  );
}
