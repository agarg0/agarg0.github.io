"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import type { SpriteEntry } from "@/types/content";

interface SpriteProps {
  entry: SpriteEntry;
  label: string;
  className?: string;
}

export function Sprite({ entry, label, className = "" }: SpriteProps) {
  const flip = entry.flip ? { transform: "scaleX(-1)" } : undefined;

  if (entry.idle && entry.idle.frameCount > 1) {
    const { src, frameWidth, frameHeight, frameCount, fps } = entry.idle;
    const style = {
      backgroundImage: `url(${src})`,
      backgroundSize: `${frameCount * 100}% 100%`,
      aspectRatio: `${frameWidth} / ${frameHeight}`,
      "--sprite-frames": frameCount,
      "--sprite-duration": `${frameCount / fps}s`,
      "--sprite-shift": `${(100 * frameCount) / (frameCount - 1)}%`,
      ...flip,
    } as CSSProperties;
    return <div role="img" aria-label={label} className={`sprite-sheet ${className}`} style={style} />;
  }

  return (
    <div className={`relative aspect-square ${className}`} style={flip}>
      <Image src={entry.static} alt={label} fill unoptimized className="object-contain" />
    </div>
  );
}
