"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BattleScene } from "@/components/battle/BattleScene";
import { SkipLink } from "@/components/battle/SkipLink";
import { commandButtonId } from "@/components/battle/CommandGrid";
import { ProfessionalView } from "@/components/pro/ProfessionalView";
import type { Command } from "@/lib/battle-machine/types";

const WIPE_MS = 380;
const SECTION_FOR: Record<Command, string> = {
  PROJECTS: "projects",
  RESUME: "resume",
  ABOUT: "about",
  CONTACT: "contact",
};

type View = "battle" | "pro";

export function Site() {
  const [view, setView] = useState<View>("battle");
  const [wiping, setWiping] = useState(false);
  const pending = useRef<{ view: View; section: string | null; returnTo: Command | null } | null>(null);
  const timers = useRef<number[]>([]);

  const go = useCallback((next: View, section: string | null, returnTo: Command | null) => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    pending.current = { view: next, section, returnTo };
    timers.current.forEach((id) => window.clearTimeout(id));
    setWiping(true);
    timers.current = [
      window.setTimeout(
        () => {
          setView(next);
          timers.current.push(window.setTimeout(() => setWiping(false), 40));
        },
        reduced ? 0 : WIPE_MS,
      ),
    ];
  }, []);

  useEffect(() => {
    const target = pending.current;
    if (!target || target.view !== view) return;
    pending.current = null;
    if (view === "pro") {
      const section = target.section ? document.getElementById(target.section) : null;
      if (section) {
        section.scrollIntoView({ behavior: "auto", block: "start" });
        document.getElementById(`${target.section}-heading`)?.focus({ preventScroll: true });
      } else {
        window.scrollTo(0, 0);
      }
    } else {
      window.scrollTo(0, 0);
      document.getElementById(commandButtonId(target.returnTo ?? "PROJECTS"))?.focus({ preventScroll: true });
    }
  }, [view]);

  useEffect(() => () => timers.current.forEach((id) => window.clearTimeout(id)), []);

  const onTakeover = useCallback((command: Command) => go("pro", SECTION_FOR[command], command), [go]);
  const onFlee = useCallback(() => go("battle", null, null), [go]);

  return (
    <>
      <div hidden={view !== "battle"} className="relative">
        <div className="absolute left-4 top-3 z-30">
          <SkipLink />
        </div>
        <BattleScene active={view === "battle"} onTakeover={onTakeover} />
      </div>
      <div hidden={view !== "pro"}>
        <ProfessionalView onFlee={onFlee} />
      </div>
      <div
        aria-hidden="true"
        data-wipe={wiping ? "on" : "off"}
        className={`fixed inset-0 z-[60] bg-black transition-opacity duration-[380ms] ease-in-out motion-reduce:transition-none ${wiping ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
    </>
  );
}
