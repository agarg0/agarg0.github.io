"use client";

import { about } from "@/content/about";
import { strings } from "@/content/strings";
import { useFocusOnMount } from "@/lib/a11y/useFocusOnMount";
import type { ModalState } from "@/lib/battle-machine/types";
import { MenuList } from "./MenuList";

interface AboutMenuProps {
  onOpen: (modal: ModalState) => void;
  onBack: () => void;
}

export function AboutMenu({ onOpen, onBack }: AboutMenuProps) {
  const firstRef = useFocusOnMount<HTMLButtonElement>();
  return (
    <MenuList label={strings.commands.ABOUT} onBack={onBack} columns={2}>
      {about.map((panel, i) => {
        const id = `about-${panel.id}`;
        return (
          <button
            key={panel.id}
            id={id}
            ref={i === 0 ? firstRef : undefined}
            type="button"
            onClick={() => onOpen({ kind: "about", id: panel.id, returnFocusId: id })}
            className="pixel-button pixel-text flex items-baseline gap-[1.5cqw]"
          >
            <span>{panel.title}</span>
            <span className="pixel-text-sm truncate text-muted">{panel.subtitle}</span>
          </button>
        );
      })}
    </MenuList>
  );
}
