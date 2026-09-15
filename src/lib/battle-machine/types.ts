export type Screen =
  | "BOOT"
  | "INTRO"
  | "MAIN_MENU"
  | "PROJECTS"
  | "RESUME"
  | "ABOUT"
  | "CONTACT_EXIT";

export type SubMenu = "PROJECTS" | "RESUME" | "ABOUT";
export type Command = SubMenu | "CONTACT";
export type ModalKind = "project" | "about" | "skills" | "experience";

export interface ModalState {
  kind: ModalKind;
  id: string;
  returnFocusId: string;
}

export interface BattleState {
  screen: Screen;
  modal: ModalState | null;
  foeHp: number;
  playerHp: number;
  lastCommand: Command | null;
}

export type Action =
  | { type: "START"; skipIntro: boolean }
  | { type: "INTRO_COMPLETE" }
  | { type: "OPEN"; menu: SubMenu }
  | { type: "BACK" }
  | { type: "CONTACT" }
  | { type: "OPEN_MODAL"; modal: ModalState }
  | { type: "CLOSE_MODAL" }
  | { type: "DAMAGE_FOE"; amount: number };

export const initialState: BattleState = {
  screen: "BOOT",
  modal: null,
  foeHp: 100,
  playerHp: 100,
  lastCommand: null,
};
