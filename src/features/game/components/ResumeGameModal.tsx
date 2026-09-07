"use client";

import NextLink from "@/components/NextLink";
import useHasActiveGame from "@/features/game/hooks/useHasActiveGame";
import { loadActiveGame, saveActiveGame } from "@/features/game/lib/gameStorage";
import useModalControl from "@/hooks/useModalControl";
import { CartoonButton } from "@/lib/mui/styled";
import { Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import { Play, Square } from "lucide-react";
import { usePathname } from "next/navigation";
import { FC, useEffect, useRef } from "react";

const ResumeGameModal: FC = () => {
  const { open, handleOpen, handleClose } = useModalControl();
  const pathname = usePathname();
  const hasActiveGame = useHasActiveGame();
  const checkedInitialLoad = useRef(false);
  const previousPathname = useRef(pathname);
  const isGamePage = pathname === "/game" || pathname === "/game/";

  useEffect(() => {
    if (checkedInitialLoad.current) {
      if (previousPathname.current !== pathname) {
        previousPathname.current = pathname;
        handleClose();
      }
      return;
    }
    checkedInitialLoad.current = true;
    if (isGamePage) return;

    try {
      const game = loadActiveGame();
      if (game && !game.isFinished) handleOpen();
    } catch {
      // Unavailable browser storage means there is no resumable game to offer.
    }
  }, [handleClose, handleOpen, isGamePage, pathname]);

  const finishGame = () => {
    const game = loadActiveGame();
    if (game) saveActiveGame({ ...game, isFinished: true });
    handleClose();
  };

  return (
    <Dialog
      open={open && hasActiveGame && !isGamePage}
      onClose={handleClose}
      aria-labelledby="resume-game-description"
      aria-describedby="resume-game-description"
      fullWidth
      maxWidth="xs"
      slotProps={{ paper: { sx: { width: 400, maxWidth: "95%", m: 2, p: 2 } } }}
    >

      <DialogContent sx={{ p: 0 }}>
        <Typography
          id="resume-game-description"
          component="h2"
          sx={{ fontSize: "clamp(1.5rem, 5vw, 1.75rem)", fontWeight: "fontWeightBold", whiteSpace: "nowrap" }}
        >
          Van egy aktív játékod!
        </Typography>
      </DialogContent>
      <DialogActions disableSpacing sx={{ p: 0, mt: 2, display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 2 }}>
        <CartoonButton
          component={NextLink}
          fullWidth
          href="/game"
          onClick={handleClose}
          gradient
          shadow
          sx={{ height: 56, }}
          startIcon={<Play size={18} fill="currentColor" strokeWidth={3.5} aria-hidden="true" />}
        >
          Játék folytatása
        </CartoonButton>
        <CartoonButton
          onClick={finishGame}
          fullWidth
          color="info"
          shadow
          sx={{ height: 56 }}
          startIcon={<Square size={18} fill="currentColor" aria-hidden="true" />}
        >
          Játék befejezése
        </CartoonButton>
      </DialogActions>
    </Dialog>
  );
};

export default ResumeGameModal;
