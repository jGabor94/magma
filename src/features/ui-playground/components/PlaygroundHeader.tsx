"use client";

import { FC } from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { Flame, Sparkles } from "lucide-react";

const PlaygroundHeader: FC = () => {

  return (
    <Box component="header" sx={{ color: "common.white", py: { xs: 3, md: 6 } }}>
      <Stack spacing={3} sx={{ alignItems: "flex-start" }}>
        <Box
          sx={(theme) => ({
            width: 78,
            height: 78,
            display: "grid",
            placeItems: "center",
            border: "4px solid rgba(255,255,255,.9)",
            borderRadius: "26px 22px 28px 20px",
            backgroundImage: theme.magma.gradients.primary,
            boxShadow:
              "0 0 0 8px rgba(84,226,255,.14), 0 14px 34px rgba(255,70,163,.3)",
            transform: "rotate(-4deg)",
          })}
        >
          <Flame size={42} strokeWidth={3.2} />
        </Box>
        <Box>
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap", gap: 1 }}>
            <Chip
              icon={<Sparkles size={16} />}
              label="MUI design system"
              color="secondary"
            />
            <Chip label="Cartoon mode: ON" color="primary" />
          </Stack>
          <Typography variant="h1" sx={{ maxWidth: 850, color: "common.white" }}>
            MAGMA UI playground
          </Typography>
          <Typography
            sx={{
              mt: 2,
              maxWidth: 720,
              color: "rgba(255,255,255,.75)",
              fontSize: { xs: "1rem", sm: "1.15rem" },
            }}
          >
            A prototípus cukorkaszínű, rajzfilmes felületi nyelve MUI theme-be
            gyúrva. Nyomkodd, tekerd, törd el — ezért van.
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default PlaygroundHeader;
