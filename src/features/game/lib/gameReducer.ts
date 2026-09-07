import type { GameAction, GameState } from "@/features/game/types";
import { selectNextPromptProgress } from "./promptSelection";

export const gameReducer = (
  game: GameState | null | undefined,
  action: GameAction,
): GameState | null | undefined => {
  // Mountkor a localStorage-ból érkező játék ezzel kerül be Reactbe.
  if (action.type === "load-game") {
    return action.game;
  }

  // Játék nélkül a játékmenet actionjeinek nincs dolguk.
  if (!game) return game;

  if (game.isFinished) return game;

  if (action.type === "finish-game") {
    return { ...game, isFinished: true };
  }

  if (action.type === "next-player") {
    const nextPlayerIndex = game.currentPlayerIndex + 1;
    const wrappedIndex = nextPlayerIndex % game.players.length;

    // A history csak a mostani kitörési kör játékoslépéseit tartja.
    // A bejárt teljes játékoskörök száma: Math.floor(history.length / players.length).
    return {
      ...game,
      currentPlayerIndex: wrappedIndex,
      history: [...game.history, game.currentPlayerIndex],
    };
  }

  if (action.type === "previous-player") {
    const previousPlayerIndex = game.history.at(-1);
    if (previousPlayerIndex === undefined) return game;

    return {
      ...game,
      currentPlayerIndex: previousPlayerIndex,
      history: game.history.slice(0, -1),
    };
  }

  if (action.type === "next-prompt") {
    const nextPrompt = selectNextPromptProgress(game, action.randomValue);
    if (!nextPrompt) return game;

    // A véletlenszám az actionből jön, így a reducer maga kiszámítható marad.
    return {
      ...game,
      ...nextPrompt,
    };
  }

  if (action.type === "eruption") {
    const loserIndex = game.currentPlayerIndex;
    const nextPrompt = selectNextPromptProgress(game, action.randomValue);
    const players = game.players.map((player, index) =>
      index === loserIndex
        ? player
        : { ...player, magmaPoints: player.magmaPoints + 1 },
    );

    // Az utolsó prompt kitörése után megőrizzük a végeredményt.
    if (!nextPrompt) {
      return {
        ...game,
        history: [],
        players,
        isFinished: true,
      };
    }

    // A következő kör már a kitöréskor elkészül és localStorage-ba kerül.
    return {
      ...game,
      ...nextPrompt,
      history: [],
      round: game.round + 1,
      players,
    };
  }

  return game;
};
