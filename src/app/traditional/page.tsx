import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { ProfessionalView } from "@/components/pro/ProfessionalView";

export const metadata: Metadata = {
  title: `${profile.name} — Portfolio`,
  description: profile.tagline,
};

export default function TraditionalPage() {
  return <ProfessionalView />;
}
