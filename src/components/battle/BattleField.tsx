"use client";

import { profile } from "@/content/profile";
import { sprites } from "@/content/sprites";
import { HPBar } from "./HPBar";
import { Sprite } from "./Sprite";

interface BattleFieldProps {
  foeHp: number;
  playerHp: number;
}

export function BattleField({ foeHp, playerHp }: BattleFieldProps) {
  return (
    <>
      <div
        data-intro="foe-platform"
        className="platform absolute right-[calc(10%-15cqh)] top-[30%] h-[20cqh] w-[74cqh] @max-lg:right-[calc(4%-10cqw)] @max-lg:top-[38cqw] @max-lg:h-[16cqw] @max-lg:w-[60cqw]"
      />
      <div
        data-intro="foe"
        className="absolute right-[10%] top-[2%] w-[44cqh] @max-lg:right-[4%] @max-lg:top-[12cqw] @max-lg:w-[40cqw]"
      >
        <Sprite entry={sprites.foe} label={profile.foeName} />
      </div>
      <div
        data-intro="foe-hud"
        className="absolute left-[4%] top-[6%] w-[min(36%,60cqh)] @max-lg:left-[3%] @max-lg:top-[14cqw] @max-lg:w-[50cqw]"
      >
        <HPBar name={profile.foeName} level={profile.foeLevel} hp={foeHp} side="foe" />
      </div>

      <div
        data-intro="player-platform"
        className="platform absolute bottom-[12%] left-[calc(8%-25cqh)] h-[28cqh] w-[110cqh] @max-lg:bottom-auto @max-lg:left-[calc(2%-14cqw)] @max-lg:top-[90cqw] @max-lg:h-[20cqw] @max-lg:w-[80cqw]"
      />
      <div
        data-intro="player"
        className="absolute bottom-[22%] left-[8%] w-[60cqh] @max-lg:bottom-auto @max-lg:left-[2%] @max-lg:top-[50cqw] @max-lg:w-[52cqw]"
      >
        <Sprite entry={sprites.player} label={profile.playerName} />
      </div>
      <div
        data-intro="player-hud"
        className="absolute bottom-[30%] right-[4%] w-[min(38%,66cqh)] @max-lg:bottom-auto @max-lg:right-[3%] @max-lg:top-[78cqw] @max-lg:w-[50cqw]"
      >
        <HPBar
          name={profile.playerName}
          level={profile.playerLevel}
          hp={playerHp}
          maxHp={profile.playerMaxHp}
          side="player"
          showNumbers
        />
      </div>
    </>
  );
}
