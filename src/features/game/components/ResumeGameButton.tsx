"use client";

import NextLink from "@/components/NextLink";
import useHasActiveGame from "@/features/game/hooks/useHasActiveGame";
import { Button } from "@mui/material";
import { Play } from "lucide-react";
import { FC } from "react";

const ResumeGameButton: FC = () => {
  const hasActiveGame = useHasActiveGame();

  return hasActiveGame && (
    <Button
      component={NextLink}
      href={hasActiveGame ? "/game" : "/playground"}
      variant="text"
      startIcon={<Play size={18} fill="currentColor" strokeWidth={3.5} />}
      sx={{ mt: 3, color: "rgba(255,255,255,.75)" }}
    >
      Játék folytatása
    </Button>
  );
};

export default ResumeGameButton;
