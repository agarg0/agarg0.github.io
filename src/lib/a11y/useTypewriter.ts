"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const MS_PER_CHAR = 30;

export function useTypewriter(text: string, enabled = true) {
  const reduced = useReducedMotion();
  const instant = !enabled || reduced;
  const [count, setCount] = useState(0);
  const [prevText, setPrevText] = useState(text);

  if (text !== prevText) {
    setPrevText(text);
    setCount(0);
  }

  useEffect(() => {
    if (instant) return;
    const id = window.setInterval(() => {
      setCount((c) => {
        if (c + 1 >= text.length) window.clearInterval(id);
        return c + 1;
      });
    }, MS_PER_CHAR);
    return () => window.clearInterval(id);
  }, [text, instant]);

  const shown = instant ? text.length : Math.min(count, text.length);
  return { display: text.slice(0, shown), done: shown >= text.length };
}
