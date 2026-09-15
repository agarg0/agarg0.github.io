"use client";

import { profile } from "@/content/profile";
import { strings } from "@/content/strings";

interface TitleCardProps {
  onStart: () => void;
}

export function TitleCard({ onStart }: TitleCardProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-[4cqw] px-[8cqw] text-center">
      <h1 className="pixel-text text-fg" style={{ fontSize: "clamp(0.9rem, 3.6cqw, 1.8rem)" }}>
        {profile.name}
      </h1>
      <p className="font-body max-w-[60ch] text-[clamp(0.8rem,2cqw,1.05rem)] leading-relaxed text-muted">
        {profile.tagline}
      </p>
      <button
        type="button"
        onClick={onStart}
        className="pixel-text pixel-box mt-[2cqw] px-[4cqw] py-[2cqw] text-fg transition-colors hover:bg-panel-raised focus-visible:bg-panel-raised focus-visible:outline-none"
      >
        <span className="text-accent">▶ </span>
        {strings.pressStart}
      </button>
    </div>
  );
}
