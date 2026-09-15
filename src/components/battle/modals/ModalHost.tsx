"use client";

import Image from "next/image";
import { about } from "@/content/about";
import { projects } from "@/content/projects";
import { strings } from "@/content/strings";
import type { ModalState } from "@/lib/battle-machine/types";
import { Markdown } from "@/components/shared/Markdown";
import { SkillGrid } from "@/components/shared/SkillGrid";
import { Timeline } from "@/components/shared/Timeline";
import { Modal } from "./Modal";

interface ModalHostProps {
  modal: ModalState | null;
  onClose: () => void;
}

const linkClass =
  "inline-flex items-center gap-1.5 rounded border border-border px-3 py-1.5 text-sm transition-colors hover:border-border-strong hover:bg-panel-raised focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent";

function resolve(modal: ModalState | null): { title: string; eyebrow: string; body: React.ReactNode } | null {
  if (!modal) return null;
  switch (modal.kind) {
    case "project": {
      const project = projects.find((p) => p.id === modal.id);
      if (!project) return null;
      return {
        title: project.title,
        eyebrow: `${strings.commands.PROJECTS} · ${project.tag}`,
        body: (
          <>
            <p className="text-muted">{project.summary}</p>
            {project.screenshot && (
              <div className="relative mt-5 aspect-video overflow-hidden rounded-lg border border-border">
                <Image src={project.screenshot} alt="" fill className="object-cover" />
              </div>
            )}
            <Markdown className="mt-5">{project.body}</Markdown>
            <div className="mt-6 flex flex-wrap gap-3">
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noreferrer" className={linkClass}>
                  View source ↗
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className={linkClass}>
                  Live ↗
                </a>
              )}
            </div>
          </>
        ),
      };
    }
    case "about": {
      const panel = about.find((p) => p.id === modal.id);
      if (!panel) return null;
      return {
        title: panel.title,
        eyebrow: strings.commands.ABOUT,
        body: (
          <>
            <p className="text-muted">{panel.subtitle}</p>
            <Markdown className="mt-5">{panel.body}</Markdown>
          </>
        ),
      };
    }
    case "skills":
      return { title: strings.resume.skills, eyebrow: strings.commands.RESUME, body: <SkillGrid /> };
    case "experience":
      return { title: strings.resume.experience, eyebrow: strings.commands.RESUME, body: <Timeline /> };
  }
}

export function ModalHost({ modal, onClose }: ModalHostProps) {
  const content = resolve(modal);
  return (
    <Modal
      open={content !== null}
      title={content?.title ?? ""}
      eyebrow={content?.eyebrow}
      onClose={onClose}
      returnFocusId={modal?.returnFocusId ?? null}
    >
      {content?.body}
    </Modal>
  );
}
