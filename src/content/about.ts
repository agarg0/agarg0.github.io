// PLACEHOLDER CONTENT — replace before launch
import type { AboutPanel } from "@/types/content";
import { profile } from "./profile";

export const about: [AboutPanel, AboutPanel, AboutPanel] = [
  {
    id: "profile",
    title: "Profile",
    subtitle: "Who I am and how I work",
    body: profile.bio,
  },
  {
    id: "bookshelf",
    title: "Bookshelf",
    subtitle: "Books and writing that shaped how I think",
    body: `- *Designing Data-Intensive Applications* — Martin Kleppmann
- *A Philosophy of Software Design* — John Ousterhout
- *The Pragmatic Programmer* — Hunt & Thomas

Placeholder list. Swap in what you've actually read and why it mattered.`,
  },
  {
    id: "setup",
    title: "Setup",
    subtitle: "Hardware, editor, and daily tools",
    body: `- **Machine:** placeholder
- **Editor:** placeholder
- **Terminal:** placeholder
- **Daily tools:** placeholder

Placeholder list. Keep it short and specific.`,
  },
];
