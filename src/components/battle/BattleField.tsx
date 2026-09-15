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
        className="platform absolute right-[4%] top-[26%] h-[12%] w-[34%] @max-lg:right-[2%] @max-lg:top-[27%] @max-lg:h-[6%] @max-lg:w-[44%]"
      />
      <div
        data-intro="foe"
        className="absolute right-[12%] top-[3%] w-[18%] @max-lg:right-[6%] @max-lg:top-[5%] @max-lg:w-[36%]"
      >
        <Sprite entry={sprites.foe} label={profile.foeName} />
      </div>
      <div
        data-intro="foe-hud"
        className="absolute left-[4%] top-[6%] w-[38%] @max-lg:top-[3%] @max-lg:w-[56%]"
      >
        <HPBar name={profile.foeName} level={profile.foeLevel} hp={foeHp} />
      </div>

      <div
        data-intro="player-platform"
        className="platform absolute bottom-[27%] left-[2%] h-[12%] w-[46%] @max-lg:bottom-auto @max-lg:left-0 @max-lg:top-[48%] @max-lg:h-[6%] @max-lg:w-[52%]"
      />
      <div
        data-intro="player"
        className="absolute bottom-[30%] left-[13%] w-[24%] @max-lg:bottom-auto @max-lg:left-[6%] @max-lg:top-[24%] @max-lg:w-[40%]"
      >
        <Sprite entry={sprites.player} label={profile.playerName} />
      </div>
      <div
        data-intro="player-hud"
        className="absolute bottom-[33%] right-[4%] w-[40%] @max-lg:bottom-auto @max-lg:top-[40%] @max-lg:w-[50%]"
      >
        <HPBar name={profile.playerName} level={profile.playerLevel} hp={playerHp} showNumbers />
      </div>
    </>
  );
}
