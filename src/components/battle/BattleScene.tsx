"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimate, useReducedMotion } from "motion/react";
import { profile } from "@/content/profile";
import { fill, strings } from "@/content/strings";
import { BattleMachineProvider, useBattle } from "@/lib/battle-machine/context";
import type { Command } from "@/lib/battle-machine/types";
import { useBattleTransition } from "@/lib/useBattleTransition";
import { Backdrop } from "./Backdrop";
import { BattleField } from "./BattleField";
import { BottomPanel } from "./BottomPanel";
import { CommandGrid } from "./CommandGrid";
import { SkyCanvas } from "./SkyCanvas";
import { TextBox } from "./TextBox";
import { IntroSequence } from "./intro/IntroSequence";

const LUNGE_MS = 260;
const DAMAGE_PER_ATTACK = 15;
const HOLD_AFTER_TEXT_MS = 650;

interface BattleSceneProps {
  active: boolean;
  onTakeover: (command: Command) => void;
}

export function BattleScene(props: BattleSceneProps) {
  return (
    <BattleMachineProvider>
      <Scene {...props} />
    </BattleMachineProvider>
  );
}

function attackLine(command: Command) {
  if (command === "CONTACT") return strings.contactLine;
  return fill(strings.attack, { player: profile.playerName, move: strings.moves[command] });
}

function Scene({ active, onTakeover }: BattleSceneProps) {
  const { state, dispatch } = useBattle();
  const reduced = useReducedMotion();
  const [scope, animate] = useAnimate();
  const { variants, transition } = useBattleTransition();
  const attackTimers = useRef<number[]>([]);
  const [typed, setTyped] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    dispatch({ type: "START", skipIntro: prefersReduced });
  }, [dispatch]);

  const onIntroComplete = useCallback(() => dispatch({ type: "INTRO_COMPLETE" }), [dispatch]);
  const onTyped = useCallback(() => setTyped(true), []);

  const onCommand = useCallback(
    (command: Command) => {
      setTyped(false);
      dispatch({ type: "ATTACK", command });
      if (command === "CONTACT") return;
      attackTimers.current.forEach((id) => window.clearTimeout(id));
      if (reduced) {
        dispatch({ type: "DAMAGE_FOE", amount: DAMAGE_PER_ATTACK });
        return;
      }
      animate("[data-intro='player']", { x: [0, 28, 0] }, { duration: LUNGE_MS / 1000, ease: "easeInOut" });
      attackTimers.current = [
        window.setTimeout(() => {
          animate("[data-intro='foe']", { opacity: [1, 0.3, 1, 0.3, 1], x: [0, 6, -6, 4, 0] }, { duration: 0.32 });
          dispatch({ type: "DAMAGE_FOE", amount: DAMAGE_PER_ATTACK });
        }, LUNGE_MS),
      ];
    },
    [animate, dispatch, reduced],
  );

  useEffect(() => {
    if (state.screen !== "ATTACK" || !typed || !state.lastCommand) return;
    const command = state.lastCommand;
    const id = window.setTimeout(() => {
      onTakeover(command);
      dispatch({ type: "ATTACK_COMPLETE" });
    }, HOLD_AFTER_TEXT_MS);
    return () => window.clearTimeout(id);
  }, [state.screen, state.lastCommand, typed, onTakeover, dispatch]);

  const showField = state.screen !== "BOOT";

  return (
    <div ref={scope} className="battle-scene">
      <Backdrop />
      <SkyCanvas active={active} />
      {showField && (
        <div className={state.screen === "INTRO" ? "contents intro-pending" : "contents"}>
          <BattleField foeHp={state.foeHp} playerHp={state.playerHp} />
        </div>
      )}

      {state.screen === "INTRO" && <IntroSequence animate={animate} onComplete={onIntroComplete} />}

      {showField && state.screen !== "INTRO" && (
        <BottomPanel>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={state.screen}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={transition}
              className="h-full"
            >
              {state.screen === "MAIN_MENU" && (
                <div className="flex h-full gap-[1.5cqw] @max-lg:flex-col">
                  <div className="flex-[1.2] px-[1.5cqw] py-[1cqw] @max-lg:flex-none">
                    <TextBox text={fill(strings.prompt, { name: profile.name })} typing={false} />
                  </div>
                  <div className="flex-1 @max-lg:min-h-0 @max-lg:flex-1">
                    <CommandGrid onSelect={onCommand} initialFocus={state.lastCommand} />
                  </div>
                </div>
              )}
              {state.screen === "ATTACK" && state.lastCommand && (
                <div className="flex h-full items-start px-[1.5cqw] py-[1cqw]">
                  <TextBox text={attackLine(state.lastCommand)} onDone={onTyped} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </BottomPanel>
      )}
    </div>
  );
}
