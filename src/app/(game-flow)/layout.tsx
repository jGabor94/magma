import { Box } from "@mui/material";
import { FC, ReactNode } from "react";


const GameFlowLayout: FC<{ children: ReactNode }> = ({ children }) => {

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        overflow: "hidden",
      }}
    >
      {children}
    </Box>
  );
};

export default GameFlowLayout;
