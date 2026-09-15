"use client";

import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from "react";
import { reducer } from "./reducer";
import { initialState, type Action, type BattleState } from "./types";

interface BattleContextValue {
  state: BattleState;
  dispatch: Dispatch<Action>;
}

const BattleContext = createContext<BattleContextValue | null>(null);

export function BattleMachineProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <BattleContext.Provider value={{ state, dispatch }}>{children}</BattleContext.Provider>;
}

export function useBattle(): BattleContextValue {
  const ctx = useContext(BattleContext);
  if (!ctx) throw new Error("useBattle must be used inside BattleMachineProvider");
  return ctx;
}
