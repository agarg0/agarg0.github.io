"use client";

import { motion, useReducedMotion } from "motion/react";
import { strings } from "@/content/strings";

interface HPBarProps {
  name: string;
  level: number;
  hp: number;
  showNumbers?: boolean;
  maxHp?: number;
  side: "foe" | "player";
  onTweenComplete?: () => void;
}

function hpLevel(hp: number) {
  if (hp <= 25) return "low";
  if (hp <= 50) return "mid";
  return "high";
}

export function HPBar({ name, level, hp, showNumbers = false, maxHp = 100, side, onTweenComplete }: HPBarProps) {
  const reduced = useReducedMotion();
  const current = Math.round((hp / 100) * maxHp);
  return (
    <div
      data-side={side}
      className={`hud-box py-[0.9cqw] @max-lg:py-[2cqw] ${side === "foe" ? "pl-[1.8cqw] pr-[3cqw] @max-lg:pl-[3.5cqw] @max-lg:pr-[5.5cqw]" : "pl-[3cqw] pr-[1.8cqw] @max-lg:pl-[5.5cqw] @max-lg:pr-[3.5cqw]"}`}
    >
      <div className="pixel-text-sm flex items-baseline justify-between gap-[1em]">
        <span className="truncate">{name}</span>
        <span className="pixel-text-xs shrink-0">
          <span className="text-hp-mid">{strings.level}</span>
          {level}
        </span>
      </div>
      <div className="hp-track pixel-text-xs mt-[0.3em] flex items-center gap-[0.5em]">
        <span className="hp-tag shrink-0">{strings.hp}</span>
        <div
          role="meter"
          aria-label={`${name} ${strings.hp}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={hp}
          aria-valuetext={`${current} of ${maxHp}`}
          className="hp-meter flex-1"
        >
          <motion.div
            className="hp-fill"
            data-level={hpLevel(hp)}
            initial={false}
            animate={{ width: `${hp}%` }}
            transition={{ duration: reduced ? 0.001 : 0.4, ease: "easeOut" }}
            onAnimationComplete={onTweenComplete}
          />
        </div>
      </div>
      {showNumbers && (
        <div className="pixel-text-xs mt-[0.2em] text-right">
          {current}/{maxHp}
        </div>
      )}
    </div>
  );
}
