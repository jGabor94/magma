"use client";

import { FC } from "react";
import { Button, IconButton, Stack, Tooltip } from "@mui/material";
import { ArrowLeft, ArrowRight, RefreshCcw, Trophy } from "lucide-react";

const ButtonShowcase: FC = () => {

  return (
    <Stack
      direction="row"
      useFlexGap
      spacing={2}
      sx={{ flexWrap: "wrap", alignItems: "center" }}
    >
      <Button variant="contained" size="large" endIcon={<ArrowRight />}>
        Következő
      </Button>
      <Button variant="contained" color="secondary" startIcon={<ArrowLeft />}>
        Vissza
      </Button>
      <Button variant="outlined" startIcon={<Trophy />}>
        Ranglista
      </Button>
      <Button variant="text">Szöveges gomb</Button>
      <Tooltip title="Új feladvány">
        <IconButton aria-label="Új feladvány">
          <RefreshCcw size={21} />
        </IconButton>
      </Tooltip>
      <Button variant="contained" disabled>
        Kikapcsolva
      </Button>
    </Stack>
  );
};

export default ButtonShowcase;
