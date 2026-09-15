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

    case "OPEN":
      if (state.screen !== "MAIN_MENU") return state;
      return { ...state, screen: action.menu, lastCommand: action.menu };

    case "BACK":
      if (
        state.screen !== "PROJECTS" &&
        state.screen !== "RESUME" &&
        state.screen !== "ABOUT" &&
        state.screen !== "CONTACT_EXIT"
      ) {
        return state;
      }
      return { ...state, screen: "MAIN_MENU" };

    case "CONTACT":
      if (state.screen !== "MAIN_MENU") return state;
      return { ...state, screen: "CONTACT_EXIT", lastCommand: "CONTACT" };

    case "OPEN_MODAL":
      return { ...state, modal: action.modal };

    case "CLOSE_MODAL":
      return { ...state, modal: null };

    case "DAMAGE_FOE":
      return { ...state, foeHp: Math.max(FOE_HP_FLOOR, state.foeHp - action.amount) };
  }
}
