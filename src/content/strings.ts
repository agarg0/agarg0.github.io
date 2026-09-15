// PLACEHOLDER CONTENT — replace before launch
export const strings = {
  skipIntro: "SKIP",
  skipToSite: "Skip to traditional site",
  wildAppeared: "A wild {foe} appeared!",
  prompt: "What will {name} do?",
  contactLine: "Got away safely!",
  back: "BACK",
  commands: {
    PROJECTS: "PROJECTS",
    RESUME: "RESUME",
    ABOUT: "ABOUT",
    CONTACT: "CONTACT",
  },
  resume: {
    pdf: "Resume (PDF)",
    skills: "Skills",
    experience: "Experience",
  },
  hp: "HP",
  level: "Lv.",
} as const;

export function fill(template: string, tokens: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => tokens[key] ?? `{${key}}`);
}
