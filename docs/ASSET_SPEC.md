# Sprite Asset Spec

The battle scene ships with flat placeholder silhouettes (`public/sprites/placeholder/*.svg`). Real sprites replace them by dropping files at the paths below and editing `src/content/sprites.ts` — no component changes.

## Format

- PNG-32 with alpha (transparent background). No GIF or animated WebP: animation is driven by CSS `steps()` so it can be paused under `prefers-reduced-motion`.
- Fixed square frames. 96×96 recommended; 128×128 acceptable. Foe and player must use the same frame size.
- Sprite sheets are a single horizontal strip, frame 0 first, no padding between frames.
- Pixel art should be exported at 1× (no pre-upscaling); the site renders with `image-rendering: pixelated`.

## Files

| Path | Required | Notes |
|---|---|---|
| `public/sprites/foe/idle-static.png` | yes | Front view, single frame |
| `public/sprites/player/idle-static.png` | yes | Back view, single frame |
| `public/sprites/foe/idle-sheet.png` | optional | 4–8 frames, 8 fps |
| `public/sprites/player/idle-sheet.png` | optional | 4–8 frames, 8 fps |
| `public/sprites/effects/sparkle-sheet.png` | optional | 6–10 frames; the procedural sparkle is used if absent |
| `public/sprites/LICENSE.txt` | yes | License of the pack the art came from |

## Manifest

Each sheet is declared in `src/content/sprites.ts`:

```ts
export const sprites: SpriteManifest = {
  foe: {
    static: "/sprites/foe/idle-static.png",
    idle: { src: "/sprites/foe/idle-sheet.png", frameWidth: 96, frameHeight: 96, frameCount: 6, fps: 8 },
  },
  player: {
    static: "/sprites/player/idle-static.png",
    idle: { src: "/sprites/player/idle-sheet.png", frameWidth: 96, frameHeight: 96, frameCount: 6, fps: 8 },
  },
};
```

`static` alone is enough; `idle` is optional.

## Licensing

Use art from a pack whose license permits use on a personal website (CC0, CC-BY with attribution, or a purchased itch.io license that allows web use). Do not use ripped or redrawn copyrighted characters. Keep the license text in `public/sprites/LICENSE.txt` and, for CC-BY, add attribution to the contact section.
