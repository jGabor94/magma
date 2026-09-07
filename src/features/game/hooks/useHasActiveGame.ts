"use client";

import { loadActiveGame, subscribeToActiveGame } from "@/features/game/lib/gameStorage";
import { useSyncExternalStore } from "react";

const getHasActiveGame = () => {
  try {
    const game = loadActiveGame();
    return game !== null && !game.isFinished;
  } catch {
    return false;
  }
};

const getServerSnapshot = () => false;

const useHasActiveGame = () => {
  return useSyncExternalStore(subscribeToActiveGame, getHasActiveGame, getServerSnapshot);
};

export default useHasActiveGame;
