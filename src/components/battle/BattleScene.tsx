"use client";

import { useCallback, useRef, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useAnimate, useReducedMotion } from "motion/react";
import { profile } from "@/content/profile";
import { fill, strings } from "@/content/strings";
import { BattleMachineProvider, useBattle } from "@/lib/battle-machine/context";
import type { Command, ModalState } from "@/lib/battle-machine/types";
import { useBattleTransition } from "@/lib/useBattleTransition";
import { BattleField } from "./BattleField";
import { BottomPanel } from "./BottomPanel";
import { CommandGrid } from "./CommandGrid";
import { TextBox } from "./TextBox";
import { TitleCard } from "./TitleCard";
import { IntroSequence } from "./intro/IntroSequence";
import { AboutMenu } from "./menus/AboutMenu";
import { ContactExit } from "./menus/ContactExit";
import { ProjectsMenu } from "./menus/ProjectsMenu";
import { ResumeMenu } from "./menus/ResumeMenu";
import { ModalHost } from "./modals/ModalHost";

const INTRO_SEEN_KEY = "introSeen";
const LUNGE_MS = 260;
const HP_TWEEN_MS = 420;
const DAMAGE_PER_PROJECT = 15;

export function BattleScene() {
  return (
    <BattleMachineProvider>
      <Scene />
    </BattleMachineProvider>
  );
}

function Scene() {
  const { state, dispatch } = useBattle();
  const reduced = useReducedMotion();
  const [scope, animate] = useAnimate();
  const { variants, transition } = useBattleTransition();
  const attackTimers = useRef<number[]>([]);

  const onStart = useCallback(() => {
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
      window.sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
      seen = false;
    }
    dispatch({ type: "START", skipIntro: Boolean(reduced) || seen });
  }, [dispatch, reduced]);

  const onIntroComplete = useCallback(() => dispatch({ type: "INTRO_COMPLETE" }), [dispatch]);
  const onBack = useCallback(() => dispatch({ type: "BACK" }), [dispatch]);
  const onCloseModal = useCallback(() => dispatch({ type: "CLOSE_MODAL" }), [dispatch]);
  const onContactComplete = useCallback(() => dispatch({ type: "CONTACT_COMPLETE" }), [dispatch]);
  const onOpenModal = useCallback((modal: ModalState) => dispatch({ type: "OPEN_MODAL", modal }), [dispatch]);

  const onCommand = useCallback(
    (command: Command) => {
      if (command === "CONTACT") dispatch({ type: "CONTACT" });
      else dispatch({ type: "OPEN", menu: command });
    },
    [dispatch],
  );

  const onSelectProject = useCallback(
    (projectId: string, returnFocusId: string) => {
      const modal: ModalState = { kind: "project", id: projectId, returnFocusId };
      if (reduced) {
        dispatch({ type: "DAMAGE_FOE", amount: DAMAGE_PER_PROJECT });
        dispatch({ type: "OPEN_MODAL", modal });
        return;
      }
      attackTimers.current.forEach((id) => window.clearTimeout(id));
      animate("[data-intro='player']", { x: [0, 24, 0] }, { duration: LUNGE_MS / 1000, ease: "easeInOut" });
      attackTimers.current = [
        window.setTimeout(() => {
          animate("[data-intro='foe']", { opacity: [1, 0.3, 1, 0.3, 1] }, { duration: 0.3 });
          dispatch({ type: "DAMAGE_FOE", amount: DAMAGE_PER_PROJECT });
        }, LUNGE_MS),
        window.setTimeout(() => dispatch({ type: "OPEN_MODAL", modal }), LUNGE_MS + HP_TWEEN_MS),
      ];
    },
    [animate, dispatch, reduced],
  );

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape" && (state.screen === "PROJECTS" || state.screen === "RESUME" || state.screen === "ABOUT")) {
      dispatch({ type: "BACK" });
    }
  }

  const showField = state.screen !== "TITLE";

  return (
    <>
      <div
        ref={scope}
        onKeyDown={onKeyDown}
        inert={state.modal !== null}
        className="battle-scene border border-border bg-[radial-gradient(ellipse_at_50%_35%,#1a1a1f_0%,#111113_70%)]"
      >
        {state.screen === "TITLE" && <TitleCard onStart={onStart} />}

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
                    <div className="flex-1 border-l-2 border-border pl-[1cqw] @max-lg:border-l-0 @max-lg:border-t-2 @max-lg:pl-0 @max-lg:pt-[1cqw]">
                      <CommandGrid
                        onSelect={onCommand}
                        initialFocus={state.lastCommand}
                        autoFocus={state.lastCommand !== "CONTACT"}
                      />
                    </div>
                  </div>
                )}
                {state.screen === "PROJECTS" && <ProjectsMenu onSelect={onSelectProject} onBack={onBack} />}
                {state.screen === "RESUME" && <ResumeMenu onOpen={onOpenModal} onBack={onBack} />}
                {state.screen === "ABOUT" && <AboutMenu onOpen={onOpenModal} onBack={onBack} />}
                {state.screen === "CONTACT_EXIT" && <ContactExit onComplete={onContactComplete} />}
              </motion.div>
            </AnimatePresence>
          </BottomPanel>
        )}
      </div>

      <ModalHost modal={state.modal} onClose={onCloseModal} />
    </>
  );
}
