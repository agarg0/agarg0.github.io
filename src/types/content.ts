export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  foeName: string;
  playerName: string;
  foeLevel: number;
  playerLevel: number;
}

export interface Project {
  id: string;
  title: string;
  tag: string;
  summary: string;
  body: string;
  repoUrl?: string;
  liveUrl?: string;
  screenshot?: string;
}

export interface SkillGroup {
  label: string;
  skills: string[];
}

export interface TimelineEntry {
  id: string;
  org: string;
  role: string;
  start: string;
  end: string | "Present";
  summary: string;
}

export type AboutPanelId = "profile" | "bookshelf" | "setup";

export interface AboutPanel {
  id: AboutPanelId;
  title: string;
  subtitle: string;
  body: string;
}

export interface Contact {
  email: string;
  github: string;
  linkedin: string;
}

export interface SpriteSheet {
  src: string;
  frameWidth: number;
  frameHeight: number;
  frameCount: number;
  fps: number;
}

export interface SpriteEntry {
  static: string;
  idle?: SpriteSheet;
}

export interface SpriteManifest {
  foe: SpriteEntry;
  player: SpriteEntry;
}
