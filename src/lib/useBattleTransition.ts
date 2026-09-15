"use client";

import { useReducedMotion, type Variants, type Transition } from "motion/react";

export function useBattleTransition(): { variants: Variants; transition: Transition } {
  const reduced = useReducedMotion();
  if (reduced) {
    return {
      variants: { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } },
      transition: { duration: 0.001 },
    };
  }
  return {
    variants: {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -12 },
    },
    transition: { duration: 0.18, ease: "easeOut" },
  };
}
