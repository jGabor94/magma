import type { GameState } from "@/features/game/types";
import { PROMPTS } from "./constants";

type PromptProgress = Pick<GameState, "promptIndex" | "usedPromptIds">;

const getRandomItem = <Item,>(items: Item[]) =>
  items[Math.floor(Math.random() * items.length)];

export const createRandomPromptProgress = (): PromptProgress => {
  const prompt = getRandomItem(PROMPTS);

  return {
    promptIndex: PROMPTS.indexOf(prompt),
    usedPromptIds: [prompt.id],
  };
};

export const normalizePromptProgress = (game: GameState): GameState => {
  const currentPrompt = PROMPTS[game.promptIndex];

  if (!currentPrompt) {
    return { ...game, ...createRandomPromptProgress() };
  }

  const usedPromptIds = [...game.usedPromptIds];

  if (!usedPromptIds.includes(currentPrompt.id)) {
    usedPromptIds.push(currentPrompt.id);
  }

  game.history.forEach(({ promptIndex }) => {
    const previousPrompt = PROMPTS[promptIndex];
    if (previousPrompt && !usedPromptIds.includes(previousPrompt.id)) {
      usedPromptIds.push(previousPrompt.id);
    }
  });

  return { ...game, usedPromptIds };
};

export const selectNextRandomPrompt = (game: GameState): GameState => {
  const currentPrompt = PROMPTS[game.promptIndex];
  let usedPromptIds = [...game.usedPromptIds];

  if (currentPrompt && !usedPromptIds.includes(currentPrompt.id)) {
    usedPromptIds.push(currentPrompt.id);
  }

  let availablePrompts = PROMPTS.filter(
    ({ id }) => !usedPromptIds.includes(id),
  );

  if (!availablePrompts.length) {
    usedPromptIds = currentPrompt && PROMPTS.length > 1 ? [currentPrompt.id] : [];

    availablePrompts = PROMPTS.filter(
      ({ id }) => !usedPromptIds.includes(id),
    );
  }

  const prompt = getRandomItem(
    availablePrompts.length ? availablePrompts : PROMPTS,
  );
  usedPromptIds.push(prompt.id);

  return {
    ...game,
    promptIndex: PROMPTS.indexOf(prompt),
    usedPromptIds,
  };
};
