import type { GamePlayer } from "@/features/game/types";
import useConfirmControll from "@/hooks/useConfirmControll";
import { CartoonButton, CartoonIconButton } from "@/lib/mui/styled";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from "@mui/material";
import { Square } from "lucide-react";
import { FC, Fragment } from "react";



const FinishGameDialog: FC<{ players: GamePlayer[]; onConfirm: () => void; }> = ({ players, onConfirm }) => {

  const { controll, trigger } = useConfirmControll(onConfirm)


  const lowestScore = Math.min(...players.map((player) => player.magmaPoints));
  const losers = players.filter((player) => player.magmaPoints === lowestScore);
  const resultText = losers.length === 1
    ? `Vesztes: ${losers[0].name} (${lowestScore} magmapont).`
    : `Holtversenyben vesztesek: ${losers.map((player) => player.name).join(", ")} (fejenként ${lowestScore} magmapont).`;



  return (
    <Fragment>
      <CartoonIconButton
        aria-label="Játék befejezése"
        onClick={trigger}
        color="primary"
        gradient
      >
        <Square size={18} fill="currentColor" />
      </CartoonIconButton>
      <Dialog
        open={controll.open}
        fullWidth
        maxWidth="xs"
        aria-labelledby="finish-title"

      >
        <DialogTitle sx={{ position: "relative", pb: 0 }} component="h4" variant="h4">

          Befejezed a játékot?

        </DialogTitle>
        <DialogContent>
          <Typography sx={{ mt: 1, mb: 2.5, color: "#817699", fontSize: 14, fontWeight: 750, lineHeight: 1.45 }}>A jelenlegi kör ezzel véget ér. {resultText}</Typography>
        </DialogContent>
        <DialogActions sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.25 }}>
          <CartoonButton shadow color="info" onClick={controll.promise?.reject} sx={{ minHeight: 56 }}>
            Mégse
          </CartoonButton>
          <CartoonButton shadow onClick={controll.promise?.resolve} sx={{
            minHeight: 56,
          }}>
            Játék vége
          </CartoonButton>
        </DialogActions>
      </Dialog>
    </Fragment>

  );
};

export default FinishGameDialog;
