"use client";

import { FC, useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Slider,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Plus, UserRound } from "lucide-react";

const FormShowcase: FC = () => {
  const [chaosLevel, setChaosLevel] = useState(65);

  return (
    <Stack spacing={3}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
          gap: 2,
        }}
      >
        <TextField label="Játékos neve" defaultValue="Láva Lali" fullWidth />
        <TextField label="Szobakód" placeholder="MAGMA-42" fullWidth />
        <TextField
          label="Hibás mező"
          defaultValue="Pisti"
          error
          helperText="Ez a név már foglalt."
          fullWidth
        />
        <TextField label="Nem szerkeszthető" defaultValue="Házigazda" disabled fullWidth />
      </Box>
      <Box>
        <Typography gutterBottom>Káoszfaktor: {chaosLevel}%</Typography>
        <Slider
          aria-label="Káoszfaktor"
          value={chaosLevel}
          onChange={(_, value) => setChaosLevel(value as number)}
          valueLabelDisplay="auto"
        />
      </Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ alignItems: { sm: "center" } }}
      >
        <FormControlLabel control={<Switch defaultChecked />} label="Hanghatások" />
        <FormControlLabel control={<Switch />} label="Vad mód" />
        <Button variant="contained" color="secondary" startIcon={<Plus />}>
          Játékos hozzáadása
        </Button>
        <Button variant="outlined" startIcon={<UserRound />}>
          Profil
        </Button>
      </Stack>
    </Stack>
  );
};

export default FormShowcase;
