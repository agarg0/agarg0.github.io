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
        className="platform absolute right-[calc(10%-17cqh)] top-[41%] h-[20cqh] w-[74cqh] @max-lg:right-[calc(4%-9cqw)] @max-lg:top-[54cqw] @max-lg:h-[16cqw] @max-lg:w-[56cqw]"
      />
      <div
        data-intro="foe"
        className="absolute right-[10%] top-[15%] w-[40cqh] @max-lg:right-[4%] @max-lg:top-[30cqw] @max-lg:w-[38cqw]"
      >
        <Sprite entry={sprites.foe} label={profile.foeName} />
      </div>
      <div
        data-intro="foe-hud"
        className="absolute right-[10%] top-[3%] w-[min(28%,48cqh)] @max-lg:right-[3%] @max-lg:top-[14cqw] @max-lg:w-[46cqw]"
      >
        <HPBar name={profile.foeName} level={profile.foeLevel} hp={foeHp} side="foe" />
      </div>

      <div
        data-intro="player-platform"
        className="platform absolute bottom-[12%] left-[calc(8%-25cqh)] h-[28cqh] w-[110cqh] @max-lg:bottom-auto @max-lg:left-[calc(2%-14cqw)] @max-lg:top-[76cqw] @max-lg:h-[20cqw] @max-lg:w-[80cqw]"
      />
      <div
        data-intro="player"
        className="absolute bottom-[22%] left-[8%] w-[60cqh] @max-lg:bottom-auto @max-lg:left-[2%] @max-lg:top-[36cqw] @max-lg:w-[52cqw]"
      >
        <Sprite entry={sprites.player} label={profile.playerName} />
      </div>
      <div
        data-intro="player-hud"
        className="absolute left-[8%] top-[6%] w-[min(28%,48cqh)] @max-lg:left-[3%] @max-lg:top-[14cqw] @max-lg:w-[46cqw]"
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
