"use client";

import { gameReducer } from "@/features/game/lib/gameReducer";
import {
  loadActiveGame,
  saveActiveGame,
} from "@/features/game/lib/gameStorage";
import type { GameAction, GameState } from "@/features/game/types";
import { useRouter } from "next/navigation";
import {
  createContext,
  type Dispatch,
  FC,
  type ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";

interface GameProviderProps {
  children: ReactNode;
}

interface GameContextValue {
  game: GameState | null | undefined;
  dispatch: Dispatch<GameAction>;
}

const GameContext = createContext<GameContextValue | null>(null);

export const useGame = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("A useGame csak GameProvideren belül használható.");
  }

  return context;
};

const GameProvider: FC<GameProviderProps> = ({ children }) => {
  const router = useRouter();
  const [game, dispatch] = useReducer(gameReducer, undefined);

  // Mountkor egyszer betöltjük a localStorage-ban található játékot.
  useEffect(() => {
    dispatch({ type: "load-game", game: loadActiveGame() });
  }, []);

  // A reducer minden sikeres állapotváltása után tartósítjuk az aktuális játékot.
  useEffect(() => {
    // Az undefined azt jelenti, hogy a mountkori beolvasás még nem történt meg.
    if (game === undefined) return;

    if (game === null) {
      router.replace("/create");
      return;
    }

    saveActiveGame(game);
  }, [game, router]);

  return (
    <GameContext.Provider
      value={{
        game,
        dispatch,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
