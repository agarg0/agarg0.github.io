import type { Action, BattleState } from "./types";

const FOE_HP_FLOOR = 20;

export function reducer(state: BattleState, action: Action): BattleState {
  switch (action.type) {
    case "START":
      if (state.screen !== "BOOT") return state;
      return { ...state, screen: action.skipIntro ? "MAIN_MENU" : "INTRO" };

    case "INTRO_COMPLETE":
      if (state.screen !== "INTRO") return state;
      return { ...state, screen: "MAIN_MENU" };

    case "ATTACK":
      if (state.screen !== "MAIN_MENU") return state;
      return { ...state, screen: "ATTACK", lastCommand: action.command };

    case "ATTACK_COMPLETE":
      if (state.screen !== "ATTACK") return state;
      return { ...state, screen: "MAIN_MENU" };

    case "DAMAGE_FOE":
      return { ...state, foeHp: Math.max(FOE_HP_FLOOR, state.foeHp - action.amount) };
  }
}
