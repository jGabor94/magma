import type { EruptionPhase } from "@/features/game/types";
import { Box } from "@mui/material";
import { FC } from "react";

interface EruptionAnimationProps {
  phase: Exclude<EruptionPhase, "idle">;
}

const smokePuffs = [
  { id: "center", left: "27%", top: "14%", width: "50%", height: "70%", zIndex: 1 },
  { id: "left", left: "0%", top: "34%", width: "44%", height: "56%", zIndex: 2 },
  { id: "right", left: "62%", top: "38%", width: "38%", height: "54%", zIndex: 2 },
  { id: "top", left: "35%", top: "0%", width: "32%", height: "46%", zIndex: 3 },
];

const EruptionAnimation: FC<EruptionAnimationProps> = ({ phase }) => {

  return (
    <Box
      aria-hidden="true"
      sx={[
        {
          position: "fixed",
          inset: 0,
          zIndex: 30,
          overflow: "hidden",
          display: "grid",
          placeItems: "center",
          p: 2,
          color: "#fff",
          isolation: "isolate",
          pointerEvents: "auto",
          cursor: "default",
          userSelect: "none",

        },
        phase === "active" ? {
          background: "#120f32",
          animation: "magmaEruption 5.4s cubic-bezier(.18,.72,.18,1) both",
          "@keyframes magmaEruption": {
            "0%": { opacity: 0, backgroundColor: "#120f32", filter: "brightness(.72)" },
            "8%": { opacity: 1, backgroundColor: "#1d1743", filter: "brightness(.92)" },
            "28%": { backgroundColor: "#34215c", filter: "brightness(1.04)" },
            "56%": { backgroundColor: "#ff675f", filter: "brightness(1.5) saturate(1.26)" },
            "72%": { backgroundColor: "#6f3f91", filter: "brightness(1.16)" },
            "100%": { opacity: 1, backgroundColor: "#241a4d", filter: "brightness(1.05)" },
          },
        } : {
          background: "radial-gradient(circle at 50% 38%, #ff8c62 0 4%, #bd3e58 13%, #592454 31%, #251944 57%, #100d27 100%)",
          "&::after": { content: '\"\"', position: "absolute", inset: 0, zIndex: -1, background: "radial-gradient(circle at 50% 46%, transparent 0 18%, rgba(13,8,28,.18) 42%, rgba(9,6,22,.68) 100%)", boxShadow: "inset 0 0 90px rgba(6,3,16,.72)" },
        },
      ]}
    >
      <Box aria-hidden="true" sx={{
        position: "absolute",
        left: "50%",
        bottom: "18%",
        width: "68%",
        maxWidth: 420,
        aspectRatio: "1",
        borderRadius: "50%",
        background: "radial-gradient(circle, #fffbd1 0 5%, #ffe75d 12%, #ff8a3d 27%, rgba(255,76,116,.78) 44%, rgba(126,64,214,.34) 64%, transparent 74%)",
        filter: "blur(2px)",
        boxShadow: "0 0 90px rgba(255,85,120,.82), 0 0 180px rgba(108,84,232,.42)",
        transform: "translate(-50%, 38%) scale(.15)",
        opacity: 0,
        animation: "eruptionGlow 5.2s cubic-bezier(.18,.74,.18,1) both",
        "@keyframes eruptionGlow": {
          "0%, 12%": { opacity: 0, transform: "translate(-50%,38%) scale(.12)" },
          "30%": { opacity: 0.48, transform: "translate(-50%,38%) scale(.54)" },
          "57%": { opacity: 1, transform: "translate(-50%,38%) scale(1.2)" },
          "74%": { opacity: 0.9, transform: "translate(-50%,38%) scale(1)" },
          "100%": { opacity: 0.82, transform: "translate(-50%,38%) scale(.94)" },
        },
      }} />
      <Box aria-hidden="true" sx={{
        position: "absolute",
        left: "50%",
        bottom: "38%",
        width: 64,
        height: "50%",
        borderRadius: "50% 50% 34% 34%",
        background: "linear-gradient(to top,#ff4f70 0%,#ff7b48 32%,#ffd956 68%,#fff8c6 100%)",
        boxShadow: "0 0 30px #ff5f70, 0 0 72px rgba(255,92,143,.68)",
        transform: "translateX(-50%) scaleY(.06)",
        transformOrigin: "50% 100%",
        opacity: 0,
        animation: "lavaRise 5.1s cubic-bezier(.16,.78,.18,1) both",
        "&::before, &::after": { content: '\"\"', position: "absolute", top: "5%", width: 34, height: "74%", borderRadius: "50%", background: "linear-gradient(to top,rgba(255,75,110,.18),#ff9d49 52%,#fff4b4)", boxShadow: "0 0 28px rgba(255,92,143,.6)" },
        "&::before": { left: -30, transform: "rotate(-15deg)" },
        "&::after": { right: -30, transform: "rotate(15deg)" },
        "@keyframes lavaRise": {
          "0%, 16%": { opacity: 0, transform: "translateX(-50%) scaleY(.04)" },
          "30%": { opacity: 1, transform: "translateX(-50%) scaleY(.34)" },
          "55%": { opacity: 1, transform: "translateX(-50%) scaleY(1.12)" },
          "68%": { transform: "translateX(-50%) scaleY(.92)" },
          "100%": { opacity: 1, transform: "translateX(-50%) scaleY(.84)" },
        },
      }} />
      <Box aria-hidden="true" sx={{
        position: "absolute",
        zIndex: 1,
        left: "50%",
        bottom: "68%",
        width: "min(360px, 80vw, 48dvh)",
        aspectRatio: "1.72",
        pointerEvents: "none",
        transformOrigin: "50% 100%",
        animation: "eruptionSmoke 5.1s cubic-bezier(.18,.74,.18,1) both",
        "@keyframes eruptionSmoke": {
          "0%, 18%": { opacity: 0, transform: "translate(-50%, 24vh) scale(.12)" },
          "32%": { opacity: 0.7, transform: "translate(-50%, 8vh) scale(.46)" },
          "56%": { opacity: 1, transform: "translate(-50%, -8px) scale(1.06)" },
          "76%": { opacity: 1, transform: "translate(-50%, 3px) scale(.98)" },
          "100%": { opacity: 1, transform: "translate(-50%, 0) scale(1)" },
        },
      }}>
        {smokePuffs.map(({ id, ...placement }) => (
          <Box key={id} sx={{
            ...placement,
            position: "absolute",
            borderRadius: "50%",
            border: "3px solid rgba(239,224,255,.72)",
            background: "radial-gradient(ellipse at 38% 32%, rgba(177,112,220,.94) 0%, rgba(127,77,164,.92) 38%, rgba(58,37,81,.94) 78%)",
            boxShadow: "inset -10px -12px 20px rgba(29,17,49,.24), 0 0 28px rgba(179,108,224,.2)",
          }} />
        ))}
      </Box>
      <Box aria-hidden="true" sx={{
        position: "absolute",
        left: "50%",
        bottom: -2,
        width: "min(470px, 104%)",
        height: "46%",
        transform: "translateX(-50%)",
        filter: "drop-shadow(0 -18px 30px rgba(104,22,18,.35))",
        "&::before": { content: '\"\"', position: "absolute", inset: "0 5% 0", background: "linear-gradient(155deg,#2d244e 0 24%,#5b315e 48%,#201938 78%)", clipPath: "polygon(0 100%,20% 56%,35% 34%,44% 28%,50% 34%,57% 27%,68% 40%,82% 63%,100% 100%)" },
        "&::after": { content: '\"\"', position: "absolute", left: "42%", bottom: "58%", width: "16%", height: "11%", borderRadius: "50%", background: "radial-gradient(ellipse,#fff8b2 0 18%,#ffd24f 38%,#ff765a 64%,#b2337f 80%)", boxShadow: "0 0 24px rgba(255,130,62,.9), 0 0 58px rgba(255,70,146,.52)" },
      }} />
    </Box>
  );
};

export default EruptionAnimation;
