"use client";

import { FC, useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { BellRing, PartyPopper } from "lucide-react";

const FeedbackShowcase: FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  return (
    <>
      <Stack spacing={2}>
        <Alert severity="success">A szoba létrejött. Mehet a buli!</Alert>
        <Alert severity="warning">Már csak 10 másodperc van hátra.</Alert>
        <Alert severity="error">Bumm! Nálad tört ki a vulkán.</Alert>
        <Stack direction="row" useFlexGap spacing={2} sx={{ flexWrap: "wrap" }}>
          <Button
            variant="contained"
            startIcon={<PartyPopper />}
            onClick={() => setDialogOpen(true)}
          >
            Dialógus nyitása
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<BellRing />}
            onClick={() => setSnackbarOpen(true)}
          >
            Snackbar teszt
          </Button>
        </Stack>
      </Stack>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Biztosan kitörjön?</DialogTitle>
        <DialogContent>
          <Typography color="text.secondary">
            Ez csak a playground, úgyhogy a kanapé valószínűleg megússza.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setDialogOpen(false)}>
            Mégse
          </Button>
          <Button variant="contained" onClick={() => setDialogOpen(false)}>
            Hadd szóljon
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2800}
        onClose={() => setSnackbarOpen(false)}
        message="A visszajelzés működik. Nem semmi, mi?"
      />
    </>
  );
};

export default FeedbackShowcase;
