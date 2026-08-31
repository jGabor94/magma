"use client";

import Dot from "@/components/Dot";
import Logo from "@/components/Logo";
import EruptionAnimation from "@/features/game/components/EruptionAnimation";
import EruptionResult from "@/features/game/components/EruptionResult";
import {
  ACTIVE_GAME_STORAGE_KEY,
  PROMPTS,
} from "@/features/game/lib/constants";
import {
  clearActiveGame,
  loadActiveGame,
  saveActiveGame,
} from "@/features/game/lib/gameStorage";
import { selectNextRandomPrompt } from "@/features/game/lib/promptSelection";
import type {
  EruptionLoser,
  EruptionPhase,
  GameState,
} from "@/features/game/types";
import { CartoonButton, CartoonIconButton } from "@/lib/mui/styled";
import {
  Box,
  Chip,
  CircularProgress,
  Stack,
  Typography
} from "@mui/material";
import {
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  Zap
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { getRandomDelay } from "../utils";
import FinishGameDialog from "./FinishGameDialog";
import LeaderBoardModal from "./LeaderBoardModal";
import PromptCard from "./UI/PromptCard";

type ActiveGameListener = () => void;

const activeGameListeners = new Set<ActiveGameListener>();
let activeGameSnapshot: GameState | null | undefined;
let activeGameSerialized: string | null | undefined;

const notifyActiveGameListeners = () => {
  activeGameListeners.forEach((listener) => listener());
};

const refreshActiveGameSnapshot = () => {
  if (typeof window === "undefined") return null;

  const serializedGame = window.localStorage.getItem(ACTIVE_GAME_STORAGE_KEY);
  if (serializedGame === activeGameSerialized) {
    return activeGameSnapshot ?? null;
  }

  activeGameSerialized = serializedGame;
  activeGameSnapshot = loadActiveGame();
  return activeGameSnapshot;
};

const getActiveGameSnapshot = () => refreshActiveGameSnapshot();
const getServerActiveGameSnapshot = () => undefined;

const handleActiveGameStorage = (event: StorageEvent) => {
  if (event.key !== null && event.key !== ACTIVE_GAME_STORAGE_KEY) return;

  activeGameSerialized = undefined;
  refreshActiveGameSnapshot();
  notifyActiveGameListeners();
};

const subscribeToActiveGame = (listener: ActiveGameListener) => {
  activeGameListeners.add(listener);
  if (activeGameListeners.size === 1 && typeof window !== "undefined") {
    window.addEventListener("storage", handleActiveGameStorage);
  }

  return () => {
    activeGameListeners.delete(listener);
    if (activeGameListeners.size === 0 && typeof window !== "undefined") {
      window.removeEventListener("storage", handleActiveGameStorage);
    }
  };
};

const publishActiveGame = (nextGame: GameState | null) => {
  activeGameSnapshot = nextGame;
  activeGameSerialized = nextGame
    ? JSON.stringify(nextGame)
    : typeof window !== "undefined"
      ? window.localStorage.getItem(ACTIVE_GAME_STORAGE_KEY)
      : null;
  notifyActiveGameListeners();
};

const GamePageClient: FC = () => {
  const router = useRouter();
  const game = useSyncExternalStore<GameState | null | undefined>(
    subscribeToActiveGame,
    getActiveGameSnapshot,
    getServerActiveGameSnapshot,
  );
  const hasActiveGame = game != null;
  const [eruptionPhase, setEruptionPhase] = useState<EruptionPhase>("idle");
  const [eruptionLoser, setEruptionLoser] = useState<EruptionLoser | null>(null);
  const gameRef = useRef<GameState | null>(null);
  const eruptionPhaseRef = useRef<EruptionPhase>("idle");
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (game === undefined) return;
    gameRef.current = game;
    if (!game) router.replace("/create");
  }, [game, router]);

  const setPhase = useCallback((nextPhase: EruptionPhase) => {
    eruptionPhaseRef.current = nextPhase;
    setEruptionPhase(nextPhase);
  }, []);

  const commitGame = useCallback((nextGame: GameState) => {
    gameRef.current = nextGame;
    saveActiveGame(nextGame);
    publishActiveGame(nextGame);
  }, []);

  const triggerEruption = useCallback(() => {
    const currentGame = gameRef.current;
    if (!currentGame || eruptionPhaseRef.current !== "idle") return;

    const loserIndex = currentGame.currentPlayerIndex;
    const loser = currentGame.players[loserIndex];
    const nextGame: GameState = {
      ...currentGame,
      history: [],
      players: currentGame.players.map((player, index) =>
        index === loserIndex
          ? player
          : { ...player, magmaPoints: player.magmaPoints + 1 },
      ),
    };

    setEruptionLoser({ name: loser.name, playerIndex: loserIndex });
    commitGame(nextGame);
    setPhase("active");
  }, [commitGame, setPhase]);

  useEffect(() => {
    if (!hasActiveGame || eruptionPhase !== "idle") return;

    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      triggerEruption();
    }, getRandomDelay());
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [eruptionPhase, hasActiveGame, triggerEruption]);

  useEffect(() => {
    if (eruptionPhase !== "active") return;

    const timer = window.setTimeout(() => setPhase("awaiting"), 5400);
    return () => window.clearTimeout(timer);
  }, [eruptionPhase, setPhase]);

  const updateGame = useCallback(
    (updater: (currentGame: GameState) => GameState) => {
      const currentGame = gameRef.current;
      if (!currentGame || eruptionPhaseRef.current !== "idle") return;

      commitGame(updater(currentGame));
    },
    [commitGame],
  );

  const nextPlayer = () => {
    updateGame((currentGame) => {
      const nextPlayerIndex = currentGame.currentPlayerIndex + 1;
      const wrappedIndex = nextPlayerIndex % currentGame.players.length;

      return {
        ...currentGame,
        currentPlayerIndex: wrappedIndex,
        round: nextPlayerIndex >= currentGame.players.length ? currentGame.round + 1 : currentGame.round,
        history: [
          ...currentGame.history,
          {
            playerIndex: currentGame.currentPlayerIndex,
            promptIndex: currentGame.promptIndex,
            round: currentGame.round,
          },
        ],
      };
    });
  };

  const previousPlayer = () => {
    updateGame((currentGame) => {
      const previousState = currentGame.history.at(-1);
      if (!previousState) return currentGame;

      return {
        ...currentGame,
        currentPlayerIndex: previousState.playerIndex,
        promptIndex: previousState.promptIndex,
        round: previousState.round,
        history: currentGame.history.slice(0, -1),
      };
    });
  };

  const nextPrompt = () => {
    updateGame(selectNextRandomPrompt);
  };

  const continueAfterEruption = () => {
    setPhase("idle");
    setEruptionLoser(null);
    updateGame(selectNextRandomPrompt);
  };

  const finishGame = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    clearActiveGame();
    gameRef.current = null;
    publishActiveGame(null);
    setEruptionLoser(null);
    setPhase("idle");
    router.replace("/create");
  };

  if (!game) {
    return (
      <Box sx={{ minHeight: "100dvh", display: "grid", placeItems: "center", background: "transparent" }} aria-label="Játék betöltése">
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  const sortedPlayers = game.players
    .map((player, originalIndex) => ({ player, originalIndex }))
    .sort(
      (first, second) =>
        second.player.magmaPoints - first.player.magmaPoints ||
        first.originalIndex - second.originalIndex,
    );
  const activePlayer = game.players[game.currentPlayerIndex];
  const prompt = PROMPTS[game.promptIndex].content ?? PROMPTS[0].content;

  return (
    <>
      <Box component="header" sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1,
        mb: 1,
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, color: "#fff" }}>
          <Logo />
          <Typography
            sx={{ fontSize: 18, fontWeight: 950, letterSpacing: ".05em" }}
          >
            MAGMA
          </Typography>
        </Box>
        <Stack direction="row" sx={{
          minWidth: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: { xs: 0.5, sm: 0.75 },
        }}>
          <CartoonIconButton
            gradient
            aria-label="Kitörés teszt"
            title="Teszt: azonnali kitörés"
            onClick={triggerEruption}
            color="secondary"
          >
            <Zap size={20} fill="#ffb83d" strokeWidth={0} />
          </CartoonIconButton>
          <FinishGameDialog players={game.players} onConfirm={finishGame} />
          <LeaderBoardModal players={sortedPlayers} />
          <Chip
            label={`Kör ${game.round}`}
            sx={{ height: 42, px: { xs: 1, sm: 1.5 } }}
          />
        </Stack>
      </Box>

      <Box component="section" sx={{
        flex: 1,
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
      }}>
        <Typography color="textSecondary" sx={{
          mt: 2,
          fontSize: 12,
          fontWeight: 900,
          letterSpacing: ".16em",
        }}>MOST TE JÖSSZ</Typography>
        <Stack direction="row" sx={{
          alignSelf: "center",
          alignItems: "center",
          gap: 1.25,
          mb: 1.5,
          color: "#fff",
          fontSize: "clamp(29px, 8vw, 42px)",
          fontWeight: 950,
          letterSpacing: "-.04em",
          textShadow: "3px 3px 0 rgba(38,24,76,.56), 0 5px 18px rgba(0,0,0,.14)",
        }}>
          <Dot />
          <Typography component="span" sx={{ font: "inherit", color: "inherit" }}>
            {activePlayer.name}
          </Typography>
        </Stack>
        <PromptCard>
          <Typography sx={{
            position: "relative",
            zIndex: 1,
            mb: 1.75,
            color: "#7047e8",
            fontSize: 12,
            fontWeight: 950,
            letterSpacing: ".17em",
          }}>FELADAT</Typography>
          <Typography component="p" sx={{
            position: "relative",
            zIndex: 1,
            color: "#2f2457",
            fontSize: "clamp(29px, 10vw, 56px)",
            lineHeight: 0.99,
            fontWeight: 950,
            letterSpacing: "-.055em",
            overflowWrap: "anywhere",
            textWrap: "balance",
          }}>
            {prompt}
          </Typography>
          <CartoonIconButton
            aria-label="Másik feladvány"
            onClick={nextPrompt}
            color="info"
            sx={{
              position: "absolute",
              zIndex: 2,
              right: 7,
              bottom: 7,
            }}
          >
            <RefreshCw size={25} />
          </CartoonIconButton>
        </PromptCard>
        <Stack sx={{ mt: 1.75, gap: 1.5 }}>
          <CartoonButton
            gradient
            onClick={nextPlayer}
            variant="contained"
            endIcon={
              <Box component="span" sx={{
                width: 42,
                height: 42,
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
                border: "3px solid rgba(255,255,255,.52)",
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,.18)",
                boxShadow: "0 4px 0 rgba(49,24,82,.2)",
              }}>
                <ArrowRight size={25} strokeWidth={3} />
              </Box>
            }
            sx={{
              minHeight: 104,
              fontSize: "27px !important",
              transform: "rotate(-.35deg)",
            }}
          >
            Következő
          </CartoonButton>
          <CartoonButton
            onClick={previousPlayer}
            disabled={!game.history.length}
            variant="contained"
            gradient
            color="secondary"
            startIcon={
              <Box component="span" sx={{
                width: 42,
                height: 42,
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
                border: "3px solid rgba(255,255,255,.52)",
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,.18)",
                boxShadow: "0 4px 0 rgba(49,24,82,.2)",
              }}>
                <ArrowLeft size={25} strokeWidth={3} />
              </Box>
            }
            sx={{
              minHeight: 104,
              fontSize: "27px !important",
              transform: "rotate(.3deg)",
              "&.Mui-disabled": { color: "rgba(255,255,255,.62)", opacity: 0.72 },
            }}
          >
            Vissza
          </CartoonButton>
        </Stack>
      </Box>




      {eruptionPhase !== "idle" && (
        <>
          <EruptionAnimation phase={eruptionPhase} />
          <EruptionResult
            visible={eruptionPhase === "awaiting"}
            loser={eruptionLoser}
            players={sortedPlayers}
            onContinue={continueAfterEruption}
          />
        </>
      )}
    </>
  );
};

export default GamePageClient;
