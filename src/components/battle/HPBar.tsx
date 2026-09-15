"use client";

import { motion, useReducedMotion } from "motion/react";
import { strings } from "@/content/strings";

interface HPBarProps {
  name: string;
  level: number;
  hp: number;
  showNumbers?: boolean;
  onTweenComplete?: () => void;
}

function hpColor(hp: number) {
  if (hp <= 25) return "var(--color-hp-low)";
  if (hp <= 50) return "var(--color-hp-mid)";
  return "var(--color-hp-high)";
}

export function HPBar({ name, level, hp, showNumbers = false, onTweenComplete }: HPBarProps) {
  const reduced = useReducedMotion();
  return (
    <div className="pixel-box px-[3cqw] py-[1.6cqw] @max-lg:px-[4cqw] @max-lg:py-[2.4cqw]">
      <div className="pixel-text flex items-baseline justify-between gap-2">
        <span className="truncate">{name}</span>
        <span className="pixel-text-sm text-muted shrink-0">
          {strings.level}
          {level}
        </span>
      </div>
      <div className="mt-[1cqw] flex items-center gap-[1.2cqw]">
        <span className="pixel-text-sm text-hp-high shrink-0">{strings.hp}</span>
        <div
          role="meter"
          aria-label={`${name} ${strings.hp}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={hp}
          className="h-[1.4cqw] min-h-1.5 flex-1 border border-border-strong bg-canvas"
        >
          <motion.div
            className="h-full"
            initial={false}
            animate={{ width: `${hp}%`, backgroundColor: hpColor(hp) }}
            transition={{ duration: reduced ? 0.001 : 0.4, ease: "easeOut" }}
            onAnimationComplete={onTweenComplete}
          />
        </div>
      </div>
      {showNumbers && (
        <div className="pixel-text-sm mt-[0.8cqw] text-right text-muted">
          {hp}/100
        </div>
      )}
    </div>
  );
}
