"use client";

import { Box, Card, Stack, type CardProps } from "@mui/material";
import { FC } from "react";
import { resolveValue, ToastIcon, type Toast } from "react-hot-toast";

interface ToastAlertProps extends CardProps {
  notification: Toast;
}

const ToastAlert: FC<ToastAlertProps> = ({ notification, sx = [], children, ...cardProps }) => {

  return (
    <Card
      {...notification.ariaProps}
      {...cardProps}
      sx={[
        {
          p: 1,
          px: 2,
          maxWidth: 440,
          opacity: notification.visible ? 1 : 0,
          transition: "opacity 150ms ease",
          pointerEvents: notification.visible ? "auto" : "none",
          "@media (prefers-reduced-motion: reduce)": { transition: "none" },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
        <ToastIcon toast={notification} />
        <Box sx={{ minWidth: 0, typography: "body2" }}>
          {children ?? resolveValue(notification.message, notification)}
        </Box>
      </Stack>
    </Card>
  );
};

export default ToastAlert;
