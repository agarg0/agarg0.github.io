import { BattleScene } from "@/components/battle/BattleScene";
import { SkipLink } from "@/components/battle/SkipLink";

export default function Home() {
  return (
    <main className="relative">
      <div className="absolute left-4 top-3 z-30">
        <SkipLink />
      </div>
      <BattleScene />
    </main>
  );
}
