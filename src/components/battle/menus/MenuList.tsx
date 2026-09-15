"use client";

import type { ReactNode } from "react";
import { strings } from "@/content/strings";

interface MenuListProps {
  label: string;
  onBack: () => void;
  children: ReactNode;
  columns?: 1 | 2;
}

export function MenuList({ label, onBack, children, columns = 1 }: MenuListProps) {
  return (
    <div role="group" aria-label={label} className="flex flex-col">
      <div className={`grid content-start ${columns === 2 ? "grid-cols-2 gap-x-[1cqw]" : "grid-cols-1"}`}>
        {children}
      </div>
      <button type="button" onClick={onBack} className="pixel-button pixel-text-sm text-muted">
        {strings.back}
      </button>
    </div>
  );
}
