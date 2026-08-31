import { z } from "zod";
import { createGameFormSchema, gameStateSchema } from "./zod/schema";

export type CreateGameInput = z.infer<typeof createGameFormSchema>;
export type GameState = z.infer<typeof gameStateSchema>;
export type GamePlayer = GameState["players"][number];
export type GameHistoryEntry = GameState["history"][number];
export type EruptionPhase = "idle" | "active" | "awaiting";
export type EruptionLoser = { name: string; playerIndex: number };
export type RankedPlayer = { player: GamePlayer; originalIndex: number };
