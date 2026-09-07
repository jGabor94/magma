import NextLink from "@/components/NextLink";
import ResumeGameButton from "@/features/game/components/ResumeGameButton";
import { CartoonButton } from "@/lib/mui/styled";
import { Box, Stack, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box
      component="main"
      sx={{
        position: "relative",
        isolation: "isolate",
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
        px: 2,
        py: { xs: 5, sm: 7 },
        "&::before": {
          content: '""',
          position: "absolute",
          zIndex: -1,
          width: { xs: 230, sm: 360 },
          height: { xs: 230, sm: 360 },
          top: { xs: -105, sm: -160 },
          right: { xs: -120, sm: -145 },
          borderRadius: "42% 58% 52% 48%",
          border: "3px solid rgba(255,255,255,.12)",
          background: "rgba(255,75,171,.1)",
          transform: "rotate(18deg)",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          zIndex: -1,
          width: { xs: 180, sm: 290 },
          height: { xs: 180, sm: 290 },
          bottom: { xs: -105, sm: -160 },
          left: { xs: -95, sm: -115 },
          borderRadius: "54% 46% 42% 58%",
          border: "3px solid rgba(255,255,255,.1)",
          background: "rgba(0,229,255,.08)",
          transform: "rotate(-22deg)",
        },
      }}
    >
      <Stack
        spacing={0}
        sx={{
          width: "min(470px, 100%)",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            width: "clamp(150px, 44vw, 210px)",
            height: "clamp(150px, 44vw, 210px)",
            display: "grid",
            placeItems: "center",
            mb: { xs: 3, sm: 3.5 },
            border: "6px solid #fffdf8",
            borderRadius: "42%",
            background:
              "radial-gradient(circle at 38% 30%, #fff6a5 0 7%, #ffd84e 20%, #ff7963 43%, #ff4aa8 64%, #774fff 84%, #4ee7ff 100%)",
            boxShadow:
              "10px 12px 0 rgba(24,14,54,.58), 0 0 0 10px rgba(91,232,255,.12), 0 24px 70px rgba(255,72,166,.38)",
            color: "#fffdf8",
            fontSize: "clamp(4.75rem, 24vw, 7.25rem)",
            lineHeight: 1,
            textShadow: "4px 5px 0 rgba(66,25,79,.4)",
            transform: "rotate(-4deg)",
          }}
        >
          🌋
        </Box>
        <Typography
          component="h1"
          variant="h1"
          sx={{
            color: "#fffdf8",
            fontSize: "clamp(3.25rem, 15vw, 4.75rem)",
            textShadow: "5px 6px 0 rgba(31,19,70,.58)",
          }}
        >
          MAGMA
        </Typography>
        <Typography
          sx={{
            maxWidth: 390,
            my: { xs: 2, sm: 2.5 },
            color: "rgba(255,255,255,.84)",
            fontSize: "clamp(1rem, 4.4vw, 1.2rem)",
            lineHeight: 1.45,
            fontWeight: 800,
            textShadow: "0 3px 14px rgba(16,8,42,.38)",
          }}
        >
          Tartsd mozgásban a kört. Mondj egy jó választ, add tovább, és
          reménykedj, hogy nem nálad tör ki a vulkán.
        </Typography>
        <CartoonButton
          component={NextLink}
          href="/create"
          gradient
          sx={{
            width: "min(390px, 100%)",
            minHeight: 88,
            mt: 1.25,
            fontSize: "1.5rem !important",
            letterSpacing: "-0.04em",
            "& .MuiButton-startIcon": {
              mr: 1.5,
            },
          }}
        >
          Új játék létrehozása
        </CartoonButton>
        <ResumeGameButton />
      </Stack>
    </Box>
  );
}
