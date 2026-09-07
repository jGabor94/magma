"use client";

import Dot from "@/components/Dot";
import Logo from "@/components/Logo";
import EruptionAnimation from "@/features/game/components/EruptionAnimation";
import EruptionResult from "@/features/game/components/EruptionResult";
import FinishedGameResult from "@/features/game/components/FinishedGameResult";
import { ERUPTION_CONFIG } from "@/features/game/config";
import useEruptionSound from "@/features/game/hooks/useEruptionSound";
import { PROMPTS } from "@/features/game/lib/constants";
import { clearActiveGame } from "@/features/game/lib/gameStorage";
import { useGame } from "@/features/game/providers/GameProvider";
import type { EruptionPhase } from "@/features/game/types";
import { CartoonButton, CartoonIconButton } from "@/lib/mui/styled";
import {
  Box,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { ArrowLeft, ArrowRight, RefreshCw, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { getRandomDelay } from "../utils";
import FinishGameDialog from "./FinishGameDialog";
import LeaderBoardModal from "./LeaderBoardModal";
import PromptCard from "./UI/PromptCard";

const GamePageClient: FC = () => {
  const router = useRouter();
  const { game, dispatch } = useGame();
  const hasActiveGame = game != null && !game.isFinished;
  const [eruptionPhase, setEruptionPhase] = useState<EruptionPhase>("idle");
  const eruptionPhaseRef = useRef<EruptionPhase>("idle");
  const playEruptionSound = useEruptionSound();

  // A refből az időzítő callbackje is mindig az aktuális fázist látja.
  const setPhase = useCallback((nextPhase: EruptionPhase) => {
    eruptionPhaseRef.current = nextPhase;
    setEruptionPhase(nextPhase);
  }, []);

  const triggerEruption = useCallback(() => {
    if (eruptionPhaseRef.current !== "idle") return;

    playEruptionSound();
    dispatch({ type: "eruption", randomValue: Math.random() });
    setPhase("active");
  }, [dispatch, playEruptionSound, setPhase]);

  // Minden nyugodt játékszakaszhoz egyetlen véletlen kitörési időzítő tartozik.
  useEffect(() => {
    if (!hasActiveGame || eruptionPhase !== "idle") return;

    const timer = window.setTimeout(triggerEruption, getRandomDelay());
    return () => window.clearTimeout(timer);
  }, [eruptionPhase, hasActiveGame, triggerEruption]);

  useEffect(() => {
    if (eruptionPhase !== "active") return;

    const timer = window.setTimeout(() => setPhase("awaiting"), ERUPTION_CONFIG.durationMs);
    return () => window.clearTimeout(timer);
  }, [eruptionPhase, setPhase]);

  const nextPlayer = () => {
    if (eruptionPhaseRef.current !== "idle") return;
    dispatch({ type: "next-player" });
  };

  const previousPlayer = () => {
    if (eruptionPhaseRef.current !== "idle") return;
    dispatch({ type: "previous-player" });
  };

  const nextPrompt = () => {
    if (eruptionPhaseRef.current !== "idle") return;
    dispatch({ type: "next-prompt", randomValue: Math.random() });
  };

  const finishGame = () => {
    clearActiveGame();
    router.replace("/create");
  };

  const continueAfterEruption = () => {
    if (game?.isFinished) {
      finishGame();
      return;
    }

    setPhase("idle");
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

  // Frissítés után már nincs kitörési animáció, ezért külön végeredményképernyő kell.
  if (game.isFinished && eruptionPhase === "idle") {
    return <FinishedGameResult players={sortedPlayers} onExit={finishGame} />;
  }

  const activePlayer = game.players[game.currentPlayerIndex];
  const eruptionLoser = {
    name: activePlayer.name,
    playerIndex: game.currentPlayerIndex,
  };
  const prompt = PROMPTS[game.promptIndex].content;
  const hasUnusedPrompts = game.usedPromptIds.length < PROMPTS.length;

  return (
    <>

      <>
        <Box component="header" sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          mb: 1,
        }}>
          <Stack direction="row" sx={{ alignItems: "center", gap: 1.25, color: "#fff" }}>
            <Link href="/" aria-label="Vissza a kezdőlapra">
              <Logo />
            </Link>
            <Typography
              sx={{ fontSize: 18, fontWeight: 950, letterSpacing: ".05em" }}
            >
              MAGMA
            </Typography>
          </Stack>
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
              disabled={!hasUnusedPrompts}
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
      </>





      {eruptionPhase !== "idle" && (
        <EruptionAnimation phase={eruptionPhase} />
      )}

      {eruptionPhase === "awaiting" && (
        <EruptionResult
          loser={eruptionLoser}
          players={sortedPlayers}
          isGameFinished={game.isFinished}
          onContinue={continueAfterEruption}
        />
      )}
    </>
  );
};

export default GamePageClient;
