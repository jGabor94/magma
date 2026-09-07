import type { GamePlayer, GameState } from "@/features/game/types";
import { gameStateSchema } from "@/features/game/zod/schema";
import { ACTIVE_GAME_STORAGE_KEY } from "./constants";
import { createRandomPromptProgress } from "./promptSelection";

const canUseStorage = () => typeof window !== "undefined";
const ACTIVE_GAME_CHANGED_EVENT = "magma:active-game-changed";

export const subscribeToActiveGame = (onChange: () => void) => {
  const onStorage = (event: StorageEvent) => {
    if (event.key === ACTIVE_GAME_STORAGE_KEY || event.key === null) onChange();
  };

  window.addEventListener(ACTIVE_GAME_CHANGED_EVENT, onChange);
  window.addEventListener("storage", onStorage);

  return () => {
    window.removeEventListener(ACTIVE_GAME_CHANGED_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
};

export const createInitialGameState = (
  players: Array<Pick<GamePlayer, "name">>,
): GameState => {
  const promptProgress = createRandomPromptProgress();

  return {
    players: players.map(({ name }) => ({ name: name.trim(), magmaPoints: 0 })),
    currentPlayerIndex: 0,
    ...promptProgress,
    round: 1,
    history: [],
    isFinished: false,
  };
};

export const saveActiveGame = (game: GameState) => {
  if (!canUseStorage()) return;

  window.localStorage.setItem(ACTIVE_GAME_STORAGE_KEY, JSON.stringify(game));
  window.dispatchEvent(new Event(ACTIVE_GAME_CHANGED_EVENT));
};

export const loadActiveGame = (): GameState | null => {
  if (!canUseStorage()) return null;

  const serializedGame = window.localStorage.getItem(ACTIVE_GAME_STORAGE_KEY);
  if (!serializedGame) return null;

  try {
    const parsedGame: unknown = JSON.parse(serializedGame);
    const result = gameStateSchema.safeParse(parsedGame);

    if (!result.success) {
      window.localStorage.removeItem(ACTIVE_GAME_STORAGE_KEY);
      return null;
    }

    return result.data;
  } catch {
    window.localStorage.removeItem(ACTIVE_GAME_STORAGE_KEY);
    return null;
  }
};

export const clearActiveGame = () => {
  if (!canUseStorage()) return;

  window.localStorage.removeItem(ACTIVE_GAME_STORAGE_KEY);
  window.dispatchEvent(new Event(ACTIVE_GAME_CHANGED_EVENT));
};
