"use client";

import { useEffect, useRef, type KeyboardEvent } from "react";
import { strings } from "@/content/strings";
import type { Command } from "@/lib/battle-machine/types";

const COMMANDS: Command[] = ["PROJECTS", "RESUME", "ABOUT", "CONTACT"];

export function commandButtonId(command: Command) {
  return `cmd-${command}`;
}

interface CommandGridProps {
  onSelect: (command: Command) => void;
  initialFocus: Command | null;
}

export function CommandGrid({ onSelect, initialFocus }: CommandGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = initialFocus ?? COMMANDS[0];
    gridRef.current
      ?.querySelector<HTMLButtonElement>(`#${commandButtonId(target)}`)
      ?.focus({ preventScroll: true });
  }, [initialFocus]);

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const buttons = Array.from(gridRef.current?.querySelectorAll<HTMLButtonElement>("button") ?? []);
    const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
    if (index === -1) return;
    let next = index;
    switch (e.key) {
      case "ArrowRight":
        next = Math.min(index + 1, buttons.length - 1);
        break;
      case "ArrowLeft":
        next = Math.max(index - 1, 0);
        break;
      case "ArrowDown":
        next = Math.min(index + 2, buttons.length - 1);
        break;
      case "ArrowUp":
        next = Math.max(index - 2, 0);
        break;
      default:
        return;
    }
    e.preventDefault();
    buttons[next]?.focus();
  }

  return (
    <div
      ref={gridRef}
      role="group"
      aria-label="Navigation"
      onKeyDown={onKeyDown}
      className="grid h-full grid-cols-2 grid-rows-2 gap-[0.8cqw] @max-lg:gap-[1.6cqw]"
    >
      {COMMANDS.map((command) => (
        <button
          key={command}
          id={commandButtonId(command)}
          type="button"
          data-command={command}
          onClick={() => onSelect(command)}
          className="cmd-btn pixel-text"
        >
          {strings.commands[command]}
        </button>
      ))}
    </div>
  );
}
