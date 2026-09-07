import type { GameState } from "@/features/game/types";
import { PROMPTS } from "./constants";

type PromptProgress = Pick<GameState, "promptIndex" | "usedPromptIds">;

const getRandomItem = <Item,>(items: Item[], randomValue = Math.random()) =>
  items[Math.floor(randomValue * items.length)];

export const createRandomPromptProgress = (): PromptProgress => {
  const prompt = getRandomItem(PROMPTS);

  return {
    promptIndex: PROMPTS.indexOf(prompt),
    usedPromptIds: [prompt.id],
  };
};

export const selectNextPromptProgress = (
  game: GameState,
  randomValue: number,
): PromptProgress | null => {
  const availablePrompts = PROMPTS.filter(
    ({ id }) => !game.usedPromptIds.includes(id),
  );

  // Ha elfogyott a pakli, nincs következő feladat: a reducer lezárja a játékot.
  if (!availablePrompts.length) return null;

  const prompt = getRandomItem(availablePrompts, randomValue);
  const usedPromptIds = [...game.usedPromptIds];
  usedPromptIds.push(prompt.id);

  return {
    promptIndex: PROMPTS.indexOf(prompt),
    usedPromptIds,
  };
};
