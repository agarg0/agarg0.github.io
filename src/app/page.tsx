import { BattleScene } from "@/components/battle/BattleScene";
import { SkipLink } from "@/components/battle/SkipLink";
import { ContactSection } from "@/components/shared/ContactSection";

export default function Home() {
  return (
    <>
      <header className="flex h-20 items-center justify-end px-4">
        <SkipLink />
      </header>
      <main className="flex-1">
        <div className="px-4">
          <BattleScene />
        </div>
        <ContactSection />
      </main>
    </>
  );
}
