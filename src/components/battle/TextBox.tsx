"use client";

import { useEffect } from "react";
import { useTypewriter } from "@/lib/a11y/useTypewriter";

interface TextBoxProps {
  text: string;
  typing?: boolean;
  onDone?: () => void;
  className?: string;
}

export function TextBox({ text, typing = true, onDone, className = "" }: TextBoxProps) {
  const { display, done } = useTypewriter(text, typing);

  useEffect(() => {
    if (done) onDone?.();
  }, [done, onDone]);

  return (
    <div className={`pixel-text ${className}`}>
      <span className="sr-only" role="status" aria-live="polite">
        {text}
      </span>
      <span aria-hidden="true">
        {display}
        {!done && <span className="animate-pulse">▌</span>}
      </span>
    </div>
  );
}
