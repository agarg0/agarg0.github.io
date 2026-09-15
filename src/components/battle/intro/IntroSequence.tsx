"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { useAnimate } from "motion/react";
import { profile } from "@/content/profile";
import { fill, strings } from "@/content/strings";
import { BottomPanel } from "../BottomPanel";
import { ShinySparkle } from "../ShinySparkle";
import { TextBox } from "../TextBox";

type AnimateFn = ReturnType<typeof useAnimate>[1];

const FOE = "[data-intro='foe']";
const FOE_HUD = "[data-intro='foe-hud']";
const FOE_PLATFORM = "[data-intro='foe-platform']";
const PLAYER = "[data-intro='player']";
const PLAYER_HUD = "[data-intro='player-hud']";
const PLAYER_PLATFORM = "[data-intro='player-platform']";
const SWEEP = "[data-intro='sweep']";

const T_WILD_TEXT = 750;
const T_DONE = 1900;

interface IntroSequenceProps {
  animate: AnimateFn;
  onComplete: () => void;
}

export function IntroSequence({ animate, onComplete }: IntroSequenceProps) {
  const [line, setLine] = useState("");
  const [sparkle, setSparkle] = useState(false);
  const controlsRef = useRef<{ stop: () => void } | null>(null);
  const timersRef = useRef<number[]>([]);
  const doneRef = useRef(false);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    timersRef.current.forEach((id) => window.clearTimeout(id));
    controlsRef.current?.stop();
    animate([
      [FOE, { x: "0%", opacity: 1 }, { duration: 0 }],
      [FOE_HUD, { x: "0%", opacity: 1 }, { duration: 0 }],
      [FOE_PLATFORM, { opacity: 1 }, { duration: 0 }],
      [PLAYER, { x: "0%", opacity: 1 }, { duration: 0 }],
      [PLAYER_HUD, { x: "0%", opacity: 1 }, { duration: 0 }],
      [PLAYER_PLATFORM, { opacity: 1 }, { duration: 0 }],
    ]);
    onComplete();
  }, [animate, onComplete]);

  useEffect(() => {
    // Every element's first segment carries explicit "hidden" keyframes so the
    // timeline holds them offscreen from t=0 instead of reading the resting state.
    controlsRef.current = animate([
      [SWEEP, { x: ["-100%", "100%"] }, { duration: 0.35, ease: "easeInOut", at: 0 }],
      [FOE_PLATFORM, { opacity: [0, 1] }, { duration: 0.3, at: 0.3 }],
      [FOE, { x: ["200%", "0%"], opacity: [0, 1] }, { duration: 0.45, ease: "easeOut", at: 0.3 }],
      [FOE_HUD, { x: ["-130%", "0%"], opacity: [0, 1] }, { duration: 0.35, ease: "easeOut", at: 0.5 }],
      [PLAYER_PLATFORM, { opacity: [0, 1] }, { duration: 0.3, at: 1.3 }],
      [PLAYER, { x: "0%", opacity: [0, 1] }, { duration: 0.3, at: 1.3 }],
      [PLAYER_HUD, { x: "0%", opacity: [0, 1] }, { duration: 0.3, at: 1.4 }],
    ]);

    timersRef.current = [
      window.setTimeout(() => {
        setLine(fill(strings.wildAppeared, { foe: profile.foeName }));
        setSparkle(true);
      }, T_WILD_TEXT),
      window.setTimeout(finish, T_DONE),
    ];

    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, [animate, finish]);

  return (
    <>
      <div
        data-intro="sweep"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(90deg,transparent_0%,rgba(250,250,250,0.85)_50%,transparent_100%)]"
      />
      {sparkle && (
        <ShinySparkle className="right-[12%] top-[3%] h-[18%] w-[18%] @max-lg:right-[6%] @max-lg:top-[5%] @max-lg:w-[36%]" />
      )}
      <BottomPanel>
        <div className="flex h-full items-start justify-between gap-[2cqw] px-[1.5cqw] py-[1cqw]">
          {line ? <TextBox text={line} /> : <span />}
          <button
            type="button"
            onClick={finish}
            className="pixel-text-sm shrink-0 text-muted underline-offset-4 hover:text-fg hover:underline focus-visible:text-fg focus-visible:underline focus-visible:outline-none"
          >
            {strings.skipIntro}
          </button>
        </div>
      </BottomPanel>
    </>
  );
}
