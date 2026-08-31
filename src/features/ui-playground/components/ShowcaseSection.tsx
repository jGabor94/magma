import { FC, ReactNode } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";

interface ShowcaseSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}

const ShowcaseSection: FC<ShowcaseSectionProps> = ({
  eyebrow,
  title,
  description,
  children,
}) => {

  return (
    <Paper component="section" sx={{ p: { xs: 2.5, sm: 4 } }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="overline" color="secondary.main">
            {eyebrow}
          </Typography>
          <Typography variant="h2" sx={{ mt: 0.5 }}>
            {title}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 680 }}>
            {description}
          </Typography>
        </Box>
        {children}
      </Stack>
    </Paper>
  );
};

export default ShowcaseSection;
