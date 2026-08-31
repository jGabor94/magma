import GamePageClient from "@/features/game/components/GamePageClient";
import { Box } from "@mui/material";
import { FC } from "react";

const GamePage: FC = () => {

  return (
    <Box
      component="main"
      sx={{
        width: "min(560px, 100%)",
        minHeight: "100dvh",
        mx: "auto",
        px: { xs: 2, sm: 2.5 },
        py: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <GamePageClient />
    </Box>
  );
};

export default GamePage;
