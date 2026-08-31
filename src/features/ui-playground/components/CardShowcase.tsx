import { FC } from "react";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { Crown, Flame, Zap } from "lucide-react";

const CardShowcase: FC = () => {

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
        gap: 3,
      }}
    >
      <Card sx={{ transform: "rotate(-0.7deg)" }}>
        <CardContent>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <Avatar>1</Avatar>
            <Box>
              <Typography variant="h3">Láva Lali</Typography>
              <Typography variant="body2" color="text.secondary">
                0 magmapont
              </Typography>
            </Box>
          </Stack>
        </CardContent>
        <CardActions sx={{ px: 2, pb: 2 }}>
          <Chip icon={<Crown size={15} />} label="Éllovas" color="primary" />
        </CardActions>
      </Card>
      <Card sx={{ transform: "rotate(0.6deg)" }}>
        <CardContent>
          <Stack spacing={1.5}>
            <Zap size={34} color="#6652e8" strokeWidth={3} />
            <Typography variant="h3">Villámkör</Typography>
            <Typography color="text.secondary">
              Gyors kérdések, kevés idő, sok ordibálás.
            </Typography>
          </Stack>
        </CardContent>
      </Card>
      <Card sx={{ transform: "rotate(-0.35deg)" }}>
        <CardContent>
          <Stack spacing={1.5}>
            <Flame size={34} color="#ff4f66" strokeWidth={3} />
            <Typography variant="h3">Veszélyzóna</Typography>
            <Typography color="text.secondary">
              A vulkán bármikor rád boríthatja az asztalt.
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CardShowcase;
