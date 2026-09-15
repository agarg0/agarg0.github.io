// See docs/ASSET_SPEC.md for the asset contract.
import type { SpriteManifest } from "@/types/content";

export const sprites: SpriteManifest = {
  foe: {
    static: "/sprites/foe/idle-static.png",
    idle: { src: "/sprites/foe/idle-sheet.png", frameWidth: 110, frameHeight: 98, frameCount: 63, fps: 10 },
  },
  player: {
    static: "/sprites/player/idle-static.png",
  },
};
