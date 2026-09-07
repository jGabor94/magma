import type { RankedPlayer } from "@/features/game/types";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { LogOut } from "lucide-react";
import { FC } from "react";
import LeaderBaord from "./UI/LeaderBaord";

interface FinishedGameResultProps {
  players: RankedPlayer[];
  onExit: () => void;
}

const FinishedGameResult: FC<FinishedGameResultProps> = ({ players, onExit }) => {

  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        width: "100%",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Stack
        sx={{
          width: "min(380px, 100%)",
          maxHeight: "calc(100dvh - 32px)",
          gap: 1.5,
        }}
      >
        <Typography
          component="h1"
          sx={{
            color: "#fff",
            fontSize: "clamp(32px, 9vw, 48px)",
            fontWeight: 950,
            textAlign: "center",
            textShadow: "0 4px 0 rgba(25,11,41,.72)",
          }}
        >
          Játék vége
        </Typography>

        <Card
          sx={{
            minHeight: 0,
            overflowY: "auto",
            overscrollBehavior: "contain",
            p: 2,
            width: "100%",
            boxShadow: 10,
          }}
        >
          <LeaderBaord players={players} />
        </Card>

        <Button
          onClick={onExit}
          endIcon={<LogOut size={21} strokeWidth={4} />}
          sx={(theme) => ({
            width: "100%",
            flexShrink: 0,
            minHeight: 82,
            background: theme.magma.gradients.berry,
            fontSize: "24px !important",
          })}
        >
          Kilépés
        </Button>
      </Stack>
    </Box>
  );
};

export default FinishedGameResult;
