import type { EruptionLoser, RankedPlayer } from "@/features/game/types";
import { Box, Button, Card, Typography } from "@mui/material";
import { LogOut, Play } from "lucide-react";
import { FC } from "react";
import LeaderBaord from "./UI/LeaderBaord";

interface EruptionResultProps {
  loser: EruptionLoser;
  players: RankedPlayer[];
  isGameFinished: boolean;
  onContinue: () => void;
}

const EruptionResult: FC<EruptionResultProps> = ({
  loser,
  players,
  isGameFinished,
  onContinue,
}) => {

  return (
    <Box
      role="alert"
      aria-live="assertive"
      sx={[
        {
          position: "fixed",
          zIndex: 31,
          left: "50%",
          bottom: "calc(24px + env(safe-area-inset-bottom, 0px))",
          width: "min(380px, calc(100% - 28px))",
          maxHeight: "calc(100% - 48px - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px))",
          display: "flex",
          flexDirection: "column",
          gap: 1.25,
          color: "#fff",
          transform: "translate(-50%, 0)",
        },

      ]}
    >


      <Card sx={{
        alignSelf: "center",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0.75,
        width: "max-content",
        maxWidth: "100%",
        px: 2.5,
        py: 1.5,
        background: "linear-gradient(180deg,rgba(63,24,48,.94),rgba(31,17,47,.96))",
        textAlign: "center",
        textShadow: "0 3px 0 rgba(25,11,41,.72)",
      }}>
        <Typography sx={{ color: "#ff9a80", fontSize: 14, fontWeight: 950, letterSpacing: ".04em", textTransform: "uppercase" }}>Vesztes:</Typography>
        <Typography sx={{ color: "#ffb076", fontSize: "clamp(28px, 7.4vw, 40px)", lineHeight: 1, fontWeight: 950, letterSpacing: "-.045em", overflowWrap: "anywhere", textShadow: "0 3px 0 #723d34, 0 7px 14px rgba(0,0,0,.28)" }}>{loser.name}</Typography>
      </Card>
      <Card sx={{
        boxShadow: 10,
        minHeight: 0,
        overflowY: "auto",
        overscrollBehavior: "contain",
        p: 2,
        width: "100%",
      }} >
        <LeaderBaord {...{ players }} />
      </Card>
      <Button
        onClick={onContinue}
        endIcon={
          isGameFinished
            ? <LogOut size={21} strokeWidth={4} />
            : <Play size={21} fill="currentColor" />
        }
        sx={(theme) => ({
          width: "100%",
          flexShrink: 0,
          minHeight: 82,

          background: theme.magma.gradients.berry,
          fontSize: "24px !important"
        })}
      >
        {isGameFinished ? "Játék befejezése" : "Új feladat"}
      </Button>

    </Box>
  );
};

export default EruptionResult;
