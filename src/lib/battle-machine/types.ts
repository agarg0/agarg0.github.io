export type Screen = "BOOT" | "INTRO" | "MAIN_MENU" | "ATTACK";

export type Command = "PROJECTS" | "RESUME" | "ABOUT" | "CONTACT";

export interface BattleState {
  screen: Screen;
  foeHp: number;
  playerHp: number;
  lastCommand: Command | null;
}

export type Action =
  | { type: "START"; skipIntro: boolean }
  | { type: "INTRO_COMPLETE" }
  | { type: "ATTACK"; command: Command }
  | { type: "ATTACK_COMPLETE" }
  | { type: "DAMAGE_FOE"; amount: number };

export const initialState: BattleState = {
  screen: "BOOT",
  foeHp: 100,
  playerHp: 100,
  lastCommand: null,
};
