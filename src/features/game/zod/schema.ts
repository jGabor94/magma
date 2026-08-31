import { z } from "zod";

const playerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "A játékos nevének megadása kötelező." })
    .max(24, { message: "A játékos neve legfeljebb 24 karakter lehet." }),
});

export const createGameFormSchema = z.object({
  players: z
    .array(playerSchema)
    .min(3, { message: "Legalább 3 játékos szükséges." }),
});

const playerNameSchema = z.string().trim().min(1).max(24);

const gamePlayerSchema = z.object({
  name: playerNameSchema,
  magmaPoints: z.number().int().nonnegative(),
});

const legacyGamePlayerSchema = z.object({
  name: playerNameSchema,
  meltdowns: z.number().int().nonnegative(),
});

const gameHistoryEntrySchema = z.object({
  playerIndex: z.number().int().nonnegative(),
  promptIndex: z.number().int().nonnegative(),
  round: z.number().int().positive(),
});

const gameStateFields = {
  currentPlayerIndex: z.number().int().nonnegative(),
  promptIndex: z.number().int().nonnegative(),
  usedPromptIds: z.array(z.string()).default([]),
  round: z.number().int().positive(),
  history: z.array(gameHistoryEntrySchema),
};

const modernGameStateSchema = z.object({
  players: z.array(gamePlayerSchema).min(3),
  ...gameStateFields,
});

const legacyGameStateSchema = z
  .object({
    players: z.array(legacyGamePlayerSchema).min(3),
    ...gameStateFields,
  })
  .transform((state) => {
    const totalMeltdowns = state.players.reduce(
      (total, player) => total + player.meltdowns,
      0,
    );

    return {
      ...state,
      players: state.players.map(({ name, meltdowns }) => ({
        name,
        magmaPoints: totalMeltdowns - meltdowns,
      })),
    };
  });

export const gameStateSchema = z
  .union([modernGameStateSchema, legacyGameStateSchema])
  .superRefine((state, context) => {
    if (state.currentPlayerIndex >= state.players.length) {
      context.addIssue({
        code: "custom",
        path: ["currentPlayerIndex"],
        message: "Az aktuális játékos indexe érvénytelen.",
      });
    }

    state.history.forEach((entry, index) => {
      if (entry.playerIndex >= state.players.length) {
        context.addIssue({
          code: "custom",
          path: ["history", index, "playerIndex"],
          message: "A korábbi játékos indexe érvénytelen.",
        });
      }
    });
  });
