// PLACEHOLDER CONTENT — replace before launch
export const strings = {
  skipIntro: "SKIP",
  skipToSite: "Skip to traditional site",
  wildAppeared: "A wild {foe} appeared!",
  prompt: "What will {name} do?",
  attack: "{player} used {move}!",
  contactLine: "Got away safely!",
  backToBattle: "Back to battle",
  commands: {
    PROJECTS: "PROJECTS",
    RESUME: "RESUME",
    ABOUT: "ABOUT",
    CONTACT: "CONTACT",
  },
  moves: {
    PROJECTS: "FULL-STACK ATTACK",
    RESUME: "RESUME RUSH",
    ABOUT: "ORIGIN STORY",
  },
  hp: "HP",
  level: "Lv.",
} as const;

export function fill(template: string, tokens: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => tokens[key] ?? `{${key}}`);
}
