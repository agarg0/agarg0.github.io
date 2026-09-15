"use client";

import { strings } from "@/content/strings";
import { useFocusOnMount } from "@/lib/a11y/useFocusOnMount";
import type { ModalState } from "@/lib/battle-machine/types";
import { MenuList } from "./MenuList";

interface ResumeMenuProps {
  onOpen: (modal: ModalState) => void;
  onBack: () => void;
}

export function ResumeMenu({ onOpen, onBack }: ResumeMenuProps) {
  const firstRef = useFocusOnMount<HTMLAnchorElement>();
  return (
    <MenuList label={strings.commands.RESUME} onBack={onBack}>
      <a
        ref={firstRef}
        id="resume-pdf"
        href="/resume.pdf"
        target="_blank"
        rel="noreferrer"
        className="pixel-button pixel-text block"
      >
        {strings.resume.pdf} ↗
      </a>
      <button
        id="resume-skills"
        type="button"
        onClick={() => onOpen({ kind: "skills", id: "skills", returnFocusId: "resume-skills" })}
        className="pixel-button pixel-text"
      >
        {strings.resume.skills}
      </button>
      <button
        id="resume-experience"
        type="button"
        onClick={() => onOpen({ kind: "experience", id: "experience", returnFocusId: "resume-experience" })}
        className="pixel-button pixel-text"
      >
        {strings.resume.experience}
      </button>
    </MenuList>
  );
}
