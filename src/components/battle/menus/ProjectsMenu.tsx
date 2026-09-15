"use client";

import { projects } from "@/content/projects";
import { strings } from "@/content/strings";
import { useFocusOnMount } from "@/lib/a11y/useFocusOnMount";
import { MenuList } from "./MenuList";

interface ProjectsMenuProps {
  onSelect: (projectId: string, returnFocusId: string) => void;
  onBack: () => void;
}

export function projectButtonId(projectId: string) {
  return `project-${projectId}`;
}

export function ProjectsMenu({ onSelect, onBack }: ProjectsMenuProps) {
  const firstRef = useFocusOnMount<HTMLButtonElement>();
  return (
    <MenuList label={strings.commands.PROJECTS} onBack={onBack} columns={2}>
      {projects.map((project, i) => {
        const id = projectButtonId(project.id);
        return (
          <button
            key={project.id}
            id={id}
            ref={i === 0 ? firstRef : undefined}
            type="button"
            onClick={() => onSelect(project.id, id)}
            className="pixel-button pixel-text flex items-center justify-between gap-[1cqw]"
          >
            <span className="truncate">{project.title}</span>
            <span className="pixel-text-sm shrink-0 text-muted">{project.tag}</span>
          </button>
        );
      })}
    </MenuList>
  );
}
