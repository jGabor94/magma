import ResumeGameModal from "@/features/game/components/ResumeGameModal";
import theme from "@/lib/mui/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MAGMA",
  description:
    "Pörgős online partijáték, ahol válaszolsz, továbbadod a kört, és reménykedsz, hogy nem nálad tör ki a vulkán.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="hu" suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ResumeGameModal />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
